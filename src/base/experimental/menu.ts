import { LitElement, html, isServer } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';

import { focusVisible, setFocusVisible } from '../../core/focus.js';
import { internals, InternalsAttached } from '../mixins/internals-attached.js';
import { ListController } from '../controllers/list-controller.js';

import type { MenuItem } from '../menu-item.js';

export interface MenuActionDetail {
  item: MenuItem;
  index: number;
}
export type MenuActionEvent = CustomEvent<MenuActionDetail>;

/**
 * @csspart items
 *
 * @fires {MenuActionEvent} action - Fires when an item is activated.
 * @fires {Event} request-popup-hide - Fires when menu should be hidden.
 *
 * TODO: handle slotchange
 */
export class Menu extends InternalsAttached(LitElement) {
  @property({ type: Boolean, attribute: 'keep-open-action' })
  keepOpenAction = false;
  /**
   * When true, removes the default focus management and `aria-activedescendant`
   * on the host.
   */
  @property({ type: Boolean, reflect: true })
  bare = false;

  @queryAssignedElements({ flatten: true }) slotItems!: Array<
    MenuItem | HTMLElement
  >;
  get $items() {
    return this.listController.items || [];
  }

  override render() {
    return html`<slot part="items"></slot>`;
  }

  constructor() {
    super();
    this[internals].role = 'menu';
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    if (!isServer) {
      this.addEventListener('keydown', this.#handleKeyDown.bind(this));
      this.addEventListener('focusin', this.#handleFocusIn.bind(this));
      this.addEventListener('mouseover', this.#handleMouseOver.bind(this));
      this.addEventListener('click', this.#handleClick.bind(this));
    }
  }

  private readonly listController = new ListController<MenuItem>(this, {
    isItem: (item: HTMLElement): item is MenuItem =>
      item.getAttribute('seele-base') === 'option' &&
      !item.hasAttribute('disabled') &&
      !item.hidden,
    getPossibleItems: () => this.slotItems,
    blurItem: (item: MenuItem) => {
      item.focused = false;
    },
    focusItem: (item: MenuItem) => {
      item.focused = true;
      if (!this.bare) this[internals].ariaActiveDescendantElement = item;
      if (focusVisible) item.scrollIntoView({ block: 'nearest' });
    },
    wrapNavigation: () => false,
  });

  #handleFocusIn() {
    if (this.bare) return;
    // TODO: support focusing first selected
    this.listController.focusFirstItem();
  }

  #handleKeyDown(event: KeyboardEvent) {
    if (event.defaultPrevented) return;

    const action = getActionFromKey(event, true);
    const items = this.$items;
    const currentIndex = this.listController.currentIndex;
    const maxIndex = items.length - 1;

    switch (action) {
      case MenuAction.First:
        event.preventDefault();
        this.listController.focusFirstItem();
        return;
      case MenuAction.Last:
        event.preventDefault();
        this.listController.focusLastItem();
        return;
      case MenuAction.Next:
        event.preventDefault();
        this.listController.focusNextItem();
        return;
      case MenuAction.Previous:
        event.preventDefault();
        this.listController.focusPreviousItem();
        return;
      case MenuAction.PageUp:
      case MenuAction.PageDown: {
        event.preventDefault();
        const { pageSize } = getVisibleItems(this, items);
        const direction = action === MenuAction.PageDown ? 1 : -1;
        const nextIndex = Math.max(
          0,
          Math.min(maxIndex, currentIndex + pageSize * direction)
        );
        this.listController._focusItem(items[nextIndex]);
        return;
      }
      case MenuAction.CloseSelect:
        event.preventDefault();
        if (currentIndex >= 0) {
          items[currentIndex].focused = false;
          this.#dispatchAction({
            item: items[currentIndex],
            index: currentIndex,
          });
          if (this.keepOpenAction) return;
          this.#dispatchHide();
        }
        return;
      case MenuAction.Close:
        event.preventDefault();
        this.#dispatchHide();
        return;
      case MenuAction.Type:
        this.listController.handleType(event.key);
        return;
    }
  }

  #handleMouseOver(event: MouseEvent) {
    setFocusVisible(false);
    const item = (event.target as HTMLElement).closest(
      '[seele-base="option"]'
    ) as MenuItem;
    if (
      item &&
      this.listController.items.includes(item) &&
      this.currentIndex !== this.listController.items.indexOf(item)
    ) {
      this.listController._focusItem(item);
    }
  }

  #handleClick(event: MouseEvent) {
    const item = (event.target as HTMLElement).closest(
      '[seele-base="option"]'
    ) as MenuItem;
    if (!item || !this.listController.items.includes(item)) return;

    const index = this.listController.items.indexOf(item);
    this.listController.items[index].focused = false;

    this.#dispatchAction({
      item: item,
      index: index,
    });
    if (!this.keepOpenAction) this.#dispatchHide();
  }

  #dispatchAction(detail: MenuActionDetail) {
    this.dispatchEvent(
      new CustomEvent('action', {
        detail: detail,
        bubbles: true,
        composed: true,
      })
    );
  }
  #dispatchHide() {
    this.dispatchEvent(
      new Event('request-popup-hide', { bubbles: true, composed: true })
    );
  }

  get currentIndex() {
    return this.listController?.currentIndex;
  }

  focusFirstItem() {
    this.listController.focusFirstItem();
  }
  focusLastItem() {
    this.listController.focusLastItem();
  }
  focusItem(item: MenuItem) {
    this.listController._focusItem(item);
  }
}

// Reference: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
export enum MenuAction {
  Close = 'close',
  CloseSelect = 'closeSelect',
  First = 'first',
  Last = 'last',
  Next = 'next',
  Open = 'open',
  PageDown = 'pageDown',
  PageUp = 'pageUp',
  Previous = 'previous',
  Select = 'select',
  Type = 'type',
}

export function filterOptions(
  options: string[] = [],
  filter: string,
  exclude: string[] = []
) {
  const lowerFilter = filter.toLowerCase();
  return options.filter((option) => {
    return (
      option.toLowerCase().startsWith(lowerFilter) && !exclude.includes(option)
    );
  });
}

export function getActionFromKey(
  event: KeyboardEvent,
  menuOpen: boolean
): MenuAction | undefined {
  const { key, altKey, ctrlKey, metaKey } = event;
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];

  if (!menuOpen && openKeys.includes(key)) {
    return MenuAction.Open;
  }

  if (key === 'Home') return MenuAction.First;
  if (key === 'End') return MenuAction.Last;

  if (menuOpen) {
    if (key === 'ArrowUp' && altKey) return MenuAction.CloseSelect;
    if (key === 'ArrowDown' && !altKey) return MenuAction.Next;
    if (key === 'ArrowUp' && !altKey) return MenuAction.Previous;
    if (key === 'PageUp') return MenuAction.PageUp;
    if (key === 'PageDown') return MenuAction.PageDown;
    if (key === 'Escape') return MenuAction.Close;
    if (key === 'Enter' || key === ' ') return MenuAction.CloseSelect;
  }

  if (
    key === 'Backspace' ||
    key === 'Clear' ||
    (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
  ) {
    return MenuAction.Type;
  }

  return undefined;
}

export function getVisibleItems(container: HTMLElement, items: HTMLElement[]) {
  if (!items.length) return { first: 0, last: 0, pageSize: 1 };

  const containerRect = container.getBoundingClientRect();
  const clientTop = containerRect.top + container.clientTop;
  const clientBottom = clientTop + container.clientHeight;

  let first = -1;
  let last = -1;

  for (let i = 0; i < items.length; i++) {
    const itemRect = items[i].getBoundingClientRect();

    // Item is visible if its top is above the container's bottom AND its bottom is below the container's top
    if (itemRect.top < clientBottom && itemRect.bottom > clientTop) {
      if (first === -1) first = i;
      last = i;
    }
  }

  first = Math.max(0, first);
  last = Math.max(0, last);

  // pageSize is the span of visible items
  return { first, last, pageSize: Math.max(1, last - first) };
}
