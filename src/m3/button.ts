import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import Button from '../base/button.js';

import MdFocusRing from './focus-ring.js';
import MdRipple from './ripple.js';

import style from './button-style.js';
import targetStyle from './target-style.js';

/**
 * @element md-button
 *
 * @csspart label
 * @csspart icon
 * @csspart trailingicon
 */
@customElement('md-button')
export default class MdButton extends Button {
  static styles = [...super.styles, targetStyle, style];
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
  @property() variant: 'filled' | 'tonal' | 'elevated' | 'outlined' | 'text' =
    'filled';
  @property() color: 'primary' | 'secondary' | 'tertiary' = 'primary';
}
