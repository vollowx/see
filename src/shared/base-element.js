// @ts-check

export default class BaseElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(this.render().content.cloneNode(true));
  }

  /**
   * @returns {HTMLTemplateElement}
   */
  render() {
    return new HTMLTemplateElement();
  }
}
