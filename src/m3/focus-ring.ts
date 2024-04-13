import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Attachable } from '../base/attachable.js';
import { InternalsAttached, internals } from '../base/internals-attached.js';
import { focusVisible } from '../core/variables.js';

import { focusRingStyles } from './focus-ring-styles.js';

/**
 * @element md-focus-ring
 *
 * @cssprop --md-focus-ring-active-width
 * @cssprop --md-focus-ring-color
 * @cssprop --md-focus-ring-duration
 * @cssprop --md-focus-ring-inward-offset
 * @cssprop --md-focus-ring-outward-offset
 * @cssprop --md-focus-ring-shape
 * @cssprop --md-focus-ring-shape-end-end
 * @cssprop --md-focus-ring-shape-end-start
 * @cssprop --md-focus-ring-shape-start-end
 * @cssprop --md-focus-ring-shape-start-start
 * @cssprop --md-focus-ring-width
 */
@customElement('md-focus-ring')
export class M3FocusRing extends Attachable(InternalsAttached(LitElement)) {
  constructor() {
    super();
    this[internals].ariaHidden = 'true';
  }
  static override styles = [focusRingStyles];
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

  override handleControlChange(
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
