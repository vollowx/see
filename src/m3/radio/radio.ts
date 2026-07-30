import { html } from 'lit';
import { Radio } from '../../base/radio.js';
import { customElement } from '../../core/decorators.js';
import { radioStyles } from './radio-styles.css.js';

import { targetStyles } from '../target-styles.css.js';
import '../focus-ring/focus-ring.js';
import '../ripple/ripple.js';

/**
 * @tag md-radio
 *
 * FIXME: first-paint animation cannot be elimated by the same approach like
 *        button and toggle button
 */
@customElement('md-radio')
export class M3Radio extends Radio {
  static override styles = [targetStyles, radioStyles];

  override render() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <span class="middle"></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-radio': M3Radio;
  }
}
