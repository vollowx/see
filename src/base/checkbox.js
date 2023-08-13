// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { html } from '../core/template.js';
import { property } from '../core/decorators.js';

export default class Checkbox extends ReactiveElement {
  get template() {
    return html`<slot></slot>`;
  }
  connectedCallback() {
    if (!this.hasAttribute('type')) {
      this.setAttribute('type', 'button');
    }
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.setAttribute('aria-pressed', this.checked ? 'true' : 'false');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');

    this.addEventListener('click', this.#boundClick);
    this.addEventListener('keydown', this.#boundKeyDown);
    this.addEventListener('keyup', this.#boundKeyUp);
  }
  disconnectedCallback() {
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

      case 'disabled':
        this.#disabledChanged();
        break;

      default:
        break;
    }
  }
  static get observedAttributes() {
    return ['checked', 'disabled'];
  }
  @property({ type: Boolean }) checked = false;
  #checkedChanged() {
    this.setAttribute('aria-pressed', this.checked ? 'true' : 'false');
  }
  @property({ type: Boolean }) disabled = false;
  #disabledChanged() {
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  #boundClick = this.#handleClick.bind(this);
  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  _ignoreClick = false;
  /** @param {PointerEvent} e */
  #handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    // For switch-like behavior
    if (this._ignoreClick) return;
    this._toggleState();
  }
  /** @param {KeyboardEvent} e */
  #handleKeyUp(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.key === ' ') {
      this._toggleState();
    }
  }
  /** @param {KeyboardEvent} e */
  #handleKeyDown(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.repeat) {
      return;
    }
    if (e.key === 'Enter') {
      this._toggleState();
    }
  }

  _toggleState() {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: this.checked,
      })
    );
  }
}
