import ReactiveElement from '../core/reactive-element.js';
import { sheetsFromCss } from '../core/template.js';
import { customElement, property } from '../core/decorators.js';

import AttachableMixin from '../base/attachable-mixin.js';

import MdFocusRingStyle from './focus-ring.css?inline';
import { internals } from '../core/symbols.js';

let shouldBeVisible = false;

window.addEventListener('keydown', () => (shouldBeVisible = true));
window.addEventListener('mousedown', () => (shouldBeVisible = false));

@customElement('md-focus-ring')
export default class MdFocusRing extends AttachableMixin(ReactiveElement) {
  constructor() {
    super();
    this[internals].ariaHidden = 'true';
  }
  get styles() {
    return [...super.styles, ...sheetsFromCss(MdFocusRingStyle)];
  }
  @property({ type: Boolean }) inward = false;

  #boundFocusIn = this.#handleFocusIn.bind(this);
  #boundFocusOut = this.#handleFocusOut.bind(this);
  #boundPointerDown = this.#handlePointerDown.bind(this);

  #handleFocusIn() {
    if (shouldBeVisible) this[internals].states.add('--visible');
  }
  #handleFocusOut() {
    this[internals].states.delete('--visible');
  }
  #handlePointerDown() {
    this[internals].states.delete('--visible');
  }

  /**
   * @param {HTMLElement?} prev
   * @param {HTMLElement?} next
   */
  handleControlChange(prev = null, next = null) {
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
