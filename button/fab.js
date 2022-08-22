import { css } from '../shared/template.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';
import Button from './shared.js';
import StateLayerStyleFAE from '../shared/state-layer-style-fae.js';
import FocusRingStyleFAE from '../shared/focus-ring-style-fae.js';
// @ts-ignore
import Ripple from '../ripple/ripple.js';

const FABStyle = css`
  [part~='button'] {
    min-width: 56px;
    height: 56px;
    outline: none;
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);

    padding: 0 16px;
    font-family: var(--md-sys-typoscale-font-family-global);
    background-color: var(--md-fab-background-color, var(--md-sys-color-primary-container));
    color: var(--md-fab-color, var(--md-sys-color-on-primary-container));
    border-radius: var(--md-fab-border-radius, 16px);
    box-shadow: var(--md-sys-elevation-shadow-3);
    ${TypographyStylesGenerator('label', 'L')}
  }
  :host([surface]) [part~='button'] {
    background-color: var(--md-fab-background-color, var(--md-sys-color-surface));
    color: var(--md-fab-color, var(--md-sys-color-on-surface));
  }
  :host([secondary]) [part~='button'] {
    background-color: var(--md-fab-background-color, var(--md-sys-color-secondary-container));
    color: var(--md-fab-color, var(--md-sys-color-on-secondary-container));
  }
  :host([tertiary]) [part~='button'] {
    background-color: var(--md-fab-background-color, var(--md-sys-color-tertiary-container));
    color: var(--md-fab-color, var(--md-sys-color-on-tertiary-container));
  }
  [part~='button']:hover:not(:active) {
    box-shadow: var(--md-sys-elevation-shadow-4);
  }
  :host([lower]) [part~='button'] {
    box-shadow: var(--md-sys-elevation-shadow-1);
  }
  :host([lower]) [part~='button']:hover:not(:active) {
    box-shadow: var(--md-sys-elevation-shadow-2);
  }
  :host([small]) [part~='button'] {
    min-width: 40px;
    height: 40px;
    padding: 0 8px;
    border-radius: var(--md-fab-border-radius, 12px);
  }
  :host([large]) [part~='button'] {
    min-width: 96px;
    height: 96px;
    padding: 0 30px;
    border-radius: var(--md-fab-border-radius, 28px);
  }
  :host([large]) ::slotted(iconify-icon) {
    font-size: var(--md-fab-large-icon-size, 2.25rem);
  }
  @media (hover: none) {
    [part~='button']:hover:not(:active) {
      box-shadow: var(--md-sys-elevation-shadow-3);
    }
    :host([lower]) [part~='button']:hover:not(:active) {
      box-shadow: var(--md-sys-elevation-shadow-1);
    }
  }
  [part~='button']:disabled {
    background-color: rgba(var(--md-sys-color-on-surface-rgb), 0.12) !important;
    color: rgba(var(--md-sys-color-on-surface-rgb), 0.38) !important;
    box-shadow: none;
  }
  [part~='target'] {
    position: absolute;
    top: 50%;
    left: 0px;
    right: 0px;
    height: calc(100%);
    transform: translateY(-50%);
    box-sizing: border-box;
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
  [part='label-root'],
  [part='leading-root'],
  [part='trailing-root'] {
    display: inline-flex;
  }
  :host([leading]) [part~='leading-root'] {
    margin-inline-end: 8px;
  }
  :host([trailing]) [part~='trailing-root'] {
    margin-inline-start: 8px;
  }
  md-icon,
  ::slotted(iconify-icon) {
    font-size: var(--md-fab-icon-size, 1.5rem);
  }
`;

export default class FAB extends Button {
  static get is() {
    return 'md-fab';
  }

  get _styles() {
    return [...super._styles, FABStyle, StateLayerStyleFAE, FocusRingStyleFAE];
  }
  get _renderAccessability() {
    return /* html */ `<md-ripple></md-ripple>`;
  }
}

customElements.define(FAB.is, FAB);
