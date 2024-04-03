import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import Checkbox from '../base/checkbox.js';

import './focus-ring.js';
import './ripple.js';

import { checkboxStyles } from './checkbox-styles.js';
import { targetStyles } from './target-styles.js';

/**
 * @element md-checkbox
 *
 * @csspart icon
 * @csspart mark
 * @csspart mark-short
 * @csspart mark-long
 */
@customElement('md-checkbox')
export default class MdCheckbox extends Checkbox {
  static styles = [...super.styles, targetStyles, checkboxStyles];
  render() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple enterbehavior="none"></md-ripple>
      <span part="target"></span>
      ${this.renderIcon()}
    `;
  }
  renderIcon() {
    return html`
      <svg part="icon" viewBox="0 0 18 18" aria-hidden="true">
        <rect part="mark mark-short"></rect>
        <rect part="mark mark-long"></rect>
      </svg>
    `;
  }
  @property({ type: Boolean, reflect: true }) error = false;
}
