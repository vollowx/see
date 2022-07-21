import ActionElement from './action-element.js';

export default class ActionElementLabeled extends ActionElement {
  static get is() {
    return 'ns-action-labeled';
  }

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'label',
      'leading',
      'trailing',
    ];
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
  /** @type {HTMLSpanElement} */
  get leadingIconElement() {
    return this.getEl('[part~="leading"]');
  }
  /** @type {HTMLSpanElement} */
  get trailingIconElement() {
    return this.getEl('[part~="trailing"]');
  }

  get _mainContents() {
    return /* html */ `
      <span part="leading-root">
        <span part="leading">${this.leadingIcon}</span>
        <slot name="leading"></slot>
      </span>
      <span part="label-root">
        <span part="label">${this.label}</span>
        <slot></slot>
      </span>
      <span part="trailing-root">
        <span part="trailing">${this.trailingIcon}</span>
        <slot name="trailing"></slot>
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

      case 'leading':
        this.leadingIconElement.innerText = this.leadingIcon;
        break;

      case 'trailing':
        this.trailingIconElement.innerText = this.trailingIcon;

      default:
        break;
    }
  }
}
