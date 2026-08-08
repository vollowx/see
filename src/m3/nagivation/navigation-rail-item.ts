import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { navigationRailItemStyles } from './navigation-rail-item-styles.css.js';

import '../ripple/ripple.js';
import { type M3Ripple } from '../ripple/ripple.js';

@customElement('md-nav-rail-item')
export class M3NavigationRailItem extends LitElement {
  @property({ reflect: true }) label: string;
  @query('md-ripple') $ripple: M3Ripple;

  static override styles = [navigationRailItemStyles];
  override render() {
    return html`
      <div class="pill">
        <md-ripple></md-ripple>
        <slot></slot>
        <slot name="selected"></slot>
        <span class="label-inside">${this.label}</span>
      </div>
      <span class="label-outside">${this.label}</span>
    `;
  }

  override firstUpdated() {
    this.$ripple.attach(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-nav-rail-item': M3NavigationRailItem;
  }
}
