import {
  LitElement,
  html,
  ReactiveController,
  ReactiveControllerHost,
} from 'lit';
import { property, query } from 'lit/decorators.js';
import { Option } from './option.js';
import { MenuItem } from './menu-item.js';

// Action types for keyboard handling
const SelectActions = {
  Close: 0,
  CloseSelect: 1,
  First: 2,
  Last: 3,
  Next: 4,
  Open: 5,
  PageDown: 6,
  PageUp: 7,
  Previous: 8,
  Select: 9,
  Type: 10,
};

export interface ListControllerConfig<Item extends MenuItem> {
  isItem: (item: HTMLElement) => item is Item;
  getPossibleItems: () => HTMLElement[];
  blurItem: (item: Item) => void;
  focusItem: (item: Item) => void;
  isNavigableKey: (key: string) => boolean;
  isActivatable?: (item: Item) => boolean;
  wrapNavigation?: () => boolean;
}

export class ListController<
  Item extends MenuItem,
> implements ReactiveController {
  host: ReactiveControllerHost;

  isItem: (item: HTMLElement) => item is Item;
  private readonly getPossibleItems: () => HTMLElement[];
  private readonly blurItem: (item: Item) => void;
  private readonly focusItem: (item: Item) => void;
  private readonly isNavigableKey: (key: string) => boolean;
  private readonly wrapNavigation: () => boolean;

  constructor(
    host: ReactiveControllerHost,
    config: ListControllerConfig<Item>
  ) {
    const {
      isItem,
      getPossibleItems,
      blurItem,
      focusItem,
      isNavigableKey,
      wrapNavigation: loopFocus,
    } = config;

    (this.host = host).addController(this);

    this.isItem = isItem;
    this.getPossibleItems = getPossibleItems;
    this.blurItem = blurItem;
    this.focusItem = focusItem;
    this.isNavigableKey = isNavigableKey;
    this.wrapNavigation = loopFocus;
  }
  hostConnected(): void {}
  hostDisconnected(): void {}

  get items(): Item[] {
    return this.getPossibleItems().filter(this.isItem);
  }
  get currentIndex(): number {
    const items = this.getPossibleItems().filter(this.isItem);
    return items.findIndex((item) => item.focused) ?? -1;
  }
  _focusedIndex: number = -1;

  // TODO: Handle character typing for type-to-select
  // TODO: Handle PageUp and PageDown
  handleKeyDown(event: KeyboardEvent) {
    const { key } = event;
    console.log('ListController handleKeyDown', event.key);
    if (!this.isNavigableKey(key)) return;
    console.log('Navigable key detected:', key);

    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextItem();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousItem();
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirstItem();
        break;
      case 'End':
        event.preventDefault();
        this.focusLastItem();
        break;
    }
  }

  _focusItem(item: Item) {
    if (this._focusedIndex !== -1)
      this._blurItem(this.items[this._focusedIndex]);
    this.focusItem(item);
    this._focusedIndex = this.items.indexOf(item);
  }

  _blurItem(item: Item) {
    this.blurItem(item);
    this._focusedIndex = -1;
  }

  focusFirstItem() {
    this._focusItem(this.items[0]);
  }

  focusLastItem() {
    this._focusItem(this.items[this.items.length - 1]);
  }

  focusNextItem() {
    const count = this.items.length;
    if (count === 0) return;
    let nextIndex = this._focusedIndex + 1;
    if (nextIndex >= count) {
      nextIndex = this.wrapNavigation() ? count - 1 : 0;
    }
    this._focusItem(this.items[nextIndex]);
  }

  focusPreviousItem() {
    const count = this.items.length;
    if (count === 0) return;
    let prevIndex = this._focusedIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.wrapNavigation() ? 0 : count - 1;
    }
    this._focusItem(this.items[prevIndex]);
  }

  handleSlotChange() {
    this._focusedIndex = this.currentIndex;
  }
}
