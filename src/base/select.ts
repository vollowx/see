import { html, css } from 'lit';
import { property, query } from 'lit/decorators.js';
import { Menu } from './menu.js';

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

type Constructor<T = {}> = new (...args: any[]) => T;

export const SelectMixin = <T extends Constructor<Menu>>(superClass: T) => {
  class SelectElement extends superClass {
    static styles = [
      ...(superClass as any).styles,
    ];

    @property() value: string = '';

    @query('.dropdown-trigger') trigger: HTMLElement | undefined;

    override get $control() {
      return this.trigger || null;
    }

    protected searchString = '';
    protected searchTimeout: number | null = null;

    private _label: string = '';
    get label(): string {
      if (this.value) {
        const options = this.getOptions();
        for (const option of options) {
          if ((option as any).value === this.value) {
            return (option as any).textContent?.trim() || '';
          }
        }
      }
      return this._label;
    }
    set label(value: string) {
      this._label = value;
    }

    protected initializeOptions(initial: boolean, value: string): string {
      const options = this.getOptions();
      let selectedValue = value;
      let found = false;

      // If no value provided and we have options, select the first one
      if (!value && options.length > 0 && initial) {
        const first = options[0] as any;
        if (!first.disabled) {
          selectedValue = first.value;
        }
      }

      options.forEach((option, index) => {
        const optValue = (option as any).value;
        const isSelected = optValue === selectedValue;

        (option as any).selected = isSelected;
        option.setAttribute('aria-selected', isSelected ? 'true' : 'false');

        if (isSelected) {
          this.activeIndex = index;
          found = true;
        }
      });

      return selectedValue;
    }

    override connectedCallback() {
      super.connectedCallback();
      this.setAttribute('role', 'combobox');
      this.addEventListener('option-selected', this.#handleOptionSelected);
      document.addEventListener('click', this.#handleDocumentClick);
    }

    override disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('option-selected', this.#handleOptionSelected);
      this.trigger?.removeEventListener('keydown', this.#boundKeyDown);
      document.removeEventListener('click', this.#handleDocumentClick);
    }

    override firstUpdated() {
      this.trigger?.setAttribute('tabindex', '0');
      this.trigger?.addEventListener('keydown', this.#boundKeyDown);
      // Defer initialization to avoid update loop
      setTimeout(() => {
        this.value = this.initializeOptions(true, this.value);
      }, 0);
    }

    protected override updated(changed: Map<string, any>) {
      super.updated(changed);
      if (changed.has('open')) {
        const oldOpen = changed.get('open');
        if (oldOpen === undefined && !this.open) {
          this.trigger?.setAttribute('aria-expanded', 'false');
          this.trigger?.setAttribute('aria-activedescendant', '');
          return;
        }
        this.#updateMenuState();
      }
    }

    #updateMenuState() {
      this.trigger?.setAttribute('aria-expanded', this.open ? 'true' : 'false');

      if (this.open) {
        const options = this.getOptions();
        if (options.length > 0) {
          const activeOption = options[this.activeIndex] as any;
          this.trigger?.setAttribute(
            'aria-activedescendant',
            activeOption.id || `dropdown-option-${this.activeIndex}`
          );
        }
        setTimeout(() => this.trigger?.focus(), 0);
      } else {
        this.trigger?.setAttribute('aria-activedescendant', '');
        setTimeout(() => this.trigger?.focus(), 0);
      }
    }

    #getActionFromKey(
      event: KeyboardEvent,
      menuOpen: boolean
    ): number | undefined {
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

    #getUpdatedIndex(
      currentIndex: number,
      maxIndex: number,
      action: number
    ): number {
      const pageSize = 10;
      const options = this.getOptions();

      const findNextEnabledIndex = (
        startIndex: number,
        direction: number
      ): number => {
        let index = startIndex;
        while (index >= 0 && index <= maxIndex) {
          if (!(options[index] as any).disabled) {
            return index;
          }
          index += direction;
        }
        return startIndex;
      };

      let newIndex = currentIndex;
      switch (action) {
        case SelectActions.First:
          newIndex = findNextEnabledIndex(0, 1);
          break;
        case SelectActions.Last:
          newIndex = findNextEnabledIndex(maxIndex, -1);
          break;
        case SelectActions.Previous:
          newIndex = findNextEnabledIndex(Math.max(0, currentIndex - 1), -1);
          break;
        case SelectActions.Next:
          newIndex = findNextEnabledIndex(
            Math.min(maxIndex, currentIndex + 1),
            1
          );
          break;
        case SelectActions.PageUp:
          newIndex = findNextEnabledIndex(
            Math.max(0, currentIndex - pageSize),
            -1
          );
          break;
        case SelectActions.PageDown:
          newIndex = findNextEnabledIndex(
            Math.min(maxIndex, currentIndex + pageSize),
            1
          );
          break;
        default:
          newIndex = currentIndex;
      }
      return newIndex;
    }

    #getSearchString(char: string): string {
      if (typeof this.searchTimeout === 'number') {
        window.clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = window.setTimeout(() => {
        this.searchString = '';
      }, 500);

      this.searchString += char;
      return this.searchString;
    }

    #getIndexByLetter(searchString: string, startIndex: number = 0): number {
      const options = this.getOptions();
      const optionsArray = Array.from(options).map((o: any) => ({
        text: o.textContent?.trim() || '',
        disabled: (o as any).disabled,
      }));

      const orderedOptions = [
        ...optionsArray.slice(startIndex),
        ...optionsArray.slice(0, startIndex),
      ];

      const matches = orderedOptions.filter((option) => {
        return (
          !option.disabled &&
          option.text.toLowerCase().indexOf(searchString.toLowerCase()) === 0
        );
      });

      if (matches.length > 0) {
        const firstMatch = matches[0];
        return optionsArray.findIndex(
          (o) =>
            o.text === firstMatch.text && o.disabled === firstMatch.disabled
        );
      }

      const allSameLetter = (array: string[]) =>
        array.every((letter) => letter === array[0]);
      if (allSameLetter(searchString.split(''))) {
        const firstLetterMatches = orderedOptions.filter((option) => {
          return (
            !option.disabled &&
            option.text.toLowerCase().indexOf(searchString[0].toLowerCase()) ===
              0
          );
        });
        if (firstLetterMatches.length > 0) {
          const firstMatch = firstLetterMatches[0];
          return optionsArray.findIndex(
            (o) =>
              o.text === firstMatch.text && o.disabled === firstMatch.disabled
          );
        }
      }

      return -1;
    }

    #handleDocumentClick = (event: Event) => {
      // Close if click is outside this element (but not if click is inside)
      if (this.open && !this.contains(event.target as Node)) {
        this.open = false;
      }
    };

    #boundKeyDown = this.#handleKeyDown.bind(this);
    #handleOptionSelected = this.#onOptionSelected.bind(this);

    #handleKeyDown(event: KeyboardEvent) {
      const options = this.getOptions();
      const max = options.length - 1;
      const action = this.#getActionFromKey(event, this.open);

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
          this.#onOptionChange(
            this.#getUpdatedIndex(this.activeIndex, max, action!)
          );
          break;
        case SelectActions.CloseSelect:
          event.preventDefault();
          this.#selectOption(this.activeIndex);
        // intentional fallthrough
        case SelectActions.Close:
          event.preventDefault();
          this.open = false;
          break;
        case SelectActions.Type:
          this.#onComboType(event.key);
          break;
        case SelectActions.Open:
          event.preventDefault();
          this.open = true;
          break;
      }
    }

    #handleClick() {
      this.open = !this.open;
      this.trigger?.focus();
    }

    #onComboType(letter: string) {
      this.open = true;
      const searchString = this.#getSearchString(letter);
      const searchIndex = this.#getIndexByLetter(
        searchString,
        this.activeIndex + 1
      );

      if (searchIndex >= 0) {
        this.#onOptionChange(searchIndex);
      } else {
        if (typeof this.searchTimeout === 'number') {
          window.clearTimeout(this.searchTimeout);
        }
        this.searchString = '';
      }
    }

    #onOptionChange(index: number) {
      this.onOptionChange(index);
      const options = this.getOptions();

      // Update trigger aria-activedescendant for select
      if (options[index]) {
        this.trigger?.setAttribute(
          'aria-activedescendant',
          (options[index] as any).id || `dropdown-option-${index}`
        );
      }
    }

    #onOptionSelected(event: Event) {
      const customEvent = event as CustomEvent;
      const value = customEvent.detail?.value;
      const options = this.getOptions();

      options.forEach((option, index) => {
        if ((option as any).value === value && !(option as any).disabled) {
          this.#selectOption(index);
        }
      });

      this.open = false;
    }

    #selectOption(index: number) {
      const options = this.getOptions();

      // Don't select disabled options
      if ((options[index] as any).disabled) {
        return;
      }

      options.forEach((option) => {
        (option as any).selected = false;
        option.setAttribute('aria-selected', 'false');
      });

      if (options[index]) {
        const selected = options[index] as any;
        selected.selected = true;
        selected.setAttribute('aria-selected', 'true');
        const selectedValue = selected.value;
        this.activeIndex = index;

        // Update reactive properties
        this.value = selectedValue;

        this.dispatchEvent(
          new CustomEvent('dropdown-change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
          })
        );
      }
    }

    override render() {
      return html`
        <button
          class="dropdown-trigger"
          aria-haspopup="listbox"
          @click="${this.#handleClick}"
        >
          <span>${this.label}</span>
          <span>▼</span>
        </button>
        ${super.render()}
      `;
    }
  }
  return SelectElement;
};

export class Select extends SelectMixin(Menu) {}
