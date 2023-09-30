import ReactiveElement from '../core/reactive-element.js';
import { property } from '../core/decorators.js';

/** @param {Constructor<ReactiveElement>} Base */
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
     * @param {string|null} oldValue
     * @param {string|null} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'for':
          this.#update();
          break;

        default:
          super.attributeChangedCallback?.(name, oldValue, newValue);
          break;
      }
    }
    // @ts-ignore
    static observedAttributes = [...(super.observedAttributes ?? []), 'for'];
    /** @type {string?} */
    @property({ attribute: 'for' }) htmlFor;
    #update() {
      this.attach(this.$control);
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
