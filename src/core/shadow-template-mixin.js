// @ts-check

/** @param {Constructor<CustomElement>} Base */
const ShadowTemplateMixin = (Base) =>
  class ShadowTemplate extends Base {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.adoptedStyleSheets = this.styles;
      this.shadowRoot.append(this.template.content.cloneNode(true));
    }

    /** @type {CSSStyleSheet[]} */
    get styles() {
      return [];
    }
    /** @type {HTMLTemplateElement} */
    get template() {
      return document.createElement('template');
    }
  };

export default ShadowTemplateMixin;
