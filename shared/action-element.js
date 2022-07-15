import { html, css } from "./template.js";
import BaseElement from "./base-element.js";

const BasicButtonStyle = new CSSStyleSheet();
BasicButtonStyle.replaceSync(css`
  :host {
    flex-shrink: 0;
    display: inline-flex;
    outline: none;
    appearance: none;
  }
  :host([hidden]) {
    display: none;
    visibility: hidden;
  }
  :host([disabled]) {
    pointer-events: none;
  }
  [part~="button"] {
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    vertical-align: middle;
    user-select: none;
    box-sizing: border-box;
    z-index: 0;
  }
`);

/**
 * 'ns' means 'no-style'
 */
export default class ActionElement extends BaseElement {
  static get is() {
    return 'ns-action';
  }

  _delegatesFocus = true;

  /** @type {string[]} */
  static get observedAttributes() {
    return [
      'disabled',
      'role',
      'data-role',
      'aria-label',
      'data-aria-label',
      'aria-haspopup',
      'data-aria-haspopup',
      'aria-controls',
      'data-aria-controls',
      'aria-expanded',
      'data-aria-expanded',
      'aria-selected',
      'data-aria-selected',
    ];
  }
  /** @type {boolean} */
  get disabled() {
    return this.hasAttribute('disabled');
  }
  /**
   * @param {boolean} value
   */
  set disabled(value) {
    this.toggleAttribute('disabled', value);
  }

  get role() {
    return this.getAttribute('data-role') || 'button';
  }
  set role(value) {
    if (value) {
      this.setAttribute('data-role', value);
    } else {
      this.removeAttribute('data-role');
    }
  }

  get ariaLabel() {
    return this.getAttribute('data-aria-label');
  }
  set ariaLabel(value) {
    if (value) {
      this.setAttribute('data-aria-label', value);
    } else {
      this.removeAttribute('data-aria-label');
    }
  }

  get ariaHasPopup() {
    return this.getAttribute('data-aria-haspopup');
  }
  set ariaHasPopup(value) {
    if (value) {
      this.setAttribute('data-aria-haspopup', value);
    } else {
      this.removeAttribute('data-aria-haspopup');
    }
  }

  get ariaControls() {
    return this.getAttribute('data-aria-controls');
  }
  set ariaControls(value) {
    if (value) {
      this.setAttribute('data-aria-controls', value);
    } else {
      this.removeAttribute('data-aria-controls');
    }
  }

  get ariaExpanded() {
    return this.getAttribute('data-aria-expanded');
  }
  set ariaExpanded(value) {
    if (value) {
      this.setAttribute('data-aria-expanded', value);
    } else {
      this.removeAttribute('data-aria-expanded');
    }
  }

  get ariaSelected() {
    return this.getAttribute('data-aria-selected');
  }
  set ariaSelected(value) {
    if (value) {
      this.setAttribute('data-aria-selected', value);
    } else {
      this.removeAttribute('data-aria-selected');
    }
  }

  focus() {
    this.buttonElement?.focus();
  }
  blur() {
    this.buttonElement?.blur();
  }

  /** @type {HTMLButtonElement} */
  get buttonElement() {
    return this.getEl('[part~="button"]');
  }

  /** @type {CSSStyleSheet[]} */
  get _styles() {
    return [BasicButtonStyle];
  }
  
  get _extraContents() {
    return ``;
  }
  get _mainContents() {
    return `<slot></slot>`;
  }
  get _template() {
    return html`
      <${this.getAttribute('component') || 'button'}
        role="${this.role ? this.role : 'button'}" type="button" tabindex="0"
        part="inner button focus-controller"
        ${this.disabled ? 'disabled' : ''}
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        aria-label="${this.ariaLabel || ''}"
        aria-haspopup="${this.ariaHasPopup || ''}"
        aria-controls="${this.ariaControls || ''}"
        aria-expanded="${this.ariaExpanded || ''}"
        aria-selected="${this.ariaSelected || ''}">
        <span part="state-layer"></span>
        <span part="focus-ring"></span>
        ${this._extraContents}
        <span part="target"></span>
        ${this._mainContents}
      </${this.getAttribute('component') || 'button'}>
    `;
  }
  /**
   * @param {TouchEvent} _event 
   */
  handleTouchStart(_event) {
    this.setAttribute('touched', '');
  }
  /**
   * @param {FocusEvent} _event 
   */
  handleMouseOut(_event) {
    if (this.hasAttribute('touched')) {
      this.removeAttribute('touched');
    }
  }
  connectedCallback() {
    this.buttonElement.addEventListener('touchstart', this.handleTouchStart, true);
    this.buttonElement.addEventListener('mouseout', this.handleMouseOut, true);
  }
  /**
   * @param {string} name
   * @param {string|undefined} _oldValue
   * @param {string|undefined} newValue
   * @returns {void}
   */
  attributeChangedCallback(name, _oldValue, newValue) {
    // Before render

    switch (name) {
      case 'role':
        if (!newValue) return;
        this.role = newValue;
        this.removeAttribute('role');
        break;

      case 'aria-label':
        if (!newValue) return;
        this.ariaLabel = newValue;
        this.removeAttribute('aria-label');
        break;

      case 'aria-haspopup':
        if (!newValue) return;
        this.ariaHasPopup = newValue;
        this.removeAttribute('aria-haspopup');
        break;

      case 'aria-controls':
        if (!newValue) return;
        this.ariaControls = newValue;
        this.removeAttribute('aria-controls');
        break;

      case 'aria-expanded':
        if (!newValue) return;
        this.ariaExpanded = newValue;
        this.removeAttribute('aria-expanded');
        break;

      case 'aria-selected':
        if (!newValue) return;
        this.ariaSelected = newValue;
        this.removeAttribute('aria-selected');
        break;

      default:
        break;
    }

    if (!this._rendered) return;

    // After render

    switch (name) {
      case 'disabled':
        this.buttonElement.disabled = this.disabled;
        this.buttonElement.ariaDisabled = this.disabled ? 'true' : 'false';
        break;

      case 'data-role':
        this.buttonElement.setAttribute('role', this.role);
        break;

      case 'data-aria-label':
        this.buttonElement.ariaLabel = this.ariaLabel || '';
        break;

      case 'data-aria-haspopup':
        this.buttonElement.ariaHasPopup = this.ariaHasPopup || '';
        break;

      case 'data-aria-controls':
        this.buttonElement.setAttribute('aria-controls', this.ariaControls || '');
        break;

      case 'data-aria-expanded':
        this.buttonElement.ariaExpanded = this.ariaExpanded || '';
        break;

      case 'data-aria-selected':
        this.buttonElement.ariaSelected = this.ariaSelected || '';
        break;

      default:
        break;
    }
  }
}

customElements.define(ActionElement.is, ActionElement);
