// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { html } from '../core/template.js';
import { property } from '../core/decorators.js';
import { internals } from '../core/symbols.js';

import AttachableMixin from './attachable-mixin.js';

let lastTime = 0;

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

const Base = AttachableMixin(ReactiveElement);

export default class Tooltip extends Base {
  constructor() {
    super();
    this[internals].role = 'tooltip';
  }
  get template() {
    return html`<slot></slot>`;
  }

  @property({ type: Boolean }) visible = false;
  /** @type {'top'|'bottom'|'left'|'right'} */
  @property() position = 'top';
  @property({ type: Number }) marginTop = 4;
  @property({ type: Number }) offset = 4;

  /** @type {number|undefined} */
  #timeOutMouse = undefined;
  /** @type {number|undefined} */
  #timeOutTouchShow = undefined;
  /** @type {number|undefined} */
  #timeOutTouchHide = undefined;
  #touching = false;

  // #boundFocusIn = this.#handleFocusIn.bind(this);
  // #boundFocusOut = this.#handleFocusOut.bind(this);
  #boundMouseEnter = this.#handleMouseEnter.bind(this);
  #boundMouseLeave = this.#handleMouseLeave.bind(this);
  #boundTouchStart = this.#handleTouchStart.bind(this);
  #boundTouchEnd = this.#handleTouchEnd.bind(this);
  #boundOutsidePointerUp = this.#handleOutsidePointerUp.bind(this);
  // #handleFocusIn() {
  //   clearTimeout(this.#timeOutMouse);
  //   this.#timeOutMouse = setTimeout(
  //     () => {
  //       this.#updatePosition();
  //       this.visible = true;
  //     },
  //     Math.max(Date.now() - lastTime < 800 ? 0 : 100)
  //   );
  // }
  // #handleFocusOut() {
  //   lastTime = Date.now();
  //   this.visible = false;
  //   clearTimeout(this.#timeOutMouse);
  // }
  #handleMouseEnter() {
    if (isTouchDevice()) return;
    clearTimeout(this.#timeOutMouse);
    this.#timeOutMouse = setTimeout(
      () => {
        this.#updatePosition();
        this.visible = true;
      },
      Math.max(Date.now() - lastTime < 800 ? 0 : 100)
    );
  }
  #handleMouseLeave() {
    if (isTouchDevice()) return;
    lastTime = Date.now();
    this.visible = false;
    clearTimeout(this.#timeOutMouse);
  }
  #handleTouchStart() {
    this.#touching = true;
    clearTimeout(this.#timeOutTouchHide);
    this.#timeOutTouchShow = setTimeout(() => {
      if (!this.#touching) return;
      this.#updatePosition();
      this.visible = true;
      addEventListener('pointerup', this.#boundOutsidePointerUp);
    }, 700);
  }
  #handleTouchEnd() {
    this.#touching = false;
    clearTimeout(this.#timeOutTouchShow);
    this.#timeOutTouchHide = setTimeout(() => {
      this.visible = false;
    }, 1500);
  }
  /** @param {PointerEvent} e */
  #handleOutsidePointerUp(e) {
    if (e.composedPath().includes(/** @type {HTMLElement} */ (this.$control)))
      return;
    this.visible = false;
    removeEventListener('pointerup', this.#boundOutsidePointerUp);
  }

  /**
   * @param {HTMLElement?} prev
   * @param {HTMLElement?} next
   */
  handleControlChange(prev = null, next = null) {
    const eventHandlers = {
      // focusin: this.#boundFocusIn,
      // focusout: this.#boundFocusOut,
      mouseenter: this.#boundMouseEnter,
      mouseleave: this.#boundMouseLeave,
      touchstart: this.#boundTouchStart,
      touchend: this.#boundTouchEnd,
    };

    Object.keys(eventHandlers).forEach((eventName) => {
      prev?.removeEventListener(eventName, eventHandlers[eventName]);
      next?.addEventListener(eventName, eventHandlers[eventName]);
    });
  }
  #updatePosition() {
    if (!this.$control) return;
    var offsetParent = this.#composedOffsetParent();
    if (!offsetParent) return;
    var offset = this.offset;
    if (this.marginTop != 4 && this.offset == 4) offset = this.marginTop;
    var parentRect = offsetParent.getBoundingClientRect();
    var targetRect = this.$control.getBoundingClientRect();
    var thisRect = this.getBoundingClientRect();
    var horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
    var verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
    var targetLeft = targetRect.left - parentRect.left;
    var targetTop = targetRect.top - parentRect.top;
    var tooltipLeft, tooltipTop;
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
      this.style.right = '0px';
      this.style.left = 'auto';
    } else {
      this.style.left = Math.max(0, tooltipLeft) + 'px';
      this.style.right = 'auto';
    }
    if (parentRect.top + tooltipTop + thisRect.height > window.innerHeight) {
      this.style.bottom = parentRect.height - targetTop + offset + 'px';
      this.style.top = 'auto';
    } else {
      this.style.top = Math.max(-parentRect.top, tooltipTop) + 'px';
      this.style.bottom = 'auto';
    }
  }
  #composedOffsetParent() {
    /** @param {Element} element */
    function flatTreeParent(element) {
      if (element.assignedSlot) {
        return element.assignedSlot;
      }
      if (element.parentNode instanceof ShadowRoot) {
        return element.parentNode.host;
      }
      return element.parentNode;
    }

    for (let ancestor = this; ancestor; ancestor = flatTreeParent(ancestor)) {
      if (!(ancestor instanceof Element)) continue;
      if (getComputedStyle(ancestor).display === 'none') return null;
    }
    for (
      let ancestor = flatTreeParent(this);
      ancestor;
      ancestor = flatTreeParent(ancestor)
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
