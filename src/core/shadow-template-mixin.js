// @ts-check

/** @param {new () => HTMLElement} Base */
export default function ShadowTemplateMixin(Base) {
  return class extends Base {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.renderRoot.adoptedStyleSheets = this.styles;
      this.renderRoot.append(this.template.content.cloneNode(true));
    }

    get renderRoot() {
      return /** @type {ShadowRoot} */ (this.shadowRoot);
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
}
