// @ts-check
//
import ReactiveElement from '../core/reactive-element.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property, query } from '../core/decorators.js';

import MdSwitchStyle from './switch.css?inline';
import MdFocusRingStyle from './focus-ring.css?inline';
import MdTargetStyle from './target.css?inline';

function isRTL() {
  return document.documentElement.dir === 'rtl';
}

@customElement('md-switch')
export default class MdSwitch extends ReactiveElement {
  get styles() {
    return [...sheetsFromCss([MdSwitchStyle, MdFocusRingStyle, MdTargetStyle])];
  }
  get template() {
    return html`
      <div part="switch">
        <span part="focus-ring"></span>
        <span part="target"></span>
        <span part="track"></span>
        <span part="thumb">
          ${this.templateOffIcon}${this.templateOnIcon}
        </span>
      </div>
      <slot></slot>
    `;
  }
  get templateOnIcon() {
    return html`
      <svg part="icons icon-on" viewBox="0 0 24 24">
        <path
          d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z"
        />
      </svg>
    `.innerHTML;
  }
  get templateOffIcon() {
    return html`
      <svg part="icons icon-off" viewBox="0 0 24 24">
        <path
          d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z"
        />
      </svg>
    `.innerHTML;
  }
  /** @type {HTMLSpanElement} */
  @query('[part~="switch"]') $switch;
  /** @type {HTMLSpanElement} */
  @query('[part~="thumb"]') $thumb;
  connectedCallback() {
    if (!this.hasAttribute('type')) {
      this.setAttribute('type', 'button');
    }
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.setAttribute('aria-pressed', this.checked ? 'true' : 'false');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');

    this.addEventListener('click', this.#boundClick);
    this.addEventListener('keydown', this.#boundKeyDown);
    this.addEventListener('keyup', this.#boundKeyUp);
    this.addEventListener('pointerdown', this.#boundPointerDown);
    this.addEventListener('pointerup', this.#boundPointerUp);
  }
  disconnectedCallback() {
    this.removeEventListener('click', this.#boundClick);
    this.removeEventListener('keydown', this.#boundKeyDown);
    this.removeEventListener('keyup', this.#boundKeyUp);
    this.removeEventListener('pointerdown', this.#boundPointerDown);
    this.removeEventListener('pointerup', this.#boundPointerUp);
  }
  /**
   * @param {string} name
   * @param {string|null} _oldValue
   * @param {string|null} _newValue
   */
  attributeChangedCallback(name, _oldValue, _newValue) {
    switch (name) {
      case 'checked':
        this.#checkedChanged();
        break;

      case 'disabled':
        this.#disabledChanged();
        break;

      default:
        break;
    }
  }
  static get observedAttributes() {
    return ['checked', 'disabled', 'icons', 'checkedicononly'];
  }
  @property({ type: Boolean }) checked = false;
  #checkedChanged() {
    this.setAttribute('aria-pressed', this.checked ? 'true' : 'false');
  }
  @property({ type: Boolean }) disabled = false;
  #disabledChanged() {
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }
  @property({ type: Boolean }) icons = false;
  @property({ type: Boolean }) checkedIconOnly = false;

  #handledPointerMove = false;
  #pointerDownX = 0;

  #boundClick = this.#handleClick.bind(this);
  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  #boundPointerDown = this.#handlePointerDown.bind(this);
  #boundPointerMove = this.#handlePointerMove.bind(this);
  #boundPointerUp = this.#handlePointerUp.bind(this);
  /** @param {PointerEvent} e */
  #handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.#handledPointerMove) {
      return;
    }
    this.#toggleState();
  }
  /** @param {KeyboardEvent} e */
  #handleKeyUp(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.key === ' ') {
      this.#toggleState();
    }
  }
  /** @param {KeyboardEvent} e */
  #handleKeyDown(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.repeat) {
      return;
    }
    if (e.key === 'Enter') {
      this.#toggleState();
    }
  }
  /** @param {PointerEvent} e */
  #handlePointerDown(e) {
    if (e.button !== 0) return;

    this.#pointerDownX = e.clientX;
    this.#handledPointerMove = false;

    this.setPointerCapture(e.pointerId);
    this.addEventListener('pointermove', this.#boundPointerMove);
  }
  /** @param {PointerEvent} e */
  #handlePointerMove(e) {
    this.#handledPointerMove = true;
    e.preventDefault();

    const diff = (isRTL() ? -1 : 1) * (e.clientX - this.#pointerDownX);
    const limitedDiff = this.checked
      ? Math.min(0, Math.max(-20, diff))
      : Math.min(20, Math.max(0, diff));
    this.$thumb.style.setProperty(
      '--_thumb-diff-pointer',
      `${2 * limitedDiff}px`
    );
    // Thumb loses its `:active` status before pointer up event
    this.$thumb.style.setProperty('--_thumb-diameter', '28px');
    this.$thumb.style.transitionDuration = '0s';
  }
  /** @param {PointerEvent} e */
  #handlePointerUp(e) {
    this.removeEventListener('pointermove', this.#boundPointerMove);
    this.releasePointerCapture(e.pointerId);

    const thumbRect = this.$thumb.getBoundingClientRect();
    const rootbRect = this.$switch.getBoundingClientRect();
    const diff =
      thumbRect.left +
      thumbRect.width / 2 -
      rootbRect.left -
      rootbRect.width / 2;
    const shouldBeChecked = (diff >= 0 && !isRTL()) || (diff < 0 && isRTL());

    if (this.checked != shouldBeChecked) this.#toggleState();
    this.$thumb.style.setProperty('--_thumb-diff-pointer', '');
    this.$thumb.style.setProperty('--_thumb-diameter', '');
    this.$thumb.style.transitionDuration = '';
  }

  #toggleState() {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: this.checked,
      })
    );
  }
}
