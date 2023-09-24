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
  mixed: 'indeterminate',
};

const Base = FocusDetectingMixin(FormMixin(ReactiveElement));

export default class Checkbox extends Base {
  constructor() {
    super();
    this[internals].role = 'checkbox';
  }
  get styles() {
    return [...sheetsFromCss(HiddenStyles)];
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.#boundClick);
    this.addEventListener('keydown', this.#boundKeyDown);
    this.addEventListener('keyup', this.#boundKeyUp);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#boundClick);
    this.removeEventListener('keydown', this.#boundKeyDown);
    this.removeEventListener('keyup', this.#boundKeyUp);
  }
  /**
   * @param {string} name
   * @param {string|null} oldValue
   * @param {string|null} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'checked':
      case 'indeterminate':
        this.update({ dispatch: true });
        break;

      default:
        super.attributeChangedCallback?.(name, oldValue, newValue);
        break;
    }
  }
  static observedAttributes = ['checked', 'indeterminate', 'disabled'];
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean }) disabled = false;

  update({ first = false, dispatch = false } = {}) {
    super.update?.({ first, dispatch });
    this[internals].states.delete('--was-unchecked');
    this[internals].states.delete('--was-checked');
    this[internals].states.delete('--was-indeterminate');
    this[internals].states.add(
      `--was-${PROPERTY_FROM_ARIA_CHECKED[this[internals].ariaChecked]}`
    );
    this[internals].ariaChecked = this.indeterminate
      ? 'mixed'
      : this.checked
      ? 'true'
      : 'false';
    this[internals].states.delete('--unchecked');
    this[internals].states.delete('--checked');
    this[internals].states.delete('--indeterminate');
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
  #boundKeyUp = this.#handleKeyUp.bind(this);
  /** @param {Event} e */
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

  _toggleStatus() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.indeterminate = false;
  }
}
