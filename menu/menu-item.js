import { css } from '../shared/template.js';
import ActionElementLabeled from '../shared/action-element-labeled.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';

// @ts-ignore
import Ripple from '../ripple/ripple.js';
import StateLayerStyleFAE from '../shared/state-layer-style-fae.js';

const MenuItemStyle = new CSSStyleSheet();
MenuItemStyle.replaceSync(css`
  [part~='button'] {
    position: relative;
    display: flex;
    align-items: center;
    height: var(--md-menu-item-height, 48px);
    cursor: pointer;
    user-select: none;
    outline: none;
    ${TypographyStylesGenerator('label', 'L')}
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
  ::slotted(iconify-icon) {
    font-size: 1.5rem;
  }
`);

export default class MenuItem extends ActionElementLabeled {
  static get is() {
    return 'md-menu-item';
  }

  get keyChar() {
    return this.getAttribute('key-char');
  }

  get _defaultTag() {
    return 'li';
  }
  get _defaultRole() {
    return 'menuitem';
  }
  get _defaultTabIndex() {
    return '-1';
  }

  get _noFocusCtrl() {
    return true;
  }

  get _styles() {
    return [MenuItemStyle, StateLayerStyleFAE];
  }

  get _extraContents() {
    return `<md-ripple></md-ripple>`;
  }
}

customElements.define(MenuItem.is, MenuItem);