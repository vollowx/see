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

export class Tooltip extends Base {
  constructor() {
    super();
    this[internals].role = 'tooltip';
  }
  override render() {
    return html`<slot @slotchange="${this.#handleSlotChange}"></slot>`;
  }
  @query('slot') $slot: HTMLSlotElement;

  @property({ reflect: true }) align: import('@floating-ui/dom').Placement =
    'top';
  @property({ type: Number, reflect: true }) offset = 4;

  // TODO: Unify state names with Menu
  set visible(value: boolean) {
    if (value) {
      this.clearAutoReposition = autoUpdate(
        this.$control,
        this,
        this.reposition.bind(this)
      );
      this[internals].states.add('showing');
      this.reposition();
      setTimeout(() => {
        this[internals].states.delete('showing');
        this[internals].states.add('visible');
      }, this.showDuration);
    } else {
      this[internals].states.add('hiding');
      setTimeout(() => {
        this[internals].states.delete('hiding');
        this[internals].states.delete('visible');
        this.clearAutoReposition?.();
      }, this.hideDuration);
    }
  }

  padding = 8;
  showDuration = 100;
  hideDuration = 100;
  mouseShowDelay = 500;
  mouseHideDelay = 0;
  focusShowDelay = 100;
  focusHideDelay = 0;
  touchShowDelay = 700;
  touchHideDelay = 1500;
  recentlyShowedDelay = 800;

  #timeOutShow: NodeJS.Timeout | undefined = undefined;
  #timeOutHide: NodeJS.Timeout | undefined = undefined;

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

  override handleControlChange(
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

  private clearAutoReposition: Function | null = null;
  reposition() {
    if (!this.$control) return;

    computePosition(this.$control, this, {
      placement: this.align,
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
