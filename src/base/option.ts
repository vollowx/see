import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { MenuItem } from './menu-item.js';

type Constructor<T = {}> = new (...args: any[]) => T;

export const OptionMixin = <T extends Constructor<MenuItem>>(superClass: T) => {
  class OptionElement extends superClass {
    @property({ reflect: true }) value: string = '';
    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ type: Boolean, reflect: true }) focused = false;

    override connectedCallback() {
      super.connectedCallback();
      this.setAttribute('role', 'option');
      this.setAttribute('tabindex', '-1');
      this.addEventListener('click', this.#handleOptionClick);
    }

    override disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('click', this.#handleOptionClick);
    }

    protected override updated(changed: Map<string, any>) {
      super.updated(changed);
      if (changed.has('selected')) {
        this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
      }
      this.setAttribute('tabindex', '-1');
    }

    #handleOptionClick = () => {
      if (this.disabled) return;
      this.dispatchEvent(
        new CustomEvent('option-selected', {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        })
      );
    };
  }
  return OptionElement;
};

export class Option extends OptionMixin(MenuItem) {}
