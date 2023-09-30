import Button from '../base/button.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property } from '../core/decorators.js';

import MdFocusRing from './focus-ring.js';
import MdRipple from './ripple.js';

import MdButtonStyle from './button.css?inline';
import MdTargetStyle from './target.css?inline';

/**
 * @element md-button
 *
 * @csspart label
 * @csspart icon
 * @csspart trailingicon
 */
@customElement('md-button')
export default class MdButton extends Button {
  get styles() {
    return [...super.styles, ...sheetsFromCss(MdTargetStyle, MdButtonStyle)];
  }
  get template() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon" name="icon" aria-hidden="true"></slot>
      <slot part="label"></slot>
      <slot part="trailingicon" name="trailingicon" aria-hidden="true"></slot>
    `;
  }
  /** @type {'filled'|'tonal'|'elevated'|'outlined'|'text'} */
  @property() variant = 'filled';
  /** @type {'primary'|'secondary'|'tertiary'} */
  @property() color = 'primary';
}
