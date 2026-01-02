import { property } from 'lit/decorators.js';

import { ListItem } from './list-item.js';

export const OptionMixin = <T extends Constructor<ListItem>>(superClass: T) => {
  class OptionElement extends superClass {
    @property({ reflect: true }) value: string = '';
  }
  return OptionElement;
};

export class Option extends OptionMixin(ListItem) {}
