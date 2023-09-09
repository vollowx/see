// @ts-check

import ReactiveElement from '../core/reactive-element.js';

/** @param {new () => ReactiveElement} Base */
export default function FormMixin(Base) {
  return class extends Base {
    static get formAssociated() {
      return true;
    }
    connectedCallback() {
      super.connectedCallback?.();
      this._internals = this.attachInternals();
    }

    get form() {
      return this._internals?.form ?? null;
    }
    get name() {
      return this.getAttribute('name');
    }
    get type() {
      return this.localName;
    }
  };
}
