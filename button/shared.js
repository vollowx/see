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
  get leadingIcon() {
    return this.getAttribute('leading') || '';
  }
  set leadingIcon(value) {
    this.setAttribute('leading', value);
  }
  get trailingIcon() {
    return this.getAttribute('trailing') || '';
  }
  set trailingIcon(value) {
    this.setAttribute('trailing', value);
  }

  /** @type {HTMLSpanElement} */
  get labelElement() {
    return this.getEl('[part~="label"]');
  }
  /** @type {Icon} */
  get leadingIconElement() {
    return this.getEl('[part~="leading"]');
  }
  /** @type {Icon} */
  get trailingIconElement() {
    return this.getEl('[part~="trailing"]');
  }

  /**
   * Extra contents in `label-root`
   */
  get _renderContents() {
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
    if (name === 'leading') this.syncNonDataAttrByEmpty(name, this.leadingIconElement, false, 'icon');
    if (name === 'trailing') this.syncNonDataAttrByEmpty(name, this.trailingIconElement, false, 'icon');
  }
}
