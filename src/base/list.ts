import { LitElement, html, css } from 'lit';
import { property, query } from 'lit/decorators.js';
import { Option } from './option.js';
import { MenuItem } from './menu-item.js';

export class List extends LitElement {
  @property({ type: Number }) activeIndex = -1;
  @property({ type: Boolean }) navigationEnabled = true;

  @query('slot') slotElement!: HTMLSlotElement;

  get items(): HTMLElement[] {
    const slot = this.slotElement;
    if (!slot) return [];
    return (slot.assignedElements({ flatten: true }) as HTMLElement[]).filter(
      (el) =>
        !el.hasAttribute('disabled') &&
        (el instanceof MenuItem ||
          el.getAttribute('role') === 'option' ||
          el.getAttribute('role') === 'menuitem')
    );
  }

  override render() {
    return html`<slot></slot>`;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (!this.navigationEnabled) return;

    const items = this.items;
    if (items.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectPrev();
        break;
      case 'Home':
        event.preventDefault();
        this.selectFirst();
        break;
      case 'End':
        event.preventDefault();
        this.selectLast();
        break;
    }
  }

  selectNext() {
    const items = this.items;
    if (items.length === 0) return;

    const nextIndex = this.activeIndex + 1;
    if (nextIndex < items.length) {
      this.activateItem(nextIndex);
    }
  }

  selectPrev() {
    const items = this.items;
    if (items.length === 0) return;

    const prevIndex = this.activeIndex - 1;
    if (prevIndex >= 0) {
      this.activateItem(prevIndex);
    }
  }

  selectFirst() {
    if (this.items.length > 0) this.activateItem(0);
  }

  selectLast() {
    const items = this.items;
    if (items.length > 0) this.activateItem(items.length - 1);
  }

  activateItem(index: number) {
    const items = this.items;
    if (index < 0 || index >= items.length) return;

    this.activeIndex = index;
    const item = items[index];

    // Handle option activation
    if (
      item instanceof Option ||
      item.getAttribute('role') === 'option' ||
      'focused' in item
    ) {
      (items as Option[]).forEach((option) => {
        if ('focused' in option) option.focused = false;
      });
      if ('focused' in item) (item as Option).focused = true;
    }
    // Handle menu items with active attribute (aria-activedescendant pattern)
    else if (
      item instanceof MenuItem ||
      item.getAttribute('role') === 'menuitem'
    ) {
      items.forEach((el) => {
        if (el instanceof MenuItem || el.getAttribute('role') === 'menuitem') {
          if ('active' in el) (el as MenuItem).active = false;
        }
      });
      if ('active' in item) (item as MenuItem).active = true;
    }

    // Dispatch event for parent to handle (e.g. setting aria-activedescendant or focusing)
    this.dispatchEvent(
      new CustomEvent('list-item-activate', {
        detail: { item, index },
        bubbles: true,
        composed: true,
      })
    );

    item.scrollIntoView({ block: 'nearest' });
  }
}
