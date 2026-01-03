import { ListItem } from './list-item.js';

export const MenuItemMixin = <T extends Constructor<ListItem>>(
  superClass: T
) => {
  class OptionElement extends superClass {
    override _role: string = 'menuitem';
  }
  return OptionElement;
};

export class MenuItem extends MenuItemMixin(ListItem) {}
