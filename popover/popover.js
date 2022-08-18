import { html, css } from '../shared/template.js';
import BaseElement from '../shared/base-element.js';

export function isRTL() {
  return document.documentElement.getAttribute('dir') === 'rtl';
}
/**
 * @param {string} originalValue
 * @returns {string}
 */
export function changeHorizontal(originalValue) {
  if (isRTL()) {
    return originalValue === 'left' ? 'right' : 'left';
  } else {
    return originalValue;
  }
}
/**
 * @returns {number}
 */
export function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}
/**
 * @param {{height: number}} rect
 * @param {string|number} v vertical
 * @returns {number}
 */
export function getOffsetTop(rect, v) {
  let offset = 0;

  if (typeof v === 'number') {
    offset = v;
  } else if (v === 'center') {
    offset = rect.height / 2;
  } else if (v === 'bottom') {
    offset = rect.height;
  }

  return offset;
}
/**
 * @param {{width: number}} rect
 * @param {string|number} h horizontal
 * @returns {number}
 */
export function getOffsetLeft(rect, h) {
  let offset = 0;

  if (typeof h === 'number') {
    offset = h;
  } else if (h === 'center') {
    offset = rect.width / 2;
  } else if (changeHorizontal(h) === 'right') {
    offset = rect.width;
  }

  return offset;
}

const PopoverStyle = new CSSStyleSheet();
PopoverStyle.replaceSync(css`
  :host {
    z-index: 1000;
  }
  [part~='popover'] {
    position: fixed;
    min-width: 112px;
    max-width: 280px;
    max-height: var(--md-popover-max-height, calc(100vh - 96px));
    overflow-y: auto;
    background: var(--md-sys-elevation-surface-2);
    box-shadow: var(--md-sys-elevation-shadow-2);
    outline: 0;
    transform: scale(0.9);
    opacity: 0;
    border-radius: 4px;
    z-index: 1000;
    pointer-events: none;
  }
  :host(:not([fast])[animate]) [part~='popover'] {
    transition: 120ms transform cubic-bezier(0, 0, 0.2, 1) 120ms, 120ms opacity cubic-bezier(0, 0, 0.2, 1);
  }
  :host([open]) [part~='popover'] {
    transform: scaleY(1);
    opacity: 1;
    pointer-events: auto;
    transition-delay: 0ms, 0ms !important;
  }
  [part~='overlay'] {
    position: fixed;
    inset: 0;
    pointer-events: auto;
    visibility: hidden;
    -webkit-tap-highlight-color: transparent;
    z-index: 1000;
  }
  :host([open]) [part~='overlay'] {
    visibility: visible;
  }
`);

export default class Popover extends BaseElement {
  static get is() {
    return 'md-popover';
  }

  get fixed() {
    return this.hasAttribute('fixed-position');
  }
  set fixed(value) {
    this.toggleAttribute('fixed-position', value);
  }

  /** @type {{v: string, h: string}} */
  get anchorOrigin() {
    return JSON.parse(this.getAttribute('anchor-origin') || '{"v": "bottom", "h": "left"}');
  }
  set anchorOrigin(value) {
    this.setAttribute('anchor-origin', JSON.stringify(value));
  }

  /** @type {{v: string, h: string}} */
  get transformOrigin() {
    return JSON.parse(this.getAttribute('transform-origin') || '{"v": "top", "h": "left"}');
  }
  set transformOrigin(value) {
    this.setAttribute('transform-origin', JSON.stringify(value));
  }

  anchorErr() {
    console.error(this, `requires an anchor element.`);
  }
  /**
   * @returns {{top: number, left: number}}
   */
  getAnchorOffset() {
    if (!this.anchorElement) {
      this.anchorErr();
      return { top: 0, left: 0 };
    }
    const rect = this.anchorElement.getBoundingClientRect();
    return {
      top: rect.top + getOffsetTop(rect, this.anchorOrigin.v),
      left: rect.left + getOffsetLeft(rect, this.anchorOrigin.h),
    };
  }
  /**
   * @param {{width: number, height: number}} rect
   * @returns {{v: number, h: number}}
   */
  getTransformOrigin(rect) {
    return {
      v: getOffsetTop(rect, this.transformOrigin.v),
      h: getOffsetLeft(rect, this.transformOrigin.h),
    };
  }

  /** @type {{top: number, left: number}} */
  get fixedPosition() {
    return JSON.parse(this.getAttribute('fixed-position') || '{"top": 0, "left": 0}');
  }
  set fixedPosition(value) {
    this.setAttribute('fixed-position', JSON.stringify(value));
  }

  /** @type {HTMLElement|null} */
  get anchorElement() {
    const id = this.getAttribute('anchor-el');
    return this.parentElement?.querySelector(`#${id}`) || document.querySelector(`#${id}`);
  }
  /** @type {HTMLDivElement} */
  get overlayElement() {
    return this.getEl('[part~="overlay"]');
  }
  /** @type {HTMLDivElement} */
  get popoverElement() {
    return this.getEl('[part~="inner"]');
  }

  focus() {
    this.popoverElement.focus();
  }

  get isOpen() {
    return this.hasAttribute('open');
  }

  get _styles() {
    return [PopoverStyle];
  }

  get _content() {
    return `<slot></slot>`;
  }
  get _template() {
    return html`
      <div part="overlay"></div>
      <div part="inner popover" tabindex="-1">${this._content}</div>
    `;
  }

  get marginThreshold() {
    return 48;
  }
  /**
   * @returns {{top: number, left: number, transformOrigin: {v: number|string, h: number|string}}}
   */
  getPosition() {
    if (this.fixed) {
      return {
        top: this.fixedPosition.top,
        left: this.fixedPosition.left,
        transformOrigin: this.transformOrigin,
      };
    }
    if (!this.anchorElement) {
      this.anchorErr();
      return { top: 0, left: 0, transformOrigin: { v: 0, h: 0 } };
    }
    const anchorOffset = this.getAnchorOffset();
    const popoverRect = {
      width: this.popoverElement.offsetWidth,
      height: this.popoverElement.offsetHeight,
    };

    const transformOrigin = this.getTransformOrigin(popoverRect);

    let top = anchorOffset.top - transformOrigin.v;
    let left = anchorOffset.left - transformOrigin.h;
    const bottom = top + popoverRect.height;
    const right = left + popoverRect.width;

    const heightThreshold = window.innerHeight - this.marginThreshold;
    const widthThreshold = window.innerWidth - this.marginThreshold;

    if (top < this.marginThreshold) {
      const diff = top - this.marginThreshold;
      top -= diff;
      transformOrigin.v += diff;
    } else if (bottom > heightThreshold) {
      const diff = bottom - heightThreshold;
      top -= diff;
      transformOrigin.v += diff;
    }
    if (left < this.marginThreshold) {
      const diff = left - this.marginThreshold;
      left -= diff;
      transformOrigin.h += diff;
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold;
      left -= diff;
      transformOrigin.h += diff;
    }
    return {
      top: Math.round(top),
      left: Math.round(left),
      transformOrigin: transformOrigin,
    };
  }
  setPosition() {
    const { top, left, transformOrigin } = this.getPosition();
    this.popoverElement.style.top = `${top}px`;
    this.popoverElement.style.left = `${left}px`;
    this.popoverElement.style.transformOrigin = `${transformOrigin.h}px ${transformOrigin.v}px`;
  }

  open() {
    this.setPosition();
    this.anchorElement?.setAttribute('aria-expanded', 'true');
    this.setAttribute('aria-hidden', 'false');
    this.setAttribute('open', '');
    this.setAttribute('animate', '');
    this.focus();
    document.documentElement.style.setProperty('--md-global-padding-right', `${getScrollbarWidth()}px`);
    document.documentElement.style.overflow = 'hidden';
  }
  close() {
    this.anchorElement?.setAttribute('aria-expanded', 'false');
    this.setAttribute('aria-hidden', 'true');
    this.removeAttribute('open');
    setTimeout(() => {
      this.removeAttribute('animate');
    }, 120);
    document.documentElement.style.overflow = '';
    document.documentElement.style.removeProperty('--md-global-padding-right');
    this.anchorElement?.focus();
  }

  /**
   * @param {Event} e
   */
  handleTrigger(e) {
    this.open();
  }
  handleOverlayClick(e) {
    this.close();
  }
  /**
   * @param {KeyboardEvent} e
   */
  handleKeyDown(e) {
    if (e.ctrlKey || e.altKey || e.metaKey) {
      return;
    }
    let flag = false;
    switch (e.key) {
      case 'Escape':
      case 'Esc':
        flag = true;
        this.close();
        break;

      case 'Tab':
        this.close();
        break;

      default:
        break;
    }
    if (flag) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  initARIA() {
    if (!this.anchorElement) return;
    this.setAttribute('aria-hidden', 'true');
    this.anchorElement.setAttribute('aria-haspopup', 'true');
  }

  connectedCallback() {
    if (!this.anchorElement) {
      this.anchorErr();
      return;
    }
    this.initARIA();
    this.anchorElement.addEventListener(this.getAttribute('on') || 'click', this.handleTrigger.bind(this));
    this.overlayElement.addEventListener('click', this.handleOverlayClick.bind(this));
    this.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
}

customElements.define(Popover.is, Popover);
