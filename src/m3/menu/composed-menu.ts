import { html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';

import { ensureReady } from '../../core/ensure-ready.js';
import { internals } from '../../base/mixins/internals-attached.js';
import { handleControlChange } from '../../base/mixins/attachable.js';
import { Popup } from '../../base/popup.js';

import { M3Menu } from './menu.js';
import { popupStyles } from '../popup/popup-styles.css.js';

/**
 * TODO: consider adding ariaLabel that is passed to the menu
 */
@customElement('md-composed-menu')
export class M3ComposedMenu extends Popup {
  @property({ type: Boolean, reflect: true }) vibrant = false;

  @query('md-menu') $menu: M3Menu;

  static override styles = [...super.styles, popupStyles];
  override render() {
    return html`<md-menu><slot></slot></md-menu>`;
  }

  constructor() {
    super();
    this[internals].role = 'application';
  }

  override [handleControlChange](
    prev: HTMLElement | null,
    next: HTMLElement | null
  ): void {
    if (next) {
      next.ariaHasPopup = 'menu';
      ensureReady(this.$menu).then(() => {
        next.ariaControlsElements = [this.$menu];
        this.$menu[internals].ariaLabelledByElements = [this.$control];
      });
    }
    super[handleControlChange](prev, next);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-composed-menu': M3ComposedMenu;
  }
}
