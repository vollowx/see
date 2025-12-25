import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { hiddenStyles } from './hidden-styles.css.js';
import { InternalsAttached, internals } from './internals-attached.js';
import { FormAssociated } from './form-associated.js';

export class MenuItem extends FormAssociated(InternalsAttached(LitElement)) {
  static override styles = [hiddenStyles];

  @property({ type: Boolean, reflect: true }) disabled = false;
  /**
   * Indicates whether this item is the active descendant in the menu.
   * Used with aria-activedescendant pattern for accessibility.
   * Set to true when this item is the currently focused/highlighted item in keyboard navigation.
   */
  @property({ type: Boolean, reflect: true }) active = false;

  override connectedCallback() {
    super.connectedCallback();
    this[internals].role = 'menuitem';
    this.addEventListener('keydown', this.#boundKeyDown);
    this.addEventListener('keyup', this.#boundKeyUp);
    this.addEventListener('click', this.#boundClick);
    this.#updateInternals();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.#boundKeyDown);
    this.removeEventListener('keyup', this.#boundKeyUp);
    this.removeEventListener('click', this.#boundClick);
  }

  protected override updated(changed: Map<string, any>) {
    super.updated(changed);
    if (changed.has('disabled')) {
      this.#updateInternals();
    }
  }

  #updateInternals() {
    this.setAttribute('tabindex', '-1');
    this[internals].ariaDisabled = this.disabled ? 'true' : 'false';
  }

  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  #boundClick = this.#handleClick.bind(this);

  #handleKeyDown(e: KeyboardEvent) {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'Enter') {
      this.click();
    }
  }

  #handleKeyUp(e: KeyboardEvent) {
    if (e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      this.click();
    }
  }

  #handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
