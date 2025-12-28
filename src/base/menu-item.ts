import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { hiddenStyles } from './hidden-styles.css.js';
import { InternalsAttached, internals } from './internals-attached.js';
import { FormAssociated } from './form-associated.js';
import { Menu } from './menu.js';

let uniqueIdCounter = 0;

export class MenuItem extends FormAssociated(InternalsAttached(LitElement)) {
  static override styles = [hiddenStyles];

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) focused = false;

  override connectedCallback() {
    super.connectedCallback();
    this[internals].role = 'menuitem';
    this.setAttribute('tabindex', '-1');
    this.#updateInternals();
    if (!this.id) {
      if (this.parentElement instanceof Menu && this.parentElement.id)
        this.id = `${this.parentElement.id}-item-${uniqueIdCounter++}`;
      else this.id = `menu-item-${uniqueIdCounter++}`;
    }
  }

  protected override updated(changed: Map<string, any>) {
    super.updated(changed);
    if (changed.has('disabled') || changed.has('focused')) {
      this.#updateInternals();
    }
  }

  #updateInternals() {
    this[internals].ariaDisabled = this.disabled ? 'true' : 'false';
    this.focused
      ? this[internals].states.add('focused')
      : this[internals].states.delete('focused');
    this[internals].ariaSelected = this.selected ? 'true' : 'false';
    this.selected
      ? this[internals].states.add('selected')
      : this[internals].states.delete('selected');
  }

  override focus(): void {
    this.focused = true;
  }

  override blur(): void {
    this.focused = false;
  }
}
