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
 * @param {{ type: PropertyTypes, overrideName?: string}} options
 * TODO: Load initial value
 */
export function property({ type, overrideName }) {
  return decorateProperty((name, target) => {
    const qualifiedName = overrideName || name.toLowerCase();
    const setterGetter =
      type === Boolean
        ? {
            get: () => target.hasAttribute(qualifiedName),
            /** @param {boolean} value */
            set: (value) =>
              target.toggleAttribute(qualifiedName, Boolean(value)),
          }
        : type === Number
        ? {
            get: () => Number(target.getAttribute(qualifiedName)),
            /** @param {number} value */
            set: (value) => target.setAttribute(qualifiedName, String(value)),
          }
        : type === String
        ? {
            get: () => target.getAttribute(qualifiedName) ?? '',
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
