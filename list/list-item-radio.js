import ListItem from './list-item.js';

// TODO: nothing is done
export default class ListItemRadio extends ListItem {
  static get is() {
    return 'list-item-radio';
  }

  _renderLeading() {
    return /* html */ `<md-radio></md-radio>`;
  }
}

customElements.define(ListItemRadio.is, ListItemRadio);
