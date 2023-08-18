// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { sheetsFromCss } from '../core/template.js';
import { property } from '../core/decorators.js';

import FocusDetectingMixin from './focus-detecting-mixin.js';

import HiddenStyles from './hidden.css?inline';

export default class Checkbox extends FocusDetectingMixin(ReactiveElement) {
  get styles() {
    return [...super.styles, ...sheetsFromCss(HiddenStyles)];
  }
  connectedCallback() {
    super.connectedCallback?.();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'switch');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');

    this.addEventListener('click', this.#boundClick);
    this.addEventListener('keydown', this.#boundKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.removeEventListener('click', this.#boundClick);
    this.removeEventListener('keydown', this.#boundKeyDown);
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
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
  }
  @property({ type: Boolean }) disabled = false;
  #disabledChanged() {
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  #boundClick = this.#handleClick.bind(this);
  #boundKeyDown = this.#handleKeyDown.bind(this);
  _ignoreClick = false;
  /** @param {PointerEvent} e */
  #handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this._ignoreClick) return;
    this._toggleStatus();
  }
  /** @param {KeyboardEvent} e */
  #handleKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this._toggleStatus();
    }
  }

  _toggleStatus() {
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
