import { isServer, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { InternalsAttached, internals } from './mixins/internals-attached.js';
import { FormAssociated } from './mixins/form-associated.js';

import { hiddenStyles } from './hidden-styles.css.js';

export class ListItem extends FormAssociated(InternalsAttached(LitElement)) {
  _role: string = 'option';

  static override styles = [hiddenStyles];

  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) focused = false;

  get displayText(): string {
    return this.innerText.trim();
  }

  // Accessibility tools, particularly Narrator, only fires `click` event on
  // elements that have listeners for them.
  #handleDummy() {}
  constructor() {
    super();
    this.setAttribute('seele-base', 'option');
    this[internals].role = this._role;
    this.setAttribute('tabindex', '-1');
    this.#updateInternals();
    if (!isServer) this.addEventListener('click', this.#handleDummy);
  }

  protected override updated(changed: Map<string, any>) {
    super.updated(changed);
    if (
      changed.has('disabled') ||
      changed.has('focused') ||
      changed.has('selected')
    ) {
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
