import { customElement } from 'lit/decorators.js';

import { Menu } from '../../base/menu.js';
import { menuStyles } from './menu-styles.css.js';

/**
 * @tag md-menu
 *
 * @csspart items
 *
 * @slot - menu items
 */
@customElement('md-menu')
export class M3Menu extends Menu {
  static override styles = [menuStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'md-menu': M3Menu;
  }
}
