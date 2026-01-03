import { LitElement } from 'lit';
import { internals } from './internals-attached.js';

export declare class FormAssociatedInterface {
  form: HTMLFormElement | null;
  name: string | null;
  // type: string;
  validity: ValidityState;
  validationMessage: string;
  willValidate: boolean;

  checkValidity(): boolean;
  reportValidity(): boolean;
}

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
