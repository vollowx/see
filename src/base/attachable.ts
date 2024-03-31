import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

type Constructor<T> = new (...args: any[]) => T;

export declare class AttachableInterface {
  $control: HTMLElement;
  htmlFor: string | null;
  attach(control: HTMLElement): void;
  detach(): void;
  handleControlChange(prev: HTMLElement | null, next: HTMLElement | null): void;
}

export const Attachable = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class AttachableElement extends superClass {
    connectedCallback() {
      super.connectedCallback();
      this.setCurrentControl(this.$control);
    }
    disconnectedCallback() {
      this.setCurrentControl(null);
      super.disconnectedCallback();
    }

    get $control() {
      if (this.hasAttribute('for')) {
        if (!this.htmlFor || !this.isConnected) {
          return null;
        }

        return (
          this.getRootNode() as Document | ShadowRoot
        ).querySelector<HTMLElement>(`#${this.htmlFor}`);
      }

      return this.currentControl || this.parentElement;
    }
    set $control(control: HTMLElement | null) {
      if (control) {
        this.attach(control);
      } else {
        this.detach();
      }
    }

    private currentControl: HTMLElement | null = null;
    // FIXME: Listen to changes, but shouldn't be triggered in first render
    // attributeChangedCallback(
    //   name: string,
    //   oldValue: string | null,
    //   newValue: string | null
    // ) {
    //   if (name === 'for') this.setCurrentControl(this.$control);
    //   else super.attributeChangedCallback(name, oldValue, newValue);
    // }
    @property({ attribute: 'for', type: String }) htmlFor: string | null;

    private setCurrentControl(control: HTMLElement | null) {
      this.handleControlChange(this.currentControl, control);
      this.currentControl = control;
    }

    attach(control: HTMLElement) {
      if (control === this.currentControl) return;
      this.setCurrentControl(control);
      this.removeAttribute('for');
    }
    detach() {
      this.setCurrentControl(null);
      this.setAttribute('for', '');
    }

    handleControlChange(prev: Node | null = null, next: Node | null = null) {}
  }
  return AttachableElement as Constructor<AttachableInterface> & T;
};
