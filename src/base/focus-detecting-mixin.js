// @ts-check

import ReactiveElement from '../core/reactive-element.js';

var fromKeyboard = false;

window.addEventListener(
  'keydown',
  () => {
    fromKeyboard = true;
  },
  { capture: true }
);
window.addEventListener(
  'mousedown',
  () => {
    fromKeyboard = false;
  },
  { capture: true }
);

/** @param {new () => ReactiveElement} Base */
const FocusDetectingMixin = (Base) =>
  class FocusDetecting extends Base {
    connectedCallback() {
      super.connectedCallback?.();
      this.addEventListener('focusin', this.#boundFocusIn);
      this.addEventListener('focusout', this.#boundFocusOut);
    }
    disconnectedCallback() {
      super.disconnectedCallback?.();
      this.removeEventListener('focusin', this.#boundFocusIn);
      this.removeEventListener('focusout', this.#boundFocusOut);
    }
    #boundFocusIn = this.#handleFocusIn.bind(this);
    #boundFocusOut = this.#handleFocusOut.bind(this);

    #handleFocusIn() {
      this.setAttribute('focus', fromKeyboard ? 'key' : 'pointer');
    }
    #handleFocusOut() {
      this.removeAttribute('focus');
    }
  };

export default FocusDetectingMixin;
