import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import './list.js';
import { Menu } from '../base/menu.js';

@customElement('md-menu')
export class M3Menu extends Menu {
  static override styles = [
    ...Menu.styles,
    css`
      [part="menu-surface"] {
        background: var(--md-sys-color-surface-container);
        color: var(--md-sys-color-on-surface);
        padding: 8px 0;
        border-radius: 4px;
        min-width: 112px;
        box-shadow: var(--md-sys-elevation-shadow-2);
        transition: opacity 200ms cubic-bezier(0.2, 0, 0, 1), visibility 200ms;
      }
    `,
  ];

  override render() {
    return html`
      <div part="menu-surface" tabindex="-1">
        <md-list part="list"><slot></slot></md-list>
      </div>
    `;
  }
}
