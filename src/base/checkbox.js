// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { html } from '../core/template.js';
import { property } from '../core/decorators.js';

const PROPERTY_FROM_ARIA_CHECKED = {
  true: 'checked',
  false: 'unchecked',
  mixed: 'indeterminate',
};

export default class Checkbox extends ReactiveElement {
  get template() {
    return html`<slot></slot>`;
  }
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', this._role);
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this._updateAriaState();
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');

    this.addEventListener('click', this.#boundClick);
    this.addEventListener('keyup', this.#boundKeyUp);
  }
  disconnectedCallback() {
    this.removeEventListener('click', this.#boundClick);
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
    this._updateAriaState();
  }
  @property({ type: Boolean }) indeterminate = false;
  #indeterminateChanged() {
    this._updateAriaState();
  }
  @property({ type: Boolean }) disabled = false;
  #disabledChanged() {
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  #boundClick = this.#handleClick.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  _role = 'checkbox';
  _ariaState = 'aria-checked';
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

  _updateAriaState() {
    this.setAttribute(
      'prev',
      PROPERTY_FROM_ARIA_CHECKED[this.getAttribute(this._ariaState) || 'false']
    );
    this.setAttribute(
      this._ariaState,
      this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false'
    );
  }
  _toggleState() {
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
