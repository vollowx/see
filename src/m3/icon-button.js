// @ts-check

import Button from '../base/button.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property } from '../core/decorators.js';

// @ts-ignore
import MdFocusRing from './focus-ring.js';
// @ts-ignore
import MdRipple from './ripple.js';

import MdIconButtonStyle from './icon-button.css?inline';
import MdTargetStyle from './target.css?inline';

/**
 * @element md-icon-button
 *
 * @csspart icon
 */
@customElement('md-icon-button')
export default class MdIconButton extends Button {
  get styles() {
    return [
      ...super.styles,
      ...sheetsFromCss(MdTargetStyle, MdIconButtonStyle),
    ];
  }
  get template() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon"></slot>
    `;
  }
  /** @type {'standard'|'filled'|'tonal'|'outlined'} */
  @property() variant = 'standard';
}
