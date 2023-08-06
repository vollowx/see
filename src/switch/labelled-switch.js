// @ts-check

import BaseElement from '../shared/base-element.js';
import { customElement, property, query } from '../shared/decorators.js';
import { html } from '../shared/template.js';

import MdSwitchElement from './switch.js';

import MdLabelledSwitchElementStyle from './labelled-switch.css?inline';

/**
 * @todo Icon support
 */
@customElement('md-labelled-switch')
export default class MdLabelledSwitchElement extends BaseElement {
  render() {
    return html`
      <style>
        ${MdLabelledSwitchElementStyle}
      </style>
      <md-switch id="control" aria-labelledby="label"></md-switch>
      <slot id="label" aria-hidden="true"></slot>
    `;
  }
  /** @type {MdSwitchElement} */
  @query('#control') $control;
  connectedCallback() {
    this.addEventListener('click', this.#handleClick.bind(this));
    this.$control.addEventListener(
      'change',
      this.#handleControlChange.bind(this)
    );
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
    this.$control.checked = this.checked;
  }
  @property({ type: Boolean }) disabled = false;
  #disabledChanged() {
    this.$control.disabled = this.disabled;
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
