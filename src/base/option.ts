import { property } from 'lit/decorators.js';

import { internals } from './internals-attached.js';
import { MenuItem } from './menu-item.js';

export const OptionMixin = <T extends Constructor<MenuItem>>(superClass: T) => {
  class OptionElement extends superClass {
    @property({ reflect: true }) value: string = '';

    override connectedCallback() {
      super.connectedCallback();
      this[internals].role = 'option';
    }
  }
  return OptionElement;
};

export class Option extends OptionMixin(MenuItem) {}
