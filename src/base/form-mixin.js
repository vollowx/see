// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { internals } from './internals-mixin.js';

/** @param {new () => ReactiveElement} Base */
const FormMixin = (Base) =>
  class Form extends Base {
    static get formAssociated() {
      return true;
    }

    get form() {
      return this[internals].form ?? null;
    }
    get name() {
      return this.getAttribute('name');
    }
    get type() {
      return this.localName;
    }
  };

export default FormMixin;
