import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import {
  InternalsAttached,
  internals,
  replaceStates,
} from './mixins/internals-attached.js';

/**
 * TODO: disabled
 */
export class Tab extends InternalsAttached(LitElement) {
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: String, reflect: true }) value = '';

  override render() {
    return html`<slot></slot>`;
  }

  constructor() {
    super();
    this.setAttribute('seele-base', 'tab');
    this[internals].role = 'tab';
    this.#updateInternals();
  }

  protected override updated(changed: Map<string, any>) {
    super.updated(changed);
    if (changed.has('selected') || changed.has('focused')) {
      this.#updateInternals();
    }
  }

  #updateInternals() {
    this[internals].ariaSelected = String(this.selected);
    this[replaceStates](['selected'], [this.selected ? 'selected' : null]);
  }
}
