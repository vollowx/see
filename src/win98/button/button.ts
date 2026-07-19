import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Button } from '../../base/button.js';

import { buttonStyles } from './button-styles.css.js';

/**
 * @tag win98-button
 */
@customElement('win98-button')
export class Win98Button extends Button {
  static override styles = [
    ...super.styles,
    buttonStyles,
  ];
  override render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'win98-button': Win98Button;
  }
}
