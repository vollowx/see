import { css } from '../shared/template.js';
import ActionElementLabeled from '../shared/action-element-labeled.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';

// @ts-ignore
import Ripple from '../ripple/ripple.js';
import StateLayerStyleFAE from '../shared/state-layer-style-fae.js';

// TODO: 2-line, 3-line styles
const ListItemStyle = new CSSStyleSheet();
ListItemStyle.replaceSync(css`
  :host {
    display: block;
  }
  [part~='button'] {
    position: relative;
    display: flex;
    align-items: center;
    height: var(--md-list-item-height, 36px);
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
    margin-inline-start: 12px;
    display: inline-flex;
  }
  [part~='label-root'] {
    margin-inline-start: 16px;
    margin-inline-end: 80px;
  }
  [part~='trailing-root'] {
    margin-inline-start: auto;
    margin-inline-end: 12px;
  }
  [part~='leading-root'],
  [part~='trailing-root'] {
    color: var(--md-sys-color-on-surface-variant);
  }
  [part='leading'],
  [part='trailing'] {
    font-family: var(--md-sys-typescale-icon-font-family, 'Material Symbols Outlined');
    font-weight: normal;
    font-style: normal;
    font-size: 1.125rem;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
  ::slotted(iconify-icon) {
    font-size: 1.5rem;
  }
`);

// TODO: inner checkbox, radio
export default class ListItem extends ActionElementLabeled {
  static get is() {
    return 'md-list-item';
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

  get _extraContents() {
    return `<md-ripple></md-ripple>`;
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
    this.parentNode?.querySelectorAll('md-list-item').forEach(item => {
      item.innerElement.tabIndex = -1;
    });
    this.innerElement.tabIndex = 0;
  }
}

customElements.define(ListItem.is, ListItem);
