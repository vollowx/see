import { ListItem } from './list-item.js';

// FIXME: ID auto-generation still names menu-item-...
export const MenuItemMixin = <T extends Constructor<ListItem>>(
  superClass: T
) => {
  class OptionElement extends superClass {
    override _role: string = 'menuitem';
  }
  return OptionElement;
};

export class MenuItem extends MenuItemMixin(ListItem) {}
