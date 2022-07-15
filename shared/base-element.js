import { html } from "./template.js";

export default class BaseElement extends HTMLElement {
  static get is() {
    return 'ns-base';
  }

  /** @type {string[]} */
  static get observedAttributes() {
    return [];
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
   * @type {CSSStyleSheet[]}
   */
  get _styles() {
    return [];
  }

  _delegatesFocus = false;
  _attachShadow() {
    this.attachShadow({ mode: 'open', delegatesFocus: this._delegatesFocus });
  }
  get _extraContents() {
    return ``;
  }
  get _mainContents() {
    return `<slot></slot>`;
  }
  get _template() {
    return html``;
  }
  _rendered = false;
  _renderTemplate() {
    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) {
      console.error('Can not render template without shadowRoot');
      return;
    }
    shadowRoot.appendChild(this._template);
    shadowRoot.adoptedStyleSheets = this._styles;
    this._rendered = true;
  }
  constructor() {
    super();
    this._attachShadow();
    this._renderTemplate();
  }
  connectedCallback() {}
  disconnectedCallback() {}
  /**
   * @param {string} name
   * @param {string|undefined} _oldValue
   * @param {string|undefined} newValue
   * @returns {void}
   */
  attributeChangedCallback(name, _oldValue, newValue) {}
}
