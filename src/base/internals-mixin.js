// @ts-check

import ReactiveElement from '../core/reactive-element.js';

export const internals = Symbol('internals');

/** @param {new () => ReactiveElement} Base */
const InternalsMixin = (Base) =>
  class Form extends Base {
    constructor() {
      super();
      this[internals] = this.attachInternals();
    }
  };

export default InternalsMixin;
