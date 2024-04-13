import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Switch } from '../base/switch.js';
import { internals } from '../base/internals-attached.js';

import './focus-ring.js';
import './ripple.js';

import { iconButtonStyles } from './icon-button-styles.js';
import { iconButtonToggleStyles } from './icon-button-toggle-styles.js';
import { targetStyles } from './target-styles.js';

/**
 * @element md-icon-button-toggle
 *
 * @csspart icon
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
