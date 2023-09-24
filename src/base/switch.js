// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { sheetsFromCss } from '../core/template.js';
import { property } from '../core/decorators.js';
import { internals } from '../core/symbols.js';

import FocusDetectingMixin from './focus-detecting-mixin.js';
import FormMixin from './form-mixin.js';

import HiddenStyles from './hidden.css?inline';

const PROPERTY_FROM_ARIA_CHECKED = {
  true: 'checked',
  false: 'unchecked',
};

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
   * @param {string|null} oldValue
   * @param {string|null} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'checked':
        this.update({ dispatch: true });
        break;

      default:
        super.attributeChangedCallback?.(name, oldValue, newValue);
        break;
    }
  }
  static observedAttributes = ['checked', 'disabled'];
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;

  update({ first = false, dispatch = false } = {}) {
    super.update?.({ first, dispatch });
    this[internals].states.delete('--unchecked');
    this[internals].states.delete('--checked');
    this[internals].ariaChecked = this.checked ? 'true' : 'false';
    this[internals].states.add(
      `--${PROPERTY_FROM_ARIA_CHECKED[this[internals].ariaChecked]}`
    );

    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this[internals].ariaDisabled = this.disabled ? 'true' : 'false';

    this[internals].setFormValue(this.checked ? 'on' : null);

    if (dispatch)
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: this.checked,
        })
      );
  }

  #boundClick = this.#handleClick.bind(this);
  #boundKeyDown = this.#handleKeyDown.bind(this);
  _ignoreClick = false;
  /** @param {Event} e */
  #handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this._ignoreClick) return;
    this.__toggleStatus();
  }
  /** @param {KeyboardEvent} e */
  #handleKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.__toggleStatus();
    }
  }

  __toggleStatus() {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
  }
}
