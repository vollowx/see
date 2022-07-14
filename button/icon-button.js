import { css } from '../shared/template.js';
import ActionElement from '../shared/action-element.js';
import StateLayerStyle from '../shared/state-layer-style.js';
import FocusRingStyle from '../shared/focus-ring-style.js';
// @ts-ignore
import Ripple from '../ripple/ripple.js';

const IconButtonStyle = new CSSStyleSheet();
IconButtonStyle.replaceSync(css`
  [part~='button'] {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    outline: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    background-color: var(--md-filled-button-background-color, var(--md-sys-color-primary));
    color: var(--md-filled-button-color, var(--md-sys-color-on-primary));
  }
  :host([tonal]) [part~='button'] {
    background-color: var(--md-tonal-icon-button-background-color, var(--md-sys-color-secondary));
    color: var(--md-tonal-icon-button-color, var(--md-sys-color-on-secondary));
  }
  :host(:not([outlined]):not([standard])[disabled]) [part~='button'] {
    background-color: rgba(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.12);
    color: rgba(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.38);
  }
  :host([outlined]) [part~='button'] {
    background-color: transparent;
    color: var(--md-outlined-icon-button-color, var(--md-sys-color-on-surface-variant));
  }
  :host([outlined]) [part~='outline'] {
    border: 1px solid var(--md-outlined-button-border-color, var(--md-sys-color-outline));
  }
  :host([outlined]) [part~='button']:focus-visible [part~='outline'] {
    border-color: var(--md-outlined-icon-button-focus-color, var(--md-sys-color-primary));
  }
  :host([outlined][disabled]) [part~='button'] {
    color: rgba(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.38);
  }
  :host([outlined][disabled]) [part~='outline'] {
    border-color: rgba(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.12);
  }
  :host([standard]) [part~='button'] {
    background-color: transparent;
    color: var(--md-standard-icon-button-color, var(--md-sys-color-on-surface-variant));
  }
  :host([standard][disabled]) [part~='button'] {
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
  [part='target'] {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 48px;
    height: 48px;
    transform: translate(-50%, -50%);
  }
  [part='icon-root'] {
    display: inline-flex;
  }
  [part='icon'] {
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

export default class IconButton extends ActionElement {
  static get is() {
    return 'md-icon-button';
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'icon'];
  }
  /** @type {string} */
  get icon() {
    return this.getAttribute('icon') || '';
  }
  set icon(value) {
    this.setAttribute('icon', value);
  }

  /** @type {HTMLSpanElement} */
  get iconElement() {
    return this.getEl('[part~="icon"]');
  }

  get _styles() {
    return [
      ...super._styles,
      IconButtonStyle,
      StateLayerStyle,
      FocusRingStyle,
    ];
  }

  get _extraContents() {
    return /* html */ `<span part="outline"></span><md-ripple></md-ripple>`;
  }

  get _mainContents() {
    return /* html */ `
      <span part="icon-root">
        <span part="icon">${this.icon}</span>
        <slot></slot>
      </span>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (!this._rendered) return;

    switch (name) {
      case 'icon':
        this.iconElement.innerHTML = newValue;
        break;

      default:
        break;
    }
  }
}

customElements.define(IconButton.is, IconButton);
