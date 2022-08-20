import ListItem from './list-item.js';
import Checkbox from '../checkbox/checkbox.js';

// TODO: sync data, now you can only use javascript to set data
export default class ListItemCheckbox extends ListItem {
  static get is() {
    return 'md-list-item-checkbox';
  }

  /** @type {Checkbox} */
  get checkboxElement() {
    return this.getEl('md-checkbox');
  }

  _renderLeading() {
    return /* html */ `<md-checkbox tabindex="-1"></md-checkbox>`;
  }

  /**
   * @param {MouseEvent} _event
   */
  handleClick(_event) {
    if (_event.target !== this) return;
    this.checkboxElement.checked = !this.checkboxElement.checked;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick.bind(this));
  }
}

customElements.define(ListItemCheckbox.is, ListItemCheckbox);
