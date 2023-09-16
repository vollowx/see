// @ts-check

import Checkbox from '../base/checkbox.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property, query } from '../core/decorators.js';

import MdRipple from './ripple.js';

import MdCheckboxStyle from './checkbox.css' with { type: 'css' };
import MdFocusRingStyle from './focus-ring.css' with { type: 'css' };
import MdTargetStyle from './target.css' with { type: 'css' };

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
  get styles() {
    return [
      ...super.styles,
      ...sheetsFromCss(MdFocusRingStyle, MdTargetStyle, MdCheckboxStyle),
    ];
  }
  get template() {
    return html`
      <span part="focus-ring"></span>
      <span part="target"></span>
      <md-ripple enterbehavior="none"></md-ripple>
      ${this.templateIcon}
    `;
  }
  get templateIcon() {
    return html`
      <svg part="icon" viewBox="0 0 18 18" aria-hidden="true">
        <rect part="mark mark-short"></rect>
        <rect part="mark mark-long"></rect>
      </svg>
    `.innerHTML;
  }
  /** @type {MdRipple} */
  @query('md-ripple') $ripple;
  @property({ type: Boolean }) error = false;
}
