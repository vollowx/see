// @ts-check

import BaseElement from './base-element.js';

/**
 * @typedef {BooleanConstructor|StringConstructor|NumberConstructor} PropertyTypes
 */

/**
 * @typedef {boolean|number|string} PropertyValueTypes
 */

/**
 * @typedef {Object} PropertyOptions
 * @property {PropertyTypes} type
 * @property {?string} attribute
 */

/** @param {() => void} callback */
const defer = (callback) => setTimeout(() => callback(), 0);

/**
 * @param {(name: string, target: BaseElement) => PropertyDescriptor} descriptor
 */
function decorateProperty(descriptor) {
  /**
   * @param {undefined} _
   * {{ kind: string, name: string }} options
   */
  return function (_, { kind, name }) {
    if (kind !== 'field') return;

    /**
     * @param {any} _
     */
    return function (_) {
      const _descriptor = descriptor(name, this);
      defer(() => Object.defineProperty(this, name, _descriptor));
      return _descriptor.get?.();
    };
  };
}

/** @param {string} tagName */
export function customElement(tagName) {
  /**
   * @param {any} target
   * @param {ClassDecoratorContext} _context
   */
  return (target, _context) => {
    if (!customElements.get(tagName)) customElements.define(tagName, target);
  };
}

/**
 * @param {{ type: BooleanConstructor|NumberConstructor|StringConstructor, attribute?: string}} options
 * @todo Load initial value
 */
export function property({ type, attribute }) {
  return decorateProperty((_, target) => {
    const setterGetter =
      type === Boolean
        ? {
            get: () => target.hasAttribute(attribute || _),
            /** @param {boolean} value */
            set: (value) =>
              target.toggleAttribute(attribute || _, Boolean(value)),
          }
        : type === Number
        ? {
            get: () => Number(target.getAttribute(attribute || _)),
            /** @param {number} value */
            set: (value) => target.setAttribute(attribute || _, String(value)),
          }
        : type === String
        ? {
            get: () => target.getAttribute(attribute || _) ?? '',
            /** @param {string} value */
            set: (value) => target.setAttribute(attribute || _, String(value)),
          }
        : {};
    return { ...setterGetter, configurable: true, enumerable: true };
  });
}

/**
 * @param {string} selector
 * @todo Add ability to cache
 */
export function query(selector) {
  return decorateProperty((_, target) => {
    return {
      get() {
        return target.renderRoot.querySelector(selector);
      },
      configurable: true,
      enumerable: true,
    };
  });
}

/**
 * @param {string} selector
 * @todo Add ability to cache
 */
export function queryAll(selector) {
  return decorateProperty((_, target) => {
    return {
      get() {
        return target.renderRoot.querySelectorAll(selector);
      },
      configurable: true,
      enumerable: true,
    };
  });
}
