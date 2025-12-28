import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ListController } from '../base/list-controller.js';

import { listStyles } from './list-styles.css.js';

/**
 * @element md-list
 *
 * TODO: Use listController
 */
@customElement('md-list')
export class M3List extends LitElement {
  static override styles = [listStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'md-list': M3List;
  }
}
