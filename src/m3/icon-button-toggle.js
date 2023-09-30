// @ts-check

import Checkbox from '../base/checkbox.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property, query } from '../core/decorators.js';

import MdRipple from './ripple.js';

import MdIconButtonStyle from './icon-button.css?inline';
import MdIconButtonToggleStyle from './icon-button-toggle.css?inline';
import MdFocusRingStyle from './focus-ring.css?inline';
import MdTargetStyle from './target.css?inline';

/**
 * @element md-icon-button-toggle
 *
 * @csspart icon
 */
@customElement('md-icon-button-toggle')
export default class MdIconButtonToggle extends Checkbox {
  get styles() {
    return [
      ...super.styles,
      ...sheetsFromCss(
        MdFocusRingStyle,
        MdTargetStyle,
        MdIconButtonStyle,
        MdIconButtonToggleStyle
      ),
    ];
  }
  get template() {
    return html`
      <span part="focus-ring"></span>
      <span part="target"></span>
      <md-ripple enterbehavior="none"></md-ripple>
      <slot part="icon icon-unchecked"></slot>
      <slot part="icon icon-checked" name="checked"></slot>
    `;
  }
  /** @type {MdRipple} */
  @query('md-ripple') $ripple;
  /** @type {'standard'|'filled'|'tonal'|'outlined'} */
  @property() variant = 'standard';
}
