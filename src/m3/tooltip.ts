import { customElement } from 'lit/decorators.js';

import { Tooltip } from '../base/tooltip.js';

import { tooltipStyles } from './tooltip-styles.css.js';

/**
 * @tag md-tooltip
 */
@customElement('md-tooltip')
export class M3Tooltip extends Tooltip {
  static override styles = [tooltipStyles];

  override readonly _durations = { show: 67, hide: 67 };
}

declare global {
  interface HTMLElementTagNameMap {
    'md-tooltip': M3Tooltip;
  }
}
