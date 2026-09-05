import { LitElement, html, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement } from '../../core/decorators.js';
import {
  InternalsAttached,
  internals,
} from '../../base/mixins/internals-attached.js';

import { linearProgressStyles } from './linear-progress-styles.css.js';

/**
 * TODO: ProgressBar as a base component
 * TODO: buffering
 */
@customElement('md-linear-progress')
export class M3LinearProgress extends InternalsAttached(LitElement) {
  @property({ type: Number }) value = 0;
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  static override styles = [linearProgressStyles];
  override render() {
    const progress = Math.min(Math.max(this.value, 0), 1);
    const inactiveAfterStyle = {
      width: this.indeterminate ? '' : `${(1 - progress) * 100}%`,
    };

    return html`
      <div part="inactive before"></div>
      <div part="gap before"></div>
      <div part="active"></div>
      <div part="gap after"></div>
      <div part="inactive after" style=${styleMap(inactiveAfterStyle)}></div>
    `;
  }

  constructor() {
    super();
    this[internals].role = 'progressbar';
    this[internals].ariaValueMin = '0';
    this[internals].ariaValueMax = '1';
  }
  override updated(changedProperties: PropertyValues) {
    if (changedProperties.has('value')) {
      if (this.indeterminate) this[internals].ariaValueNow = null;
      else this[internals].ariaValueNow = String(this.value);
    }
  }
}
