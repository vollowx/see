import { customElement } from 'lit/decorators.js';

import { Menu } from '../../base/experimental/menu.js';
import { menuStyles } from './menu-styles.css.js';

/**
 * @tag md-menu
 *
 * @csspart items
 *
 * @slot - menu items
 */
@customElement('md-composable-menu')
export class M3ComposableMenu extends Menu {
  static override styles = [menuStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'md-composable-menu': M3ComposableMenu;
  }
}
