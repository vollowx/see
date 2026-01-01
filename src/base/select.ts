import { LitElement, html, PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { FormAssociated } from './form-associated.js';
import { internals, InternalsAttached } from './internals-attached.js';
import { ListController } from './list-controller.js';
import { Option } from './option.js';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';

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

function filterOptions(
  options: string[] = [],
  filter: string,
  exclude: string[] = []
) {
  return options.filter((option) => {
    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}

function getActionFromKey(event: KeyboardEvent, menuOpen: boolean) {
  const { key, altKey, ctrlKey, metaKey } = event;
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];

  if (!menuOpen && openKeys.includes(key)) {
    return SelectActions.Open;
  }

  if (key === 'Home') {
    return SelectActions.First;
  }
  if (key === 'End') {
    return SelectActions.Last;
  }

  if (
    key === 'Backspace' ||
    key === 'Clear' ||
    (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
  ) {
    return SelectActions.Type;
  }

  if (menuOpen) {
    if (key === 'ArrowUp' && altKey) {
      return SelectActions.CloseSelect;
    } else if (key === 'ArrowDown' && !altKey) {
      return SelectActions.Next;
    } else if (key === 'ArrowUp') {
      return SelectActions.Previous;
    } else if (key === 'PageUp') {
      return SelectActions.PageUp;
    } else if (key === 'PageDown') {
      return SelectActions.PageDown;
    } else if (key === 'Escape') {
      return SelectActions.Close;
    } else if (key === 'Enter' || key === ' ') {
      return SelectActions.CloseSelect;
    }
  }
  return undefined;
}

function getIndexByLetter(options: string[], filter: string, startIndex = 0) {
  const orderedOptions = [
    ...options.slice(startIndex),
    ...options.slice(0, startIndex),
  ];
  const firstMatch = filterOptions(orderedOptions, filter)[0];
  const allSameLetter = (array: string[]) =>
    array.every((letter) => letter === array[0]);

  if (firstMatch) {
    return options.indexOf(firstMatch);
  } else if (allSameLetter(filter.split(''))) {
    const matches = filterOptions(orderedOptions, filter[0]);
    return options.indexOf(matches[0]);
  } else {
    return -1;
  }
}

function getUpdatedIndex(
  currentIndex: number,
  maxIndex: number,
  action: number
) {
  const pageSize = 10;

  switch (action) {
    case SelectActions.First:
      return 0;
    case SelectActions.Last:
      return maxIndex;
    case SelectActions.Previous:
      return Math.max(0, currentIndex - 1);
    case SelectActions.Next:
      return Math.min(maxIndex, currentIndex + 1);
    case SelectActions.PageUp:
      return Math.max(0, currentIndex - pageSize);
    case SelectActions.PageDown:
      return Math.min(maxIndex, currentIndex + pageSize);
    default:
      return currentIndex;
  }
}

const Base = FormAssociated(InternalsAttached(LitElement));

/**
 * @csspart field
 * @csspart menu
 * @csspart items
 *
 * @fires {Event} change - Fired when the selected value has changed.
 * @fires {Event} input - Fired when the selected value has changed.
 */
export class Select extends Base {
  @property({ reflect: true }) value = '';
  @state() protected displayValue = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) quick = false;

  @property({ reflect: true }) align: import('@floating-ui/dom').Placement =
    'bottom-start';
  @property({ type: String, reflect: true })
  alignStrategy: import('@floating-ui/dom').Strategy = 'absolute';
  @property({ type: Number, reflect: true }) offset = 0;

  @query('[part="field"]') protected $field!: HTMLElement;
  @query('[part="menu"]') protected $menu!: HTMLElement;

  protected _possibleItemTags: string[] = [];

  private searchString = '';
  private searchTimeout: number | null = null;

  protected readonly listController = new ListController<Option>(this, {
    isItem: (item: HTMLElement): item is Option =>
      this._possibleItemTags.includes(item.tagName.toLowerCase()) &&
      !item.hasAttribute('disabled'),
    getPossibleItems: () =>
      Array.from(this.children).filter(
        (child): child is Option =>
          this._possibleItemTags.includes(child.tagName.toLowerCase()) &&
          !child.hasAttribute('disabled')
      ),
    blurItem: (item: Option) => {
      item.focused = false;
    },
    focusItem: (item: Option) => {
      item.focused = true;
      if (this.$field && item.id) {
        this.$field.setAttribute('aria-activedescendant', item.id);
      }
      this.scrollItemIntoView(item);
    },
    isNavigableKey: (key: string) => false, // We handle keys manually
    wrapNavigation: () => false,
  });

  override render() {
    return html`
      <div
        part="field"
        @click=${this.toggle}
        @keydown=${this.#handleFieldKeydown}
        tabindex=${this.disabled ? '-1' : '0'}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded=${this.open}
        aria-controls="menu"
        aria-disabled=${this.disabled}
        aria-required=${this.required}
      >
        ${this.displayValue || this.placeholder}
        <slot name="end-icon"></slot>
      </div>
      <div part="menu" id="menu" role="listbox" tabindex="-1">
        <slot part="items"></slot>
      </div>
    `;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.#handleOptionClick);
    this.addEventListener('focusout', this.#handleFocusOut);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#handleOptionClick);
    this.removeEventListener('focusout', this.#handleFocusOut);
    this.clearAutoReposition?.();
  }

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('value')) {
      this.#updateDisplayValue();
      this.#updateSelection();
    }
    if (changed.has('open')) {
      if (this.open) {
        this.#startAutoReposition();
        // Focus current item when opening
        const index = this.listController.items.findIndex(
          (item) => (item.value || item.innerText) === this.value
        );
        if (index >= 0) {
          this.listController._focusItem(this.listController.items[index]);
        } else {
          this.listController.focusFirstItem();
        }
      } else {
        this.#stopAutoReposition();
        this.searchString = '';
      }
    }
  }

  toggle() {
    if (this.disabled) return;
    this.open = !this.open;
  }

  #handleFieldKeydown(event: KeyboardEvent) {
    if (this.disabled) return;

    const action = getActionFromKey(event, this.open);
    const items = this.listController.items;
    const currentIndex = this.listController.currentIndex;
    const maxIndex = items.length - 1;

    switch (action) {
      case SelectActions.Last:
      case SelectActions.First:
        this.open = true;
      // intentional fallthrough
      case SelectActions.Next:
      case SelectActions.Previous:
      case SelectActions.PageUp:
      case SelectActions.PageDown:
        event.preventDefault();
        const nextIndex = getUpdatedIndex(currentIndex, maxIndex, action!);
        this.#onOptionChange(nextIndex);
        return;
      case SelectActions.CloseSelect:
        event.preventDefault();
        this.#selectOption(currentIndex);
      // intentional fallthrough
      case SelectActions.Close:
        event.preventDefault();
        this.open = false;
        return;
      case SelectActions.Type:
        this.#onComboType(event.key);
        return;
      case SelectActions.Open:
        event.preventDefault();
        this.open = true;
        return;
    }
  }

  #onOptionChange(index: number) {
    const items = this.listController.items;
    if (index >= 0 && index < items.length) {
      this.listController._focusItem(items[index]);
    }
  }

  #selectOption(index: number) {
    const items = this.listController.items;
    if (index >= 0 && index < items.length) {
      const item = items[index];
      const newValue = item.value || item.innerText;
      if (this.value !== newValue) {
        this.value = newValue;
        this.dispatchEvent(new Event('change', { bubbles: true }));
        this.dispatchEvent(new Event('input', { bubbles: true }));
      }
      this.open = false;
    }
  }

  #onComboType(letter: string) {
    this.open = true;
    const searchString = this.#getSearchString(letter);
    const items = this.listController.items;
    const optionsText = items.map((item) => item.innerText);
    const searchIndex = getIndexByLetter(
      optionsText,
      searchString,
      this.listController.currentIndex + 1
    );

    if (searchIndex >= 0) {
      this.#onOptionChange(searchIndex);
    } else {
      if (this.searchTimeout) window.clearTimeout(this.searchTimeout);
      this.searchString = '';
    }
  }

  #getSearchString(char: string) {
    if (this.searchTimeout) {
      window.clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = window.setTimeout(() => {
      this.searchString = '';
    }, 500);
    this.searchString += char;
    return this.searchString;
  }

  #handleOptionClick(event: Event) {
    const target = event.target as HTMLElement;
    const item = target.closest(this._possibleItemTags.join(',')) as Option;
    if (item && this.listController.items.includes(item)) {
      const index = this.listController.items.indexOf(item);
      this.#selectOption(index);
    }
  }

  #handleFocusOut(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as Node;
    if (!this.contains(relatedTarget) && !this.$menu.contains(relatedTarget)) {
      this.open = false;
    }
  }

  #updateDisplayValue() {
    // We need to wait for items to be available.
    // Using a microtask or just checking if items exist.
    // Since this is called in updated(), items might be available if children are slotted.
    const items = this.listController.items;
    const selectedItem = items.find(
      (item) => (item.value || item.innerText) === this.value
    );

    if (selectedItem) {
      this.displayValue = selectedItem.innerText;
    } else if (!this.value) {
      this.displayValue = '';
    }
  }

  // TODO: Store previously selected item to avoid looping through all items
  #updateSelection() {
    const items = this.listController.items;
    items.forEach((item) => {
      const itemValue = item.value || item.innerText;
      item.selected = itemValue === this.value;
    });
  }

  private clearAutoReposition: Function | null = null;

  #startAutoReposition() {
    if (this.$field && this.$menu) {
      this.clearAutoReposition = autoUpdate(
        this.$field,
        this.$menu,
        this.#reposition.bind(this)
      );
      this.#reposition();
    }
  }

  #stopAutoReposition() {
    this.clearAutoReposition?.();
    this.clearAutoReposition = null;
  }

  #reposition() {
    if (!this.$field || !this.$menu) return;

    computePosition(this.$field, this.$menu, {
      placement: this.align,
      strategy: this.alignStrategy,
      middleware: [offset(this.offset), flip(), shift({ crossAxis: true })],
    }).then(({ x, y, placement }) => {
      Object.assign(this.$menu.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: this.alignStrategy,
      });
      this.align = placement;
    });
  }

  // FIXME: Material You menu items have gap of 2px between them
  scrollItemIntoView(item: HTMLElement) {
    if (!this.$menu) return;

    // Basic scroll into view logic
    const menuRect = this.$menu.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    if (itemRect.bottom > menuRect.bottom) {
      this.$menu.scrollTop += itemRect.bottom - menuRect.bottom;
    } else if (itemRect.top < menuRect.top) {
      this.$menu.scrollTop -= menuRect.top - itemRect.top;
    }
  }

  // Observer for child list changes to update display value
  private _observer = new MutationObserver(() => {
    this.#updateDisplayValue();
    this.#updateSelection();
  });

  override firstUpdated() {
    this._observer.observe(this, { childList: true, subtree: true });
    this.#updateDisplayValue();
  }
}
