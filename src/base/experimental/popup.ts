/**
 * NOTE: demos at dev/pending.html
 * NOTE: should apply writing style on event listeners to other files
 * TODO: consider removing popoverController, but in case of tooltip, reserve
 *       for now
 * TODO: hijack all `hidePopover()`s to allow more complex JS animations
 * TODO: simpler Menu that just inherits List - do we really need a separated
 *       Menu? Why not just `<md-list role="presentation">`?
 *
 * Design: TO BE ADDED
 */

import { LitElement, html, css, PropertyValues, isServer } from 'lit';
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

import { InternalsAttached } from '../mixins/internals-attached.js';
import { Attachable } from '../mixins/attachable.js';
import { transformOriginFromArrow } from '../controllers/popover-controller.js';

import { popupStyles } from './popup-styles.css.js';

// Returns the first tabbable element within an eleent
//
// TODO: reverse search?
export function lookForTabbable(root: Node): HTMLElement | null {
  const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button',
    'input',
    'textarea',
    'select',
    'summary',
    '[tabindex]',
    '[contenteditable=true]',
  ].join(',');

  const isTabbable = (el: Element): boolean =>
    el.matches(FOCUSABLE_SELECTOR) &&
    !el.hasAttribute('disabled') &&
    el.getAttribute('tabindex') !== '-1';

  if ('shadowRoot' in root && (root as Element).shadowRoot) {
    const shadowResult = lookForTabbable((root as Element).shadowRoot!);
    if (shadowResult) return shadowResult;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: Node) => {
      const el = node as Element;
      return isTabbable(el) || el.shadowRoot
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });

  let currentNode = walker.nextNode() as HTMLElement | null;

  while (currentNode) {
    if (isTabbable(currentNode)) {
      return currentNode;
    }

    if (currentNode.shadowRoot) {
      const shadowFocusable = lookForTabbable(currentNode.shadowRoot);
      if (shadowFocusable) {
        return shadowFocusable;
      }
    }

    currentNode = walker.nextNode() as HTMLElement | null;
  }

  return null;
}

@customElement('complementary-popup')
export class Popup extends Attachable(InternalsAttached(LitElement)) {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, attribute: 'no-focus-control' })
  noFocusControl = false;

  @property({ type: String }) placement: Placement = 'bottom-start';
  @property({ type: String }) strategy: Strategy = 'absolute';
  @property({ type: Number }) offset = 0;
  @property({ type: Number }) windowPadding = 8;

  static override styles = [popupStyles];
  override render() {
    return html`<slot></slot>`;
  }

  constructor() {
    super();
    if (!this.hasAttribute('popover')) this.setAttribute('popover', 'auto');
    if (!isServer) {
      this.addEventListener('request-popup-hide', this.#onRequestHide);
      // this.addEventListener('beforetoggle', this.#onBeforeToggle);
      this.addEventListener('toggle', this.#onToggle);
      this.addEventListener('focusout', this.#onFocusOut);
    }
    this.setAttribute('notransition', '');
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

  override handleControlChange(
    prev: HTMLElement | null,
    next: HTMLElement | null
  ): void {
    if (prev) {
      prev.removeEventListener('click', this.#onTriggerClick);
      prev.removeEventListener('focusout', this.#onFocusOut);
    }
    if (next) {
      next.addEventListener('click', this.#onTriggerClick);
      next.addEventListener('focusout', this.#onFocusOut);

      next.ariaHasPopup = 'true';
      next.ariaExpanded = String(this.open);
      next.ariaControlsElements = [this];
    }
  }

  #onRequestHide = () => {
    this.hide();
  };
  // #allowHidePopover = false;
  // #onBeforeToggle = (e: ToggleEvent) => {
  //   // Intercept browser light-dismiss (ESC, click outside) or external hidePopover() calls
  //   if (e.newState === 'closed' && !this.#allowHidePopover) {
  //     e.preventDefault();
  //     if (this.open) {
  //       this.hide();
  //     }
  //   }
  // };
  #onToggle = (e: ToggleEvent) => {
    e.preventDefault();
    if (e.newState === 'closed' && this.open) this.hide();
  };
  #onFocusOut = (e: FocusEvent) => {
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
  #onTriggerClick = (e: MouseEvent) => {
    e.preventDefault();
    this.toggle();
  };

  #syncTriggerAria() {
    this.$control?.setAttribute('aria-expanded', String(this.open));
  }
  #focusFirstInteractiveElement() {
    if (this.noFocusControl) return;

    const autoFocusEl = this.querySelector('[autofocus]') as HTMLElement | null;
    if (autoFocusEl) {
      autoFocusEl.focus();
      return;
    }

    const firstFocusable = lookForTabbable(this);
    if (firstFocusable) {
      firstFocusable.focus();
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
