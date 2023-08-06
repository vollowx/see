// @ts-check

/**
 * @param {string} tagName
 */
export function customElement(tagName) {
  /**
   * @param {any} target
   * @param {ClassDecoratorContext} _context
   */
  return (target, _context) => {
    if (!customElements.get(tagName)) customElements.define(tagName, target);
  };
}

const defer = (window.requestIdleCallback || requestAnimationFrame).bind(
  window
);

/**
 * @param {BooleanConstructor|StringConstructor} type
 */
export function property(type) {
  /**
   * @param {undefined} _value
   * @param {{ kind: string, name: string | symbol }} options
   */
  return function (_value, { kind, name }) {
    if (kind === 'field') {
      /**
       * @param {any} initialValue
       */
      return function (initialValue) {
        defer(() => {
          Object.defineProperty(this, name, {
            get() {
              if (type === Boolean) {
                return this.hasAttribute(name);
              } else if (type === String) {
                return this.getAttribute(name) ?? '';
              }
            },
            set(flag) {
              if (type === Boolean) {
                this.toggleAttribute(name, Boolean(flag));
              } else if (type === String) {
                this.setAttribute(name, flag);
              }
            },
            configurable: true,
            enumerable: true,
          });
        });

        return initialValue;
      };
    }
  };
}
