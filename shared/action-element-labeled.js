import ActionElement from './action-element.js';

export default class ActionElementLabeled extends ActionElement {
  static get is() {
    return 'ns-action-labeled';
  }

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'label',
      'leading-icon',
      'trailing-icon',
    ];
  }

  get label() {
    return this.getAttribute('label') || '';
  }
  set label(value) {
    this.setAttribute('label', value);
  }
  get leadingIcon() {
    return this.getAttribute('leading-icon') || '';
  }
  set leadingIcon(value) {
    this.setAttribute('leading-icon', value);
  }
  get trailingIcon() {
    return this.getAttribute('trailing-icon') || '';
  }
  set trailingIcon(value) {
    this.setAttribute('trailing-icon', value);
  }

  /** @type {HTMLSpanElement} */
  get labelElement() {
    return this.getEl('[part~="label"]');
  }
  /** @type {HTMLSpanElement} */
  get leadingIconElement() {
    return this.getEl('[part~="leading-icon"]');
  }
  /** @type {HTMLSpanElement} */
  get trailingIconElement() {
    return this.getEl('[part~="trailing-icon"]');
  }

  get _mainContents() {
    return /* html */ `
      <span part="leading-icon-root">
        <span part="leading-icon">${this.leadingIcon}</span>
        <slot name="leading-icon"></slot>
      </span>
      <span part="label-root">
        <span part="label">${this.label}</span>
        <slot></slot>
      </span>
      <span part="trailing-icon-root">
        <span part="trailing-icon">${this.trailingIcon}</span>
        <slot name="trailing-icon"></slot>
      </span>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (!this._rendered) return;

    switch(name) {
      case 'label':
        this.labelElement.innerText = this.label;
        break;

      case 'leading-icon':
        this.leadingIconElement.innerText = this.leadingIcon;
        break;

      case 'trailing-icon':
        this.trailingIconElement.innerText = this.trailingIcon;

      default:
        break;
    }
  }
}
