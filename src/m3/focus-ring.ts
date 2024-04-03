import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Attachable } from '../base/attachable.js';
import { InternalsAttached, internals } from '../base/internals-attached.js';
import { focusVisible } from '../core/variables.js';

import { focusRingStyles } from './focus-ring-styles.js';

@customElement('md-focus-ring')
export default class M3FocusRing extends Attachable(
  InternalsAttached(LitElement)
) {
  constructor() {
    super();
    this[internals].ariaHidden = 'true';
  }
  static styles = [focusRingStyles];
  @property({ type: Boolean, reflect: true }) inward = false;

  #boundFocusIn = this.#handleFocusIn.bind(this);
  #boundFocusOut = this.#handleFocusOut.bind(this);
  #boundPointerDown = this.#handlePointerDown.bind(this);

  #handleFocusIn() {
    if (focusVisible) this[internals].states.add('visible');
  }
  #handleFocusOut() {
    this[internals].states.delete('visible');
  }
  #handlePointerDown() {
    this[internals].states.delete('visible');
  }

  handleControlChange(
    prev: HTMLElement | null = null,
    next: HTMLElement | null = null
  ) {
    const eventHandlers = {
      focusin: this.#boundFocusIn,
      focusout: this.#boundFocusOut,
      pointerdown: this.#boundPointerDown,
    };

    Object.keys(eventHandlers).forEach((eventName) => {
      prev?.removeEventListener(eventName, eventHandlers[eventName]);
      next?.addEventListener(eventName, eventHandlers[eventName]);
    });
  }
}
