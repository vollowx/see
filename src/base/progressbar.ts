import { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { InternalsAttached, internals } from './mixins/internals-attached.js';

/**
 * Not suitable for purely indeterminate progress component. For example,
 * loading indicator in Material Design 3 should not extend this.
 */
export class ProgressBar extends InternalsAttached(LitElement) {
  @property({ type: Number }) value = 0;
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  constructor() {
    super();
    this[internals].role = 'progressbar';
    this[internals].ariaValueMin = '0';
    this[internals].ariaValueMax = '100';
  }
  override updated(changedProperties: PropertyValues) {
    if (changedProperties.has('value')) {
      if (this.indeterminate) this[internals].ariaValueNow = null;
      else this[internals].ariaValueNow = String(this.value);
    }
  }
}
