import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hiddenStyles } from '../base/hidden-styles.js';

import { toolbarStyles } from './toolbar-styles.js';

/**
 * @element md-toolbar
 *
 * @slot
 * @slot fab
 * @csspart container
 * @csspart fab-slot
 */
@customElement('md-toolbar')
export class M3Toolbar extends LitElement {
  constructor() {
    super();
    this.setAttribute('role', 'toolbar');
    this.setAttribute('aria-orientation', this.orientation);
  }

  static override styles = [hiddenStyles, toolbarStyles];

  @property({ reflect: true }) type: 'docked' | 'floating' = 'docked';
  @property({ reflect: true }) color: 'standard' | 'vibrant' = 'standard';
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' =
    'horizontal';

  protected override updated(changed: Map<string, unknown>) {
    if (changed.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation);
    }
  }

  override render() {
    return html`
      <div part="container">
        <slot></slot>
      </div>
      <div part="fab-slot">
        <slot name="fab"></slot>
      </div>
    `;
  }
}
