// @ts-check

import BaseElement from '../shared/base-element.js';
import { html } from '../shared/template.js';
import { customElement, property } from '../shared/decorators.js';

import MdRippleElement from '../ripple/ripple.js';

import MdButtonElementStyle from './button.css?inline';
import MdFocusRingElementStyle from '../shared/focus-ring.css?inline';
import MdStateLayerElementStyle from '../shared/state-layer.css?inline';

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

/**
 * @todo Icon support
 */
@customElement('md-button')
export default class MdButtonElement extends BaseElement {
  render() {
    return html`
      <style>
        ${MdButtonElementStyle}
        ${MdFocusRingElementStyle}
        ${MdStateLayerElementStyle}
      </style>
      <span part="focus-ring"></span>
      <span part="state-layer"></span>
      <md-ripple></md-ripple>
      <slot></slot>
    `;
  }
  /** @type {MdRippleElement} */
  get $ripple() {
    return this.shadowRoot.querySelector('md-ripple');
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
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
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
  @property(Boolean) disabled = false;
  #disabledChanged() {
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }
}
