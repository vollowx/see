// @ts-check

import { property } from '../core/decorators.js';
import ReactiveElement from '../core/reactive-element.js';

/** @param {new () => ReactiveElement} Base */
const AttachableMixin = (Base) =>
  class Attachable extends Base {
    connectedCallback() {
      super.connectedCallback?.();
      this.attach();
    }
    disconnectedCallback() {
      super.disconnectedCallback?.();
      this.detach();
    }

    /** @type {HTMLElement?} */
    get $control() {
      if (this.hasAttribute('for')) {
        if (!this.htmlFor || !this.isConnected) {
          return null;
        }

        return /** @type {HTMLElement} */ (this.getRootNode()).querySelector(
          `#${this.htmlFor}`
        );
      }

      return (
        this.#currentControl ||
        /** @type {HTMLElement} */
        (
          this.parentNode instanceof ShadowRoot
            ? this.parentNode.host
            : this.parentNode
        )
      );
    }
    /** @type {HTMLElement?} */
    #currentControl;
    /**
     * @param {string} name
     * @param {string|null} _oldValue
     * @param {string|null} _newValue
     */
    attributeChangedCallback(name, _oldValue, _newValue) {
      switch (name) {
        case 'for':
          this.#forChanged();
          break;

        default:
          break;
      }
    }
    static get observedAttributes() {
      return [...(super.observedAttributes || []), 'for'];
    }
    /** @type {string?} */
    @property({ override: 'for' }) htmlFor;
    #forChanged() {
      this.attach();
    }

    /** @param {HTMLElement?} next */
    attach(next = this.$control) {
      this.handleControlChange(this.#currentControl, next);
      this.#currentControl = next;
    }
    detach() {
      this.handleControlChange(this.#currentControl);
      this.#currentControl = null;
    }
    /**
     * @param {HTMLElement?} prev
     * @param {HTMLElement?} next
     */
    handleControlChange(prev = null, next = null) {}
  };

export default AttachableMixin;
