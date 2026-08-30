import { property, customElement } from 'lit/decorators.js';

import { Menu } from '../../base/experimental/menu.js';
import { menuStyles } from './menu-styles.css.js';

/**
 * @tag md-menu
 *
 * @csspart menu-surface
 * @csspart list
 *
 * @slot - menu items
 */
@customElement('md-aria-menu')
export class M3AriaMenu extends Menu {
  @property({ reflect: true }) color: 'standard' | 'vibrant' = 'standard';

  static override styles = [menuStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'md-aria-menu': M3AriaMenu;
  }
}
