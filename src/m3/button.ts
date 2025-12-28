import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Button } from '../base/button.js';

import './focus-ring.js';
import './ripple.js';

import { buttonStyles } from './button-styles.css.js';
import { targetStyles } from './target-styles.css.js';

/**
 * @tag md-button
 *
 * @csspart label
 * @csspart icon
 * @csspart trailingicon
 *
 * @slot - label
 * @slot icon - leading icon
 * @slot trailingicon - trailing icon
 */
@customElement('md-button')
export class M3Button extends Button {
  static override styles = [...super.styles, targetStyles, buttonStyles];
  override render() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon" name="icon" aria-hidden="true"></slot>
      <slot part="label"></slot>
      <slot part="trailingicon" name="trailingicon" aria-hidden="true"></slot>
    `;
  }
  @property({ reflect: true }) size:
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge' = 'small';
  @property({ reflect: true }) shape: 'rounded' | 'square' = 'rounded';
  @property({ reflect: true }) color: 'primary' | 'secondary' | 'tertiary' =
    'primary';
  @property({ reflect: true }) variant:
    | 'filled'
    | 'tonal'
    | 'elevated'
    | 'outlined'
    | 'text' = 'filled';
}

declare global {
  interface HTMLElementTagNameMap {
    'md-button': M3Button;
  }
}
