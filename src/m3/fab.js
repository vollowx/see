// @ts-check

import Button from '../base/button.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property, query } from '../core/decorators.js';

import MdRipple from './ripple.js';

import MdFABStyle from './fab.css?inline';
import MdFocusRingStyle from './focus-ring.css?inline';
import MdTargetStyle from './target.css?inline';

/**
 * @element md-fab
 *
 * @csspart label
 * @csspart icon
 */
@customElement('md-fab')
export default class MdFAB extends Button {
  get styles() {
    return [
      ...super.styles,
      ...sheetsFromCss(MdFocusRingStyle, MdTargetStyle, MdFABStyle),
    ];
  }
  get template() {
    return html`
      <span part="focus-ring"></span>
      <span part="target"></span>
      <md-ripple></md-ripple>
      <slot part="icon" name="icon" aria-hidden="true"></slot>
      <slot part="label"></slot>
    `;
  }
  /** @type {MdRipple} */
  @query('md-ripple') $ripple;
  /** @type {'small'|'medium'|'large'} */
  @property({ type: Boolean }) size = 'medium';
  /** @type {'surface'|'primary'|'secondary'|'tertiary'} */
  @property({ type: Boolean }) variant = 'surface';
}
