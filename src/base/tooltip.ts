import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';

import { focusVisible } from '../core/focus-visible.js';
import { Attachable } from './mixins/attachable.js';
import { InternalsAttached, internals } from './mixins/internals-attached.js';

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

  // TODO: Consider add closed state
  set visible(value: boolean) {
    if (value) {
      this.clearAutoReposition = autoUpdate(
        this.$control,
        this,
        this.reposition.bind(this)
      );
      this[internals].states.add('opening');
      this.reposition();
      setTimeout(() => {
        this[internals].states.delete('opening');
        this[internals].states.add('opened');
      }, this._durations.show);
    } else {
      this[internals].states.add('closing');
      setTimeout(() => {
        this[internals].states.delete('closing');
        this[internals].states.delete('opened');
        this.clearAutoReposition?.();
      }, this._durations.hide);
    }
  }

  readonly _windowPadding = 16;
  readonly _durations = { show: 0, hide: 0 };
  readonly _delays = {
    mouse: { show: 500, hide: 0 },
    focus: { show: 100, hide: 0 },
    touch: { show: 700, hide: 1500 },
    recentlyShowed: 800,
  };

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
        Date.now() - lastHidingTime < this._delays.recentlyShowed
          ? 0
          : this._delays.focus.show
      )
    );
  }
  #handleFocusOut() {
    lastHidingTime = Date.now();
    clearTimeout(this.#timeOutShow);
    this.#timeOutHide = setTimeout(() => {
      this.visible = false;
    }, this._delays.focus.hide);
  }
  #handlePointerEnter(e: PointerEvent) {
    if (e.pointerType === 'touch') return;
    clearTimeout(this.#timeOutHide);
    this.#timeOutShow = setTimeout(
      () => {
        this.visible = true;
      },
      Math.max(
        Date.now() - lastHidingTime < this._delays.recentlyShowed
          ? 0
          : this._delays.mouse.show
      )
    );
  }
  #handlePointerLeave(e: PointerEvent) {
    if (e.pointerType === 'touch') return;
    lastHidingTime = Date.now();
    clearTimeout(this.#timeOutShow);
    this.#timeOutHide = setTimeout(() => {
      this.visible = false;
    }, this._delays.mouse.hide);
  }
  #handleTouchStart() {
    clearTimeout(this.#timeOutHide);
    this.#timeOutShow = setTimeout(() => {
      this.visible = true;
      addEventListener('click', this.#boundOutsideClick);
    }, this._delays.touch.show);
  }
  #handleTouchEnd() {
    clearTimeout(this.#timeOutShow);
    this.#timeOutHide = setTimeout(() => {
      this.visible = false;
    }, this._delays.touch.hide);
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
        flip({ padding: this._windowPadding }),
        shift({ padding: this._windowPadding, crossAxis: true }),
      ],
    }).then(({ x, y }) => {
      this.style.top = `${y}px`;
      this.style.left = `${x}px`;
    });
  }
}
