import { html } from './template.js';

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
  /** @type {HTMLElement|null} */
  get innerElement() {
    return this.getEl('[part="inner"]');
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
    try {
      shadowRoot.adoptedStyleSheets = this._styles;
      shadowRoot.appendChild(this._template.cloneNode(true));
    } catch (error) {
      console.error(error);
      return;
    }
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
   * @param {string|undefined} oldValue
   * @param {string|undefined} newValue
   * @returns {void}
   */
  attributeChangedCallback(name, oldValue, newValue) {}

  _doNothingTimesOnAttrCg = 0;
  /**
   * Sync attribute by empty is or not.
   * @param {string} attribute
   * @param {HTMLElement|null} target
   */
  syncDataAttrByEmpty(attribute, target = this.innerElement) {
    if (!target) {
      new Error('need target');
      return;
    }
    if (this._doNothingTimesOnAttrCg > 0) {
      this._doNothingTimesOnAttrCg--;
      return;
    }

    // restore attr name
    if (attribute.includes('data-')) attribute = attribute.replace('data-', '');
    let innerAttrName = attribute;
    let outerAttrName = `data-${attribute}`;
    let hasInnerAttr = target.hasAttribute(innerAttrName);
    let hasOuterAttr = this.hasAttribute(outerAttrName);
    let outerAttrVal = this.getAttribute(outerAttrName);
    // bad attribute
    // attribute name should not on outer element, should use `data-${attribute name}`.
    let hasBadAttr = this.hasAttribute(attribute);
    let badAttrVal = this.getAttribute(attribute);
    if (hasBadAttr) {
      this._doNothingTimesOnAttrCg += 2;
      this.setAttribute(outerAttrName, badAttrVal || '');
      this.removeAttribute(attribute);
      hasOuterAttr = true;
      outerAttrVal = badAttrVal;
    }
    // to sync
    if (outerAttrVal) {
      target.setAttribute(innerAttrName, outerAttrVal);
    } else {
      // to remove
      if (hasOuterAttr) this.removeAttribute(outerAttrName);
      if (hasInnerAttr) target.removeAttribute(innerAttrName);
    }
  }
  /**
   * @param {string} attribute
   * @param {HTMLElement|null} target
   * @returns {boolean|undefined}
   */
  syncNonDataAttrByBoolean(attribute, target = this.innerElement) {
    if (!target) {
      new Error('need target');
      return;
    }
    let trueFalse = this.hasAttribute(attribute);
    target.toggleAttribute(attribute, trueFalse);
    return trueFalse;
  }
  /**
   * @param {string} attribute
   * @param {HTMLElement|null} target
   * @param {boolean|null} autoRemove if value is empty, remove attribute
   */
  fillNonDataAttr(attribute, target = this.innerElement, autoRemove = true) {
    if (!target) {
      new Error('need target');
      return;
    }
    let outerAttrName = attribute;
    let outerAttrVal = this.getAttribute(outerAttrName);
    target.textContent = outerAttrVal;
    if (!outerAttrVal && autoRemove) {
      this.removeAttribute(outerAttrName);
    }
  }
}
