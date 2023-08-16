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
    return [...sheetsFromCss(MdRippleStyle)];
  }
  /** @type {HTMLElement?} */
  $controller;
  /** @type {HTMLSpanElement[]} */
  $ripples = [];
  connectedCallback() {
    // @ts-ignore
    this.$controller =
      this.parentNode instanceof ShadowRoot
        ? this.parentNode.host
        : this.parentNode;

    this.attach(/** @type {HTMLElement} */ (this.$controller));
  }
  disconnectedCallback() {
    this.detach();
  }
  static get observedAttributes() {
    return ['centered'];
  }
  @property({ type: Boolean }) centered = false;
  /** @type {'always'|'none'} */
  @property({ type: String }) enterBehavior = 'always';
  /** @type {'always'|'once'|'none'} */
  @property({ type: String }) spaceBehavior = 'once';

  #spaceKeyDown = false;
  #lastTime = 0;

  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  #boundMouseEnter = this.#handleMouseEnter.bind(this);
  #boundMouseLeave = this.#handleMouseLeave.bind(this);
  #boundPointerDown = this.#handlePointerDown.bind(this);
  #boundPointerUp = this.#handlePointerUp.bind(this);
  #boundTouchEnd = this.#handleTouchEnd.bind(this);
  /** @param {PointerEvent} e */
  #handlePointerDown(e) {
    /** @type {HTMLElement} */ (this.$controller).setPointerCapture(
      e.pointerId
    );
    this.createRipple(e);
  }
  /** @param {KeyboardEvent} e */
  #handleKeyDown(e) {
    if (
      (e.key === 'Enter' && this.enterBehavior === 'always') ||
      (e.key === ' ' && this.spaceBehavior === 'always')
    ) {
      this.createRipple();
      this.removeRipples();
    } else if (e.key === ' ' && this.spaceBehavior === 'once') {
      if (!this.#spaceKeyDown) this.createRipple();
      this.#spaceKeyDown = true;
    }
  }
  /** @param {KeyboardEvent} e */
  #handleKeyUp(e) {
    if (e.key === ' ' && this.spaceBehavior === 'once') {
      this.#spaceKeyDown = false;
      this.removeRipples();
    }
  }
  #handleMouseEnter() {
    this.toggleAttribute('hover', true);
  }
  #handleMouseLeave() {
    this.toggleAttribute('hover', false);
  }
  #handlePointerUp() {
    this.removeRipples();
  }
  #handleTouchEnd() {
    this.removeRipples();
  }

  /**
   * @param {HTMLElement?} prev
   * @param {HTMLElement?} next
   */
  #handleAttach(prev = null, next = null) {
    prev?.removeEventListener('keydown', this.#boundKeyDown);
    prev?.removeEventListener('keyup', this.#boundKeyUp);
    prev?.removeEventListener('mouseenter', this.#boundMouseEnter);
    prev?.removeEventListener('mouseleave', this.#boundMouseLeave);
    prev?.removeEventListener('pointerdown', this.#boundPointerDown);
    prev?.removeEventListener('pointerup', this.#boundPointerUp);
    prev?.removeEventListener('touchend', this.#boundTouchEnd);

    next?.addEventListener('keydown', this.#boundKeyDown);
    next?.addEventListener('keyup', this.#boundKeyUp);
    next?.addEventListener('mouseenter', this.#boundMouseEnter);
    next?.addEventListener('mouseleave', this.#boundMouseLeave);
    next?.addEventListener('pointerdown', this.#boundPointerDown);
    next?.addEventListener('pointerup', this.#boundPointerUp);
    next?.addEventListener('touchend', this.#boundTouchEnd);

    this.$controller = next;
  }
  /** @param {HTMLElement} next */
  attach(next) {
    this.#handleAttach(this.$controller, next);
  }
  detach() {
    this.#handleAttach(this.$controller);
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

    const diameter = radius * 2 + 'px';
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
        height: [diameter, diameter],
        width: [diameter, diameter],
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
