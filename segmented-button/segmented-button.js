import ActionElement from '../shared/action-element.js';
import StateLayerStyleFAE from '../shared/state-layer-style-fae.js';
import FocusRingStyleFAE from '../shared/focus-ring-style-fae.js';
import Icon from '../icon/icon.js';
import Ripple from '../ripple/ripple.js';
import SegmentedButtonSet from './segmented-button-set.js';
import { css } from '../shared/template.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';

const SegmentedButtonStyle = css`
  [part~='button'] {
    height: calc(40px - 2 * var(--md-seg-button-density, 0px));
    outline: none;
    transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);

    font-family: var(--md-sys-typeoscale-font-family-global);
    padding: 0 12px;
    flex: 1 1 0%;
    border-radius: inherit;
    ${TypographyStylesGenerator('label', 'L')}
  }
  :host([selected]) [part~='button'] {
    background-color: var(--md-sys-color-secondary-container);
    color: var(--md-sys-color-on-secondary-container);
  }
  :host([disabled]) [part~='button'] {
    color: rgba(var(--md-sys-color-on-surface-rgb), 0.38);
  }
  :host([disabled]) [part~='outline'] {
    border-color: rgba(var(--md-sys-color-on-surface-rgb), 0.12);
  }
  [part='target'] {
    position: absolute;
    top: 50%;
    left: 0px;
    right: 0px;
    height: 48px;
    transform: translateY(-50%);
    box-sizing: border-box;
  }
  [part~='outline'] {
    position: absolute;
    inset: 0 -0.5px;
    border-radius: inherit;
    border: 1px solid var(--md-sys-color-outline);
  }
  [part='leading-root'] {
    display: inline-flex;
  }
  :host([leading][label]) [part~='button'] {
    gap: 8px;
  }
  md-icon,
  ::slotted(iconify-icon) {
    font-size: var(--md-seg-button-icon-size, 1.125rem);
  }
`;

export default class SegmentedButton extends ActionElement {
  static get is() {
    return 'md-seg-button';
  }
  static get observedAttributes() {
    return [...super.observedAttributes, 'label', 'leading', 'value', 'selected'];
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
  get value() {
    return this.getAttribute('value') || '';
  }
  set value(value) {
    this.setAttribute('value', value);
  }
  get selected() {
    return this.hasAttribute('selected');
  }
  set selected(value) {
    this.toggleAttribute('selected', value);
  }

  /** @type {SegmentedButtonSet|null} */
  get setElement() {
    // @ts-ignore
    return this.parentNode;
  }
  /** @type {HTMLSpanElement} */
  get labelElement() {
    return this.getEl('[part~="label"]');
  }
  /** @type {Icon} */
  get leadingElement() {
    return this.getEl('[part~="leading"]');
  }
  /** @type {Ripple} */
  get rippleElement() {
    return this.getEl('md-ripple');
  }

  get _styles() {
    return [...super._styles, SegmentedButtonStyle, StateLayerStyleFAE, FocusRingStyleFAE];
  }
  _renderDisplays() {
    return /* html */ `<span part="outline"></span><md-ripple></md-ripple>`;
  }
  _renderContents() {
    return /* html */ `
      <span part="leading-root" aria-hidden="true">
        <slot name="leading">
          <md-icon part="leading"></md-icon>
        </slot>
        <svg part="check-mark" viewBox="0 0 24 24">
          <path fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
        </svg>
      </span>
      <span part="label-root">
        <span part="label"></span>
        <slot></slot>
      </span>
    `;
  }

  handleClick() {
    this.dispatchEvent(new Event('seg-button-interaction', { bubbles: true, composed: true }));
  }

  connectedCallback() {
    super.connectedCallback();
    this.innerElement.setAttribute('aria-pressed', this.selected ? 'true' : 'false');
    this.addEventListener('click', this.handleClick.bind(this));
  }
  /**
   * @param {string} name
   * @param {string|undefined} oldValue
   * @param {string|undefined} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'selected') {
      if (!this.setElement) {
        return;
      }
      if (this.selected) {
        this.setElement.childChanged(this);
      }
      this.innerElement.setAttribute('aria-pressed', this.selected ? 'true' : 'false');
      return;
    }
    if (name === 'value') this.syncNonDataAttrByEmpty(name);
    if (name === 'label') this.fillNonDataAttr(name, this.labelElement);
    if (name === 'leading') this.syncNonDataAttrByEmpty(name, this.leadingElement, false, 'icon');
  }
}

customElements.define(SegmentedButton.is, SegmentedButton);
