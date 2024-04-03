import { LitElement } from 'lit';
import { internals } from './internals-attached';

type Constructor<T> = new (...args: any[]) => T;

export const FormAssociated = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class FormAssociatedElement extends superClass {
    static formAssociated = true;

    get form() {
      return this[internals].form;
    }
    get name() {
      return this.getAttribute('name');
    }
    // get type() {
    //   return this.localName;
    // }
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
  }

  return FormAssociatedElement as Constructor<LitElement> & T;
};
