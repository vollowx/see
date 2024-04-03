import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import Button from '../base/button.js';

import './focus-ring.js';
import './ripple.js';

import { iconButtonStyles } from './icon-button-styles.js';
import { targetStyles } from './target-styles.js';

/**
 * @element md-icon-button
 *
 * @csspart icon
 */
@customElement('md-icon-button')
export default class MdIconButton extends Button {
  static styles = [...super.styles, targetStyles, iconButtonStyles];
  render() {
    return html`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon"></slot>
    `;
  }
  @property({ reflect: true }) variant:
    | 'standard'
    | 'filled'
    | 'tonal'
    | 'outlined' = 'standard';
}
