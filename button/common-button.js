import { css } from '../shared/template.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';
import ActionElementLabeled from '../shared/action-element-labeled.js';
import StateLayerStyle from '../shared/state-layer-style.js';
import FocusRingStyle from '../shared/focus-ring-style.js';
// @ts-ignore
import Ripple from '../ripple/ripple.js';

const CommonButtonStyle = new CSSStyleSheet();
CommonButtonStyle.replaceSync(css`
  [part~='button'] {
    height: 40px;
    cursor: pointer;
    border: none;
    outline: none;
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);

    font-family: var(--md-sys-typoscale-font-family-global);
    padding: 0 24px;
    background-color: var(--md-filled-button-background-color, var(--md-sys-color-primary));
    color: var(--md-filled-button-color, var(--md-sys-color-on-primary));
    border-radius: var(--md-button-border-radius, 114514px);
    ${TypographyStylesGenerator('label', 'L')}
  }
  :host([tonal]) [part~='button'] {
    background-color: var(--md-tonal-button-background-color, var(--md-sys-color-secondary));
    color: var(--md-tonal-button-color, var(--md-sys-color-on-secondary));
  }
  :host(:not([elevated]):not([outlined]):not([text])) [part~='button']:hover:not(:active):not([touched]) {
    box-shadow: var(--md-sys-elevation-shadow-1);
  }
  :host(:not([outlined]):not([text])[disabled]) [part~='button'] {
    box-shadow: none;
    background-color: rgba(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.12);
    color: rgba(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.38);
  }
  :host([elevated]) [part~='button'] {
    background-color: var(--md-elevated-button-background-color, var(--md-sys-color-surface));
    color: var(--md-elevated-button-color, var(--md-sys-color-primary));
    box-shadow: var(--md-sys-elevation-shadow-1);
  }
  :host([elevated]) [part~='button']:hover:not(:active):not([touched]) {
    box-shadow: var(--md-sys-elevation-shadow-2);
  }
  :host([outlined]) [part~='button'] {
    background-color: transparent;
    color: var(--md-outlined-button-color, var(--md-sys-color-primary));
  }
  :host([outlined]) [part~='outline'] {
    border: 1px solid var(--md-outlined-button-border-color, var(--md-sys-color-outline));
  }
  :host([outlined]) [part~='button']:focus-visible [part~='outline'] {
    border-color: var(--md-outlined-button-focus-color, var(--md-sys-color-primary));
  }
  :host([outlined][disabled]) [part~='button'] {
    color: rgba(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.38);
  }
  :host([outlined][disabled]) [part~='outline'] {
    border-color: rgba(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.12);
  }
  :host([text]) [part~='button'] {
    min-width: 64px;
    padding: 0 12px;
    background-color: transparent;
    color: var(--md-text-button-color, var(--md-sys-color-primary));
  }
  :host([text][disabled]) [part~='button'] {
    color: rgba(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.38);
  }
  [part~='outline'] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
  }
  [part~='target'] {
    position: absolute;
    top: 50%;
    left: 0px;
    right: 0px;
    height: calc(100% + 8px);
    transform: translateY(-50%);
    box-sizing: border-box;
  }
  [part='leading-icon'],
  [part='trailing-icon'] {
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
  [part='leading-icon-root'],
  [part='trailing-icon-root'] {
    display: inline-flex;
  }
  [part='leading-icon-root'] {
    margin-inline-start: -8px;
    margin-inline-end: 8px;
  }
  [part='trailing-icon-root'] {
    margin-inline-start: 8px;
    margin-inline-end: -8px;
  }
  :host([text][leading-icon]) [part~='button'] {
    padding-inline-start: 20px;
    padding-inline-end: 16px;
  }
  :host([text][trailing-icon]) [part~='button'] {
    padding-inline-start: 16px;
    padding-inline-end: 20px;
  }
  ::slotted(iconify-icon) {
    font-size: 1.125rem;
  }
`);

export default class CommonButton extends ActionElementLabeled {
  /**
   * @override
   */
  static get is() {
    return 'md-button';
  }

  /**
   * @override
   */
  get _styles() {
    return [
      ...super._styles,
      CommonButtonStyle,
      StateLayerStyle,
      FocusRingStyle
    ];
  }

  /**
   * @override
   */
  get _extraContents() {
    return /* html */`<span part="outline"></span><md-ripple></md-ripple>`;
  }
}

customElements.define(CommonButton.is, CommonButton);
