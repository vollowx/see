// @ts-check

import BaseElement from '../shared/base-element.js';

import MdSwitchElement from './switch.js';

import MdLabelledSwitchElementStyle from './labelled-switch.css?inline';

// const getOnIcon = () => {
//   return `
//     <svg class="icon icon--on" viewBox="0 0 24 24">
//       <path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
//     </svg>
//   `;
// };
//
// const getOffIcon = () => {
//   return `
//     <svg class="icon icon--off" viewBox="0 0 24 24">
//       <path
//         d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z"
//       />
//     </svg>
//   `;
// };

export default class MdLabelledSwitchElement extends BaseElement {
  static get is() {
    return 'md-labelled-switch';
  }
  render() {
    return `
      <style>${MdLabelledSwitchElementStyle}</style>
      <md-switch id="control" aria-labelledby="label"></md-switch>
      <span id="label" aria-hidden="true">${this.getAttribute('label')}</span>
    `;
  }
  /** @type {MdSwitchElement} */
  get $control() {
    return this.$('#control');
  }
  /** @type {HTMLSpanElement} */
  get $label() {
    return this.$('#label');
  }
  connectedCallback() {
    this.addEventListener('click', this.#handleClick.bind(this));
    this.$control.addEventListener(
      'change',
      this.#handleControlChange.bind(this)
    );
  }
  static get observedAttributes() {
    return ['checked', 'disabled', 'label'];
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

      case 'label':
        this.#labelChanged();

      default:
        break;
    }
  }
  /**
   * @param {boolean} value
   */
  set checked(value) {
    this.toggleAttribute('checked', value);
  }
  get checked() {
    return this.hasAttribute('checked');
  }
  #checkedChanged() {
    this.$control.checked = this.checked;
  }
  /**
   * @param {boolean} value
   */
  set disabled(value) {
    this.toggleAttribute('disabled', value);
  }
  get disabled() {
    return this.hasAttribute('disabled');
  }
  #disabledChanged() {
    this.$control.disabled = this.disabled;
  }
  /**
   * @param {string} value
   */
  set label(value) {
    this.setAttribute('checked', value);
  }
  get label() {
    return this.getAttribute('label') || '';
  }
  #labelChanged() {
    this.$label.textContent = this.label;
  }

  /**
   * @param {PointerEvent} e
   */
  #handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.#toggleState();
  }
  /**
   * @param {{ detail: boolean }} e
   */
  #handleControlChange(e) {
    this.checked = e.detail;
  }
  #toggleState() {
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

  focus() {
    this.$control.focus();
  }
}

customElements.define(MdLabelledSwitchElement.is, MdLabelledSwitchElement);
