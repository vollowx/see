import { LitElement, html, isServer } from 'lit';
import { property } from 'lit/decorators.js';

import { internals } from './mixins/internals-attached.js';
import type { Tab } from './tab.js';
import type { TabPanel } from './tab-panel.js';

/**
 * @fires {CustomEvent} select
 */
export class Tabs extends LitElement {
  @property({ type: String }) switch: 'auto' | 'manual' = 'manual';
  @property({ type: String, reflect: true }) selected = '';

  get $tabs(): Array<Tab> {
    return [...(this.querySelectorAll('[seele-base=tab]') as NodeListOf<Tab>)];
  }
  get $panels(): Array<TabPanel> {
    return [
      ...(this.querySelectorAll('[seele-base=tabpanel]') as NodeListOf<Tab>),
    ];
  }

  override render() {
    return html`
      <div part="tablist" role="tablist">
        <slot @slotchange=${this.#handleSlotChange}></slot>
      </div>
      <slot name="panels"></slot>
    `;
  }

  constructor() {
    super();
    if (!isServer) {
      this.addEventListener('keydown', this.#handleKeyDown.bind(this));
      this.addEventListener('click', this.#handleClick.bind(this));
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    queueMicrotask(this.#handleSlotChange.bind(this));
  }

  protected override updated(changed: Map<string, any>) {
    if (changed.has('selected') && this.selected) {
      const targetTab = this.$tabs.find((t) => t.value === this.selected);
      if (targetTab) this._selectTab(targetTab);
    }
  }

  #handleSlotChange() {
    this.$tabs.forEach((tab) => {
      const panel = this.$panels.find((panel) => {
        console.log(panel.value, tab.value)
        return panel.value === tab.value;
      });
      if (!panel) {
        console.error('[seele] Cannot find a matching panel for tab ', tab);
        console.log('---')
      } else {
        tab[internals].ariaControlsElements = [panel];
        panel[internals].ariaLabelledByElements = [tab];
      }
    });
  }

  #handleKeyDown(event: KeyboardEvent) {
    const tabs = this.$tabs;
    if (!tabs.length) return;

    const activeElement = (this.getRootNode() as Document | ShadowRoot)
      .activeElement;
    const currentIndex = tabs.findIndex((t) => t === activeElement);
    let nextIndex = currentIndex !== -1 ? currentIndex : 0;

    let handled = false;

    switch (event.key) {
      case 'ArrowLeft':
        nextIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
        handled = true;
        break;
      case 'ArrowRight':
        nextIndex = currentIndex >= tabs.length - 1 ? 0 : currentIndex + 1;
        handled = true;
        break;
      case 'Home':
        nextIndex = 0;
        handled = true;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        handled = true;
        break;
      case 'Enter':
      case ' ':
        if (currentIndex !== -1) {
          this._selectTab(tabs[currentIndex]);
        }
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();

      if (event.key !== 'Enter' && event.key !== ' ') {
        this.focusTab(tabs[nextIndex]);
        if (this.switch === 'auto') this._selectTab(tabs[nextIndex], true);
      }
    }
  }

  #handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest('[seele-base=tab]') as Tab;

    if (tab && this.$tabs.includes(tab)) {
      this.focusTab(tab);
      this._selectTab(tab, true);
    }
  }

  focusTab(tab: Tab) {
    this.$tabs.forEach((t) => {
      t.blur();
      t.tabIndex = -1;
    });
    tab.tabIndex = 0;
    tab.focus();
  }

  protected _selectTab(selectedTab: Tab, dispatchEvent = false) {
    this.selected = selectedTab.value;
    const panels = this.$panels;

    this.$tabs.forEach((tab) => {
      tab.selected = tab === selectedTab;
      tab.tabIndex = tab === selectedTab ? 0 : -1;
    });
    panels.forEach((panel) => {
      if (panel.value && selectedTab.value) {
        panel.selected = panel.value === selectedTab.value;
      }
    });

    if (dispatchEvent)
      this.dispatchEvent(
        new CustomEvent('select', {
          detail: { tab: selectedTab, value: this.selected },
          bubbles: true,
          composed: true,
        })
      );
  }
}
