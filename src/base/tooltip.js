import ReactiveElement from '../core/reactive-element.js';
import { html } from '../core/template.js';
import { property, query } from '../core/decorators.js';
import { internals } from '../core/symbols.js';

import AttachableMixin from './attachable-mixin.js';

import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';

let lastHidingTime = 0;
let shouldBeVisible = false;

window.addEventListener('keydown', () => (shouldBeVisible = true));
window.addEventListener('mousedown', () => (shouldBeVisible = false));

const Base = AttachableMixin(ReactiveElement);

export default class Tooltip extends Base {
  constructor() {
    super();
    this[internals].role = 'tooltip';
  }
  get template() {
    return html`<slot></slot>`;
  }
  /** @type {HTMLSlotElement} */
  @query('slot') $slot;
  connectedCallback() {
    super.connectedCallback();
    this.$slot.addEventListener('slotchange', this.#boundSlotChange);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.$slot.removeEventListener('slotchange', this.#boundSlotChange);
  }

  /** @type {import('@floating-ui/dom').Placement} */
  @property() position = 'top';
  @property({ type: Number }) offset = 4;

  /** @param {boolean} value */
  set visible(value) {
    if (value) {
      this.clearAutoUpdate = autoUpdate(
        this.$control,
        this,
        this.updatePosition.bind(this)
      );
      this[internals].states.add('--showing');
      this.updatePosition();
      setTimeout(() => {
        this[internals].states.delete('--showing');
        this[internals].states.add('--visible');
      }, this.showDuration);
    } else {
      this[internals].states.add('--hiding');
      setTimeout(() => {
        this[internals].states.delete('--hiding');
        this[internals].states.delete('--visible');
        this.clearAutoUpdate();
      }, this.hideDuration);
    }
  }

  padding = 4;
  showDuration = 100;
  hideDuration = 100;
  mouseShowDelay = 100;
  mouseHideDelay = 0;
  focusShowDelay = 100;
  focusHideDelay = 0;
  touchShowDelay = 700;
  touchHideDelay = 1500;
  recentlyShowedDelay = 800;

  /** @type {number|undefined} */
  #timeOutShow = undefined;
  /** @type {number|undefined} */
  #timeOutHide = undefined;

  #boundSlotChange = this.#handleSlotChange.bind(this);
  #boundFocusIn = this.#handleFocusIn.bind(this);
  #boundFocusOut = this.#handleFocusOut.bind(this);
  #boundPointerEnter = this.#handlePointerEnter.bind(this);
  #boundPointerLeave = this.#handlePointerLeave.bind(this);
  #boundTouchStart = this.#handleTouchStart.bind(this);
  #boundTouchEnd = this.#handleTouchEnd.bind(this);
  #boundOutsideClick = this.#handleOutsideClick.bind(this);

  #handleSlotChange() {
    this.$control.setAttribute('aria-label', this.textContent ?? '');
  }
  #handleFocusIn() {
    if (!shouldBeVisible) return;
    clearTimeout(this.#timeOutHide);
    this.#timeOutShow = setTimeout(
      () => {
        this.visible = true;
      },
      Math.max(
        Date.now() - lastHidingTime < this.recentlyShowedDelay
          ? 0
          : this.focusShowDelay
      )
    );
  }
  #handleFocusOut() {
    lastHidingTime = Date.now();
    clearTimeout(this.#timeOutShow);
    this.#timeOutHide = setTimeout(() => {
      this.visible = false;
    }, this.focusHideDelay);
  }
  /** @param {PointerEvent} e */
  #handlePointerEnter(e) {
    if (e.pointerType === 'touch') return;
    clearTimeout(this.#timeOutHide);
    this.#timeOutShow = setTimeout(
      () => {
        this.visible = true;
      },
      Math.max(
        Date.now() - lastHidingTime < this.recentlyShowedDelay
          ? 0
          : this.mouseShowDelay
      )
    );
  }
  /** @param {PointerEvent} e */
  #handlePointerLeave(e) {
    if (e.pointerType === 'touch') return;
    lastHidingTime = Date.now();
    clearTimeout(this.#timeOutShow);
    this.#timeOutHide = setTimeout(() => {
      this.visible = false;
    }, this.mouseHideDelay);
  }
  #handleTouchStart() {
    clearTimeout(this.#timeOutHide);
    this.#timeOutShow = setTimeout(() => {
      this.visible = true;
      addEventListener('click', this.#boundOutsideClick);
    }, this.touchShowDelay);
  }
  #handleTouchEnd() {
    clearTimeout(this.#timeOutShow);
    this.#timeOutHide = setTimeout(() => {
      this.visible = false;
    }, this.touchHideDelay);
  }
  /** @param {MouseEvent} e */
  #handleOutsideClick(e) {
    if (e.composedPath().includes(/** @type {HTMLElement} */ (this.$control)))
      return;
    this.visible = false;
    removeEventListener('click', this.#boundOutsideClick);
  }

  /**
   * @param {HTMLElement?} prev
   * @param {HTMLElement?} next
   */
  handleControlChange(prev = null, next = null) {
    const eventHandlers = {
      focusin: this.#boundFocusIn,
      focusout: this.#boundFocusOut,
      pointerenter: this.#boundPointerEnter,
      pointerleave: this.#boundPointerLeave,
      touchstart: this.#boundTouchStart,
      touchend: this.#boundTouchEnd,
    };

    Object.keys(eventHandlers).forEach((eventName) => {
      prev?.removeEventListener(eventName, eventHandlers[eventName]);
      next?.addEventListener(eventName, eventHandlers[eventName]);
    });

    if (prev) prev.removeAttribute('aria-label');
    if (next) next.setAttribute('aria-label', this.textContent ?? '');
  }
  updatePosition() {
    if (!this.$control) return;

    computePosition(this.$control, this, {
      placement: this.position,
      middleware: [
        offset(this.offset),
        flip({ padding: this.padding }),
        shift({ padding: this.padding, crossAxis: true }),
      ],
    }).then(({ x, y }) => {
      this.style.top = `${y}px`;
      this.style.left = `${x}px`;
    });
  }
}
