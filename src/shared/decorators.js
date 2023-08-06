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
 * @param {BooleanConstructor|NumberConstructor|StringConstructor} type
 * @todo Try to remove defer, automatically set initial value, better structure
 */
export function property(type) {
  /**
   * @param {undefined} _value
   * @param {{ kind: string, name: string | symbol }} options
   */
  return function (_value, { kind, name }) {
    if (kind === 'field') {
      /**
       * @param {any} _initialValue
       */
      return function (_initialValue) {
        switch (type) {
          case Boolean:
            defer(() => {
              Object.defineProperty(this, name, {
                get() {
                  return this.hasAttribute(name);
                },
                set(flag) {
                  this.toggleAttribute(name, Boolean(flag));
                },
                configurable: true,
                enumerable: true,
              });
            });
            return this.hasAttribute(name);

          case String:
            defer(() => {
              Object.defineProperty(this, name, {
                get() {
                  return Number(this.getAttribute(name) ?? '');
                },
                set(flag) {
                  this.setAttribute(name, String(flag));
                },
                configurable: true,
                enumerable: true,
              });
            });
            return Number(this.getAttribute(name) ?? '');

          case String:
            defer(() => {
              Object.defineProperty(this, name, {
                get() {
                  return this.getAttribute(name) ?? '';
                },
                set(flag) {
                  this.setAttribute(name, flag);
                },
                configurable: true,
                enumerable: true,
              });
            });
            return this.getAttribute(name) ?? '';
        }
      };
    }
  };
}
