import { css } from '../shared/template.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';
import StateLayerStyleFAE from '../shared/state-layer-style-fae.js';
import FocusRingStyleFAE from '../shared/focus-ring-style-fae.js';
// @ts-ignore
import Ripple from '../ripple/ripple.js';
import ListItem from '../list/list-item.js';

const NavigationDrawerItemStyle = css`
  :host {
    width: 100%;
  }
  [part~='button'] {
    width: 100%;
    height: 56px;
    outline: none;
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);

    font-family: var(--md-sys-typoscale-font-family-global);
    padding: 0 24px;
    background-color: transparent;
    color: var(--md-sys-color-on-surface-variant);
    border-radius: var(--md-button-border-radius, 9999px);
    ${TypographyStylesGenerator('label', 'L')}
  }
  :host([disabled]) [part~='button'] {
    color: rgba(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.38);
  }
  :host([selected]) [part~='button'] {
    background-color: var(--md-sys-color-secondary-container);
    color: var(--md-sys-color-on-secondary-container);
  }
  :host([selected][disabled]) [part~='button'] {
    background-color: rgba(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.12);
    color: rgba(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.38);
  }
  [part~='outline'] {
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }
  [part~='target'] {
    position: absolute;
    top: 50%;
    left: 0px;
    right: 0px;
    height: 100%;
    transform: translateY(-50%);
    box-sizing: border-box;
  }
  [part='leading-root'],
  [part='trailing-root'] {
    display: inline-flex;
    color: inherit;
  }
  [part='leading-root'] {
    margin-inline-start: -8px;
    margin-inline-end: 12px;
  }
  [part='trailing-root'] {
    margin-inline-start: auto;
    margin-inline-end: -8px;
  }
  md-icon,
  ::slotted(iconify-icon) {
    font-size: var(--md-button-icon-size, 1.5rem);
  }
`;

export default class NavigationDrawerItem extends ListItem {
  static get is() {
    return 'md-nav-drawer-item';
  }

  get _styles() {
    return [...super._styles, NavigationDrawerItemStyle, StateLayerStyleFAE, FocusRingStyleFAE];
  }
  _renderDisplays() {
    return /* html */ `<span part="outline"></span><md-ripple></md-ripple>`;
  }
}

customElements.define(NavigationDrawerItem.is, NavigationDrawerItem);
