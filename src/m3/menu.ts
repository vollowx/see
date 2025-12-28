import { customElement } from 'lit/decorators.js';

import { Menu } from '../base/menu.js';
import { menuStyles } from './menu-styles.css.js';

/**
 * @element md-menu
 *
 * @csspart menu-surface
 * @csspart list
 *
 * @slot - menu items
 */
@customElement('md-menu')
export class M3Menu extends Menu {
  static override styles = [menuStyles];

  protected override _possibleItemTags = [
    'md-menu-item',
    'md-menu-item-checkbox',
    'md-menu-item-radio',
  ];
  override animateOpeningDuration: number = 50;
  override animateClosingDuration: number = 50;
}

declare global {
  interface HTMLElementTagNameMap {
    'md-menu': M3Menu;
  }
}
