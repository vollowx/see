import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { InternalsAttached, internals } from './internals-attached.js';
import { FormAssociatedMixin } from './form-mixin.js';

import hiddenStyle from './hidden-style.js';

const Base = FormAssociatedMixin(InternalsAttached(LitElement));

export default class Button extends Base {
  constructor() {
    super();
    this[internals].role = 'button';
  }
  static styles = [hiddenStyle];
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.#boundKeyDown);
    this.addEventListener('keyup', this.#boundKeyUp);
    this.addEventListener('click', this.#boundClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.#boundKeyDown);
    this.removeEventListener('keyup', this.#boundKeyUp);
    this.removeEventListener('click', this.#boundClick);
  }

  static observedAttributes = ['disabled'];
  @property() type: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: Boolean }) disabled = false;

  update({ first = false, dispatch = false } = {}) {
    super.update?.({ first, dispatch });
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
