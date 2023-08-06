// @ts-check

import BaseElement from '../shared/base-element.js';
import { html } from '../shared/template.js';
import { customElement, property } from '../shared/decorators.js';

import MdRippleElement from '../ripple/ripple.js';

import MdButtonElementStyle from './button.css?inline';
import MdFocusRingElementStyle from '../shared/focus-ring.css?inline';
import MdStateLayerElementStyle from '../shared/state-layer.css?inline';

/**
 * @todo Icon support, ARIA support
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
