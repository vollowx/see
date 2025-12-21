import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Item } from '../base/item.js';

import { itemStyles } from './item-styles.css.js';

@customElement('md-item')
export class M3Item extends Item {
  static override styles = [itemStyles];

  override render() {
    return html`
      <slot name="container"></slot>
      <slot name="start"></slot>
      <div class="text">
        <slot name="overline"></slot>
        <slot></slot>
        <slot name="headline"></slot>
        <slot name="supporting-text"></slot>
      </div>
      <slot name="trailing-supporting-text"></slot>
      <slot name="end"></slot>
    `;
  }
}
