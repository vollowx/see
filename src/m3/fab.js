import Button from '../base/button.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property } from '../core/decorators.js';

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
  get styles() {
    return [...super.styles, ...sheetsFromCss(MdTargetStyle, MdFABStyle)];
  }
  get template() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon" name="icon" aria-hidden="true"></slot>
      <slot part="label"></slot>
    `;
  }
  /** @type {'small'|'medium'|'large'} */
  @property({ type: Boolean }) size = 'medium';
  /** @type {'surface'|'primary'|'secondary'|'tertiary'} */
  @property({ type: Boolean }) color = 'surface';
}
