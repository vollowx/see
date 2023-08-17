// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { html, sheetsFromCss } from '../core/template.js';
import { property } from '../core/decorators.js';

import FocusDetectingMixin from './focus-detecting-mixin.js';

import HiddenStyles from './hidden.css?inline';

export default class Button extends FocusDetectingMixin(ReactiveElement) {
  get styles() {
    return [...super.styles, ...sheetsFromCss(HiddenStyles)];
  }
  get template() {
    return html`<slot></slot>`;
  }
  connectedCallback() {
    super.connectedCallback?.();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    this.addEventListener('keydown', this.#boundKeyDown);
    this.addEventListener('keyup', this.#boundKeyUp);
  }
  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.removeEventListener('keydown', this.#boundKeyDown);
    this.removeEventListener('keyup', this.#boundKeyUp);
  }
  /**
   * @param {string} name
   * @param {string|null} _oldValue
   * @param {string|null} _newValue
   */
  attributeChangedCallback(name, _oldValue, _newValue) {
    switch (name) {
      case 'disabled':
        this.#disabledChanged();
        break;

      default:
        break;
    }
  }
  static get observedAttributes() {
    return ['disabled'];
  }
  @property({ type: Boolean }) disabled = false;
  #disabledChanged() {
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  /** @param {KeyboardEvent} e */
  #handleKeyDown(e) {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'Enter') {
      this.click();
    }
  }
  /** @param {KeyboardEvent} e */
  #handleKeyUp(e) {
    if (e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      this.click();
    }
  }
}
