import { customElement } from 'lit/decorators.js';

import { Tooltip } from '../base/tooltip.js';

import { tooltipStyles } from './tooltip-styles.css.js';

@customElement('md-tooltip')
export class M3Tooltip extends Tooltip {
  static override styles = [tooltipStyles];
}
