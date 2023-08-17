// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { html, sheetsFromCss } from '../core/template.js';
import { property } from '../core/decorators.js';

import FocusDetectingMixin from './focus-detecting-mixin.js';

import HiddenStyles from './hidden.css?inline';

const PROPERTY_FROM_ARIA_CHECKED = {
  true: 'checked',
  false: 'unchecked',
  mixed: 'indeterminate',
};

export default class Checkbox extends FocusDetectingMixin(ReactiveElement) {
  get styles() {
    return [...super.styles, ...sheetsFromCss(HiddenStyles)];
  }
  get template() {
    return html`<slot></slot>`;
  }
  connectedCallback() {
    super.connectedCallback?.();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'checkbox');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.#updateAriaStatus();
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');

    this.addEventListener('click', this.#boundClick);
    this.addEventListener('keydown', this.#boundKeyDown);
    this.addEventListener('keyup', this.#boundKeyUp);
  }
  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.removeEventListener('click', this.#boundClick);
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
      case 'checked':
        this.#checkedChanged();
        break;

      case 'indeterminate':
        this.#indeterminateChanged();
        break;

      case 'disabled':
        this.#disabledChanged();
        break;

      default:
        break;
    }
  }
  static get observedAttributes() {
    return ['checked', 'indeterminate', 'disabled'];
  }
  @property({ type: Boolean }) checked = false;
  #checkedChanged() {
    this.#updateAriaStatus();
  }
  @property({ type: Boolean }) indeterminate = false;
  #indeterminateChanged() {
    this.#updateAriaStatus();
  }
  @property({ type: Boolean }) disabled = false;
  #disabledChanged() {
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  #boundClick = this.#handleClick.bind(this);
  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  /** @param {PointerEvent} e */
  #handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this._toggleStatus();
  }
  /** @param {KeyboardEvent} e */
  #handleKeyDown(e) {
    if (e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  /** @param {KeyboardEvent} e */
  #handleKeyUp(e) {
    if (e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      this._toggleStatus();
    }
  }

  #updateAriaStatus() {
    this.setAttribute(
      'data-last-status',
      PROPERTY_FROM_ARIA_CHECKED[this.getAttribute('aria-checked') || 'false']
    );
    this.setAttribute(
      'aria-checked',
      this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false'
    );
  }
  _toggleStatus() {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.indeterminate = false;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: this.checked,
      })
    );
  }
}
