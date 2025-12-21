import { html } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import { MenuItem } from '../base/menu-item.js';
import { M3Ripple } from './ripple.js';
import { M3FocusRing } from './focus-ring.js';

import { menuItemStyles } from './menu-item-styles.css.js';

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
