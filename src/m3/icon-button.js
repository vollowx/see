// @ts-check

import Button from '../base/button.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property, query } from '../core/decorators.js';

import MdRipple from './ripple.js';

import MdIconButtonStyle from './icon-button.css?inline';
import MdFocusRingStyle from './focus-ring.css?inline';
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
      ...sheetsFromCss(MdFocusRingStyle, MdTargetStyle, MdIconButtonStyle),
    ];
  }
  get template() {
    return html`
      <span part="focus-ring"></span>
      <span part="target"></span>
      <md-ripple></md-ripple>
      <slot part="icon"></slot>
    `;
  }
  /** @type {MdRipple} */
  @query('md-ripple') $ripple;
  /** @type {'standard'|'filled'|'tonal'|'outlined'} */
  @property() variant = 'standard';
}
