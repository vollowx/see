// @ts-check

import Button from '../base/button.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, query } from '../core/decorators.js';

import MdRipple from './ripple.js';

import MdButtonStyle from './button.css?inline';
import MdFocusRingStyle from './focus-ring.css?inline';
import MdTargetStyle from './target.css?inline';

@customElement('md-button')
export default class MdButton extends Button {
  get styles() {
    return [
      ...super.styles,
      ...sheetsFromCss([MdFocusRingStyle, MdTargetStyle, MdButtonStyle]),
    ];
  }
  get template() {
    return html`
      <span part="focus-ring"></span>
      <span part="target"></span>
      <md-ripple></md-ripple>
      <slot name="icon"></slot>
      ${super.template.innerHTML}
      <slot name="trailingicon"></slot>
    `;
  }
  /** @type {MdRipple} */
  @query('md-ripple') $ripple;
}
