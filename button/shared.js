import ActionElement from '../shared/action-element.js';
import Icon from '../icon/icon.js';

export default class Button extends ActionElement {
  static get observedAttributes() {
    return [...super.observedAttributes, 'label', 'leading', 'trailing'];
  }

  get label() {
    return this.getAttribute('label') || '';
  }
  set label(value) {
    this.setAttribute('label', value);
  }
  get leading() {
    return this.getAttribute('leading') || '';
  }
  set leading(value) {
    this.setAttribute('leading', value);
  }
  get trailing() {
    return this.getAttribute('trailing') || '';
  }
  set trailing(value) {
    this.setAttribute('trailing', value);
  }

  /** @type {HTMLSpanElement} */
  get labelElement() {
    return this.getEl('[part~="label"]');
  }
  /** @type {Icon} */
  get leadingElement() {
    return this.getEl('[part~="leading"]');
  }
  /** @type {Icon} */
  get trailingElement() {
    return this.getEl('[part~="trailing"]');
  }

  _renderContents() {
    return /* html */ `
      <span part="leading-root">
        <slot name="leading">
          <md-icon part="leading"></md-icon>
        </slot>
      </span>
      <span part="label-root">
        <span part="label"></span>
        <slot></slot>
      </span>
      <span part="trailing-root">
        <slot name="trailing">
          <md-icon part="trailing"></md-icon>
        </slot>
      </span>
    `;
  }

  /**
   * @param {string} name
   * @param {string|undefined} oldValue
   * @param {string|undefined} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'label') this.fillNonDataAttr(name, this.labelElement);
    if (name === 'leading') this.syncNonDataAttrByEmpty(name, this.leadingElement, false, 'icon');
    if (name === 'trailing') this.syncNonDataAttrByEmpty(name, this.trailingElement, false, 'icon');
  }
}
