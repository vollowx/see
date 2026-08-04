import { html, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { Tab } from '../../base/tab.js';
import { getSpring } from '../system/motion.js';
import '../focus-ring/focus-ring.js';
import '../ripple/ripple.js';

import { targetStyles } from '../target-styles.css.js';
import { tabStyles } from './tab-styles.css.js';

/**
 * @tag md-tab
 *
 * @slot icon - icon
 * @slot - label
 */
@customElement('md-tab')
export class M3Tab extends Tab {
  @query('[part="content"]') $content: HTMLDivElement;
  @query('[part="indicator"]') $indicator: HTMLElement;
  @state() protected _isSecondary = false;

  static override styles = [targetStyles, tabStyles];
  override render() {
    return html`
      <md-focus-ring inward></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <div part="content">
        <slot part="icon" name="icon" aria-hidden="true"></slot>
        <slot part="label"></slot>
        ${!this._isSecondary ? html`<div part="indicator" role="presentation"></div>` : nothing}
      </div>
      ${this._isSecondary ? html`<div part="indicator" role="presentation"></div>` : nothing}
    `;
  }

  animateIndicator(previousTab: M3Tab) {
    const indicator = this.$indicator;
    indicator.getAnimations().forEach((a) => a.cancel());

    const prevIndicator = previousTab.$indicator;
    const { easing, duration } = getSpring(this, 'spatial', 'default');

    if (
      prevIndicator &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const from = prevIndicator.getBoundingClientRect();
      const to = indicator.getBoundingClientRect();

      const translateX = (from.left - to.left).toFixed(4);
      const scaleX = (from.width / to.width).toFixed(4);

      indicator.animate(
        [
          {
            transform: `translateX(${translateX}px) scaleX(${scaleX})`,
            transformOrigin: 'left',
          },
          { transform: 'none', transformOrigin: 'left' },
        ],
        { duration, easing, fill: 'none' }
      );
    } else {
      indicator.animate([{ opacity: '0' }, { opacity: '1' }], {
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 0
          : duration,
        easing,
        fill: 'none',
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-tab': M3Tab;
  }
}
