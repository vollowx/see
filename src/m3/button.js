// @ts-check

import Button from '../base/button.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property, query } from '../core/decorators.js';

import MdRipple from './ripple.js';

import MdButtonStyle from './button.css' with { type: 'css' };
import MdFocusRingStyle from './focus-ring.css' with { type: 'css' };
import MdTargetStyle from './target.css' with { type: 'css' };

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
    return [
      ...super.styles,
      ...sheetsFromCss(MdFocusRingStyle, MdTargetStyle, MdButtonStyle),
    ];
  }
  get template() {
    return html`
      <span part="focus-ring"></span>
      <span part="target"></span>
      <md-ripple></md-ripple>
      <slot part="icon" name="icon" aria-hidden="true"></slot>
      <slot part="label"></slot>
      <slot part="trailingicon" name="trailingicon" aria-hidden="true"></slot>
    `;
  }
  /** @type {MdRipple} */
  @query('md-ripple') $ripple;
  @property({ type: Boolean }) tonal = false;
  @property({ type: Boolean }) elevated = false;
  @property({ type: Boolean }) outlined = false;
  @property({ type: Boolean }) text = false;
}
