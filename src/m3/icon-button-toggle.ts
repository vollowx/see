import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Switch } from '../base/switch.js';
import { internals } from '../base/mixins/internals-attached.js';

import './focus-ring.js';
import './ripple.js';

import { iconButtonStyles } from './icon-button-styles.css.js';
import { iconButtonToggleStyles } from './icon-button-toggle-styles.css.js';
import { targetStyles } from './target-styles.css.js';

/**
 * @tag md-icon-button-toggle
 *
 * @csspart icon
 *
 * @slot - icon
 * @slot checked - icon when checked
 */
@customElement('md-icon-button-toggle')
export class M3IconButtonToggle extends Switch {
  constructor() {
    super();
    this[internals].role = 'button';
  }
  static override styles = [
    ...super.styles,
    targetStyles,
    iconButtonStyles,
    iconButtonToggleStyles,
  ];
  override render() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple enterbehavior="none"></md-ripple>
      <span part="target"></span>
      <slot part="icon icon-unchecked"></slot>
      <slot part="icon icon-checked" name="checked"></slot>
    `;
  }
  @property({ reflect: true }) variant:
    | 'standard'
    | 'filled'
    | 'tonal'
    | 'outlined' = 'standard';
}

declare global {
  interface HTMLElementTagNameMap {
    'md-icon-button-toggle': M3IconButtonToggle;
  }
}
