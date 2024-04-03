import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { FormAssociated } from './form-associated.js';
import { InternalsAttached, internals } from './internals-attached.js';
import { hiddenStyles } from './hidden-styles.js';

const PROPERTY_FROM_ARIA_CHECKED = {
  true: 'checked',
  false: 'unchecked',
  mixed: 'indeterminate',
};

const Base = FormAssociated(InternalsAttached(LitElement));

export default class Checkbox extends Base {
  constructor() {
    super();
    this[internals].role = 'checkbox';

    this.checked = this.hasAttribute('checked');
    this.indeterminate = this.hasAttribute('indeterminate');
    this.updateInternals();
  }
  static styles = [hiddenStyles];
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.#boundClick);
    this.addEventListener('keydown', this.#boundKeyDown);
    this.addEventListener('keyup', this.#boundKeyUp);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#boundClick);
    this.removeEventListener('keydown', this.#boundKeyDown);
    this.removeEventListener('keyup', this.#boundKeyUp);
  }
  protected updated(changed: Map<string, any>) {
    if (
      changed.has('checked') ||
      changed.has('disabled') ||
      changed.has('indeterminate')
    ) {
      this.updateInternals(true);
    }
  }
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private updateInternals(dispatch = false) {
    this[internals].states.delete('was-unchecked');
    this[internals].states.delete('was-checked');
    this[internals].states.delete('was-indeterminate');
    this[internals].states.add(
      `was-${PROPERTY_FROM_ARIA_CHECKED[this[internals].ariaChecked]}`
    );
    this[internals].ariaChecked = this.indeterminate
      ? 'mixed'
      : this.checked
        ? 'true'
        : 'false';
    this[internals].states.delete('unchecked');
    this[internals].states.delete('checked');
    this[internals].states.delete('indeterminate');
    this[internals].states.add(
      `${PROPERTY_FROM_ARIA_CHECKED[this[internals].ariaChecked]}`
    );

    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this[internals].ariaDisabled = this.disabled ? 'true' : 'false';

    this[internals].setFormValue(this.checked ? 'on' : null);

    if (dispatch)
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: this.checked,
        })
      );
  }

  #boundClick = this.#handleClick.bind(this);
  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  #handleClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.#toggleChecked();
  }
  #handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  #handleKeyUp(e: KeyboardEvent) {
    if (e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      this.#toggleChecked();
    }
  }

  #toggleChecked() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.indeterminate = false;
    this.updateInternals();
  }
}
