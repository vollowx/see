import { LitElement } from 'lit';

type Constructor<T> = new (...args: any[]) => T;

export const FormAssociatedMixin = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class FormAssociatedElement extends superClass {
    static formAssociated = true;

    get form() {
      return this._internals.form;
    }
    get name() {
      return this.getAttribute('name');
    }
    // get type() {
    //   return this.localName;
    // }
    get validity() {
      return this._internals.validity;
    }
    get validationMessage() {
      return this._internals.validationMessage;
    }
    get willValidate() {
      return this._internals.willValidate;
    }

    checkValidity() {
      return this._internals.checkValidity();
    }
    reportValidity() {
      return this._internals.reportValidity();
    }
  }

  return FormAssociatedElement as Constructor<LitElement> & T;
};
