import ReactiveElement from './reactive-element.js';

const defer = (window.requestIdleCallback || requestAnimationFrame).bind(
  window
);

/**
 * @typedef {BooleanConstructor | StringConstructor | NumberConstructor} PropertyTypes
 * @typedef {boolean | number | string} PropertyValueTypes
 */

/**
 * @param {(target: ReactiveElement, name: string|symbol, value: any) => PropertyDescriptor} processAccessor
 */
const propertyDecorator =
  (processAccessor) =>
  (/** @type {any} */ _, /** @type {ClassFieldDecoratorContext} */ context) => {
    /** @param {any} initialValue */
    return function (initialValue) {
      // @ts-ignore
      const target = /** @type {ReactiveElement} */ (this);
      const descriptor = {
        ...processAccessor(target, context.name, initialValue),
        configurable: true,
        enumerable: true,
      };
      defer(() => Object.defineProperty(target, context.name, descriptor));
      return descriptor.get?.() ?? initialValue;
    };
  };

/** @param {string} name */
export function customElement(name) {
  return (
    /** @type {any} */ _target,
    /** @type {ClassDecoratorContext} */ context
  ) => {
    context.addInitializer(function () {
      customElements.define(
        name,
        /** @type {CustomElementConstructor} */ (this)
      );
    });
  };
}

/**
 * @param {{ type?: PropertyTypes, attribute?: string } | null} [options=null]
 */
export const property = (options = null) =>
  propertyDecorator((target, name, initialValue) => {
    const qualifiedName = options?.attribute || String(name).toLowerCase();

    return options?.type === Boolean
      ? {
          get: () => target.hasAttribute(qualifiedName) ?? initialValue,
          /** @param {PropertyValueTypes} value - The value to set. */
          set: (value) => target.toggleAttribute(qualifiedName, Boolean(value)),
        }
      : options?.type === Number
      ? {
          get: () => Number(target.getAttribute(qualifiedName) ?? initialValue),
          /** @param {PropertyValueTypes} value - The value to set. */
          set: (value) => target.setAttribute(qualifiedName, String(value)),
        }
      : {
          get: () => target.getAttribute(qualifiedName) ?? initialValue,
          /** @param {PropertyValueTypes} value - The value to set. */
          set: (value) => target.setAttribute(qualifiedName, String(value)),
        };
  });

/**
 * @param {string} selector
 * @param {boolean} [cache=true]
 */
export const query = (selector, cache = true) =>
  propertyDecorator((target, name, value) => {
    return cache
      ? {
          get() {
            if (target.queryCache.get(selector) === undefined)
              target.queryCache.set(
                selector,
                target.shadowRoot?.querySelector(selector)
              );
            return target.queryCache.get(selector);
          },
        }
      : {
          get() {
            return target.shadowRoot?.querySelector(selector);
          },
        };
  });

/**
 * @param {string} selector
 */
export const queryAll = (selector) =>
  propertyDecorator((target, name, value) => {
    return {
      get() {
        return target.shadowRoot?.querySelectorAll(selector);
      },
    };
  });
