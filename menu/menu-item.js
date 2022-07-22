import ListItem from "../list/list-item.js";

export default class MenuItem extends ListItem {
  static get is() {
    return 'md-menu-item';
  }

  get keyChar() {
    return this.getAttribute('key-char');
  }
  
  get _defaultRole() {
    return 'menuitem';
  }

  get _noFocusCtrl() {
    return true;
  }
}

customElements.define(MenuItem.is, MenuItem);
