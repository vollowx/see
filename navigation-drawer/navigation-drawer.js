import BaseElement from '../shared/base-element.js';
import TrapFocus from '../shared/trap-focus.js';
import { html, css } from '../shared/template.js';
import NavigationDrawerItem from './navigation-drawer-item.js';

const NavigationDrawerStyle = css`
  :host {
    display: flex;
    height: 100%;
    --md-nav-drawer-width: 360px;
  }
  ns-trap-focus {
    z-index: 4;
  }
  [part~='drawer'] {
    flex-shrink: 0;
    max-width: var(--md-nav-drawer-width);
    width: var(--md-nav-drawer-width);
    height: 100%;
    background: var(--md-sys-color-surface);
    border-radius: 0 16px 16px 0;
    transition: 250ms transform cubic-bezier(0.4, 0, 0.2, 1), 250ms margin cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
    box-sizing: border-box;
  }
  [part='drawerContent'] {
    padding: 12px;
    height: 100%;
    overflow-x: auto;
    box-sizing: border-box;
  }
  [part~='content'] {
    width: 100%;
    overflow: auto;
  }
  @media (max-width: 1199px) {
    [part~='drawer'] {
      transform: translateX(-100%);
      margin-inline-end: calc(0px - var(--md-nav-drawer-width));
    }
    :host([dir='rtl']) [part~='drawer'] {
      transform: translateX(100%);
    }
  }
  :host([modal]) ns-trap-focus {
    visibility: hidden;
  }
  :host([modal]) [part~='drawer'] {
    transform: translateX(-100%);
    margin-inline-end: calc(0px - var(--md-nav-drawer-width));
    background: var(--md-sys-elevation-surface-1);
  }
  :host([modal][dir='rtl']) [part~='drawer'] {
    transform: translateX(100%);
    border-radius: 16px 0 0 16px;
  }
  :host([modal]) [part='overlay'] {
    display: block;
    position: fixed;
    inset: 0;
    background-color: var(--md-sys-color-on-surface-light);
    transition: 250ms opacity cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 4;
    opacity: 0;
    pointer-events: none;
  }
  :host([modal][open]) [part='overlay'] {
    opacity: 0.56;
    pointer-events: auto;
  }
  :host([modal][open]) ns-trap-focus {
    visibility: visible;
  }
  :host([modal][open]) [part~='drawer'] {
    transform: translateX(0);
  }
`;

export default class NavigationDrawer extends BaseElement {
  static get is() {
    return 'md-nav-drawer';
  }

  static get observedAttributes() {
    return [
      'open',
      'modal',
      'aria-label',
      'data-aria-label',
      'aria-labelby',
      'data-aria-labelby',
      'aria-describedby',
      'data-aria-describedby',
      'aria-modal',
      'data-aria-modal',
    ];
  }
  get open() {
    return this.hasAttribute('open');
  }
  set open(value) {
    this.toggleAttribute('open', value);
  }
  get modal() {
    return this.hasAttribute('modal');
  }
  set modal(value) {
    this.toggleAttribute('modal', value);
  }
  get ariaLabel() {
    return this.getAttribute('data-aria-label');
  }
  set ariaLabel(value) {
    if (value) {
      this.setAttribute('data-aria-label', value);
    } else {
      this.removeAttribute('data-aria-label');
    }
  }
  get ariaLabelBy() {
    return this.getAttribute('data-aria-labelby');
  }
  set ariaLabelBy(value) {
    if (value) {
      this.setAttribute('data-aria-labelby', value);
    } else {
      this.removeAttribute('data-aria-label');
    }
  }
  get ariaDescribedBy() {
    return this.getAttribute('data-aria-describedby');
  }
  set ariaDescribedBy(value) {
    if (value) {
      this.setAttribute('data-aria-describedby', value);
    } else {
      this.removeAttribute('data-aria-describedby');
    }
  }
  _defaultAriaModal = 'false';
  get ariaModal() {
    return this.getAttribute('data-aria-modal') || this._defaultAriaModal;
  }
  set ariaModal(value) {
    this.setAttribute('data-aria-modal', value || this._defaultAriaModal);
  }

  /** @type {TrapFocus} */
  get trapFocusElement() {
    return this.getEl('ns-trap-focus');
  }
  /** @type {HTMLDivElement} */
  get overlayElement() {
    return this.getEl('[part="overlay"]');
  }

  get _styles() {
    return [NavigationDrawerStyle];
  }
  get _template() {
    return html`
      <div part="overlay" aria-hidden="true"></div>
      <ns-trap-focus>
        <aside
          part="inner drawer"
          tabindex="-1"
          aria-expanded="${this.open ? 'true' : 'false'}"
          aria-hidden="${this.open ? 'true' : 'false'}"
        >
          <div part="drawerHeader">
            <slot name="drawerHeader"></slot>
          </div>
          <div part="drawerContent">
            <slot name="drawerContent"></slot>
          </div>
        </aside>
      </ns-trap-focus>
      <div part="content"><slot></slot></div>
    `;
  }

  updateStates() {
    if (!this.innerElement) return;
    const opened = this.open;
    this.innerElement.ariaExpanded = opened ? 'true' : 'false';
    this.innerElement.ariaHidden = !opened ? 'true' : 'false';
    if (opened) {
      this.innerElement.focus();
    } else {
      this.trapFocusElement.style.visibility = 'visible';
      setTimeout(() => {
        // @ts-ignore
        this.trapFocusElement.style.visibility = '';
      }, 250);
    }
    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent('navigation-drawer-changed', { detail: { opened: opened }, bubbles: true, composed: true })
      );
    }, 250);
  }
  /**
   * @param {KeyboardEvent} _e
   */
  handleKeyDown(_e) {
    if (_e.code === 'Escape') {
      this.open = false;
    }
  }
  /**
   * @param {MouseEvent} _ev
   */
  handleClick(_ev) {
    let close = false;
    /** @type {NavigationDrawer|NavigationDrawerItem} */
    // @ts-ignore
    const target = _ev.target;
    if (
      target.tagName === 'MD-NAV-DRAWER-ITEM' &&
      !target.hasAttribute('disabled') &&
      !target.hasAttribute('collapse-controller')
    ) {
      close = true;
    }
    // if (target.tagName === 'MD-LIST') {
    //   // For ARIA menu closing
    //   close = true;
    // }
    if (close) {
      this.open = false;
    }
  }
  /**
   * @param {MouseEvent} _ev
   */
  handleOverlayClick(_ev) {
    this.open = false;
  }

  connectedCallback() {
    this.trapFocusElement._root = this.querySelector('[slot="drawerContent"]') || this;
    this.innerElement?.addEventListener('click', this.handleClick.bind(this));
    this.innerElement?.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.overlayElement.addEventListener('click', this.handleOverlayClick.bind(this));
  }
  /**
   * @param {string} name
   * @param {string|undefined} oldValue
   * @param {string|undefined} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (
      [
        'aria-label',
        'data-aria-label',
        'aria-labelby',
        'data-aria-labelby',
        'aria-describedby',
        'data-aria-describedby',
      ].includes(name)
    ) {
      this.syncDataAttrByEmpty(name);
      return;
    }
    if (name === 'open') {
      this.updateStates();
      return;
    }
    if (name === 'modal') {
      if (this.modal) {
        this.innerElement?.setAttribute('role', 'dialog');
      } else {
        this.innerElement?.removeAttribute('role');
      }
    }
    if (['aria-modal', 'data-aria-modal'].includes(name)) {
      this.syncDataAttrByEmpty(name, this.innerElement, this._defaultAriaModal);
    }
  }
}

customElements.define(NavigationDrawer.is, NavigationDrawer);
