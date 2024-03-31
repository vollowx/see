import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import Button from '../base/button.js';

import MdFocusRing from './focus-ring.js';
import MdRipple from './ripple.js';

import MdFABStyle from './fab.css?inline';
import MdTargetStyle from './target.css?inline';

/**
 * @element md-fab
 *
 * @csspart label
 * @csspart icon
 */
@customElement('md-fab')
export default class MdFAB extends Button {
  // static styles = css``
  //   return [...super.styles, ...sheetsFromCss(MdTargetStyle, MdFABStyle)];
  //
  get template() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon" aria-hidden="true"></slot>
      <slot part="label" name="label"></slot>
    `;
  }
  @property({ type: Boolean }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean }) color:
    | 'surface'
    | 'primary'
    | 'secondary'
    | 'tertiary' = 'surface';
}
