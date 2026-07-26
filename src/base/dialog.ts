import { LitElement } from 'lit';
import { query } from 'lit/decorators.js';

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

  show() {
    this.$dialog.showModal();
  }

  close() {
    this.$dialog.close();
  }
}
