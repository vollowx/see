import { customElement } from 'lit/decorators.js';
import { Popup } from '../../base/experimental/popup.js';
import { popupStyles } from './popup-styles.css.js';

@customElement('md-popup')
export class M3Popup extends Popup {
  static override styles = [...super.styles, popupStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'md-popup': M3Popup;
  }
}
