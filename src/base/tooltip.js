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

var fromKeyboard = false;

window.addEventListener(
  'keydown',
  () => {
    fromKeyboard = true;
  },
  { capture: true }
);
window.addEventListener(
  'mousedown',
  () => {
    fromKeyboard = false;
  },
  { capture: true }
);

/** @type {Tooltip[]} */
var visibleTooltips = [];

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

  static observedAttributes = ['visible'];
  @property({ type: Boolean }) visible = false;
  /** @type {'top'|'bottom'|'left'|'right'} */
  @property() position = 'top';
  @property({ type: Number }) marginTop = 4;
  @property({ type: Number }) offset = 4;

  update({ first = false, dispatch = false } = {}) {
    super.update?.({ first, dispatch });
    if (this.visible) {
      visibleTooltips.push(this);
    } else {
      visibleTooltips = visibleTooltips.filter((tooltip) => tooltip !== this);
    }
  }

  moudeShowDelay = 100;
  moudeHideDelay = 0;
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
  #boundMouseEnter = this.#handleMouseEnter.bind(this);
  #boundMouseLeave = this.#handleMouseLeave.bind(this);
  #boundTouchStart = this.#handleTouchStart.bind(this);
  #boundTouchEnd = this.#handleTouchEnd.bind(this);
  #boundOutsideClick = this.#handleOutsideClick.bind(this);

  #handleFocusIn() {
    if (!fromKeyboard) return;
    clearTimeout(this.#timeOutHide);
    this.#timeOutShow = setTimeout(
      () => {
        this.updatePosition();
        this.visible = true;
      },
      Math.max(
        Date.now() - lastTime < this.recentlyShowedDelay
          ? 0
          : this.focusShowDelay
      )
    );
  }
  #handleFocusOut() {
    lastTime = Date.now();
    clearTimeout(this.#timeOutShow);
    this.#timeOutHide = setTimeout(() => {
      this.visible = false;
    }, this.focusHideDelay);
  }
  #handleMouseEnter() {
    if (isTouchDevice()) return;
    clearTimeout(this.#timeOutHide);
    this.#timeOutShow = setTimeout(
      () => {
        this.updatePosition();
        this.visible = true;
      },
      Math.max(
        Date.now() - lastTime < this.recentlyShowedDelay
          ? 0
          : this.moudeShowDelay
      )
    );
  }
  #handleMouseLeave() {
    if (isTouchDevice()) return;
    lastTime = Date.now();
    clearTimeout(this.#timeOutShow);
    this.#timeOutHide = setTimeout(() => {
      this.visible = false;
    }, this.moudeHideDelay);
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
    removeEventListener('pointerup', this.#boundOutsideClick);
  }

  /**
   * @param {HTMLElement?} prev
   * @param {HTMLElement?} next
   */
  handleControlChange(prev = null, next = null) {
    const eventHandlers = {
      focusin: this.#boundFocusIn,
      focusout: this.#boundFocusOut,
      mouseenter: this.#boundMouseEnter,
      mouseleave: this.#boundMouseLeave,
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
