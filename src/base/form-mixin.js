// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { internals } from '../core/symbols.js';

/** @param {Constructor<ReactiveElement>} Base */
const FormMixin = (Base) =>
  class Form extends Base {
    static formAssociated = true;

    get form() {
      return this[internals].form;
    }
    get name() {
      return this.getAttribute('name');
    }
    get type() {
      return this.localName;
    }
    get validity() {
      return this[internals].validity;
    }
    get validationMessage() {
      return this[internals].validationMessage;
    }
    get willValidate() {
      return this[internals].willValidate;
    }

    checkValidity() {
      return this[internals].checkValidity();
    }
    reportValidity() {
      return this[internals].reportValidity();
    }
  };

export default FormMixin;
