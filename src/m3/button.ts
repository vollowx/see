import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import Button from '../base/button.js';

import './focus-ring.js';
import './ripple.js';

import { buttonStyles } from './button-styles.js';
import { targetStyles } from './target-styles.js';

/**
 * @element md-button
 *
 * @csspart label
 * @csspart icon
 * @csspart trailingicon
 */
@customElement('md-button')
export default class MdButton extends Button {
  static styles = [...super.styles, targetStyles, buttonStyles];
  render() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon" name="icon" aria-hidden="true"></slot>
      <slot part="label"></slot>
      <slot part="trailingicon" name="trailingicon" aria-hidden="true"></slot>
    `;
  }
  @property({ reflect: true }) variant:
    | 'filled'
    | 'tonal'
    | 'elevated'
    | 'outlined'
    | 'text' = 'filled';
  @property({ reflect: true }) color: 'primary' | 'secondary' | 'tertiary' =
    'primary';
}
