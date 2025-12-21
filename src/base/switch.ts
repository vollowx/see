import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { InternalsAttached, internals } from './internals-attached.js';
import { FormAssociated } from './form-associated.js';
import { hiddenStyles } from './hidden-styles.css.js';

const PROPERTY_FROM_ARIA_PRESSED = {
  true: 'checked',
  false: 'unchecked',
};

const Base = FormAssociated(InternalsAttached(LitElement));

export class Switch extends Base {
  constructor() {
    super();
    this[internals].role = 'switch';

    this.checked = this.hasAttribute('checked');
    this.updateInternals();
  }
  static override styles = [hiddenStyles];

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.#boundClick);
    this.addEventListener('keydown', this.#boundKeyDown);
  }
  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#boundClick);
    this.removeEventListener('keydown', this.#boundKeyDown);
  }
  protected override updated(changed: Map<string, any>) {
    if (changed.has('checked') || changed.has('disabled')) {
      this.updateInternals(true);
    }
  }
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private updateInternals(dispatch = false) {
    this[internals].states.delete('unchecked');
    this[internals].states.delete('checked');
    this[internals].ariaPressed = this.checked ? 'true' : 'false';
    this[internals].states.add(
      `${PROPERTY_FROM_ARIA_PRESSED[this[internals].ariaPressed]}`
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
  _ignoreClick = false;
  #handleClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    if (this._ignoreClick) return;
    this.#toggleChecked();
  }
  #handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.#toggleChecked();
    }
  }

  #toggleChecked() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.updateInternals();
  }
}
