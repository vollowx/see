import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { computePosition, autoUpdate } from '@floating-ui/dom';

import { Tabs } from '../../base/tabs.js';
import type { M3Tab } from './tab.js';

import { tabsStyles } from './tabs-styles.css.js';

/**
 * TODO: vertical tabs, tablist placement
 *
 * @tag md-tabs
 *
 * @csspart indicator
 *
 * @slot - tabs
 */
@customElement('md-tabs')
export class M3Tabs extends Tabs {
  @query('[part="indicator"]') $indicator: HTMLElement;
  @property({ type: Boolean, reflect: true }) secondary = false;
  @property({ type: Boolean, reflect: true }) iconsAbove = false;

  #cleanup: Function;

  static override styles = [tabsStyles];
  override render() {
    return html`
      ${super.render()}
      <div part="indicator" role="presentation"></div>
    `;
  }

  override selectTab(selectedTab: M3Tab) {
    super.selectTab(selectedTab);

    // It's kinda ridiculous to use floating-ui on such simple element, but I
    // do not want to have indicators in each tab either.
    // Another solution is using CSS anchor, which does not work across Shadow
    // DOM for now.
    this.#cleanup?.();
    const updatePosition = () => {
      computePosition(selectedTab, this.$indicator, {
        placement: 'bottom',
        strategy: 'absolute',
      }).then(({ x }) => {
        const left =
          (this.secondary ? x : (x + 2));
        const width = this.secondary
          ? selectedTab.offsetWidth
          : (selectedTab.$content.offsetWidth - 4);
        Object.assign(this.$indicator.style, {
          left: `${left}px`,
          width: `${width}px`,
        });
      })
    };
    this.#cleanup = autoUpdate(selectedTab, this.$indicator, updatePosition);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-tabs': M3Tabs;
  }
}
