// @ts-check

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

/** @param {() => void} callback */
const defer = (callback) => setTimeout(() => callback(), 0);

/**
 * User type definition
 * @typedef {Object} PropertyOptions
 * @property {BooleanConstructor|StringConstructor|NumberConstructor} type
 * @property {string?} override
 */

/**
 * @param {PropertyOptions} options
 * @todo Try to remove defer, automatically set initial value, better structure
 */
export function property(options) {
  /**
   * @param {undefined} _value
   * @param {{ kind: string, name: string }} options
   */
  return function (_value, { kind, name }) {
    if (kind === 'field') {
      let attributeName = options.override ?? name;
      /**
       * @param {any} _initialValue
       */
      return function (_initialValue) {
        switch (options.type) {
          case Boolean:
            defer(() => {
              Object.defineProperty(this, name, {
                get() {
                  return this.hasAttribute(attributeName);
                },
                set(flag) {
                  this.toggleAttribute(attributeName, Boolean(flag));
                },
                configurable: true,
                enumerable: true,
              });
            });
            return this.hasAttribute(attributeName);

          case String:
            defer(() => {
              Object.defineProperty(this, name, {
                get() {
                  return Number(this.getAttribute(attributeName) ?? '');
                },
                set(flag) {
                  this.setAttribute(attributeName, String(flag));
                },
                configurable: true,
                enumerable: true,
              });
            });
            return Number(this.getAttribute(attributeName) ?? '');

          case String:
            defer(() => {
              Object.defineProperty(this, name, {
                get() {
                  return this.getAttribute(attributeName) ?? '';
                },
                set(flag) {
                  this.setAttribute(attributeName, flag);
                },
                configurable: true,
                enumerable: true,
              });
            });
            return this.getAttribute(attributeName) ?? '';
        }
      };
    }
  };
}
