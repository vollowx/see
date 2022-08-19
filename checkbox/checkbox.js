import BaseElement from '../shared/base-element.js';
import { html, css } from '../shared/template.js';
import StateLayerStyleFAE from '../shared/state-layer-style-fae.js';
import FocusRingStyleFAE from '../shared/focus-ring-style-fae.js';
import Ripple from '../ripple/ripple.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';

const CheckboxStyle = new CSSStyleSheet();
CheckboxStyle.replaceSync(css`
  :host {
    display: inline-flex;
    align-items: center;
    ${TypographyStylesGenerator('label', 'L')}
  }
  :host([disabled]) {
    pointer-events: none;
    cursor: default;
  }
  [part~='root'] {
    display: inline-flex;
    align-items: center;
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
  [part='mark-root'] {
    width: 1em;
    height: 1em;
    font-size: 1.5rem;
    color: var(--md-sys-color-on-surface-variant);
    fill: currentColor;
  }
  :host([checked]) [part='mark-root'],
  :host([indeterminate]) [part='mark-root'] {
    color: var(--md-sys-color-primary);
  }
  :host([disabled]) {
    color: rgba(var(--md-sys-color-on-surface-rgb), 0.38);
  }
  :host([disabled]) [part='mark-root'] {
    color: rgba(var(--md-sys-color-on-surface-rgb), 0.38);
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
          <svg part="mark-root" viewBox="0 0 24 24" aria-hidden="true">
            <path part="mark"></path>
          </svg>
          <span part="state-layer"></span>
          <span part="focus-ring"></span>
          <md-ripple></md-ripple>
        </span>
        <span part="label-root">
          <slot></slot>
        </span>
      </label>
    `;
  }

  // svg paths
  _uncheckedMarkPath = 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z';
  _checkedMarkPath =
    'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z';
  _indeterminateMarkPath =
    'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z';

  /**
   * @param {FocusEvent} _event
   */
  handleFocusIn(_event) {
    const from = fromKeyboard ? 'keyboard' : null || 'mouse';
    if (!from) return;
    this.setAttribute('focus-from', from);
  }
  /**
   * @param {FocusEvent} _event
   */
  handleFocusOut(_event) {
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
    let paths = [this._uncheckedMarkPath, this._checkedMarkPath, this._indeterminateMarkPath];
    let ariaChecked = ['false', 'true', 'mixed'];
    let which = this.indeterminate ? 2 : this.checked ? 1 : 0;
    this.markElement.setAttribute('d', paths[which]);
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
   * @param {string} oldValue
   * @param {string} newValue
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
