import { LitElement } from 'lit';
import { query } from 'lit/decorators.js';
import { getFirstTabbable } from '../core/focus.js';

/**
 * @csspart dialog
 *
 * Example `render()`:
 *
 * ```
 * <dialog
 *   part="dialog"
 *   @cancel="${this._handleCancel}">
 *   <slot></slot>
 * </dialog>
 * ```
 */
export class Dialog extends LitElement {
  @query('dialog') $dialog: HTMLDialogElement;

  _handleCancel = (e: Event) => {
    e.preventDefault();
    this.close();
  };

  async show() {
    this.$dialog.showModal();
    const autoFocus = this.querySelector<HTMLElement>('[autofocus]');
    if (autoFocus) {
      autoFocus.focus();
    } else {
      const firstTabbable = getFirstTabbable(this);
      firstTabbable?.focus();
    }
  }

  async close() {
    this.$dialog.close();
  }
}
