/// <reference path="shared.d.ts" />

import { internals } from './symbols.js';

/** @param {Constructor<CustomElement>} Base */
const ReactiveMixin = (Base) => {
  return class Reactive extends Base {
    [internals] = this.attachInternals();

    constructor() {
      super();

      let shadowRoot = this[internals].shadowRoot;

      if (!shadowRoot) {
        shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.append(
          (
            this.constructor.prototype.template ??
            document.createElement('template')
          ).content.cloneNode(true)
        );
        shadowRoot.adoptedStyleSheets = this.constructor.prototype.styles ?? [];
      }
    }

    connectedCallback() {
      super.connectedCallback?.();
      this.update?.({ first: true });
    }
    /**
     * @param {string} name
     * @param {string | null} oldValue
     * @param {string | null} newValue
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
