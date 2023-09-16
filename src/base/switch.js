// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { sheetsFromCss } from '../core/template.js';
import { property } from '../core/decorators.js';
import { internals } from '../core/symbols.js';

import FocusDetectingMixin from './focus-detecting-mixin.js';
import FormMixin from './form-mixin.js';

import HiddenStyles from './hidden.css?inline';

const Base = FocusDetectingMixin(FormMixin(ReactiveElement));

export default class Switch extends Base {
  constructor() {
    super();
    this[internals].role = 'switch';
  }
  get styles() {
    return [...sheetsFromCss(HiddenStyles)];
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this[internals].ariaChecked = this.checked ? 'true' : 'false';
    this[internals].ariaDisabled = this.disabled ? 'true' : 'false';

    this.addEventListener('click', this.#boundClick);
    this.addEventListener('keydown', this.#boundKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
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
  static observedAttributes = ['checked', 'disabled'];
  @property({ type: Boolean }) checked = false;
  #checkedChanged() {
    this[internals].ariaChecked = this.checked ? 'true' : 'false';
  }
  @property({ type: Boolean }) disabled = false;
  #disabledChanged() {
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this[internals].ariaDisabled = this.disabled ? 'true' : 'false';
  }

  #boundClick = this.#handleClick.bind(this);
  #boundKeyDown = this.#handleKeyDown.bind(this);
  _ignoreClick = false;
  /** @param {Event} e */
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
