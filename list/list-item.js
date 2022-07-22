import { css } from '../shared/template.js';
import ActionElementLabeled from '../shared/action-element-labeled.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';

// @ts-ignore
import Ripple from '../ripple/ripple.js';
import StateLayerStyleFAE from '../shared/state-layer-style-fae.js';

const ListItemStyle = new CSSStyleSheet();
ListItemStyle.replaceSync(css`
  [part~='button'] {
    position: relative;
    display: flex;
    align-items: center;
    height: var(--md-list-item-height, 48px);
    color: var(--md-sys-color-on-surface);
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
  [part~='leading-root'],
  [part~='trailing-root'] {
    color: var(--md-sys-color-on-surface-variant);
  }
  ::slotted(iconify-icon) {
    font-size: 1.5rem;
  }
`);

export default class ListItem extends ActionElementLabeled {
  static get is() {
    return 'md-list-item';
  }

  get _defaultTag() {
    return 'li';
  }
  get _defaultRole() {
    return 'option';
  }
  get _defaultTabIndex() {
    return '-1';
  }

  get _styles() {
    return [ListItemStyle, StateLayerStyleFAE];
  }

  get _extraContents() {
    return `<md-ripple></md-ripple>`;
  }
}

customElements.define(ListItem.is, ListItem);
