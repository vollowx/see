import BaseElement from './base-element.js';
import { html, css } from './template.js';

// Inspired by https://github.com/focus-trap/tabbable
const focusableSelector = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',

  'md-button',
  'md-fab',
  'md-icon-button',
  'md-checkbox',
  'md-seg-button',
  'md-nav-drawer-item',
  'md-list',
].join(',');

const TrapFocusStyle = css`
  :host {
    display: block;
  }
  :host([inactive]) span {
    visibility: hidden;
  }
`;

export default class TrapFocus extends BaseElement {
  static get is() {
    return 'ns-trap-focus';
  }

  /** @type {HTMLSpanElement} */
  get startElement() {
    return this.getEl('[part="start"]');
  }
  /** @type {HTMLSpanElement} */
  get endElement() {
    return this.getEl('[part="end"]');
  }

  get _styles() {
    return [TrapFocusStyle];
  }
  get _template() {
    return html`
      <span part="start" tabindex="0"></span>
      <slot></slot>
      <span part="end" tabindex="0"></span>
    `;
  }

  /** @type {HTMLElement} */
  _root = this;
  get allFocusableEls() {
    /** @type {HTMLElement[]} */
    // @ts-ignore
    const focusableEls = [...this._root.querySelectorAll(focusableSelector)];
    return focusableEls;
  }

  /**
   * @param {FocusEvent} _e
   */
  handleStartFocusIn(_e) {
    this.allFocusableEls[this.allFocusableEls.length - 1].focus();
  }
  /**
   * @param {FocusEvent} _e
   */
  handleEndFocusIn(_e) {
    this.allFocusableEls[0].focus();
  }

  connectedCallback() {
    this.startElement.addEventListener('focusin', this.handleStartFocusIn.bind(this));
    this.endElement.addEventListener('focusin', this.handleEndFocusIn.bind(this));
  }
}

customElements.define(TrapFocus.is, TrapFocus);
