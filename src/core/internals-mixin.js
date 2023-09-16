// @ts-check

import { internals } from './symbols.js';

/** @param {Constructor<CustomElement>} Base */
const InternalsMixin = (Base) =>
  class Form extends Base {
    constructor() {
      super();
      this[internals] = this.attachInternals();
    }
  };

export default InternalsMixin;
