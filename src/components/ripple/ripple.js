// @ts-check

import { BaseElement, html, customElement, property } from '../base';
import { distance } from '../../utils';

import MdRippleElementStyle from './ripple.css?inline';

const MIN_DURATION = 300;

/**
 * https://codepen.io/dffzmxj/pen/XWVxoWE
 */
@customElement('md-ripple')
export default class MdRippleElement extends BaseElement {
  render() {
    return html`<style>
      ${MdRippleElementStyle}
    </style>`;
  }
  /** @type {HTMLElement} */
  $parent;
  /** @type {HTMLSpanElement[]} */
  $ripples = [];
  connectedCallback() {
    // @ts-ignore
    this.$parent =
      this.parentNode instanceof ShadowRoot
        ? this.parentNode.host
        : this.parentNode;
    if (getComputedStyle(this.$parent).position === 'static')
      this.$parent.style.position = 'relative';

    this.$parent.addEventListener(
      'pointerdown',
      this.#handlePointerDown.bind(this)
    );
    this.$parent.addEventListener('keydown', this.#handleKeyDown.bind(this));
    this.$parent.addEventListener('touchend', this.#removeRipples.bind(this));
    this.$parent.addEventListener('pointerup', this.#removeRipples.bind(this));
    this.$parent.addEventListener('keyup', this.#handleKeyUp.bind(this));
  }
  disconnectedCallback() {
    this.$parent.removeEventListener(
      'pointerdown',
      this.#handlePointerDown.bind(this)
    );
    this.$parent.removeEventListener('keydown', this.#handleKeyDown.bind(this));
    this.$parent.removeEventListener(
      'touchend',
      this.#removeRipples.bind(this)
    );
    this.$parent.removeEventListener(
      'pointerup',
      this.#removeRipples.bind(this)
    );
    this.$parent.removeEventListener('keyup', this.#handleKeyUp.bind(this));
  }
  static get observedAttributes() {
    return ['centered', 'nokey'];
  }
  @property({ type: Boolean }) centered = false;
  @property({ type: Boolean }) noKey = false;

  #spaceKeyDown = false;

  /** @param {PointerEvent} e */
  #handlePointerDown(e) {
    this.$parent.setPointerCapture(e.pointerId);
    this.#createRipple(e);
  }
  /** @param {KeyboardEvent} e */
  #handleKeyDown(e) {
    if (this.noKey) return;

    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    if (e.repeat) return;
    if (e.key === 'Enter') {
      this.#createRipple();
      this.#removeRipples();
    } else if (e.key === ' ') {
      if (!this.#spaceKeyDown) this.#createRipple();
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
      this.#removeRipples();
    }
  }

  /** @param {PointerEvent?} e */
  #createRipple(e = null) {
    const box = this.getBoundingClientRect();
    const boxCenter = {
      x: box.width / 2,
      y: box.height / 2,
    };
    const centered = !e || this.centered;
    let rippleCenter = { x: 0, y: 0 };
    if (centered) {
      rippleCenter.x = boxCenter.x;
      rippleCenter.y = boxCenter.y;
    } else {
      // @ts-ignore
      const pointer = e.targetTouches
        ? // @ts-ignore
          Array.prototype.slice.call(e.targetTouches, -1)
        : e;
      rippleCenter.x = pointer.clientX - box.left;
      rippleCenter.y = pointer.clientY - box.top;
    }
    const corners = [
      { x: 0, y: 0 },
      { x: box.width, y: 0 },
      { x: 0, y: box.height },
      { x: box.width, y: box.height },
    ];
    const radius = Math.max(
      ...corners.map((corner) => distance(rippleCenter, corner))
    );
    const ripple = document.createElement('div');
    ripple.setAttribute('part', 'ripple');

    ripple.style.setProperty('--radius', `${radius}px`);
    ripple.style.left = `${rippleCenter.x}px`;
    ripple.style.top = `${rippleCenter.y}px`;

    this.$ripples.push(ripple);
    this.renderRoot.append(ripple);
    ripple.animate(
      {
        boxShadow: [
          '0 0 80px calc(var(--radius) * 0.2) currentColor',
          '0 0 80px var(--radius) currentColor',
        ],
      },
      {
        duration: Math.max(MIN_DURATION) || 0,
        easing: 'cubic-bezier(0.1, 0, 0.5, 1)',
        fill: 'forwards',
      }
    );

    // Snowflake effect
    const scene = document.createElement('canvas');
    scene.height = box.height;
    scene.width = box.width;
    const context = /** @type {CanvasRenderingContext2D} */ (
      scene.getContext('2d')
    );
    context.fillStyle = 'white';
    for (let x = 0; x < scene.width; x++)
      for (let y = 0; y < scene.height; y++)
        if (Math.random() < 0.005) context.fillRect(x, y, 1, 1);
    this.renderRoot.append(scene);
    const { opacity } = getComputedStyle(scene);
    const animation = scene.animate(
      // @ts-ignore
      {
        opacity: [0, opacity, 0],
      },
      {
        duration: Math.max(MIN_DURATION) || 0,
        easing: 'linear',
      }
    );
    animation.onfinish = animation.oncancel = () => scene.remove();
  }
  #removeRipples() {
    for (const ripple of this.$ripples.splice(0)) {
      const { opacity } = getComputedStyle(ripple);
      if (!opacity) {
        ripple.remove();
        continue;
      }
      const animation = ripple.animate(
        // @ts-ignore
        {
          opacity: [opacity, 0],
        },
        {
          duration: 800,
          fill: 'forwards',
          easing: 'cubic-bezier(0.4, 0, 0.7, 0)',
        }
      );
      animation.onfinish = animation.oncancel = () => ripple.remove();
    }
  }
}
