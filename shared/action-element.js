import { html, css } from './template.js';
import BaseElement from './base-element.js';

const BasicButtonStyle = new CSSStyleSheet();
BasicButtonStyle.replaceSync(css`
  :host {
    flex-shrink: 0;
    display: inline-flex;
    outline: none;
  }
  :host([hidden]) {
    display: none;
    visibility: hidden;
  }
  :host([disabled]) {
    pointer-events: none;
    cursor: default;
  }
  [part~='button'] {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
    margin: 0;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    text-decoration: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    vertical-align: middle;
    user-select: none;
    box-sizing: border-box;
    z-index: 0;
  }
`);

var fromKeyboard = false;

window.addEventListener(
  'keydown',
  () => {
    fromKeyboard = true;
  },
  { capture: true }
);
window.addEventListener(
  'mousedown',
  () => {
    fromKeyboard = false;
  },
  { capture: true }
);

/**
 * 'ns' means 'no-style'
 */
export default class ActionElement extends BaseElement {
  static get is() {
    return 'ns-action';
  }

  _delegatesFocus = true;

  /** @type {string[]} */
  static get observedAttributes() {
    return [
      'disabled',
      'aria-label',
      'data-aria-label',
      'aria-haspopup',
      'data-aria-haspopup',
      'aria-controls',
      'data-aria-controls',
      'aria-expanded',
      'data-aria-expanded',
      'aria-selected',
      'data-aria-selected',
    ];
  }
  /** @type {boolean} */
  get disabled() {
    return this.hasAttribute('disabled');
  }
  /**
   * @param {boolean} value
   */
  set disabled(value) {
    this.toggleAttribute('disabled', value);
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

  get ariaHasPopup() {
    return this.getAttribute('data-aria-haspopup');
  }
  set ariaHasPopup(value) {
    if (value) {
      this.setAttribute('data-aria-haspopup', value);
    } else {
      this.removeAttribute('data-aria-haspopup');
    }
  }

  get ariaControls() {
    return this.getAttribute('data-aria-controls');
  }
  set ariaControls(value) {
    if (value) {
      this.setAttribute('data-aria-controls', value);
    } else {
      this.removeAttribute('data-aria-controls');
    }
  }

  get ariaExpanded() {
    return this.getAttribute('data-aria-expanded');
  }
  set ariaExpanded(value) {
    if (value) {
      this.setAttribute('data-aria-expanded', value);
    } else {
      this.removeAttribute('data-aria-expanded');
    }
  }

  get ariaSelected() {
    return this.getAttribute('data-aria-selected');
  }
  set ariaSelected(value) {
    if (value) {
      this.setAttribute('data-aria-selected', value);
    } else {
      this.removeAttribute('data-aria-selected');
    }
  }

  focus() {
    this.innerElement?.focus();
  }
  blur() {
    this.innerElement?.blur();
  }

  /** @type {HTMLButtonElement} */
  get innerElement() {
    return this.getEl('[part~="button"]');
  }

  /** @type {CSSStyleSheet[]} */
  get _styles() {
    return [BasicButtonStyle];
  }

  get _defaultTag() {
    return 'button';
  }
  get _defaultRole() {
    return 'button';
  }
  get _defaultTabIndex() {
    return '0';
  }

  /**
   * Extra contents for accessibility
   */
  renderAccessibility() {
    return ``;
  }
  /**
   * Extra contents
   */
  _renderContents() {
    return `<slot></slot>`;
  }
  _renderAppends() {
    return ``;
  }
  get _template() {
    return html`
      <${this.getAttribute('tag') || this._defaultTag}
        role="${this.getAttribute('data-role') || this._defaultRole}" tabindex="${this._defaultTabIndex}"
        part="inner button focus-controller">
        <span part="state-layer"></span>
        <span part="focus-ring"></span>
        ${this.renderAccessibility()}
        <span part="target"></span>
        ${this._renderContents()}
      </${this.getAttribute('tag') || this._defaultTag}>
      ${this._renderAppends()}
    `;
  }
  /** @type {boolean} */
  get _noFocusCtrl() {
    return false;
  }
  /**
   * @param {FocusEvent} _event
   */
  handleFocusIn(_event) {
    if (this._noFocusCtrl) return;
    const from = fromKeyboard ? 'keyboard' : null || 'mouse';
    if (!from) return;
    this.setAttribute('focus-from', from);
  }
  /**
   * @param {FocusEvent} _event
   */
  handleFocusOut(_event) {
    if (this._noFocusCtrl) return;
    this.removeAttribute('focus-from');
  }
  connectedCallback() {
    this.innerElement.addEventListener('focusin', this.handleFocusIn.bind(this));
    this.innerElement.addEventListener('focusout', this.handleFocusOut.bind(this));
  }
  get booleanAttributes() {
    return ['disabled'];
  }
  /**
   * @param {string} name
   * @param {string|undefined} oldValue
   * @param {string|undefined} newValue
   * @returns {void}
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (
      [
        'aria-label',
        'data-aria-label',
        'aria-haspopup',
        'data-aria-haspopup',
        'aria-controls',
        'data-aria-controls',
        'aria-expanded',
        'data-aria-expanded',
        'aria-selected',
        'data-aria-selected',
      ].includes(name)
    ) {
      this.syncDataAttrByEmpty(name);
    }
    if (name === 'disabled') {
      let tf = this.syncNonDataAttrByBoolean(name, this.innerElement);
      this.innerElement.ariaDisabled = tf ? 'true' : 'false';
    }
  }
}

customElements.define(ActionElement.is, ActionElement);
