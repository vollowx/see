import { html, PropertyValues } from 'lit';
import { Radio } from '../../base/radio.js';
import { customElement } from '../../core/decorators.js';
import { internals } from '../../base/mixins/internals-attached.js';
import { radioStyles } from './radio-styles.css.js';

import { targetStyles } from '../target-styles.css.js';
import '../focus-ring/focus-ring.js';
import '../ripple/ripple.js';

/**
 * @tag md-radio
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

  override updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('checked')) {
      const oldValue = changedProperties.get('checked');
      if (oldValue === undefined) return;

      this[internals].states.delete('checking');
      this[internals].states.delete('unchecking');
      this[internals].states.add(this.checked ? 'checking' : 'unchecking');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-radio': M3Radio;
  }
}
