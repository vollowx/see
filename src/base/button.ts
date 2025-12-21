import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { InternalsAttached, internals } from './internals-attached.js';
import { FormAssociated } from './form-associated.js';
import { hiddenStyles } from './hidden-styles.css.js';

const Base = FormAssociated(InternalsAttached(LitElement));

export class Button extends Base {
  constructor() {
    super();
    this[internals].role = 'button';
    this.updateInternals();
  }
  static override styles = [hiddenStyles];
  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.#boundKeyDown);
    this.addEventListener('keyup', this.#boundKeyUp);
    this.addEventListener('click', this.#boundClick);
  }
  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.#boundKeyDown);
    this.removeEventListener('keyup', this.#boundKeyUp);
    this.removeEventListener('click', this.#boundClick);
  }
  protected override updated(changed: Map<string, any>) {
    if (changed.has('disabled')) {
      this.updateInternals();
    }
  }
  @property({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private updateInternals() {
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
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
  #handleClick() {
    if (this.type !== 'button') this[internals].form?.[this.type]();
  }
}
