// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property, query } from '../core/decorators.js';

import MdRipple from './ripple.js';

import MdButtonStyle from './button.css?inline';
import MdFocusRingStyle from './focus-ring.css?inline';
import MdStateLayerStyle from './state-layer.css?inline';
import MdTargetStyle from './target.css?inline';

@customElement('md-button')
export default class MdButton extends ReactiveElement {
  get styles() {
    return [
      ...sheetsFromCss([
        MdButtonStyle,
        MdFocusRingStyle,
        MdStateLayerStyle,
        MdTargetStyle,
      ]),
    ];
  }
  get template() {
    return html`
      <span part="focus-ring"></span>
      <span part="state-layer"></span>
      <span part="target"></span>
      <md-ripple></md-ripple>
      <slot name="icon"></slot>
      <slot></slot>
      <slot name="trailingicon"></slot>
    `;
  }
  /** @type {MdRipple} */
  @query('md-ripple') $ripple;
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    this.addEventListener('keydown', this.#boundKeyDown);
    this.addEventListener('keyup', this.#boundKeyUp);
  }
  disconnectedCallback() {
    this.removeEventListener('keydown', this.#boundKeyDown);
    this.removeEventListener('keyup', this.#boundKeyUp);
  }
  /**
   * @param {string} name
   * @param {string|null} _oldValue
   * @param {string|null} _newValue
   */
  attributeChangedCallback(name, _oldValue, _newValue) {
    switch (name) {
      case 'disabled':
        this.#disabledChanged();
        break;

      default:
        break;
    }
  }
  static get observedAttributes() {
    return ['disabled'];
  }
  @property({ type: Boolean }) disabled = false;
  #disabledChanged() {
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  #spaceKeyDown = false;

  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  /** @param {KeyboardEvent} e */
  #handleKeyDown(e) {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'Enter') {
      this.click();
    } else if (e.key === ' ') {
      this.#spaceKeyDown = true;
    }
  }
  /** @param {KeyboardEvent} e */
  #handleKeyUp(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.#spaceKeyDown && e.key === ' ') {
      this.#spaceKeyDown = false;
      this.click();
    }
  }
}
