import Env from './env.js';
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
    return this.getEl('[part~="inner"]');
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
  renderAccessibility() {
    return ``;
  }
  _renderContents() {
    return `<slot></slot>`;
  }
  /** @type {DocumentFragment|string} */
  get _template() {
    return html``;
  }
  _rendered = false;
  _renderTemplate() {
    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) {
      throw new Error('shadowRoot is null');
    }
    shadowRoot.innerHTML = '';
    if (typeof this._template === 'string') {
      shadowRoot.innerHTML = this._template;
    } else {
      try {
        shadowRoot.adoptedStyleSheets = this._styles;
        shadowRoot.appendChild(this._template.cloneNode(true));
      } catch (error) {
        console.error(error);
        return;
      }
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
      throw new Error('need target');
    }
    if (this._doNothingTimesOnAttrCg > 0) {
      this._doNothingTimesOnAttrCg--;
      if (Env.isDev) {
        console.log(`${this.tagName} syncDataAttrByEmpty: ${attribute}, do nothing`);
      }
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
      if (hasOuterAttr) {
        this._doNothingTimesOnAttrCg++;
        this.removeAttribute(outerAttrName);
      }
      if (hasInnerAttr) target.removeAttribute(innerAttrName);
    }
  }
  /**
   * @param {string} attribute
   * @param {HTMLElement|null} target
   * @param {boolean|null} autoRemove
   * @param {string} inner
   */
  syncNonDataAttrByEmpty(attribute, target = this.innerElement, autoRemove = true, inner = attribute) {
    if (!target) {
      throw new Error('need target');
    }
    if (this._doNothingTimesOnAttrCg > 0) {
      this._doNothingTimesOnAttrCg--;
      if (Env.isDev) {
        console.log(`${this.tagName} syncDataAttrByEmpty: ${attribute}, do nothing`);
      }
      return;
    }
    if (attribute.includes('data-')) {
      throw new Error('non-data attribute should not include data-');
    }

    let hasOuterAttr = this.hasAttribute(attribute);
    let hasInnerAttr = target.hasAttribute(inner);
    let outerAttrVal = this.getAttribute(attribute);
    // to sync
    if (outerAttrVal) {
      target.setAttribute(inner, outerAttrVal);
    } else {
      // to remove
      if (hasOuterAttr && autoRemove) {
        this._doNothingTimesOnAttrCg++;
        this.removeAttribute(attribute);
      }
      if (hasInnerAttr) target.removeAttribute(inner);
    }
  }
  /**
   * @param {string} attribute
   * @param {HTMLElement|null} target
   * @returns {boolean|undefined}
   */
  syncNonDataAttrByBoolean(attribute, target = this.innerElement) {
    if (!target) {
      throw new Error('need target');
    }
    let trueFalse = this.hasAttribute(attribute);
    if (target.hasAttribute(attribute) === trueFalse) return trueFalse;
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
      throw new Error('need target');
    }
    let outerAttrName = attribute;
    let outerAttrVal = this.getAttribute(outerAttrName);
    target.textContent = outerAttrVal;
    if (!outerAttrVal && autoRemove) {
      this.removeAttribute(outerAttrName);
    }
  }
}
