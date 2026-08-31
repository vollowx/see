/**
 * NOTE: demos at dev/pending.html
 * TODO: hijack all `hidePopover()`s to allow more complex JS animations
 *
 * Design: TO BE ADDED
 */

import { LitElement, html, PropertyValues, isServer } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  autoUpdate,
  computePosition,
  arrow,
  flip,
  offset,
  shift,
  Placement,
  Strategy,
} from '@floating-ui/dom';

import { getFirstTabbable } from '../../core/focus.js';
import { internals, InternalsAttached } from '../mixins/internals-attached.js';
import {
  Attachable,
  autoAttachToParent,
  handleControlChange,
} from '../mixins/attachable.js';
import { transformOriginFromArrow } from '../controllers/popover-controller.js';

import { popupStyles } from './popup-styles.css.js';

/**
 * When using popup with menu, you need to manually bind them using `aria-controls`
 */
@customElement('complementary-popup')
export class Popup extends Attachable(InternalsAttached(LitElement)) {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, attribute: 'no-focus-control' })
  noFocusControl = false;

  @property({ type: String }) placement: Placement = 'bottom-start';
  @property({ type: String }) strategy: Strategy = 'absolute';
  @property({ type: Number }) offset = 0;
  @property({ type: Number, attribute: 'window-padding' }) windowPadding = 8;

  static override styles = [popupStyles];
  override render() {
    return html`<slot></slot>`;
  }

  constructor() {
    super();
    this.setAttribute('notransition', '');
    if (!this.hasAttribute('popover')) this.setAttribute('popover', 'auto');
    if (!isServer) {
      this.addEventListener('request-popup-hide', this.#handleRequestHide);
      // this.addEventListener('beforetoggle', this.#handleBeforeToggle);
      this.addEventListener('toggle', this.#handleToggle);
      this.addEventListener('focusout', this.#handleFocusOut);
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    requestAnimationFrame(() =>
      requestAnimationFrame(() => this.removeAttribute('notransition'))
    );
  }

  override disconnectedCallback() {
    this._cleanup();
    super.disconnectedCallback();
  }

  protected override updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('open')) {
      if (this.open) this._show();
      else this._hide();
      this.#syncTriggerAria();
    }
  }

  override [autoAttachToParent] = false;
  override [handleControlChange](
    prev: HTMLElement | null,
    next: HTMLElement | null
  ): void {
    if (prev) {
      prev.removeEventListener('click', this.#handleTriggerClick);
      prev.removeEventListener('focusout', this.#handleFocusOut);
    }
    if (next) {
      next.addEventListener('click', this.#handleTriggerClick);
      next.addEventListener('focusout', this.#handleFocusOut);

      if (!next.ariaHasPopup) next.ariaHasPopup = 'true';
      next.ariaExpanded = String(this.open);
      // next.ariaControlsElements = [this];
    }
  }

  #handleRequestHide = () => {
    this.hide();
  };
  // #allowHidePopover = false;
  // #handleBeforeToggle = (e: ToggleEvent) => {
  //   // Intercept browser light-dismiss (ESC, click outside) or external hidePopover() calls
  //   if (e.newState === 'closed' && !this.#allowHidePopover) {
  //     e.preventDefault();
  //     if (this.open) {
  //       this.hide();
  //     }
  //   }
  // };
  #handleToggle = (e: ToggleEvent) => {
    e.preventDefault();
    if (e.newState === 'closed' && this.open) this.hide();
  };
  #handleFocusOut = (e: FocusEvent) => {
    // for `this` and `this.$control`
    if (this.noFocusControl || !this.open) return;

    const target = e.relatedTarget as Node | null;

    if (target && (this.contains(target) || this.$control?.contains(target))) {
      return;
    }

    if (target) {
      this.hide();
      return;
    }

    requestAnimationFrame(() => {
      if (!document.hasFocus()) this.hide();
    });
  };
  #handleTriggerClick = (e: MouseEvent) => {
    e.preventDefault();
    this.toggle();
  };

  #syncTriggerAria() {
    this.$control?.setAttribute('aria-expanded', String(this.open));
  }
  #focusFirstInteractiveElement() {
    if (this.noFocusControl) return;

    const autoFocus = this.querySelector<HTMLElement>('[autofocus]');
    if (autoFocus) {
      autoFocus.focus();
    } else {
      const firstTabbable = getFirstTabbable(this);
      firstTabbable?.focus();
    }
  }

  async toggle(): Promise<void> {
    this.open = !this.open;
  }
  async show(): Promise<void> {
    this.open = true;
  }
  async hide(): Promise<void> {
    this.open = false;
  }
  async _show(): Promise<void> {
    if (this.isConnected && !this.matches(':popover-open')) this.showPopover();

    const trigger = this.$control;

    if (trigger) {
      this._cleanup();
      this.#cleanupAutoUpdate = autoUpdate(trigger, this, () =>
        this.#reposition()
      );
      await this.#reposition();
    }

    // await this._showing();

    requestAnimationFrame(() => {
      if (this.open) this.#focusFirstInteractiveElement();
    });
  }
  async _hide(): Promise<void> {
    // await this._hiding();
    this._cleanup();

    if (this.matches(':popover-open')) this.hidePopover();
    // if (this.matches(':popover-open')) {
    //   this.#allowHidePopover = true;
    //   try {
    //     this.hidePopover();
    //   } finally {
    //     this.#allowHidePopover = false;
    //   }
    // }
  }
  // async _showing(): Promise<void> {}
  // async _hiding(): Promise<void> {}

  #cleanupAutoUpdate?: () => void;
  #dummyArrow = isServer ? null : document.createElement('div');
  async #reposition(): Promise<void> {
    const trigger = this.$control;
    if (!trigger) return;

    const { x, y, placement, middlewareData } = await computePosition(
      trigger,
      this,
      {
        placement: this.placement,
        strategy: this.strategy,
        middleware: [
          offset(this.offset),
          flip({ padding: this.windowPadding }),
          shift({ padding: this.windowPadding, crossAxis: true }),
          arrow({ element: this.#dummyArrow }),
        ],
      }
    );

    Object.assign(this.style, {
      left: `${x}px`,
      top: `${y}px`,
      transformOrigin: transformOriginFromArrow(
        placement,
        middlewareData.arrow
      ),
    });
  }
  _cleanup() {
    this.#cleanupAutoUpdate?.();
    this.#cleanupAutoUpdate = undefined;
  }
}
