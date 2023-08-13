// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { sheetsFromCss } from '../core/template.js';
import { customElement, property } from '../core/decorators.js';

import MdRippleStyle from './ripple.css?inline';

const PRESS_GROW_MS = 450;
const OPACITY_IN_MS = 105;
const OPACITY_OUT_MS = 375;
const MINIMUM_PRESS_MS = 225;

function distance({ x: ax, y: ay }, { x: bx, y: by }) {
  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
}

/**
 * TODO: `for` attribute to auto re-attach
 */
@customElement('md-ripple')
export default class MdRipple extends ReactiveElement {
  get styles() {
    return [...sheetsFromCss([MdRippleStyle])];
  }
  /** @type {HTMLElement} */
  $controller;
  /** @type {HTMLSpanElement[]} */
  $ripples = [];
  connectedCallback() {
    // @ts-ignore
    this.$controller =
      this.parentNode instanceof ShadowRoot
        ? this.parentNode.host
        : this.parentNode;

    this.attach(this.$controller);
  }
  static get observedAttributes() {
    return ['centered', 'nokey'];
  }
  @property({ type: Boolean }) centered = false;
  @property({ type: Boolean }) noKey = false;

  #spaceKeyDown = false;
  #lastTime = 0;

  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  #boundPointerDown = this.#handlePointerDown.bind(this);
  #boundPointerUp = this.#handlePointerUp.bind(this);
  #boundTouchEnd = this.#handleTouchEnd.bind(this);
  /** @param {PointerEvent} e */
  #handlePointerDown(e) {
    this.$controller.setPointerCapture(e.pointerId);
    this.createRipple(e);
  }
  /** @param {KeyboardEvent} e */
  #handleKeyDown(e) {
    if (this.noKey) return;

    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'Enter') {
      this.createRipple();
      this.removeRipples();
    } else if (e.key === ' ') {
      if (!this.#spaceKeyDown) this.createRipple();
      this.#spaceKeyDown = true;
    }
  }
  /** @param {KeyboardEvent} e */
  #handleKeyUp(e) {
    if (this.noKey) return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.#spaceKeyDown && e.key === ' ') {
      this.#spaceKeyDown = false;
      this.removeRipples();
    }
  }
  #handlePointerUp() {
    this.removeRipples();
  }
  #handleTouchEnd() {
    this.removeRipples();
  }

  /**
   * @param {HTMLElement?} prev
   * @param {HTMLElement} next
   */
  #handleAttach(prev = null, next) {
    prev?.removeEventListener('keydown', this.#boundKeyDown);
    prev?.removeEventListener('keyup', this.#boundKeyUp);
    prev?.removeEventListener('pointerdown', this.#boundPointerDown);
    prev?.removeEventListener('pointerup', this.#boundPointerUp);
    prev?.removeEventListener('touchend', this.#boundTouchEnd);

    next.addEventListener('keydown', this.#boundKeyDown);
    next.addEventListener('keyup', this.#boundKeyUp);
    next.addEventListener('pointerdown', this.#boundPointerDown);
    next.addEventListener('pointerup', this.#boundPointerUp);
    next.addEventListener('touchend', this.#boundTouchEnd);

    this.$controller = next;
  }
  /** @param {HTMLElement} next */
  attach(next) {
    this.#handleAttach(this.$controller, next);
  }
  /** @param {PointerEvent?} e */
  #calculateRipple(e = null) {
    const containerRect = this.getBoundingClientRect();
    const containerMiddlePoint = {
      x: containerRect.width / 2,
      y: containerRect.height / 2,
    };
    const centered = !e || this.centered;
    let centerPoint = { x: 0, y: 0 };
    if (centered) {
      centerPoint.x = containerMiddlePoint.x;
      centerPoint.y = containerMiddlePoint.y;
    } else {
      // @ts-ignore
      const pointer = e.targetTouches
        ? // @ts-ignore
          Array.prototype.slice.call(e.targetTouches, -1)
        : e;
      centerPoint.x = pointer.clientX - containerRect.left;
      centerPoint.y = pointer.clientY - containerRect.top;
    }
    const corners = [
      { x: 0, y: 0 },
      { x: containerRect.width, y: 0 },
      { x: 0, y: containerRect.height },
      { x: containerRect.width, y: containerRect.height },
    ];
    const radius = Math.max(
      ...corners.map((corner) => distance(centerPoint, corner))
    );

    return { centerPoint, radius };
  }
  /** @param {PointerEvent?} e */
  createRipple(e = null) {
    const { centerPoint, radius } = this.#calculateRipple(e);

    const size = radius * 2 + 'px';
    const translate = `${centerPoint.x - radius}px ${centerPoint.y - radius}px`;

    const ripple = document.createElement('div');
    ripple.setAttribute('part', 'ripple');
    this.renderRoot.append(ripple);
    this.$ripples.push(ripple);

    ripple.animate(
      {
        opacity: [0, 0.12],
      },
      {
        duration: OPACITY_IN_MS,
        easing: 'linear',
        fill: 'forwards',
      }
    );
    ripple.animate(
      {
        height: [size, size],
        width: [size, size],
        translate: [translate, translate],
        scale: [0.2, 1.35],
      },
      {
        duration: PRESS_GROW_MS,
        easing: 'cubic-bezier(0.2, 0, 0, 1)',
        fill: 'forwards',
      }
    );

    this.#lastTime = Date.now();
  }
  removeRipples() {
    for (const ripple of this.$ripples.splice(0)) {
      setTimeout(
        () => {
          const animation = ripple.animate(
            {
              opacity: [0.12, 0],
            },
            {
              duration: OPACITY_OUT_MS,
              fill: 'forwards',
              easing: 'linear',
            }
          );
          animation.onfinish = animation.oncancel = () => ripple.remove();
        },
        Math.max(MINIMUM_PRESS_MS - (Date.now() - this.#lastTime), 0)
      );
    }
  }
}
