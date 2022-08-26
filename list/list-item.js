import { css } from '../shared/template.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';
import ActionElement from '../shared/action-element.js';

// @ts-ignore
import Ripple from '../ripple/ripple.js';
import FocusRingStyleFAE from '../shared/focus-ring-style-fae.js';
import StateLayerStyleFAE from '../shared/state-layer-style-fae.js';

const ListItemStyle = css`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    text-decoration: none;
    box-sizing: border-box;
  }
  [part~='button'] {
    position: relative;
    padding: 8px 16px;
    width: 100%;
    display: flex;
    align-items: center;
    min-height: var(--md-list-item-height, 36px);
    color: var(--md-sys-color-on-surface);
    cursor: pointer;
    outline: none;
    ${TypographyStylesGenerator('label', 'L')}
  }
  @media (hover: none) {
    [part~='button'] {
      min-height: var(--md-list-item-height, 48px);
    }
  }
  :host([selected]) [part~='button'] {
    background-color: rgba(var(--md-sys-color-primary-rgb), 0.16);
  }
  [part~='target'] {
    position: absolute;
    inset: 0;
  }
  [part~='focus-ring'] {
    --md-focus-ring-padding-vertical: -4px;
    --md-focus-ring-padding-horizontal: -4px;
  }
  :host([leading]) [part~='leading-root'] {
    flex-shrink: 0;
    display: inline-flex;
    padding-inline-end: 16px;
  }
  [part~='label-root'] {
    margin-top: 4px;
    margin-bottom: 4px;
    flex: 1 1 auto;
  }
  [part~='trailing-root'] {
    margin-inline-start: 16px;
  }
  [part~='leading-root'],
  [part~='trailing-root'] {
    color: var(--md-sys-color-on-surface-variant);
  }
  :host {
    ${TypographyStylesGenerator('label', 'L')}
  }
  ::slotted([secondary]) {
    ${TypographyStylesGenerator('label', 'M')}
    margin: 0;
    color: var(--md-sys-color-on-surface-variant);
  }
  ::slotted(md-icon),
  ::slotted(iconify-icon) {
    font-size: 1.5rem;
  }
  [part~='secondary-action'] {
    position: absolute;
    top: 50%;
    margin-inline-start: calc(100% - 40px - 16px);
    transform: translateY(-50%);
  }
  :host([sec-action]) [part~='button'] {
    padding-inline-end: 48px;
  }
  md-checkbox {
    margin-inline-start: -9px;
    margin-inline-end: -11px;
    pointer-events: none;
  }
`;

export default class ListItem extends ActionElement {
  static get is() {
    return 'md-list-item';
  }

  get keyChar() {
    return this.getAttribute('key-char');
  }

  get _defaultTag() {
    return 'li';
  }
  get _defaultRole() {
    // @ts-ignore
    return this.parentNode.tagName === 'MD-MENU' ? 'menuitem' : '';
  }
  get _defaultTabIndex() {
    return '-1';
  }

  get _styles() {
    return [...super._styles, ListItemStyle, FocusRingStyleFAE, StateLayerStyleFAE];
  }
  _renderLeading() {
    return ``;
  }
  _renderAccessibility() {
    return `<md-ripple></md-ripple>`;
  }
  _renderContents() {
    return /* html */ `
      <span part="leading-root">
        ${this._renderLeading() ? this._renderLeading() : /* html */ `<slot name="leading"></slot>`}
      </span>
      <span part="label-root">
        <slot></slot>
      </span>
      <span part="trailing-root">
        <slot name="trailing"></slot>
      </span>
    `;
  }
  _renderAppends() {
    return /* html */ `
      <span part="secondary-action">
        <slot name="secAction"></slot>
      </span>
    `;
  }

  /** @type {Ripple} */
  get rippleElement() {
    return this.getEl('md-ripple');
  }

  /**
   * @param {FocusEvent} _ev
   */
  handleFocusIn(_ev) {
    super.handleFocusIn(_ev);
    this.parentNode?.querySelectorAll('md-list-item').forEach((item) => {
      item.innerElement.tabIndex = -1;
    });
    this.innerElement.tabIndex = 0;
  }

  /**
   * @param {string} name
   * @param {string|undefined} oldValue
   * @param {string|undefined} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
  }
}

customElements.define(ListItem.is, ListItem);
