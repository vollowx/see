import { html, css } from '../shared/template.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';
import BaseElement from '../shared/base-element.js';

const BadgeStyle = new CSSStyleSheet();
BadgeStyle.replaceSync(css`
  :host {
    --md-badge-offset: 0;
  }
  [part~='root'] {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
    flex-shrink: 0;
  }
  [part~='badge'] {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: var(--md-badge-offset);
    right: var(--md-badge-offset);
    box-sizing: border-box;
    ${TypographyStylesGenerator('label', 'S')}
    padding: 0px 2.5px;
    min-width: 16px;
    height: 16px;
    border-radius: 8px;
    z-index: 1;
    background-color: var(--md-sys-color-error);
    color: var(--md-sys-color-on-error);
    transform: scale(1) translate(50%, -50%);
    transform-origin: 100% 0%;
  }
  :host([circle]) {
    --md-badge-offset: 14%;
  }
  :host([left]:not([dir='rtl'])) [part~='badge'],
  :host(:not([left])[dir='rtl']) [part~='badge'] {
    left: var(--md-badge-offset);
    right: auto;
    transform: scale(1) translate(-50%, -50%);
    transform-origin: 0% 0%;
  }
  :host([bottom]) [part~='badge'] {
    top: auto;
    bottom: var(--md-badge-offset);
    transform: scale(1) translate(50%, 50%);
    transform-origin: 100% 100%;
  }
  :host([left][bottom]:not([dir='rtl'])) [part~='badge'],
  :host(:not([left])[dir='rtl'][bottom]) [part~='badge'] {
    transform: scale(1) translate(-50%, 50%);
    transform-origin: 0% 100%;
  }
  :host([no-events]) [part~='badge'] {
    pointer-events: none;
  }
`);

export default class Badge extends BaseElement {
  static get is() {
    return 'md-badge';
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'value', 'max'];
  }
  get value() {
    return this.getAttribute('value') || '';
  }
  set value(value) {
    this.setAttribute('value', value);
  }
  get max() {
    return this.getAttribute('max') || '';
  }
  set max(value) {
    this.setAttribute('max', value);
  }

  get badgeElement() {
    return this.getEl('[part~="badge"]');
  }

  get _styles() {
    return [...super._styles, BadgeStyle];
  }

  get _template() {
    return html`
      <div part="inner root">
        <slot></slot>
        <span part="badge">${this.getOKValue()}</span>
      </div>
    `;
  }

  getOKValue() {
    const value = this.value;
    const max = this.max;
    if (max !== '' && parseInt(value) > parseInt(max)) {
      return `${max}+`;
    }
    return value;
  }

  /**
   * @param {string} name
   * @param {string} oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
      case 'value':
        this.badgeElement.textContent = this.getOKValue();
        break;

      case 'max':
        this.badgeElement.textContent = this.getOKValue();
        break;

      default:
        break;
    }
  }
}

customElements.define(Badge.is, Badge);
