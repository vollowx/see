// @ts-check

import Checkbox from '../base/checkbox.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property } from '../core/decorators.js';

// @ts-ignore
import MdFocusRing from './focus-ring.js';
// @ts-ignore
import MdRipple from './ripple.js';

import MdIconButtonStyle from './icon-button.css?inline';
import MdIconButtonToggleStyle from './icon-button-toggle.css?inline';
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
        MdTargetStyle,
        MdIconButtonStyle,
        MdIconButtonToggleStyle
      ),
    ];
  }
  get template() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple enterbehavior="none"></md-ripple>
      <span part="target"></span>
      <slot part="icon icon-unchecked"></slot>
      <slot part="icon icon-checked" name="checked"></slot>
    `;
  }
  /** @type {'standard'|'filled'|'tonal'|'outlined'} */
  @property() variant = 'standard';
}
