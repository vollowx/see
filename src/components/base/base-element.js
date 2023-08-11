// @ts-check

export default class BaseElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.renderRoot.append(this.render().content.cloneNode(true));
  }

  /** @type {ShadowRoot|HTMLElement} */
  get renderRoot() {
    return /** @type {ShadowRoot} */ (this.shadowRoot);
  }

  /**
   * @returns {HTMLTemplateElement}
   */
  render() {
    return new HTMLTemplateElement();
  }
}
