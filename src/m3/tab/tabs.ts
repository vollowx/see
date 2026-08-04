import { customElement, property } from 'lit/decorators.js';

import { Tabs } from '../../base/tabs.js';
import type { M3Tab } from './tab.js';

import { tabsStyles } from './tabs-styles.css.js';

/**
 * TODO: vertical tabs, tablist placement
 *
 * @tag md-tabs
 *
 * @slot - tabs
 */
@customElement('md-tabs')
export class M3Tabs extends Tabs {
  @property({ type: Boolean, reflect: true }) iconsAbove = false;

  static override styles = [tabsStyles];

  override selectTab(selectedTab: M3Tab) {
    const previousTab = this.$tabs.find((t) => t.selected) as M3Tab | undefined;
    super.selectTab(selectedTab);

    if (previousTab && previousTab !== selectedTab)
      selectedTab.animateIndicator(previousTab);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-tabs': M3Tabs;
  }
}
