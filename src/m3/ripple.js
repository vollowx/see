// @ts-check

import ReactiveElement from '../core/reactive-element.js';
import { sheetsFromCss } from '../core/template.js';
import { customElement, property } from '../core/decorators.js';

import AttachableMixin from '../base/attachable-mixin.js';

import MdRippleStyle from './ripple.css?inline';
import { internals } from '../core/symbols.js';

const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const OPACITY_IN_MS = 105;
const OPACITY_OUT_MS = 375;

/**
 * @param {{ x: number, y: number }} a
 * @param {{ x: number, y: number }} b
 * @returns {number}
 */
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
  constructor() {
    super();
    this[internals].ariaHidden = 'true';
  }
  get styles() {
    return [...sheetsFromCss(MdRippleStyle)];
  }
  /** @type {HTMLSpanElement[]} */
  $ripples = [];
  /** @type {'always'|'none'} */
  @property() enterBehavior = 'always';
  /** @type {'always'|'once'|'none'} */
  @property() spaceBehavior = 'once';

  #spaceKeyDown = false;
  #pointerDown = false;
  #lastTime = 0;

  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  #boundPointerEnter = this.#handlePointerEnter.bind(this);
  #boundPointerLeave = this.#handlePointerLeave.bind(this);
  #boundPointerDown = this.#handlePointerDown.bind(this);
  #boundPointerUp = this.#handlePointerUp.bind(this);
  /** @param {KeyboardEvent} e */
  #handleKeyDown(e) {
    if (
      (e.key === 'Enter' && this.enterBehavior === 'always') ||
      (e.key === ' ' && this.spaceBehavior === 'always')
    ) {
      this.addRipple();
      this.removeRippleAll();
    } else if (e.key === ' ' && this.spaceBehavior === 'once') {
      if (!this.#spaceKeyDown) this.addRipple();
      this.#spaceKeyDown = true;
    }
  }
  /** @param {KeyboardEvent} e */
  #handleKeyUp(e) {
    if (e.key === ' ' && this.spaceBehavior === 'once') {
      this.#spaceKeyDown = false;
      this.removeRippleAll();
    }
  }
  /** @param {PointerEvent} e */
  #handlePointerEnter(e) {
    if (e.pointerType === 'touch') return;
    this[internals].states.add('--hover');
    if (this.#pointerDown) this.addRipple(e);
  }
  #handlePointerLeave() {
    this[internals].states.delete('--hover');
    if (this.#pointerDown) this.removeRippleAll();
  }
  /** @param {PointerEvent} e */
  #handlePointerDown(e) {
    if (e.pointerType === 'mouse') this.#pointerDown = true;
    document.addEventListener('pointerup', this.#boundPointerUp);
    document.addEventListener('touchcancel', this.#boundPointerUp);
    document.addEventListener('touchend', this.#boundPointerUp);
    document.addEventListener('touchmove', this.#boundPointerUp);

    if (e.button === 2) return;
    this.addRipple(e);
  }
  #handlePointerUp() {
    this.#pointerDown = false;
    document.removeEventListener('pointerup', this.#boundPointerUp);
    document.removeEventListener('touchcancel', this.#boundPointerUp);
    document.removeEventListener('touchend', this.#boundPointerUp);
    document.removeEventListener('touchmove', this.#boundPointerUp);

    this.removeRippleAll();
  }

  /**
   * @param {HTMLElement?} prev
   * @param {HTMLElement?} next
   */
  handleControlChange(prev = null, next = null) {
    const eventHandlers = {
      keydown: this.#boundKeyDown,
      keyup: this.#boundKeyUp,
      pointerenter: this.#boundPointerEnter,
      pointerleave: this.#boundPointerLeave,
      pointerdown: this.#boundPointerDown,
    };

    Object.keys(eventHandlers).forEach((eventName) => {
      prev?.removeEventListener(eventName, eventHandlers[eventName]);
      next?.addEventListener(eventName, eventHandlers[eventName]);
    });
  }
  /** @param {MouseEvent?} e */
  #calculateRipple(e = null) {
    const containerRect = this.getBoundingClientRect();
    const containerMiddle = {
      x: containerRect.width / 2,
      y: containerRect.height / 2,
    };
    const centered = !e;
    const endCenter = containerMiddle;
    let startCenter = {};
    if (centered) {
      startCenter = endCenter;
    } else {
      startCenter.x = e.clientX - containerRect.left;
      startCenter.y = e.clientY - containerRect.top;
    }
    const corners = [
      { x: 0, y: 0 },
      { x: containerRect.width, y: 0 },
      { x: 0, y: containerRect.height },
      { x: containerRect.width, y: containerRect.height },
    ];
    const radius = Math.max(
      ...corners.map((corner) => distance(endCenter, corner))
    );

    return { startCenter, endCenter, radius };
  }
  /** @param {MouseEvent?} e */
  addRipple(e = null) {
    const { startCenter, endCenter, radius } = this.#calculateRipple(e);

    const diameter = radius * 2 + 'px';
    const translateStart = `${startCenter.x - radius}px ${
      startCenter.y - radius
    }px`;
    const translateEnd = `${endCenter.x - radius}px ${endCenter.y - radius}px`;

    const ripple = document.createElement('div');
    ripple.setAttribute('part', 'ripple');
    this.shadowRoot.append(ripple);
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
        translate: [translateStart, translateEnd],
        scale: [0.2, 1.35],
      },
      {
        duration: PRESS_GROW_MS,
        // TODO: Control by global variables
        easing: 'cubic-bezier(0.2, 0, 0, 1)',
        fill: 'forwards',
      }
    );

    this.#lastTime = Date.now();
  }
  /** @param {HTMLSpanElement} ripple */
  removeRipple(ripple) {
    setTimeout(
      () => {
        const animation = ripple.animate(
          {
            opacity: [getComputedStyle(ripple).opacity, '0'],
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
  removeRippleAll() {
    for (const ripple of this.$ripples.splice(0)) this.removeRipple(ripple);
  }
}
