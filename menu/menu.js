import { html, css } from '../shared/template.js';
import BaseElement from '../shared/base-element.js';
import Popover from '../popover/popover.js';

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
    max-height: var(--md-menu-max-height, calc(100vh - 96px));
    overflow-y: auto;
    background: var(--md-sys-elevation-surface-2);
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
  :host(:not([fast])[animate]) [part~='menu'] {
    transition: 120ms transform cubic-bezier(0.4, 0, 0.2, 1) 120ms, 120ms opacity cubic-bezier(0.4, 0, 0.2, 1);
  }
  :host([open]) [part~='menu'] {
    transform: scale(1);
    opacity: 1;
    pointer-events: auto;
    transition-delay: 0ms, 0ms !important;
  }
  :host([dense]) {
    --md-list-item-height: 36px;
  }
  [part~='list'] {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 0px;
    padding: 8px 0;
    list-style: none;
    outline: 0;
  }
`);

/** @type {Menu[]} */
var allMenus = [];
window.addEventListener('resize', () => {
  allMenus.forEach((menu) => {
    menu.setPosition();
  });
});

export default class Menu extends Popover {
  static get is() {
    return 'md-menu';
  }

  get _styles() {
    return [...super._styles, MenuStyle];
  }

  get _content() {
    return /* html */ `
      <ul part="list" role="menu" tabindex="-1">
        <slot part="items"></slot>
      </ul>
    `;
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

  /**
   * @override
   */
  focus() {
    this.listElement.focus();
  }

  open() {
    super.open();
    this.updateFocus(this.itemElements[0], true);
  }
  close() {
    super.close();
    this.itemElements.forEach((item) => {
      item.removeAttribute('focus-from');
    });
  }
  /**
   * @param {MenuItem} item
   * @param {boolean} autoScroll
   */
  updateFocus(item, autoScroll = false) {
    if (autoScroll) {
      const { top, bottom } = item.getBoundingClientRect();
      const { top: listTop, bottom: listBottom } = this.popoverElement.getBoundingClientRect();
      if (top < listTop) {
        this.popoverElement.scrollTop -= listTop - top;
      } else if (bottom > listBottom) {
        this.popoverElement.scrollTop += bottom - listBottom;
      }
    }
    item.focus();
    this.listElement.setAttribute('aria-activedecendant', item.innerElement.id);
  };
  /**
   * @param {KeyboardEvent} e
   */
  handleAnchorKeyDown(e) {
    let flag = false;

    const { key } = e;
    switch (key) {
      case 'ArrowDown':
      case 'Down':
        flag = true;
        this.open();
        break;

      case 'ArrowUp':
      case 'Up':
        flag = true;
        this.open();
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
  handleClick(e) {
    /** @type {MenuItem} */
    // @ts-ignore non-null
    const target = e.target;
    const active = this.activeItem;
    let closeFlag = true;
    if (target.tagName !== 'MD-MENU' && target.tagName !== 'MD-MENU-ITEM') closeFlag = false;
    if (active.disabled) closeFlag = false;
    if (active.hasAttribute('no-closing-on-click')) closeFlag = false;
    if (closeFlag) {
      this.close();
    }
  };
  /**
   * @param {KeyboardEvent} e
   */
  handleKeyDown(e) {
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

    super.handleKeyDown(e);
  };
  /**
   * @param {KeyboardEvent} e
   */
  handleKeyUp(e) {
    let flag = false;

    const { key } = e;
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

  initARIA() {
    if (!this.anchorElement) {
      this.anchorErr();
      return;
    }

    super.initARIA();
    this.listElement.id = `${this.anchorElement.id}-menu`;
    this.listElement.setAttribute('aria-labelby', this.anchorElement.id);
    this.itemElements.forEach((item) => {
      item.innerElement.id = `${this.anchorElement?.id}-item-${[...this.itemElements].indexOf(item)}`;
    });

    this.anchorElement.setAttribute('aria-controls', this.listElement.id);
  }

  connectedCallback() {
    if (!this.anchorElement) {
      this.anchorErr();
      return;
    }
    super.connectedCallback();
    this.anchorElement.addEventListener('keydown', this.handleAnchorKeyDown.bind(this));
    this.listElement.addEventListener('keyup', this.handleKeyUp.bind(this));
    this.listElement.addEventListener('click', this.handleClick.bind(this));

    allMenus.push(this);
  }
}

customElements.define(Menu.is, Menu);
