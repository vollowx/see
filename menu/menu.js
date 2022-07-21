import { html, css } from '../shared/template.js';
import BaseElement from '../shared/base-element.js';

import MenuItem from './menu-item.js';

const MenuStyle = new CSSStyleSheet();
MenuStyle.replaceSync(css`
  :host {
    z-index: 1000;
  }
  [part~='menu'] {
    position: fixed;
    min-width: 112px;
    max-width: 280px;
    max-height: calc(100vh - 96px);
    height: var(--md-menu-height, auto);
    overflow-y: auto;
    background: var(--md-sys-color-surface);
    box-shadow: var(--md-sys-elevation-shadow-2);
    transform: scale(0.9);
    opacity: 0;
    border-radius: 4px;
    z-index: 1000;
    pointer-events: none;
  }
  [part~='overlay'] {
    position: fixed;
    inset: 0;
    pointer-events: auto;
    visibility: hidden;
    -webkit-tap-highlight-color: transparent;
    z-index: 1000;
  }
  :host([open]) [part~='overlay'] {
    visibility: visible;
  }
  :host(:not([fast])) [part~='menu'] {
    transition: 120ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  :host([open]) [part~='menu'] {
    transform: scale(1);
    opacity: 1;
    pointer-events: auto;
  }
  :host([dense]) {
    --md-menu-item-height: 36px;
  }
  [part~='list'] {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 0px;
    padding: 8px 0;
    list-style: none;
    background-color: rgba(var(--md-sys-color-primary-rgb), 0.08);
    outline: 0;
  }
`);

/** @type {Menu[]} */
var allMenus = [];
window.addEventListener('resize', () => {
  allMenus.forEach((menu) => {
    menu.updatePosition();
  });
});

function isRTL() {
  return document.documentElement.getAttribute('dir') === 'rtl';
}

export default class Menu extends BaseElement {
  static get is() {
    return 'md-menu';
  }

  get vertical() {
    return this.getAttribute('vertical') || 'bottom';
  }
  set vertical(value) {
    this.setAttribute('vertical', value || 'bottom');
  }
  get horizontal() {
    return this.getAttribute('horizontal') || 'left';
  }
  set horizontal(value) {
    this.setAttribute('horizontal', value || 'left');
  }

  get _styles() {
    return [MenuStyle];
  }

  get _template() {
    return html`
      <div part="overlay"></div>
      <div part="menu">
        <ul part="list" role="menu" tabindex="-1">
          <slot part="items"></slot>
        </ul>
      </div>
    `;
  }

  /** @type {HTMLElement|null} */
  get bindElement() {
    const id = this.getAttribute('bind-el');
    return this.parentElement?.querySelector(`#${id}`) || document.querySelector(`#${id}`);
  }
  /** @type {HTMLDivElement} */
  get menuElement() {
    return this.getEl('[part~="menu"]');
  }
  /** @type {HTMLDivElement} */
  get overlayElement() {
    return this.getEl('[part~="overlay"]');
  }
  /** @type {HTMLUListElement} */
  get listElement() {
    return this.getEl('[part~="list"]');
  }
  /** @type {NodeListOf<MenuItem>} */
  get itemElements() {
    return this.querySelectorAll('md-menu-item');
  }
  /** @type {MenuItem} */
  get activeItem() {
    return this.querySelector('[focus-from]') || this.itemElements[0];
  }

  get itemKeyChars() {
    return [...this.itemElements].map((item) => item.keyChar);
  }
  get isOpen() {
    return this.hasAttribute('open');
  }
  // FIXME: the first open has no transform-origin
  updatePosition() {
    this.menuElement.setAttribute('style', '');
    if (!this.bindElement) return;
    const binderRect = this.bindElement.getBoundingClientRect();
    const menuRect = this.menuElement.getBoundingClientRect();
    const menuTransformOrigin = {
      v: this.vertical === 'top' ? menuRect.height + 16 : -binderRect.height,
      h: (this.horizontal === 'right') !== isRTL() ? menuRect.width / 9 * 10 - binderRect.width : 0,
    };
    let top = binderRect.top - menuTransformOrigin.v;
    let left = binderRect.left - menuTransformOrigin.h;
    const right = left + menuRect.width;
    const bottom = top + menuRect.height;
    const heightThreshold = window.innerHeight - 48;
    const widthThreshold = window.innerWidth - 48;
    if (top < 48) {
      const diff = top - 48;
      top -= diff;
      menuTransformOrigin.v += diff;
    } else if (bottom > heightThreshold) {
      const diff = bottom - heightThreshold;
      top -= diff;
      menuTransformOrigin.v += diff;
    }
    if (left < 48) {
      const diff = left - 48;
      left -= diff;
      menuTransformOrigin.h += diff;
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold;
      left -= diff;
      menuTransformOrigin.h += diff;
    }
    this.menuElement.style.transformOrigin = `
    ${Math.round(menuTransformOrigin.h)}px
      ${Math.round(menuTransformOrigin.v)}px`;
    this.menuElement.style.top = `${top}px`;
    this.menuElement.style.left = `${left}px`;
  }
  openMenu = () => {
    // binder
    this.bindElement?.setAttribute('aria-expanded', 'true');
    // this
    this.setAttribute('aria-hidden', 'false');
    this.setAttribute('open', '');
    this.updateFocus(this.itemElements[0], true);
    // document
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--md-global-padding-right', '15px');
    // final
    this.focus();
  };
  closeMenu = () => {
    // binder
    this.bindElement?.setAttribute('aria-expanded', 'false');
    // this
    this.setAttribute('aria-hidden', 'true');
    this.removeAttribute('open');
    this.itemElements.forEach((item) => {
      item.removeAttribute('focus-from');
    });
    // document
    document.documentElement.style.overflow = '';
    document.documentElement.style.removeProperty('--md-global-padding-right');
    // final
    this.bindElement?.focus();
  };
  /**
   * @param {MenuItem} item
   * @param {boolean} autoScroll
   */
  updateFocus = (item, autoScroll = false) => {
    if (autoScroll) {
      const { top, bottom } = item.getBoundingClientRect();
      const { top: listTop, bottom: listBottom } = this.menuElement.getBoundingClientRect();
      if (top < listTop) {
        this.menuElement.scrollTop -= listTop - top;
      } else if (bottom > listBottom) {
        this.menuElement.scrollTop += bottom - listBottom;
      }
    }
    this.activeItem.removeAttribute('focus-from');
    item.setAttribute('focus-from', 'keyboard');
    this.listElement.setAttribute('aria-activedecendant', item.innerElement.id);
  };
  /**
   * @param {KeyboardEvent} e
   */
  handleBinderKeyDown = (e) => {
    let flag = false;

    const { key } = e;
    switch (key) {
      case 'ArrowDown':
      case 'Down':
        flag = true;
        this.updatePosition();
        this.openMenu();
        break;

      case 'ArrowUp':
      case 'Up':
        flag = true;
        this.updatePosition();
        this.openMenu();
        this.focusLast();
        break;

      default:
        break;
    }

    if (flag) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  /**
   * @param {MouseEvent} e
   */
  handleBinderClick = (e) => {
    this.updatePosition();
    this.openMenu();
  };
  /**
   * @param {MouseEvent} e
   */
  handleClick = (e) => {
    /** @type {MenuItem} */
    // @ts-ignore non-null
    const target = e.target;
    const active = this.activeItem;
    let closeFlag = true;
    if (target.tagName !== 'MD-MENU' && target.tagName !== 'MD-MENU-ITEM') closeFlag = false;
    if (active.disabled) closeFlag = false;
    if (active.hasAttribute('no-closing-on-click')) closeFlag = false;
    if (closeFlag) {
      this.closeMenu();
    }
  };
  /**
   * @param {KeyboardEvent} e
   */
  handleKeyDown = (e) => {
    let flag = false;

    if (e.ctrlKey || e.altKey || e.metaKey) {
      return;
    }

    const { key } = e;

    /**
     * @param {string} c
     */
    function isCharacterCanBeIndex(c) {
      return c.length === 1 && c.match(/\S/);
    }
    if (isCharacterCanBeIndex(key)) {
      flag = true;
      this.focusNextByChar(key);
    }

    switch (key) {
      case 'ArrowUp':
      case 'Up':
        flag = true;
        this.focusPrevious();
        break;

      case 'ArrowDown':
      case 'Down':
        flag = true;
        this.focusNext();
        break;

      case 'PageUp':
      case 'Home':
        flag = true;
        this.focusFirst();
        break;

      case 'PageDown':
      case 'End':
        flag = true;
        this.focusLast();
        break;

      case 'Escape':
      case 'Esc':
        flag = true;
        this.closeMenu();
        break;

      case 'Tab':
        this.closeMenu();
        break;

      case 'Enter':
        flag = true;
        this.activeItem.click();
        break;

      case ' ':
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  /**
   * @param {KeyboardEvent} e
   */
  handleKeyUp = (e) => {
    let flag = false;

    const key = e.key;
    switch (key) {
      case ' ':
        flag = true;
        this.activeItem.click();
        break;

      default:
        break;
    }

    if (flag) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  focus() {
    this.listElement.focus();
  }
  /**
   * @param {string} char
   */
  focusNextByChar(char) {
    char = char.toLowerCase();
    let start = [...this.itemElements].indexOf(this.activeItem) + 1;
    if (start >= this.itemElements.length) {
      start = 0;
    }

    let index = this.itemKeyChars.indexOf(char, start);
    // Not found
    if (index === -1) {
      index = this.itemKeyChars.indexOf(char, 0);
    }

    // Found
    if (index > -1) {
      this.focusByIndex(index, true);
    }
  }
  /**
   * @param {number} index
   * @param {boolean} autoScroll
   */
  focusByIndex(index, autoScroll = false) {
    const item = this.itemElements[index];
    if (item) {
      this.updateFocus(item, autoScroll);
    }
  }
  focusPrevious() {
    const active = this.activeItem;
    let i = [...this.itemElements].indexOf(active);
    i--;
    if (i < 0) {
      i = this.itemElements.length - 1;
    }
    this.focusByIndex(i, true);
  }
  focusNext() {
    const active = this.activeItem;
    let i = [...this.itemElements].indexOf(active);
    i++;
    if (i >= this.itemElements.length) {
      i = 0;
    }
    this.focusByIndex(i, true);
  }
  focusFirst() {
    this.focusByIndex(0, true);
  }
  focusLast() {
    this.focusByIndex(this.itemElements.length - 1, true);
  }

  initARIAAttributes() {
    if (!this.bindElement) return;

    // This
    this.setAttribute('aria-hidden', 'true');

    this.listElement.id = `${this.bindElement.id}-menu`;
    this.listElement.setAttribute('aria-labelby', this.bindElement.id);

    this.itemElements.forEach((item) => {
      item.innerElement.id = `${this.bindElement?.id}-item-${[...this.itemElements].indexOf(item)}`;
    });
    this.listElement.setAttribute('aria-activedecendant', this.itemElements[0].innerElement.id);

    // Binder
    this.bindElement.setAttribute('aria-controls', this.listElement.id);
    this.bindElement.setAttribute('aria-haspopup', 'true');
  }

  connectedCallback() {
    if (!this.bindElement) {
      console.error(this, '`bind-el` is not defined');
      return;
    }
    this.bindElement.addEventListener('keydown', this.handleBinderKeyDown);
    this.bindElement.addEventListener('click', this.handleBinderClick);
    this.listElement.addEventListener('keydown', this.handleKeyDown);
    this.listElement.addEventListener('keyup', this.handleKeyUp);
    this.listElement.addEventListener('click', this.handleClick);
    this.overlayElement.addEventListener('click', this.closeMenu);

    this.initARIAAttributes();

    allMenus.push(this);
  }
}

customElements.define(Menu.is, Menu);
