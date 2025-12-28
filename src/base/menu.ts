import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';

import { Attachable } from './attachable.js';
import { internals, InternalsAttached } from './internals-attached.js';

import { MenuItem } from './menu-item.js';
import { ListController } from './list-controller.js';
import { setFocusVisible } from '../core/variables.js';

import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';

const Base = InternalsAttached(Attachable(LitElement));

/**
 * @csspart menu
 * @csspart items
 *
 * @fires {Event} menu-item-selected
 */
export class Menu extends Base {
  @property({ type: Boolean, reflect: true }) open: boolean = false;
  @property({ type: Boolean, reflect: true }) quick: boolean = false;
  @property({ reflect: true }) align: import('@floating-ui/dom').Placement =
    'bottom-start';
  @property({ type: String, reflect: true })
  alignStrategy: import('@floating-ui/dom').Strategy = 'absolute';
  @property({ type: Number, reflect: true }) offset = 0;

  padding = 8;

  protected _possibleItemTags: string[] = [];

  get $items() {
    return this.listController.items;
  }
  @query('[part="menu"]') $menu!: HTMLElement;
  private $lastFocused: HTMLElement | null = null;

  private readonly listController = new ListController<MenuItem>(this, {
    isItem: (item: HTMLElement): item is MenuItem =>
      this._possibleItemTags.includes(item.tagName.toLowerCase()) &&
      !item.hasAttribute('disabled'),
    getPossibleItems: () =>
      Array.from(this.children).filter(
        (child): child is MenuItem =>
          this._possibleItemTags.includes(child.tagName.toLowerCase()) &&
          !child.hasAttribute('disabled')
      ),
    blurItem: (item: MenuItem) => {
      item.focused = false;
    },
    focusItem: (item: MenuItem) => {
      item.focused = true;
      this[internals].ariaActiveDescendantElement = item;
    },
    isNavigableKey: (key: string) =>
      ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(key),
    wrapNavigation: () => false,
  });

  override render() {
    return html`<div part="menu">${this.renderItemSlot()}</div>`;
  }

  renderItemSlot() {
    return html`<slot part="items"></slot>`;
  }

  override connectedCallback() {
    super.connectedCallback();
    this[internals].role = 'menu';
    this.tabIndex = -1;
    this[internals].states.add('closed');
    this.addEventListener('keydown', this.#handleKeyDown.bind(this));
    this.addEventListener('focusout', this.#handleFocusOut.bind(this));
    if (this.$control) {
      // TODO: Handle $control change
      this.$control.ariaHasPopup = 'true';
      this.$control.ariaExpanded = 'false';
      this.$control.ariaControlsElements = [this];
      this[internals].ariaLabelledByElements = [this.$control];
      this.$control.addEventListener(
        'focusout',
        this.#handleFocusOut.bind(this)
      );
    }
    this.$items.forEach((item) => {
      item.addEventListener('mouseover', this.#handleItemMouseOver.bind(this));
      item.addEventListener('click', this.#handleItemClick.bind(this));
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.#handleKeyDown.bind(this));
    this.removeEventListener('focusout', this.#handleFocusOut.bind(this));
    if (this.$control) {
      this.$control.removeEventListener(
        'focusout',
        this.#handleFocusOut.bind(this)
      );
    }
    this.clearAutoReposition?.();
  }

  protected override updated(changed: Map<string, any>) {
    if (changed.has('open')) {
      if (this.open) {
        if (this.$control) {
          this.clearAutoReposition = autoUpdate(
            this.$control,
            this.$menu,
            this.reposition.bind(this)
          );
          this.reposition();
        }

        this.$lastFocused = document.activeElement as HTMLElement;
        if (this.$control) {
          this.$control.ariaExpanded = 'true';
        }

        this.animateOpen().then(() => {
          this.focus();
          this.listController.focusFirstItem();
        });
      } else {
        this.clearAutoReposition?.();
        this.clearAutoReposition = null;

        if (this.$control) {
          this.$control.ariaExpanded = 'false';
        }

        this.animateClose().then(() => {
          if (this.$lastFocused) {
            this.$lastFocused.focus();
            this.$lastFocused = null;
          }
        });
      }
    }
  }

  // TODO: Handle animation cancelation
  animateOpeningDuration: number = 0;
  animateClosingDuration: number = 0;
  animateOpen() {
    this[internals].states.add('opening');
    return new Promise<void>((resolve) => {
      setTimeout(
        () => {
          this[internals].states.delete('closed');
          this[internals].states.delete('opening');
          this[internals].states.add('opened');
          resolve();
        },
        this.quick ? 0 : this.animateOpeningDuration
      );
    });
  }
  animateClose() {
    this[internals].states.add('closing');
    return new Promise<void>((resolve) => {
      setTimeout(
        () => {
          this[internals].states.delete('opened');
          this[internals].states.delete('closing');
          this[internals].states.add('closed');
          resolve();
        },
        this.quick ? 0 : this.animateClosingDuration
      );
    });
  }

  private clearAutoReposition: Function | null = null;
  reposition = async () => {
    if (!this.$control) return;

    computePosition(this.$control, this.$menu, {
      placement: this.align,
      strategy: this.alignStrategy,
      middleware: [
        offset(this.offset),
        flip({ padding: this.padding }),
        shift({ padding: this.padding, crossAxis: true }),
      ],
    }).then(({ x, y, placement }) => {
      Object.assign(this.$menu.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: this.alignStrategy,
      });
      this.align = placement;
    });
  };

  #handleKeyDown(event: KeyboardEvent) {
    if (event.defaultPrevented) return;

    event.stopPropagation();

    switch (event.key) {
      case 'Escape':
        event.preventDefault();

        this.open = false;
        return;
      case 'Enter':
        event.preventDefault();

        let index = this.listController.currentIndex;
        console.log('Menu item selected:', index);
        this.listController.items[index].blur();
        this.dispatchEvent(
          new CustomEvent('menu-item-selected', {
            detail: {
              item: this.listController.items[index],
              index: index,
            },
            bubbles: true,
            composed: true,
          })
        );

        this.open = false;
        return;
    }
    this.listController.handleKeyDown(event);
  }

  #handleFocusOut(event: FocusEvent) {
    const newFocus = event.relatedTarget as Node;
    const isInside =
      this.contains(newFocus) ||
      this.shadowRoot?.contains(newFocus) ||
      this.$control?.contains(newFocus);
    if (!isInside) {
      this.open = false;
    }
  }

  #handleItemMouseOver(event: Event) {
    setFocusVisible(false);
    const hoveredItem = event.currentTarget as MenuItem;
    this.listController._focusItem(hoveredItem);
  }

  #handleItemClick(event: Event) {
    const clickedItem = event.currentTarget as MenuItem;
    const index = this.listController.items.indexOf(clickedItem);
    this.listController.items[index].blur();
    this.dispatchEvent(
      new CustomEvent('menu-item-selected', {
        detail: {
          item: this.listController.items[index],
          index: index,
        },
        bubbles: true,
        composed: true,
      })
    );

    this.open = false;
  }

  // Exposed functions
  show() {
    this.open = true;
  }
  close() {
    this.open = false;
  }
}
