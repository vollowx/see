import { LitElement, html, css } from 'lit';
import { property, query } from 'lit/decorators.js';

import { Attachable } from './attachable.js';

import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import { List } from './list.js';
import { hiddenStyles } from './hidden-styles.css.js';

const MenuBase = Attachable(LitElement);

/**
 * Example render():
 * <div part="menu-surface">
 *   <your-list part="list">
 *     <slot></slot>
 *   </your-list>
 * </div>
 */
export class Menu extends MenuBase {
  static override styles = [
    hiddenStyles,
    css`
      :host {
        display: inline-block;
        position: relative;
        outline: none;
      }

      [part='menu-surface'] {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        min-width: 200px;
        max-height: 300px;
        overflow-y: auto;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        z-index: 10000;
      }

      :host([open]) [part='menu-surface'] {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) open: boolean = false;
  @property({ reflect: true }) position:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end' = 'bottom-start';
  @property({ type: Number, reflect: true }) menuOffset = 0;

  @query('[part="menu-surface"]') surface: HTMLElement | undefined;
  @query('[part="list"]') list: List | undefined;

  private clearAutoUpdate: Function | null = null;
  private _previousFocus: HTMLElement | null = null;

  // Compatibility for Select and other consumers
  get activeIndex(): number {
    return this.list?.activeIndex ?? -1;
  }
  set activeIndex(index: number) {
    if (this.list) {
      this.list.activeIndex = index;
    }
  }

  getOptions(): HTMLElement[] {
    return this.list?.items ?? [];
  }

  // Compatibility method for Select
  protected onOptionChange(index: number, isFocusMode: boolean = false) {
    if (this.list) {
      this.list.activateItem(index);
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'menu');
    }
    this.addEventListener('keydown', this.#handleKeyDown.bind(this));
    this.addEventListener('focusout', this.#handleFocusOut.bind(this));
    this.addEventListener(
      'list-item-activate',
      this.#handleListItemActivate.bind(this) as EventListener
    );
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.#handleKeyDown.bind(this));
    this.removeEventListener('focusout', this.#handleFocusOut.bind(this));
    this.removeEventListener(
      'list-item-activate',
      this.#handleListItemActivate.bind(this) as EventListener
    );
    this.clearAutoUpdate?.();
  }

  protected override updated(changed: Map<string, any>) {
    if (changed.has('open')) {
      if (this.open) {
        this._previousFocus = document.activeElement as HTMLElement;
        requestAnimationFrame(async () => {
          if (this.$control) {
            this.#setupPositioning();
          }
          // Wait for next frame to ensure visibility for focus
          requestAnimationFrame(() => {
            if (this.getAttribute('role') === 'menu' && this.list) {
              this.list.selectFirst();
              // Focus the menu surface for aria-activedescendant pattern
              if (this.surface) {
                this.surface.focus();
              }
            }
          });
        });
      } else {
        this.clearAutoUpdate?.();
        this.clearAutoUpdate = null;
        if (this._previousFocus) {
          this._previousFocus.focus();
          this._previousFocus = null;
        }
      }
    }
  }

  #setupPositioning() {
    if (this.$control && this.surface) {
      this.clearAutoUpdate = autoUpdate(
        this.$control,
        this.surface,
        this.#updatePosition.bind(this)
      );
      this.#updatePosition();
    }
  }

  #updatePosition = async () => {
    if (!this.$control || !this.surface) return;

    try {
      const { x, y } = await computePosition(this.$control, this.surface, {
        placement: this.position as any,
        strategy: 'fixed',
        middleware: [offset(this.menuOffset), flip(), shift({ padding: 8 })],
      });

      const maxX = window.innerWidth - 50;
      const maxY = window.innerHeight - 50;
      const clampedX = Math.max(0, Math.min(x, maxX));
      const clampedY = Math.max(0, Math.min(y, maxY));

      Object.assign(this.surface.style, {
        left: `${clampedX}px`,
        top: `${clampedY}px`,
      });
    } catch (e) {
      console.error('Menu positioning error:', e);
    }
  };

  #handleKeyDown(event: KeyboardEvent) {
    if (event.defaultPrevented) return;

    if (!this.open) {
      if (
        event.key === 'ArrowDown' ||
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        event.preventDefault();
        this.open = true;
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.open = false;
      return;
    }

    if (this.list) {
      this.list.handleKeyDown(event);
    }
  }

  #handleFocusOut(event: FocusEvent) {
    const newFocus = event.relatedTarget as Node;
    const isInside =
      this.contains(newFocus) || this.shadowRoot?.contains(newFocus);
    if (!isInside) {
      this.open = false;
    }
  }

  #handleListItemActivate(event: CustomEvent) {
    const { item, index } = event.detail;

    // Ensure item has an ID for aria-activedescendant
    if (!item.id) {
      item.id = `menu-item-${index}`;
    }

    // Always set aria-activedescendant on the menu surface
    if (this.surface) {
      this.surface.setAttribute('aria-activedescendant', item.id);
    }
  }
}
