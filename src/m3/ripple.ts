import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Attachable } from '../base/mixins/attachable.js';
import { InternalsAttached, internals } from '../base/mixins/internals-attached.js';

import { rippleStyles } from './ripple-styles.css.js';

const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const OPACITY_IN_MS = 105;
const OPACITY_OUT_MS = 375;

function distance(
  { x: ax, y: ay }: { x: number; y: number },
  { x: bx, y: by }: { x: number; y: number }
): number {
  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
}

/**
 * @tag md-ripple
 *
 * @cssprop --md-ripple-color
 *
 * FIXME: Labelled form elements get :hover state when the label is hovered,
 * but that will not trigger mouseenter/mouseleave on the ripple, so the ripple
 * will not get :hover state.
 */
@customElement('md-ripple')
export class M3Ripple extends Attachable(InternalsAttached(LitElement)) {
  static override styles = [rippleStyles];

  constructor() {
    super();
    this[internals].ariaHidden = 'true';
  }
  $ripples: HTMLSpanElement[] = [];
  @property() enterBehavior: 'always' | 'none' = 'always';
  @property() spaceBehavior: 'always' | 'once' | 'none' = 'once';

  #spaceKeyDown = false;
  #pointerDown = false;
  #lastTime = 0;

  #boundKeyDown = this.#handleKeyDown.bind(this);
  #boundKeyUp = this.#handleKeyUp.bind(this);
  #boundPointerEnter = this.#handlePointerEnter.bind(this);
  #boundPointerLeave = this.#handlePointerLeave.bind(this);
  #boundPointerDown = this.#handlePointerDown.bind(this);
  #boundPointerUp = this.#handlePointerUp.bind(this);
  #handleKeyDown(e: KeyboardEvent) {
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
  #handleKeyUp(e: KeyboardEvent) {
    if (e.key === ' ' && this.spaceBehavior === 'once') {
      this.#spaceKeyDown = false;
      this.removeRippleAll();
    }
  }
  #handlePointerEnter(e: PointerEvent) {
    if (e.pointerType === 'touch') return;
    this[internals].states.add('hover');
    if (this.#pointerDown) this.addRipple(e);
  }
  #handlePointerLeave() {
    this[internals].states.delete('hover');
    if (this.#pointerDown) this.removeRippleAll();
  }
  #handlePointerDown(e: PointerEvent) {
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

  override handleControlChange(
    prev: HTMLElement | null = null,
    next: HTMLElement | null = null
  ) {
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
  #calculateRipple(e: MouseEvent | null = null) {
    const containerRect = this.getBoundingClientRect();
    const containerMiddle = {
      x: containerRect.width / 2,
      y: containerRect.height / 2,
    };
    const centered = !e;
    const endCenter = containerMiddle;
    let startCenter: { x: number; y: number } = endCenter;
    if (!centered) {
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
  addRipple(e: MouseEvent | null = null) {
    const { startCenter, endCenter, radius } = this.#calculateRipple(e);

    const diameter = radius * 2 + 'px';
    const translateStart = `${startCenter.x - radius}px ${
      startCenter.y - radius
    }px`;
    const translateEnd = `${endCenter.x - radius}px ${endCenter.y - radius}px`;

    const ripple = document.createElement('div');
    ripple.setAttribute('part', 'ripple');
    this.renderRoot.append(ripple);
    this.$ripples.push(ripple);

    ripple.animate(
      {
        opacity: [0, 0.1],
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
  removeRipple(ripple: HTMLSpanElement) {
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

declare global {
  interface HTMLElementTagNameMap {
    'md-ripple': M3Ripple;
  }
}
