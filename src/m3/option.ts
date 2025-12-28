import { customElement } from 'lit/decorators.js';

import { OptionMixin } from '../base/option.js';
import { M3MenuItem } from './menu-item.js';

import { optionStyles } from './option-styles.css.js';

/**
 * @element md-option
 *
 * @slot default - contents in md-menu-item
 */
@customElement('md-option')
export class M3Option extends OptionMixin(M3MenuItem) {
  static override styles = [...M3MenuItem.styles, optionStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'md-option': M3Option;
  }
}
