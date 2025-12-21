import { css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { List } from '../base/list.js';

import { listStyles } from './list-styles.css.js';

@customElement('md-list')
export class M3List extends List {
  static override styles = [listStyles];
}
