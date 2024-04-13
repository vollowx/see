import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Button } from '../base/button.js';

import './focus-ring.js';
import './ripple.js';

import { fabStyles } from './fab-styles.js';
import { targetStyles } from './target-styles.js';

/**
 * @element md-fab
 *
 * @csspart label
 * @csspart icon
 */
@customElement('md-fab')
export class M3FAB extends Button {
  static override styles = [...super.styles, targetStyles, fabStyles];
  override render() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon" aria-hidden="true"></slot>
      <slot part="label" name="label"></slot>
    `;
  }
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ reflect: true }) color:
    | 'surface'
    | 'primary'
    | 'secondary'
    | 'tertiary' = 'surface';
  @property({ type: Boolean, reflect: true }) lowered = false;
}
