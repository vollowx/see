// @ts-check

import ReactiveElement from './reactive-element.js';

/**
 * @typedef {BooleanConstructor|StringConstructor|NumberConstructor} PropertyTypes
 */

/**
 * @typedef {boolean|number|string} PropertyValueTypes
 */

/**
 * @typedef {Object} PropertyOptions
 * @property {PropertyTypes} type
 * @property {?string} override
 */

/** @param {() => void} callback */
const defer = (callback) => setTimeout(() => callback(), 0);

/**
 * @param {(name: string, target: ReactiveElement, initialValue: any) => PropertyDescriptor} descriptor
 */
function decorateProperty(descriptor) {
  /**
   * @param {undefined} _
   * {{ kind: string, name: string }} options
   */
  return function (_, { kind, name }) {
    if (kind !== 'field') return;

    /**
     * @param {any} initialValue
     */
    return function (initialValue) {
      const _descriptor = descriptor(name, this, initialValue);
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
 * @param {{ type: PropertyTypes, override?: string}} options
 * TODO: Add option to load initial value by the way of setting attribute
 */
export function property({ type, override }) {
  return decorateProperty((name, target, initialValue) => {
    const qualifiedName = override || name.toLowerCase();
    const setterGetter =
      type === Boolean
        ? {
            get: () => target.hasAttribute(qualifiedName) ?? initialValue,
            /** @param {boolean} value */
            set: (value) =>
              target.toggleAttribute(qualifiedName, Boolean(value)),
          }
        : type === Number
        ? {
            get: () =>
              Number(target.getAttribute(qualifiedName)) ?? initialValue,
            /** @param {number} value */
            set: (value) => target.setAttribute(qualifiedName, String(value)),
          }
        : type === String
        ? {
            get: () => target.getAttribute(qualifiedName) ?? initialValue,
            /** @param {string} value */
            set: (value) => target.setAttribute(qualifiedName, String(value)),
          }
        : {};
    return { ...setterGetter, configurable: true, enumerable: true };
  });
}

/**
 * @param {string} selector
 * TODO: Add ability to cache
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
 * TODO: Add ability to cache
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
