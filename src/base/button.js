// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { sheetsFromCss } from '../core/template.js';
import { property } from '../core/decorators.js';
import { internals } from '../core/symbols.js';

import FocusDetectingMixin from './focus-detecting-mixin.js';
import FormMixin from './form-mixin.js';

import HiddenStyles from './hidden.css?inline';

const Base = FocusDetectingMixin(FormMixin(ReactiveElement));

export default class Button extends Base {
  constructor() {
    super();
    this[internals].role = 'button';
  }
  get styles() {
    return [...sheetsFromCss(HiddenStyles)];
  }
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
  /** @type {'button'|'submit'|'reset'} */
  @property() type = 'button';
  @property({ type: Boolean }) disabled = false;

  update({ first = false, dispatch = false } = {}) {
    super.update?.({ first, dispatch });
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this[internals].ariaDisabled = this.disabled ? 'true' : 'false';
  }

  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  #boundClick = this.#handleClick.bind(this);
  /** @param {KeyboardEvent} e */
  #handleKeyDown(e) {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'Enter') {
      this.click();
    }
  }
  /** @param {KeyboardEvent} e */
  #handleKeyUp(e) {
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
