import { customElement } from 'lit/decorators.js';

import { Select } from '../base/select.js';

import { menuPartStyles } from './menu-part-styles.css.js';
import { selectStyles } from './select-styles.css.js';

/**
 * @tag md-select
 *
 * @csspart field
 * @csspart menu
 * @csspart items
 *
 * @fires {Event} change - Fired when the selected value has changed.
 * @fires {Event} input - Fired when the selected value has changed.
 */
@customElement('md-select')
export class M3Select extends Select {
  override readonly _possibleItemTags = ['md-option'];
  override readonly _durations = { show: 300, hide: 200 };
  override readonly _scrollPadding = 4;

  static override styles = [menuPartStyles, selectStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'md-select': M3Select;
  }
}
