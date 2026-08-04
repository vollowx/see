import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import {
  InternalsAttached,
  internals,
  replaceStates,
} from './mixins/internals-attached.js';

export class Tab extends InternalsAttached(LitElement) {
  @property({ type: Boolean, reflect: true }) disabled = false;
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
    if (
      changed.has('selected') ||
      changed.has('focused') ||
      changed.has('disabled')
    ) {
      this.#updateInternals();
    }
  }

  #updateInternals() {
    this.tabIndex = this.disabled ? -1 : this.selected ? 0 : -1;
    this[internals].ariaSelected = String(this.selected);
    this[internals].ariaDisabled = String(this.disabled);
    this[replaceStates](
      ['selected', 'disabled'],
      [this.selected ? 'selected' : null, this.disabled ? 'disabled' : null]
    );
  }
}
