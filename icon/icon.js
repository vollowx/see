import { html, css } from '../shared/template.js';
import BaseElement from '../shared/base-element.js';

const IconStyle = new CSSStyleSheet();
IconStyle.replaceSync(css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    color: inherit;
    fill: currentColor;
  }
  :host(:not([icon])) {
    display: none;
  }
  [part~='font'] {
    font-family: var(--md-icon-font, 'Material Symbols Outlined');
    font-weight: normal;
    font-style: normal;
    font-size: inherit;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
`);

export default class Icon extends BaseElement {
  static get is() {
    return 'md-icon';
  }

  static get observedAttributes() {
    return ['icon'];
  }

  get icon() {
    return this.getAttribute('icon') || '';
  }
  get useIconify() {
    return this.icon ? this.icon.indexOf(':') !== -1 : false;
  }
  /** @type {boolean} */
  alreadyIconify = false;

  /** @type {HTMLSpanElement} */
  get rootElement() {
    return this.getEl('[part~="root"]');
  }
  /** @type {HTMLElement} */
  get iconElement() {
    return this.getEl('[part~="icon"]');
  }

  get _styles() {
    return [IconStyle];
  }

  get _template() {
    return html`<slot part="root">${this._renderInner()}</slot>`;
  }
  _renderInner() {
    return this.useIconify ? this._renderIconify() : this._renderIconFont();
  }
  _renderIconify() {
    this.alreadyIconify = true;
    return /* html */ `
      <iconify-icon part="inner icon iconify" icon="${this.icon}"></iconify-icon>
    `;
  }
  _renderIconFont() {
    this.alreadyIconify = false;
    return /* html */ `
      <span part="inner icon font">${this.icon}</span>
    `;
  }

  /**
     * @param {string} name
     * @param {string|undefined} oldValue
     * @param {string|undefined} newValue
     */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'icon') {
      if (this.useIconify) {
        this.syncNonDataAttrByEmpty('icon');
        if (!this.alreadyIconify) {
          this._renderTemplate();
        }
      } else {
        this.fillNonDataAttr('icon');
        if (this.alreadyIconify) {
          this._renderTemplate();
        }
      }
    }
  }
}

customElements.define(Icon.is, Icon);
