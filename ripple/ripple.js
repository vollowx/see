import { css } from '../shared/template.js';
import BaseElement from '../shared/base-element.js';

const RippleStyle = css`
  :host {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: inherit;
    z-index: -1;
  }
  :host(:not([unbounded])) {
    overflow: hidden;
  }
  .md-ripple {
    position: absolute;
    background: radial-gradient(closest-side, currentColor max(100% - 70px, 65%), transparent 100%);
    border-radius: var(--md-ripple-shape, 9999px);
    transition: opacity, transform 0ms cubic-bezier(0.4, 0, 0.6, 1);
    transform: scale3d(0, 0, 0);
    pointer-events: none;
    opacity: 0;
    will-change: transform, opacity;
  }
`;

export default class Ripple extends BaseElement {
  static get is() {
    return 'md-ripple';
  }

  get centered() {
    return this.hasAttribute('centered');
  }
  set centered(value) {
    this.toggleAttribute('centered', value);
  }
  get unbounded() {
    return this.hasAttribute('unbounded');
  }
  set unbounded(value) {
    this.toggleAttribute('unbounded', value);
  }

  /** @type {HTMLElement} */
  get parent() {
    // @ts-ignore
    return this.parentNode.host ? this.parentNode.host : this.parentNode;
  }

  get _styles() {
    return [RippleStyle];
  }

  /** @type {number} */
  radius = 0;
  /** @type {number} */
  centerRadius = 0;
  /** @type {boolean} */
  whitespacePressed = false;

  /**
   * @param {MouseEvent} _ev
   */
  newRipple = (_ev, fromKeyboard = false) => {
    let ripple = document.createElement('span');
    ripple.classList.add('md-ripple');

    let rect = this.parent.getBoundingClientRect();
    let x = fromKeyboard ? rect.width / 2 : _ev.clientX - rect.left,
      y = fromKeyboard ? rect.height / 2 : _ev.clientY - rect.top;
    this.radius = Math.max(
      Math.sqrt(x ** 2 + y ** 2),
      Math.sqrt((rect.width - x) ** 2 + y ** 2),
      Math.sqrt((rect.height - y) ** 2 + x ** 2),
      Math.sqrt((rect.width - x) ** 2 + (rect.height - y) ** 2)
    );
    this.centerRadius = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);

    // @ts-ignore
    this.shadowRoot.appendChild(ripple);
    setTimeout(() => {
      ripple.style.cssText = `
        top: ${this.centered ? rect.height / 2 - this.centerRadius : y - this.radius}px;
        left: ${this.centered ? rect.width / 2 - this.centerRadius : x - this.radius}px;
        width: ${this.centered ? this.centerRadius * 2 : this.radius * 2}px;
        height: ${this.centered ? this.centerRadius * 2 : this.radius * 2}px;
        transition-duration: 270ms;
        transform: scale3d(1.3, 1.3, 1.3);
        opacity: var(--md-state-layer-press-opacity, 0.12);`;
    }, 10);
  };
  /**
   * @param {HTMLSpanElement} ripple
   */
  killRipple = (ripple) => {
    ripple.style.opacity = '0';
    setTimeout(() => {
      ripple.remove();
    }, 280);
  };
  /**
   * @param {HTMLElement} ripple
   */
  removeRipple = (ripple) => {
    if (!ripple) return;
    let animated =
      Math.floor(ripple.getBoundingClientRect().width) >=
      (this.centered ? Math.floor(this.centerRadius * 2) : Math.floor(this.radius * 2));
    if (animated) {
      this.killRipple(ripple);
    } else {
      ripple.addEventListener('transitionend', () => this.killRipple(ripple));
    }
  };
  removeAllRipples = () => {
    if (!this.shadowRoot) return;

    /** @type {NodeListOf<HTMLSpanElement>} */
    let ripples = this.shadowRoot.querySelectorAll('.md-ripple');
    ripples.forEach((ripple) => this.removeRipple(ripple));
  };
  /**
   * @param {MouseEvent} _ev
   */
  handlePointerDown = (_ev) => {
    const _onUp = () => {
      this.removeAllRipples();
      window.removeEventListener('mouseup', _onUp, true);
      window.removeEventListener('pointercancel', _onUp, true);
      this.parent.removeEventListener('touchend', _onUp, true);
      this.parent.removeEventListener('touchmove', _onUp, true);
      this.parent.removeEventListener('touchcancel', _onUp, true);
    };
    // For cursor
    window.addEventListener('mouseup', _onUp, true);
    window.addEventListener('pointercancel', _onUp, true);
    // For touch
    this.parent.addEventListener('touchend', _onUp, true);
    this.parent.addEventListener('touchmove', _onUp, true);
    this.parent.addEventListener('touchcancel', _onUp, true);
    this.newRipple(_ev);
  };
  /**
   * @param {KeyboardEvent} _ev
   */
  handleKeyDown = (_ev) => {
    const fakeEvent = new MouseEvent('pointerdown', {});
    if (_ev.key === ' ') {
      if (this.whitespacePressed) return;
      this.whitespacePressed = true;
      this.newRipple(fakeEvent, true);
      const _onDown = () => {
        this.removeAllRipples();
        window.removeEventListener('pointerdown', _onDown, true);
      };
      window.addEventListener('pointerdown', _onDown, true);
    }
    if (_ev.key === 'Enter') {
      this.newRipple(fakeEvent, true);
      this.removeAllRipples();
    }
  };
  /**
   * @param {KeyboardEvent} _ev
   */
  handleKeyUp = (_ev) => {
    if (_ev.key !== ' ' && _ev.key !== 'Enter') return;
    this.whitespacePressed = false;
    this.removeAllRipples();
  };

  connectedCallback() {
    this.parent.addEventListener('pointerdown', this.handlePointerDown, true);
    this.parent.addEventListener('keydown', this.handleKeyDown, true);
    this.parent.addEventListener('keyup', this.handleKeyUp, true);
  }
}

customElements.define(Ripple.is, Ripple);
