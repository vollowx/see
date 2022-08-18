import { html, css } from '../shared/template.js';
import BaseElement from '../shared/base-element.js';
import ListItem from './list-item.js';

const ListStyle = new CSSStyleSheet();
ListStyle.replaceSync(css`
  :host() {
    display: block;
  }
  :host([normal]) {
    --md-list-item-height: 48px;
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

export default class List extends BaseElement {
  static get is() {
    return 'md-list';
  }

  static get observedAttributes() {
    return [];
  }

  get _styles() {
    return [ListStyle];
  }

  get _template() {
    return html`
      <ul part="list" role="${this.getAttribute('data-role') || 'list'}">
        <slot></slot>
      </ul>
    `;
  }

  /** @returns {HTMLElement|null} */
  itemsContainer() {
    return null;
  }
  /** @returns {HTMLElement|null} */
  scrollContainer() {
    return null;
  }
  /** @type {HTMLUListElement} */
  get listElement() {
    return this.getEl('[part~="list"]');
  }
  /** @type {ListItem[]} */
  get itemElements() {
    // @ts-ignore
    return [...(this.itemsContainer() || this).querySelectorAll('md-list-item')];
  }
  /** @type {ListItem} */
  get activeItem() {
    return (this.itemsContainer() || this).querySelector('[focus-from]') || this.itemElements[0];
  }
  /** @type {ListItem|null} */
  get selectedItem() {
    return (this.itemsContainer() || this).querySelector('[selected]');
  }

  get itemKeyChars() {
    return [...this.itemElements].map((item) => item.keyChar);
  }

  focus() {
    (this.selectedItem || this.activeItem).focus();
  }
  /**
   * @param {ListItem} item
   * @param {boolean} autoScroll
   */
  updateFocus(item = this.selectedItem || this.activeItem, autoScroll = false) {
    const scrollContainer = this.scrollContainer();
    if (autoScroll && scrollContainer) {
      const { top, bottom } = item.getBoundingClientRect();
      const { top: listTop, bottom: listBottom } = scrollContainer.getBoundingClientRect();
      if (top < listTop) {
        scrollContainer.scrollTop -= listTop - top;
      } else if (bottom > listBottom) {
        scrollContainer.scrollTop += bottom - listBottom;
      }
    }
    item.focus();
    this.listElement.setAttribute('aria-activedecendant', item.innerElement.id);
  }
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
  }
  /**
   * @param {string} char
   */
  focusNextByChar(char) {
    char = char.toLowerCase();
    let start = this.itemElements.indexOf(this.activeItem) + 1;
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
    let i = this.itemElements.indexOf(active);
    i--;
    if (i < 0) {
      i = this.itemElements.length - 1;
    }
    this.focusByIndex(i, true);
  }
  focusNext() {
    const active = this.activeItem;
    let i = this.itemElements.indexOf(active);
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

  connectedCallback() {
    this.itemElements[0] ? (this.itemElements[0].innerElement.tabIndex = 0) : null;
    this.listElement.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
}

customElements.define(List.is, List);
