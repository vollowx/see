import ListItem from './list-item.js';

// TODO: nothing is done
export default class ListItemCheckbox extends ListItem {
  static get is() {
    return 'list-item-checkbox';
  }

  _renderLeading() {
    return /* html */ `<md-checkbox></md-checkbox>`;
  }
}

customElements.define(ListItemCheckbox.is, ListItemCheckbox);
