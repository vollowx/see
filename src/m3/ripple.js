// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { sheetsFromCss } from '../core/template.js';
import { customElement, property } from '../core/decorators.js';

import AttachableMixin from '../base/attachable-mixin.js';

import MdRippleStyle from './ripple.css?inline';

const PRESS_GROW_MS = 450;
const OPACITY_IN_MS = 105;
const OPACITY_OUT_MS = 375;
const MINIMUM_PRESS_MS = 225;

function distance({ x: ax, y: ay }, { x: bx, y: by }) {
  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
}

/**
 * @element md-ripple
 *
 * @cssprop --md-ripple-color
 */
@customElement('md-ripple')
export default class MdRipple extends AttachableMixin(ReactiveElement) {
  get styles() {
    return [...sheetsFromCss(MdRippleStyle)];
  }
  /** @type {HTMLSpanElement[]} */
  $ripples = [];
  @property({ type: Boolean }) centered = false;
  /** @type {'always'|'none'} */
  @property() enterBehavior = 'always';
  /** @type {'always'|'once'|'none'} */
  @property() spaceBehavior = 'once';

  #spaceKeyDown = false;
  #lastTime = 0;

  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  #boundMouseEnter = this.#handleMouseEnter.bind(this);
  #boundMouseLeave = this.#handleMouseLeave.bind(this);
  #boundPointerDown = this.#handlePointerDown.bind(this);
  #boundPointerUp = this.#handlePointerUp.bind(this);
  #boundTouchEnd = this.#handleTouchEnd.bind(this);
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
  /** @param {PointerEvent} e */
  #handlePointerDown(e) {
    /** @type {HTMLElement} */ (this.$control).setPointerCapture(e.pointerId);
    // Do not handle right click
    if (e.button === 2) return;
    this.createRipple(e);
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
  handleControlChange(prev = null, next = null) {
    const eventHandlers = {
      keydown: this.#boundKeyDown,
      keyup: this.#boundKeyUp,
      mouseenter: this.#boundMouseEnter,
      mouseleave: this.#boundMouseLeave,
      pointerdown: this.#boundPointerDown,
      pointerup: this.#boundPointerUp,
      touchend: this.#boundTouchEnd,
    };

    Object.keys(eventHandlers).forEach((eventName) => {
      prev?.removeEventListener(eventName, eventHandlers[eventName]);
      next?.addEventListener(eventName, eventHandlers[eventName]);
    });
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
