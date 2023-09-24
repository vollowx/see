// @ts-check

/// <reference path="shared.d.ts" />

import { internals } from './symbols.js';

/** @param {Constructor<CustomElement>} Base */
const ReactiveMixin = (Base) => {
  return class Reactive extends Base {
    constructor() {
      super();
      this[internals] = this.attachInternals();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.adoptedStyleSheets = this.styles;
      this.shadowRoot.append(this.template.content.cloneNode(true));
    }

    /** @type {CSSStyleSheet[]} */
    get styles() {
      return [];
    }
    /** @type {HTMLTemplateElement} */
    get template() {
      return document.createElement('template');
    }

    connectedCallback() {
      super.connectedCallback?.();
      this.update?.({ first: true });
    }
    /**
     * @param {string} name
     * @param {string|null} oldValue
     * @param {string|null} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.update?.();
      }
    }

    queryCache = new Map();
  };
};

export default ReactiveMixin;
