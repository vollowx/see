// @ts-check

import Checkbox from '../base/checkbox.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property } from '../core/decorators.js';

// @ts-ignore
import MdFocusRing from './focus-ring.js';
// @ts-ignore
import MdRipple from './ripple.js';

import MdCheckboxStyle from './checkbox.css?inline';
import MdTargetStyle from './target.css?inline';

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
    return [...super.styles, ...sheetsFromCss(MdTargetStyle, MdCheckboxStyle)];
  }
  get template() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple enterbehavior="none"></md-ripple>
      <span part="target"></span>
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
  @property({ type: Boolean }) error = false;
}
