import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { InternalsAttached, internals } from './mixins/internals-attached.js';

export class TabPanel extends InternalsAttached(LitElement) {
  @property({ type: String, reflect: true }) value = '';
  @property({ type: Boolean, reflect: true }) selected = false;

  override render() {
    return html`<slot></slot>`;
  }

  constructor() {
    super();
    this[internals].role = 'tabpanel';
    this.setAttribute('seele-base', 'tabpanel');
    this.setAttribute('slot', 'panels');
  }
}
