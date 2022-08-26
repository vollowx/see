import { html, css } from './template.js';
import BaseElement from './base-element.js';

const InputEStyle = css``;

export const InputTypes = ['email', 'number', 'password', 'search', 'tel', 'text', 'url'];
export const UnsupportedTypes = ['color', 'date', 'datetime-local', 'file', 'month', 'time', 'week'];
export const InvalidTypes = ['button', 'checkbox', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'];

export class InputElement extends BaseElement {
  static get is() {
    return 'ns-input';
  }

  _delegatesFocus = true;

  static get observedAttributes() {
    return [
      'autofocus',
      'default-value',
      'disabled',
      'error',
      'error-text',
      'label',
      'max',
      'maxlength',
      'min',
      'minlength',
      'name',
      'pattern',
      'placeholder',
      'readonly',
      'required',
      'supporting-text',
      'type',
      'value',
      // ARIA
      'id',
      'role',
      'data-role',
      'aria-label',
      'data-aria-label',
      'aria-labelby',
      'data-aria-labelby',
    ];
  }
  get defaultValue() {
    return this.getAttribute('default-value') || '';
  }
  set defaultValue(value) {
    this.setAttribute('default-value', value);
  }
  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    this.toggleAttribute('disabled', value);
  }
  get error() {
    return this.hasAttribute('error');
  }
  set error(value) {
    this.toggleAttribute('error', value);
  }
  get errorText() {
    return this.getAttribute('error-text') || '';
  }
  set errorText(value) {
    this.setAttribute('error-text', value);
  }
  get label() {
    return this.getAttribute('label') || '';
  }
  set label(value) {
    this.setAttribute('label', value);
  }
  get maxLength() {
    return parseInt(this.getAttribute('maxlength') || '-1');
  }
  set maxLength(value) {
    this.setAttribute('maxlength', value.toString());
  }
  get minLength() {
    return parseInt(this.getAttribute('minlength') || '-1');
  }
  set minLength(value) {
    this.setAttribute('minlength', value.toString());
  }
  get name() {
    return this.getAttribute('name') || '';
  }
  set name(value) {
    this.setAttribute('name', value);
  }
  get pattern() {
    return this.getAttribute('pattern') || '';
  }
  set pattern(value) {
    this.setAttribute('pattern', value);
  }
  get placeholder() {
    return this.getAttribute('placeholder') || '';
  }
  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }
  get readonly() {
    return this.hasAttribute('readonly');
  }
  set readonly(value) {
    this.toggleAttribute('readonly', value);
  }
  get required() {
    return this.hasAttribute('required');
  }
  set required(value) {
    this.toggleAttribute('required', value);
  }
  get supportingText() {
    return this.getAttribute('supporting-text') || '';
  }
  set supportingText(value) {
    this.setAttribute('supporting-text', value);
  }
  get type() {
    return this.getAttribute('type') || 'text';
  }
  set type(value) {
    this.setAttribute('type', value);
  }
  get value() {
    return this.getAttribute('value') || '';
  }
  set value(value) {
    this.setAttribute('value', value);
  }
  get role() {
    return this.getAttribute('data-role');
  }
  set role(value) {
    if (value) {
      this.setAttribute('data-role', value);
    } else {
      this.removeAttribute('data-role');
    }
  }
  get ariaLabel() {
    return this.getAttribute('data-aria-label');
  }
  set ariaLabel(value) {
    if (value) {
      this.setAttribute('data-aria-label', value);
    } else {
      this.removeAttribute('data-aria-label');
    }
  }
  get ariaLabelBy() {
    return this.getAttribute('data-aria-labelby');
  }
  set ariaLabelBy(value) {
    if (value) {
      this.setAttribute('data-aria-labelby', value);
    } else {
      this.removeAttribute('data-aria-labelby');
    }
  }

  /** @type {'forward'|'backward'|'none'|null} */
  get selectionDirection() {
    return this.inputElement.selectionDirection;
  }
  set selectionDirection(value) {
    this.inputElement.selectionDirection = value;
  }
  /** @type {number|null} */
  get selectionEnd() {
    return this.inputElement.selectionEnd;
  }
  set selectionEnd(value) {
    this.inputElement.selectionEnd = value;
  }
  /** @type {number|null} */
  get selectionStart() {
    return this.inputElement.selectionStart;
  }
  set selectionStart(value) {
    this.inputElement.selectionStart = value;
  }
  get validationMessage() {
    return this.inputElement.validationMessage;
  }
  get validity() {
    return this.inputElement.validity;
  }
  get valueAsNumber() {
    return this.inputElement.valueAsNumber;
  }
  set valueAsNumber(value) {
    this.inputElement.valueAsNumber = value;
    this.value = this.inputElement.value;
  }
  get valueAsDate() {
    return this.inputElement.valueAsDate;
  }
  set valueAsDate(value) {
    this.inputElement.valueAsDate = value;
    this.value = this.inputElement.value;
  }
  get willValidate() {
    return this.inputElement.willValidate;
  }

  focus() {
    this.inputElement.focus();
  }
  select() {
    this.inputElement.select();
  }
  /**
   * @param {string} error
   */
  setCustomValidity(error) {
    this.inputElement.setCustomValidity(error);
  }
  /**
   * @param  {...any} args
   */
  setRangeText(...args) {
    // @ts-ignore
    this.inputElement.setRangeText(...args);
    this.value = this.inputElement.value;
  }
  /**
   * @param {number|null} start
   * @param {number|null} end
   * @param {'forward'|'backward'|'none'} direction
   */
  setSelectionRange(start, end, direction) {
    this.inputElement.setSelectionRange(start, end, direction);
  }
  reset() {
    this.value = this.defaultValue;
  }
  reportValidity() {
    const valid = this.inputElement.reportValidity();
    if (!valid) {
      this.dispatchEvent(new Event('invalid', { cancelable: true }));      
    }
    return valid;
  }
  checkValidity() {
    const valid = this.inputElement.checkValidity();
    if (!valid) {
      this.dispatchEvent(new Event('invalid', { cancelable: true }));      
    }
    return valid;
  }

  get formElement() {
    return this.closest('form');
  }
  /** @type {HTMLInputElement} */
  get inputElement() {
    return this.getEl('input');
  }

  get _styles() {
    return [InputEStyle];
  }
  get _template() {
    return html` ${this._renderInput()} ${this._renderSupportingText()} `;
  }
  _renderInput() {
    return /* html */ `
      <input part="native input" ${this.autofocus ? 'autofocus' : ''} value="${this.defaultValue}" />
    `;
  }
  _renderSupportingText() {
    return /* html */ `
      <span part="supporting-text">
        <span part="text"></span>
        <span part="length"></span>
      </span>
    `;
  }

  /**
   * @param {Event} _event
   */
  handleInput(_event) {
    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
      })
    );
    this.value = this.inputElement.value;
  }
  /**
   * @param {Event} _event
   */
  handleChange(_event) {
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
      })
    );
  }
  /**
   * @param {Event} _event
   */
  handleSelect(_event) {
    this.dispatchEvent(
      new CustomEvent('select', {
        bubbles: true,
        composed: true,
      })
    );
  }

  connectedCallback() {
    this.addEventListener('click', this.focus);
    this.inputElement.addEventListener('input', this.handleInput.bind(this));
    this.inputElement.addEventListener('change', this.handleChange.bind(this));
    this.inputElement.addEventListener('select', this.handleSelect.bind(this));
  }
  /**
   * @param {string} name
   * @param {string|undefined} oldValue
   * @param {string|undefined} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (['role', 'data-role', 'aria-label', 'data-aria-label', 'aria-labelby', 'data-aria-label'].includes(name)) {
      this.syncDataAttrByEmpty(name, this.inputElement);
      return;
    }
    if (['id', 'name', 'pattern', 'placeholder', 'max', 'maxlength', 'min', 'minlength'].includes(name)) {
      this.syncNonDataAttrByEmpty(name, this.inputElement);
    }
    if (['disabled', 'required', 'readonly'].includes(name)) {
      this.syncNonDataAttrByBoolean(name, this.inputElement);
    }
    switch (name) {
      case 'type':
        if (!InputTypes.includes(this.type)) {
          this.type = this.inputElement.type;
          throw new Error('Invalid type for Input');
        }
        this.inputElement.type = this.type;
        break;

      case 'value':
        if (this.value !== this.inputElement.value) {
          this.inputElement.value = this.value;
        }
        break;

      case 'error':
        this.inputElement.setAttribute('aria-invalid', this.error ? 'true' : 'false');
        break;

      default:
        break;
    }
  }
}

customElements.define(InputElement.is, InputElement);
