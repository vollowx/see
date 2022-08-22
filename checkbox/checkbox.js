import BaseElement from '../shared/base-element.js';
import { html, css } from '../shared/template.js';
import StateLayerStyleFAE from '../shared/state-layer-style-fae.js';
import FocusRingStyleFAE from '../shared/focus-ring-style-fae.js';
import Ripple from '../ripple/ripple.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';

const CheckboxStyle = css`
  :host {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
  }
  :host([disabled]) {
    pointer-events: none;
    cursor: default;
  }
  [part~='root'] {
    display: inline-flex;
    align-items: center;
    ${TypographyStylesGenerator('label', 'L')}
  }
  :host([top]) [part~='root'] {
    flex-direction: column-reverse;
  }
  :host([bottom]) [part~='root'] {
    flex-direction: column;
  }
  :host([start]) [part~='root'] {
    flex-direction: row-reverse;
  }
  [part='target'] {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 48px;
    height: 48px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
  }
  [part~='native-root'] {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 0;
  }
  [part~='native'] {
    position: absolute;
    top: 0px;
    left: 0px;
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    cursor: inherit;
    opacity: 0;
    z-index: 1;
  }
  [part='background'] {
    display: inline-flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    border: 2px solid;
    border-color: rgba(var(--md-sys-color-on-surface-rgb), 0.54);
    border-radius: 2px;
    background-color: transparent;
    will-change: background-color, border-color;
    transition: 90ms cubic-bezier(0.14, 0, 0, 1);
    pointer-events: none;
  }
  [part~='check-mark'] {
    position: absolute;
    inset: 0px;
    width: 100%;
    opacity: 0;
    transition: opacity 90ms cubic-bezier(0.14, 0, 0, 1);
  }
  [part='check-mark'] path {
    inset: 0;
    stroke: currentColor;
    stroke-width: 4px;
    stroke-dashoffset: 29.7833385;
    stroke-dasharray: 29.7833385;
    transition: 90ms cubic-bezier(0.14, 0, 0, 1);
  }
  [part='mixed-mark'] {
    margin: 5.6px;
    width: 100%;
    height: 0;
    transform: scaleX(0) rotate(0deg);
    border-width: 4px;
    border-style: solid;
    color: var(--md-sys-color-surface);
    background-color: currentColor;
    border-color: currentColor;
    opacity: 0;
    transition: 90ms opacity cubic-bezier(0.14, 0, 0, 1), 90ms transform cubic-bezier(0.14, 0, 0, 1);
  }
  :host([checked]) [part='background'],
  :host([indeterminate]) [part='background'] {
    background-color: var(--md-sys-color-primary);
    border-color: transparent;
  }
  :host([checked]) [part='check-mark'] {
    opacity: 1;
  }
  :host([checked]) [part='check-mark'] path {
    color: var(--md-sys-color-surface);
    stroke-dashoffset: 0;
  }
  :host([checked]) [part='mixed-mark'] {
    transform: scaleX(1) rotate(-45deg);
  }
  :host([indeterminate]) [part='mixed-mark'] {
    transform: scaleX(1) rotate(0deg);
    opacity: 1;
  }
  :host([disabled]) {
    color: rgba(var(--md-sys-color-on-surface-rgb), 0.38);
  }
  :host([disabled]) [part='background'] {
    border-color: rgba(var(--md-sys-color-on-surface-rgb), 0.38);
  }
  :host([checked][disabled]) [part='background'],
  :host([indeterminate][disabled]) [part='background'] {
    background-color: rgba(var(--md-sys-color-on-surface-rgb), 0.38);
    border-color: transparent;
  }
`;

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
export default class Checkbox extends BaseElement {
  static get is() {
    return 'md-checkbox';
  }

  static get observedAttributes() {
    return [
      'checked',
      'indeterminate',
      'id',
      'data-id',
      'aria-label',
      'data-aria-label',
      'aria-labelby',
      'data-aria-labelby',
      'aria-describedby',
      'data-aria-describedby',
      'aria-controls',
      'data-aria-controls',
      'disabled',
    ];
  }
  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    this.toggleAttribute('disabled', value);
  }

  get checked() {
    return this.hasAttribute('checked');
  }
  set checked(value) {
    this.toggleAttribute('checked', value);
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate');
  }
  set indeterminate(value) {
    this.toggleAttribute('indeterminate', value);
  }

  get id() {
    return this.getAttribute('data-id') || '';
  }
  set id(value) {
    if (value) {
      this.setAttribute('data-id', value);
    } else {
      this.removeAttribute('data-id');
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

  get ariaDescribedBy() {
    return this.getAttribute('data-aria-describedby');
  }
  set ariaDescribedBy(value) {
    if (value) {
      this.setAttribute('data-aria-describedby', value);
    } else {
      this.removeAttribute('data-aria-describedby');
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

  /** @type {HTMLInputElement} */
  get nativeElement() {
    return this.getEl('[part~="native"]');
  }
  /** @type {SVGPathElement} */
  get markElement() {
    return this.getEl('[part~="mark"]');
  }
  /** @type {Ripple} */
  get rippleElement() {
    return this.getEl('md-ripple');
  }

  get _styles() {
    return [CheckboxStyle, StateLayerStyleFAE, FocusRingStyleFAE];
  }
  get _template() {
    return html`
      <label part="inner root">
        <span part="native-root focus-controller">
          <input part="native" type="checkbox" />
          <div part="background">
            <svg part="check-mark" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
            </svg>
            <div part="mixed-mark"></div>
          </div>
          <span part="state-layer"></span>
          <span part="focus-ring"></span>
          <span part="target"></span>
          <md-ripple></md-ripple>
        </span>
        <span part="label-root">
          <slot></slot>
        </span>
      </label>
    `;
  }

  /**
   * @param {FocusEvent} _ev
   */
  handleFocusIn(_ev) {
    const from = fromKeyboard ? 'keyboard' : null || 'mouse';
    if (!from) return;
    this.setAttribute('focus-from', from);
  }
  /**
   * @param {FocusEvent} _ev
   */
  handleFocusOut(_ev) {
    this.removeAttribute('focus-from');
  }
  handleChange() {
    this.checked = this.nativeElement.checked;
    this.indeterminate = this.nativeElement.indeterminate;
    this.updateNativeState();

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
      })
    );
  }
  updateNativeState() {
    // let paths = [this._uncheckedMarkPath, this._checkedMarkPath, this._indeterminateMarkPath];
    let ariaChecked = ['false', 'true', 'mixed'];
    let which = this.indeterminate ? 2 : this.checked ? 1 : 0;
    // this.markElement.setAttribute('d', paths[which]);
    this.nativeElement.ariaChecked = ariaChecked[which];
  }

  connectedCallback() {
    this.nativeElement.addEventListener('focusin', this.handleFocusIn.bind(this));
    this.nativeElement.addEventListener('focusout', this.handleFocusOut.bind(this));
    this.nativeElement.addEventListener('change', this.handleChange.bind(this));

    this.updateNativeState();
  }
  /**
   * @param {string} name
   * @param {string|undefined} oldValue
   * @param {string|undefined} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (this._doNothingTimesOnAttrCg > 0) {
      this._doNothingTimesOnAttrCg--;
      return;
    }
    if (
      [
        'id',
        'data-id',
        'aria-label',
        'data-aria-label',
        'aria-labelby',
        'data-aria-labelby',
        'aria-describedby',
        'data-aria-describedby',
        'aria-controls',
        'data-aria-controls',
      ].includes(name)
    ) {
      this.syncDataAttrByEmpty(name, this.nativeElement);
      return;
    }
    if (name === 'disabled') {
      let tf = this.syncNonDataAttrByBoolean(name, this.nativeElement);
      this.nativeElement.ariaDisabled = tf ? 'true' : 'false';
    }
    if (name === 'checked') {
      this.indeterminate = false;
      this.nativeElement.checked = this.checked;
    }
    if (name === 'indeterminate') {
      if (this.indeterminate) {
        this.checked = false;
      }
      this.nativeElement.indeterminate = this.indeterminate;
    }
    this.updateNativeState();
  }
}

customElements.define(Checkbox.is, Checkbox);
