// @ts-check

export default class BaseElement extends HTMLElement {
  constructor() {
    super();
    this._attachShadow();
    this._render();
  }

  _attachShadow() {
    this.attachShadow({ mode: 'open' });
  }

  _render() {
    const shadowRoot = this.shadowRoot;

    if (!shadowRoot) {
      throw new Error(
        `[${this.tagName}] [render] Shadow root not found, rendering canceled.`
      );
    }

    shadowRoot.innerHTML = this.render();
  }

  render() {
    return '';
  }

  #cachedElements = {};
  /**
   * Alias of `shadowRoot.querySelector`.
   * @param {string} selector
   * @param {boolean} force
   * @returns {any}
   */
  $(selector, force = false) {
    const shadowRoot = this.shadowRoot;

    if (!shadowRoot) {
      throw new Error(
        `[${this.tagName}] [element-getter] Shadow root not found, element querying canceled.`
      );
    }

    if (!this.#cachedElements[selector] || force)
      this.#cachedElements[selector] = shadowRoot.querySelector(selector);

    return this.#cachedElements[selector];
  }
}
