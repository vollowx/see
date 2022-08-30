import { css } from '../shared/template.js';
import ActionElement from '../shared/action-element.js';
import StateLayerStyleFAE from '../shared/state-layer-style-fae.js';
import FocusRingStyleFAE from '../shared/focus-ring-style-fae.js';
// @ts-ignore
import Ripple from '../ripple/ripple.js';
import Icon from '../icon/icon.js';

const IconButtonStyle = css`
  [part~='button'] {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    border-radius: 50%;
    outline: none;

    background-color: var(--md-filled-button-background-color, var(--md-sys-color-primary));
    color: var(--md-filled-button-color, var(--md-sys-color-on-primary));
  }
  :host(:not([tonal]):not([outlined]):not([standard])[toggle]:not([selected])) [part~='button'] {
    background-color: var(--md-filled-toggle-button-background-color, var(--md-sys-color-surface-variant));
    color: var(--md-filled-toggle-button-color, var(--md-sys-color-primary));
  }
  :host([tonal]) [part~='button'] {
    background-color: var(--md-tonal-icon-button-background-color, var(--md-sys-color-secondary));
    color: var(--md-tonal-icon-button-color, var(--md-sys-color-on-secondary));
  }
  :host([tonal][toggle]:not([selected])) [part~='button'] {
    background-color: var(--md-tonal-toggle-button-background-color, var(--md-sys-color-surface-variant));
    color: var(--md-tonal-toggle-button-color, var(--md-sys-color-on-surface-variant));
  }
  :host(:not([outlined]):not([standard])[disabled]) [part~='button'],
  :host([outlined][disabled][selected]) [part~='button'] {
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
  :host([outlined][selected]) [part~='button'] {
    background-color: var(--md-sys-color-inverse-surface);
    color: var(--md-sys-color-inverse-on-surface);
  }
  :host([outlined][selected]) [part~='outline'],
  :host([outlined][disabled][selected]) [part~='outline'] {
    border: none;
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
  :host([standard][selected]) [part~='button'] {
    color: var(--md-sys-color-primary);
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
  md-icon,
  ::slotted(iconify-icon) {
    font-size: 1.5rem;
  }
`;

export default class IconButton extends ActionElement {
  static get is() {
    return 'md-icon-button';
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'icon', 'toggle', 'selected'];
  }
  /** @type {string} */
  get icon() {
    return this.getAttribute('icon') || '';
  }
  set icon(value) {
    this.setAttribute('icon', value);
  }
  /** @type {boolean} */
  get toggle() {
    return this.hasAttribute('toggle');
  }
  set toggle(value) {
    this.toggleAttribute('toggle', value);
  }
  /** @type {boolean} */
  get selected() {
    return this.hasAttribute('selected');
  }
  set selected(value) {
    if (!this.toggle) {
      this.removeAttribute('selected');
      return;
    }
    this.toggleAttribute('selected', value);
  }

  /** @type {Icon} */
  get iconElement() {
    return this.getEl('[part~="icon"]');
  }

  get _styles() {
    return [...super._styles, IconButtonStyle, StateLayerStyleFAE, FocusRingStyleFAE];
  }

  _renderDisplays() {
    return /* html */ `<span part="outline"></span><md-ripple></md-ripple>`;
  }

  _renderContents() {
    return /* html */ `
      <span part="icon-root">
        <md-icon part="icon"></md-icon>
        <slot></slot>
      </span>
    `;
  }

  /**
   * @param {MouseEvent} _ev
   */
  handleClick(_ev) {
    if (!this.toggle) return;
    this.selected = !this.selected;
  }

  connectedCallback() {
    super.connectedCallback();
    this.toggle ? this.innerElement.setAttribute('aria-pressed', this.selected ? 'true' : 'false') : null;
    this.addEventListener('click', this.handleClick);
  }

  /**
   * @param {string} name
   * @param {string|undefined} oldValue
   * @param {string|undefined} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
      case 'icon':
        this.syncNonDataAttrByEmpty(name, this.iconElement);
        break;

      case 'toggle':
        if (newValue === null) {
          this.innerElement.removeAttribute('aria-pressed');
        } else {
          this.innerElement.setAttribute('aria-pressed', this.selected ? 'true' : 'false');
        }
        break;

      case 'selected':
        if (!this.toggle) {
          this.innerElement.removeAttribute('aria-pressed');
          return;
        } else {
          this.innerElement.setAttribute('aria-pressed', this.selected ? 'true' : 'false');
        }
        break;

      default:
        break;
    }
  }
}

customElements.define(IconButton.is, IconButton);
