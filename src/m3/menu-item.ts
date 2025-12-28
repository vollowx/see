import { html } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import { MenuItem } from '../base/menu-item.js';
import { M3Ripple } from './ripple.js';
import { M3FocusRing } from './focus-ring.js';

import { menuItemStyles } from './menu-item-styles.css.js';

/**
 * @element md-menu-item
 *
 * @slot default - contents in md-item
 */
@customElement('md-menu-item')
export class M3MenuItem extends MenuItem {
  constructor() {
    super();
    this.updateComplete.then(() => {
      this.ripple.$control = this;
      this.focusRing.$control = this;
    });
  }

  static override styles = [...MenuItem.styles, menuItemStyles];

  protected override updated(changed: Map<string, any>) {
    super.updated(changed);
    if (changed.has('focused')) {
      if (this.focused) {
        this.focusRing.visualFocus();
      } else {
        this.focusRing.visualBlur();
      }
    }
  }

  @query('md-ripple') ripple!: M3Ripple;
  @query('md-focus-ring') focusRing!: M3FocusRing;

  override render() {
    return html`
      <md-item>
        <div slot="container">
          <md-focus-ring inward></md-focus-ring>
          <md-ripple></md-ripple>
        </div>
        <slot></slot>
      </md-item>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-menu-item': M3MenuItem;
  }
}
