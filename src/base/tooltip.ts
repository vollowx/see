import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';

import { focusVisible } from '../core/variables.js';
import { Attachable } from './attachable.js';
import { InternalsAttached, internals } from './internals-attached.js';

import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';

let lastHidingTime = 0;

const Base = Attachable(InternalsAttached(LitElement));

export default class Tooltip extends Base {
  constructor() {
    super();
    this[internals].role = 'tooltip';
  }
  render() {
    return html`<slot @slotchange="${this.#handleSlotChange}"></slot>`;
  }
  @query('slot') $slot: HTMLSlotElement;

  @property() position: import('@floating-ui/dom').Placement = 'top';
  @property({ type: Number }) offset = 4;

  private clearAutoUpdate: Function;

  set visible(value: boolean) {
    if (value) {
      this.clearAutoUpdate = autoUpdate(
        this.$control,
        this,
        this.updatePosition.bind(this)
      );
      this[internals].states.add('showing');
      this.updatePosition();
      setTimeout(() => {
        this[internals].states.delete('showing');
        this[internals].states.add('visible');
      }, this.showDuration);
    } else {
      this[internals].states.add('hiding');
      setTimeout(() => {
        this[internals].states.delete('hiding');
        this[internals].states.delete('visible');
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

  #timeOutShow: number | undefined = undefined;
  #timeOutHide: number | undefined = undefined;

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
    if (!focusVisible) return;
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
  #handlePointerEnter(e: PointerEvent) {
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
  #handlePointerLeave(e: PointerEvent) {
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
  #handleOutsideClick(e: MouseEvent) {
    if (e.composedPath().includes(/** @type {HTMLElement} */ this.$control))
      return;
    this.visible = false;
    removeEventListener('click', this.#boundOutsideClick);
  }

  handleControlChange(
    prev: HTMLElement | null = null,
    next: HTMLElement | null = null
  ) {
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
