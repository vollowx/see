import '../focus-ring/focus-ring.js';
import '../ripple/ripple.js';

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { M3Button } from './common-button.js';
import { ButtonToggleMixin } from '../../base/mixins/button-toggle-mixin.js';
import { sharedButtonToggleStyles } from './shared-button-toggle-styles.css.js';

/**
 * @tag md-button-toggle
 *
 * @csspart label
 * @csspart label checked
 * @csspart icon
 * @csspart icon checked
 *
 * @slot - label
 * @slot icon - leading icon
 */
@customElement('md-button-toggle')
export class M3ButtonToggle extends ButtonToggleMixin(M3Button) {
  static override styles = [...super.styles, sharedButtonToggleStyles];
  override render() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon unchecked" name="icon" aria-hidden="true"></slot>
      <slot part="icon checked" name="icon-checked" aria-hidden="true"></slot>
      <slot part="label unchecked"></slot>
      <slot part="label checked" name="checked"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-button-toggle': M3ButtonToggle;
  }
}
