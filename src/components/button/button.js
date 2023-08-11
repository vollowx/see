// @ts-check

import { BaseElement, html, customElement, property, query } from '../base';

import MdRippleElement from '../ripple/ripple.js';

import MdButtonElementStyle from './button.css?inline';
import MdFocusRingElementStyle from '../shared/focus-ring.css?inline';
import MdStateLayerElementStyle from '../shared/state-layer.css?inline';
import MdTargetElementStyle from '../shared/target.css?inline';

/**
 * TODO: Icon support, ARIA support
 */
@customElement('md-button')
export default class MdButtonElement extends BaseElement {
  render() {
    return html`
      <style>
        ${MdButtonElementStyle}
        ${MdFocusRingElementStyle}
        ${MdStateLayerElementStyle}
        ${MdTargetElementStyle}
      </style>
      <span part="focus-ring"></span>
      <span part="state-layer"></span>
      <span part="target"></span>
      <md-ripple></md-ripple>
      <slot></slot>
    `;
  }
  /** @type {MdRippleElement} */
  @query('md-ripple') $ripple;
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
    this.addEventListener('keydown', this.#handleKeyDown.bind(this));
    this.addEventListener('keyup', this.#handleKeyUp.bind(this));
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
  @property({ type: Boolean }) disabled = false;
  #disabledChanged() {
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  /**
   * @param {KeyboardEvent} e
   */
  #handleKeyDown(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'Enter') {
      this.click();
    }
  }
  /**
   * @param {KeyboardEvent} e
   */
  #handleKeyUp(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.key === ' ') {
      this.click();
    }
  }
}
