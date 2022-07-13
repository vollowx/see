import { html, css } from "./template.js";

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

export default class Button extends HTMLElement {
  static get is() {
    return 'ty-button';
  }

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
      'label',
      'leading-icon',
      'trailing-icon',
    ];
  }
  /**
   * @returns {boolean}
   */
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

  get label() {
    return this.getAttribute('label') || '';
  }
  set label(value) {
    this.setAttribute('label', value);
  }
  get leadingIcon() {
    return this.getAttribute('leading-icon') || '';
  }
  set leadingIcon(value) {
    this.setAttribute('leading-icon', value);
  }
  get trailingIcon() {
    return this.getAttribute('trailing-icon') || '';
  }
  set trailingIcon(value) {
    this.setAttribute('trailing-icon', value);
  }

  focus() {
    this.buttonElement?.focus();
  }
  blur() {
    this.buttonElement?.blur();
  }

  /**
   * @param {string} value
   * @returns {any}
   */
  getEl(value) {
    // @ts-ignore
    return this.shadowRoot.querySelector(value);
  }

  /**
   * @returns {HTMLButtonElement}
   */
  get buttonElement() {
    return this.getEl('[part~="button"]');
  }
  /**
   * @returns {HTMLSpanElement}
   */
  get labelElement() {
    return this.getEl('[part~="label"]');
  }
  /**
   * @returns {HTMLSpanElement}
   */
  get leadingIconElement() {
    return this.getEl('[part~="leading-icon"]');
  }
  /**
   * @returns {HTMLSpanElement}
   */
  get trailingIconElement() {
    return this.getEl('[part~="trailing-icon"]');
  }

  /**
   * @type {CSSStyleSheet[]}
   */
  get _styles() {
    return [BasicButtonStyle];
  }

  #attachShadow() {
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }
  get _extraContents() {
    return ``;
  }
  get #template() {
    return html`
      <${this.getAttribute('component') || 'button'}
        role="${this.role ? this.role : 'button'}" type="button" tabindex="0"
        part="inner button focus-controller"
        ${this.disabled ? 'disabled' : ''}
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        aria-label="${this.ariaLabel || this.label || ''}"
        aria-haspopup="${this.ariaHasPopup ? this.ariaHasPopup : ''}"
        aria-controls="${this.ariaControls || ''}"
        aria-expanded="${this.ariaExpanded ? this.ariaExpanded : ''}"
        aria-selected="${this.ariaSelected || ''}">
        <span part="state-layer"></span>
        <span part="focus-ring"></span>
        ${this._extraContents}
        <span part="target"></span>
        <span part="leading-icon-root">
          <span part="leading-icon">${this.leadingIcon}</span>
          <slot name="leading-icon"></slot>
        </span>
        <span part="label-root">
          <span part="label">${this.label}</span>
          <slot></slot>
        </span>
        <span part="trailing-icon-root">
          <span part="trailing-icon">${this.trailingIcon}</span>
          <slot name="trailing-icon"></slot>
        </span>
      </${this.getAttribute('component') || 'button'}>
    `;
  }
  #rendered = false;
  #renderTemplate() {
    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) {
      console.error('Can not render template without shadowRoot');
      return;
    };
    shadowRoot.appendChild(this.#template);
    shadowRoot.adoptedStyleSheets = this._styles;
    this.#rendered = true;
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
  constructor() {
    super();
  }
  connectedCallback() {
    this.#attachShadow();
    this.#renderTemplate();
    this.buttonElement.addEventListener('touchstart', this.handleTouchStart, true);
    this.buttonElement.addEventListener('mouseout', this.handleMouseOut, true);
  }
  disconnectedCallback() {}
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

    if (!this.#rendered) return;

    // After render

    switch (name) {
      case 'disabled':
        this.buttonElement.disabled = this.disabled;
        this.buttonElement.ariaDisabled = this.disabled ? 'true' : 'false';
        break;

      case 'label':
        this.labelElement.innerText = this.label;
        if (!this.ariaLabel) {
          this.buttonElement.ariaLabel = this.label;
        }
        break;

      case 'data-role':
        this.buttonElement.setAttribute('role', this.role);
        break;

      case 'data-aria-label':
        this.buttonElement.ariaLabel = this.ariaLabel || this.label;
        break;

      case 'data-aria-haspopup':
        this.buttonElement.ariaHasPopup = this.ariaHasPopup ? this.ariaHasPopup : '';
        break;

      case 'data-aria-controls':
        this.buttonElement.setAttribute('aria-controls', this.ariaControls || '');
        break;

      case 'data-aria-expanded':
        this.buttonElement.ariaExpanded = this.ariaExpanded ? this.ariaExpanded : '';
        break;

      case 'data-aria-selected':
        this.buttonElement.ariaSelected = this.ariaSelected ? this.ariaSelected : '';
        break;

      default:
        break;
    }
  }
}

customElements.define(Button.is, Button);
