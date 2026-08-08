import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import {
  InternalsAttached,
  internals,
  updateInternals,
} from './mixins/internals-attached.js';
import { FormAssociated } from './mixins/form-associated.js';
import { hiddenStyles } from './hidden-styles.css.js';

const Base = FormAssociated(InternalsAttached(LitElement));

export class Button extends Base {
  @property({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';

  static override styles = [hiddenStyles];

  constructor() {
    super();
    this[internals].role = 'button';
    this[updateInternals]();

    // This is set to prevent a first-paint-time transition for styles like
    // `border-radius` on `:host`. Also in `ToggleButton`.
    // Double `requestAnimationFrame` is necessary since the callback inside is
    // called before the nth frame is printed.
    this.setAttribute('notransition', '');
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.#handleKeyDown);
    this.addEventListener('keyup', this.#handleKeyUp);
    this.addEventListener('click', this._handleClick.bind(this));
    requestAnimationFrame(() =>
      requestAnimationFrame(() => this.removeAttribute('notransition'))
    );
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.#handleKeyDown);
    this.removeEventListener('keyup', this.#handleKeyUp);
    this.removeEventListener('click', this._handleClick.bind(this));
  }

  override updated(changed: Map<string, any>) {
    if (changed.has('disabled')) this[updateInternals]();
  }

  override [updateInternals]() {
    this.tabIndex = this.disabled ? -1 : 0;
    this[internals].ariaDisabled = String(this.disabled);
  }

  #handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'Enter') this.click();
    else this[internals].states.add('active');
    // TODO: consider handle `pointerdown` and ditch native `:active` selector
    // TODO: supporting `Enter` also requires listening on `focusout`
  };

  #handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      this[internals].states.delete('active');
      e.preventDefault();
      e.stopPropagation();
      this.click();
    }
  };

  _handleClick(e: Event) {
    if (this.type !== 'button') this[internals].form?.[this.type]();
  }
}
