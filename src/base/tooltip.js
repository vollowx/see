import ReactiveElement from '../core/reactive-element.js';
import { html } from '../core/template.js';
import { property } from '../core/decorators.js';
import { internals } from '../core/symbols.js';

import AttachableMixin from './attachable-mixin.js';

let lastHidingTime = 0;
let shouldBeVisible = false;

window.addEventListener('keydown', () => (shouldBeVisible = true));
window.addEventListener('mousedown', () => (shouldBeVisible = false));

/** @type {Tooltip[]} */
let visibleTooltips = [];

window.addEventListener('scroll', () => {
  visibleTooltips.forEach((tooltip) => {
    tooltip.updatePosition();
  });
});

const Base = AttachableMixin(ReactiveElement);

export default class Tooltip extends Base {
  constructor() {
    super();
    this[internals].role = 'tooltip';
  }
  get template() {
    return html`<slot></slot>`;
  }

  /** @type {'top'|'bottom'|'left'|'right'} */
  @property() position = 'top';
  @property({ type: Number }) marginTop = 4;
  @property({ type: Number }) offset = 4;

  /** @param {boolean} value */
  set visible(value) {
    value
      ? this[internals].states.add('--visible')
      : this[internals].states.delete('--visible');
    value
      ? visibleTooltips.push(this)
      : (visibleTooltips = visibleTooltips.filter(
          (tooltip) => tooltip !== this
        ));
  }

  windowPadding = 4;
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

  #boundFocusIn = this.#handleFocusIn.bind(this);
  #boundFocusOut = this.#handleFocusOut.bind(this);
  #boundPointerEnter = this.#handlePointerEnter.bind(this);
  #boundPointerLeave = this.#handlePointerLeave.bind(this);
  #boundTouchStart = this.#handleTouchStart.bind(this);
  #boundTouchEnd = this.#handleTouchEnd.bind(this);
  #boundOutsideClick = this.#handleOutsideClick.bind(this);

  #handleFocusIn() {
    if (!shouldBeVisible) return;
    clearTimeout(this.#timeOutHide);
    this.#timeOutShow = setTimeout(
      () => {
        this.updatePosition();
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
        this.updatePosition();
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
      this.updatePosition();
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

    const offsetParent = this.#composedOffsetParent();
    if (!offsetParent) return;
    let offset = this.offset;
    if (this.marginTop != 4 && this.offset == 4) offset = this.marginTop;
    const parentRect = offsetParent.getBoundingClientRect();
    const targetRect = this.$control.getBoundingClientRect();
    const thisRect = this.getBoundingClientRect();
    const horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
    const verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
    const targetLeft = targetRect.left - parentRect.left;
    const targetTop = targetRect.top - parentRect.top;
    let tooltipLeft, tooltipTop;
    switch (this.position) {
      case 'top':
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop - thisRect.height - offset;
        break;
      case 'bottom':
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop + targetRect.height + offset;
        break;
      case 'left':
        tooltipLeft = targetLeft - thisRect.width - offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
      case 'right':
        tooltipLeft = targetLeft + targetRect.width + offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
    }

    if (parentRect.left + tooltipLeft + thisRect.width > window.innerWidth) {
      this.style.right = this.windowPadding + 'px';
      this.style.left = 'auto';
    } else {
      this.style.left = Math.max(this.windowPadding, tooltipLeft) + 'px';
      this.style.right = 'auto';
    }
    if (parentRect.top + tooltipTop + thisRect.height > window.innerHeight) {
      this.style.bottom =
        parentRect.height - targetTop + offset + this.windowPadding + 'px';
      this.style.top = 'auto';
    } else {
      this.style.top =
        Math.max(this.windowPadding - parentRect.top, tooltipTop) + 'px';
      this.style.bottom = 'auto';
    }
  }
  #composedOffsetParent() {
    /**
     * @param {Element} element
     * @returns {Element?}
     */
    function getNextAncestor(element) {
      if (element.assignedSlot) {
        return element.assignedSlot;
      }
      if (element.parentNode instanceof ShadowRoot) {
        return element.parentNode.host;
      }
      return /** @type {Element?} */ (element.parentNode);
    }

    for (
      let ancestor = /** @type {Element?} */ (this);
      ancestor;
      ancestor = getNextAncestor(ancestor)
    ) {
      if (!(ancestor instanceof Element)) continue;
      if (getComputedStyle(ancestor).display === 'none') return null;
    }
    for (
      let ancestor = getNextAncestor(this);
      ancestor;
      ancestor = getNextAncestor(ancestor)
    ) {
      if (!(ancestor instanceof Element)) continue;
      const style = getComputedStyle(ancestor);
      if (style.display === 'contents') {
        continue;
      }
      if (style.position !== 'static') {
        return ancestor;
      }
      if (ancestor.tagName === 'BODY') return ancestor;
    }
    return null;
  }
}
