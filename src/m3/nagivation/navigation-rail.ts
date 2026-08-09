import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { navigationRailStyles } from './navigation-rail-styles.css.js';
import { type M3NavigationRailItem } from './navigation-rail-item.js';

@customElement('md-nav-rail')
export class M3NavigationRail extends LitElement {
  get $items(): Array<M3NavigationRailItem> {
    return [...this.querySelectorAll('md-nav-rail-item')];
  }

  static override styles = [navigationRailStyles];
  override render() {
    return html`
      <div class="actions">
        <slot name="menu"></slot>
        <slot name="fab"></slot>
      </div>
      <div class="items">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-nav-rail': M3NavigationRail;
  }
}
