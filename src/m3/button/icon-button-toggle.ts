import '../focus-ring/focus-ring.js';
import '../ripple/ripple.js';

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { M3IconButton } from './icon-button.js';
import { ButtonToggleMixin } from '../../base/mixins/button-toggle-mixin.js';
import { sharedButtonToggleStyles } from './shared-button-toggle-styles.css.js';

/**
 * @tag md-icon-button-toggle
 *
 * @csspart icon
 *
 * @slot - icon
 * @slot checked - icon when checked
 */
@customElement('md-icon-button-toggle')
export class M3IconButtonToggle extends ButtonToggleMixin(M3IconButton) {
  static override styles = [...super.styles, sharedButtonToggleStyles];
  override render() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple enterbehavior="always"></md-ripple>
      <span part="target"></span>
      <slot part="icon unchecked"></slot>
      <slot part="icon checked" name="checked"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-icon-button-toggle': M3IconButtonToggle;
  }
}
