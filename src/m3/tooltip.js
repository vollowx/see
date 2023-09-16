import Tooltip from '../base/tooltip.js';
import { customElement } from '../core/decorators.js';
import { sheetsFromCss } from '../core/template.js';

import MdTooltipStyle from './tooltip.css' with { type: 'css' };

@customElement('md-tooltip')
export class MdTooltip extends Tooltip {
  get styles() {
    return [...super.styles, ...sheetsFromCss(MdTooltipStyle)];
  }
}
