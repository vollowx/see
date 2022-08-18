import { css } from '../shared/template.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';
import ActionElement from '../shared/action-element.js';

// @ts-ignore
import Ripple from '../ripple/ripple.js';
import StateLayerStyleFAE from '../shared/state-layer-style-fae.js';

// TODO: 2-line, 3-line styles
const ListItemStyle = new CSSStyleSheet();
ListItemStyle.replaceSync(css`
  :host {
    position: relative;
    display: block;
  }
  [part~='button'] {
    position: relative;
    padding: 8px 16px;
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
      height: var(--md-list-item-height, 48px);
    }
  }
  :host([selected]) [part~='button'] {
    background-color: rgba(var(--md-sys-color-primary-rgb), 0.16);
  }
  [part~='target'] {
    position: absolute;
    inset: 0;
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
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
  :host([sec-action]) [part~='button'] {
    padding-right: 48px;
  }
`);

export default class ListItem extends ActionElement {
  static get is() {
    return 'md-list-item';
  }

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  get _defaultTag() {
    return 'li';
  }
  get _defaultRole() {
    // @ts-ignore
    return this.parentNode.tagName === 'MD-MENU' ? 'menuitem' : 'option';
  }
  get _defaultTabIndex() {
    return '-1';
  }

  get keyChar() {
    return this.getAttribute('key-char');
  }

  get _styles() {
    return [...super._styles, ListItemStyle, StateLayerStyleFAE];
  }

  _unUseableLeading = false;
  renderAccessibility() {
    return `<md-ripple></md-ripple>`;
  }
  _renderContents() {
    return /* html */ `
      <span part="leading-root">
        ${this._unUseableLeading ? '' : /* html */ `<slot name="leading"></slot>`}
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
   * @param {FocusEvent} _event
   */
  handleFocusIn(_event) {
    super.handleFocusIn(_event);
    this.parentNode?.querySelectorAll('md-list-item').forEach((item) => {
      item.innerElement.tabIndex = -1;
    });
    this.innerElement.tabIndex = 0;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
  }
}

customElements.define(ListItem.is, ListItem);
