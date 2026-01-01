import { LitElement, html, PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { FormAssociated } from './form-associated.js';
import { internals, InternalsAttached } from './internals-attached.js';
import { ListController } from './list-controller.js';
import { Option } from './option.js';
import {
  MenuActions,
  getActionFromKey,
  getIndexByLetter,
  getUpdatedIndex,
  scrollItemIntoView,
} from './menu-utils.js';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';

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

  _scrollPadding = 0;
  _windowPadding = 16;

  @query('[part="field"]') protected $field!: HTMLElement;
  @query('[part="menu"]') protected $menu!: HTMLElement;

  protected _possibleItemTags: string[] = [];

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
      scrollItemIntoView(this.$menu, item, this._scrollPadding);
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
        this.listController.clearSearch();
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
      case MenuActions.Last:
      case MenuActions.First:
        this.open = true;
      // intentional fallthrough
      case MenuActions.Next:
      case MenuActions.Previous:
      case MenuActions.PageUp:
      case MenuActions.PageDown:
        event.preventDefault();
        const nextIndex = getUpdatedIndex(currentIndex, maxIndex, action!);
        this.#onOptionChange(nextIndex);
        return;
      case MenuActions.CloseSelect:
        event.preventDefault();
        this.#selectOption(currentIndex);
      // intentional fallthrough
      case MenuActions.Close:
        event.preventDefault();
        this.open = false;
        return;
      case MenuActions.Type:
        this.open = true;
        this.listController.handleType(event.key);
        return;
      case MenuActions.Open:
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
      middleware: [
        offset(this.offset),
        flip({ padding: this._windowPadding }),
        shift({ padding: this._windowPadding, crossAxis: true }),
      ],
    }).then(({ x, y, placement }) => {
      Object.assign(this.$menu.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: this.alignStrategy,
      });
      this.align = placement;
    });
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
