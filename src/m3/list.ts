import { css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { List } from '../base/list.js';

import { listStyles } from './list-styles.css.js';

@customElement('md-list')
export class M3List extends List {
  static override styles = [listStyles];

  override get items(): HTMLElement[] {
    const slot = this.slotElement;
    if (!slot) return [];
    return (slot.assignedElements({ flatten: true }) as HTMLElement[]).filter(
      (el) =>
        !el.hasAttribute('disabled') &&
        (el.tagName === 'MD-OPTION' || el.tagName === 'MD-MENU-ITEM')
    );
  }
}
