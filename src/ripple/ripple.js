import BaseElement from '../shared/base-element.js';
import { distance } from '../shared/utils.js';

const getTemplateMdRipple = () => {
  return `
  <style>
    :host {
      border-radius: inherit;
      display: block;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      position: absolute;
    }

    [part~='ripple'] {
      background-color: currentColor;
      left: 0;
      opacity: var(--md-comp-ripple-opacity, 0.23);
      pointer-events: none;
      position: absolute;
      /* 用 filter blur 的话，在 Chromium 上显示效果不完美 */
      width: 0.01rem; /* 不能太小，否则阴影是方的 */
       height: 0.01rem;
      box-shadow: 0 0 80px var(--radius) currentColor;
    }
    [part~='ripple'],
    :host([circle]) {
      border-radius: 50%;
    }
  </style>
`;
};

/**
 * M3Ripple
 *
 * from https://codepen.io/dffzmxj/pen/XWVxoWE
 */
export default class M3Ripple extends BaseElement {
  $parent;
  $ripples = [];
  #defaultMaximumRadius = 200;
  #defaultMinimumDuration = 300;
  #keyPressed = false;

  render() {
    return getTemplateMdRipple();
  }
  connectedCallback() {
    this.$parent = this.parentNode?.nodeType === 11 ? this.getRootNode().host : this.parentNode;
    if (getComputedStyle(this.$parent).position === 'static') this.$parent.style.position = 'relative';
    this.$parent.addEventListener('touchstart', this.spawnRipple.bind(this));
    this.$parent.addEventListener('mousedown', this.spawnRipple.bind(this));
    this.$parent.addEventListener('keydown', this._handleKeydown.bind(this));
    this.$parent.addEventListener('touchend', this.destroyRipples.bind(this));
    document.addEventListener('mouseup', this.destroyRipples.bind(this));
    document.addEventListener('keyup', this._handleKeyup.bind(this));
  }
  disconnectedCallback() {
    this.$parent.removeEventListener('touchstart', this.spawnRipple.bind(this));
    this.$parent.removeEventListener('mousedown', this.spawnRipple.bind(this));
    this.$parent.removeEventListener('keydown', this._handleKeydown.bind(this));
    this.$parent.removeEventListener('touchend', this.destroyRipples.bind(this));
    document.removeEventListener('mouseup', this.destroyRipples.bind(this));
    document.removeEventListener('keyup', this._handleKeyup.bind(this));
  }

  spawnRipple(event) {
    const box = this.getBoundingClientRect();
    const boxCenter = {
      x: box.width / 2,
      y: box.height / 2,
    };
    const centered = !event || this.centered;
    let rippleCenter = { x: 0, y: 0 };
    if (centered) {
      rippleCenter.x = boxCenter.x;
      rippleCenter.y = boxCenter.y;
    } else {
      // @ts-ignore
      const pointer = event.targetTouches
        ? // @ts-ignore
          Array.prototype.slice.call(event.targetTouches, -1)
        : event;
      // @ts-ignore
      rippleCenter.x = pointer.clientX - box.left;
      // @ts-ignore
      rippleCenter.y = pointer.clientY - box.top;
    }
    const corners = [
      { x: 0, y: 0 },
      { x: box.width, y: 0 },
      { x: 0, y: box.height },
      { x: box.width, y: box.height },
    ];
    // const radius = Math.min(
    //   this.maximumRadius,
    //   Math.max(...corners.map((corner) => distance(rippleCenter, corner)))
    // );
    const radius = Math.max(...corners.map((corner) => distance(rippleCenter, corner)));
    // const translateStart = `${rippleCenter.x - radius}px, ${rippleCenter.y - radius}px`;
    // const translateEnd = (this.willRecenter && !centered) ? `${boxCenter.x - radius}px, ${boxCenter.y - radius}px` : translateStart;
    const ripple = document.createElement('div');
    ripple.setAttribute('part', 'ripple');
    // ripple.style.height = ripple.style.width = 2 * radius + 'px';
    // ripple.style.transform = `translate(${translateEnd})`;

    ripple.style.setProperty('--radius', `${radius}px`);
    ripple.style.left = `${rippleCenter.x}px`;
    ripple.style.top = `${rippleCenter.y}px`;

    this.$ripples.push(ripple);
    this.shadowRoot.append(ripple);
    ripple.animate(
      {
        boxShadow: ['0 0 80px calc(var(--radius) * 0.2) currentColor', '0 0 80px var(--radius) currentColor'],
      },
      {
        duration: Math.max(this.minimumDuration) || 0,
        easing: 'cubic-bezier(0.1, 0, 0.5, 1)',
        fill: 'forwards',
      }
    );

    // Snowflake effect
    const scene = document.createElement('canvas');
    scene.height = box.height;
    scene.width = box.width;
    const context = scene.getContext('2d');
    context.fillStyle = 'white';
    for (let x = 0; x < scene.width; x++)
      for (let y = 0; y < scene.height; y++) if (Math.random() < 0.005) context.fillRect(x, y, 1, 1);
    this.shadowRoot.append(scene);
    const { opacity } = getComputedStyle(scene);
    const animation = scene.animate(
      {
        // @ts-ignore
        opacity: [0, opacity, 0],
      },
      {
        duration: Math.max(this.minimumDuration) || 0,
        easing: 'linear',
      }
    );
    animation.onfinish = animation.oncancel = () => scene.remove();
  }
  destroyRipples() {
    for (const ripple of this.$ripples.splice(0)) {
      const { opacity } = getComputedStyle(ripple);
      if (!opacity) {
        ripple.remove();
        continue;
      }
      const animation = ripple.animate(
        {
          // @ts-ignore
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

  get centered() {
    return this.hasAttribute('centered');
  }
  set centered(value) {
    const boolValue = !!value;
    boolValue ? this.centered || this.setAttribute('centered', '') : this.removeAttribute('centered');
  }

  get willRecenter() {
    return this.hasAttribute('will-recenter');
  }
  set willRecenter(value) {
    const boolValue = !!value;
    boolValue ? this.willRecenter || this.setAttribute('will-recenter', '') : this.removeAttribute('will-recenter');
  }

  get maximumRadius() {
    const maximumRadius = parseFloat(this.getAttribute('maxradius') || '');
    return isFinite(maximumRadius) ? maximumRadius : this.#defaultMaximumRadius;
  }
  /**
   * @param {number} value
   */
  set maximumRadius(value) {
    this.setAttribute('maxradius', value.toString());
  }

  get minimumDuration() {
    const minimumDuration = parseFloat(this.getAttribute('minduration') || '');
    return isFinite(minimumDuration) ? minimumDuration : this.#defaultMinimumDuration;
  }
  /**
   * @param {number} value
   */
  set minimumDuration(value) {
    this.setAttribute('minduration', value.toString());
  }

  _handleKeydown({ key }) {
    if (key === ' ' && !this.#keyPressed) {
      this.#keyPressed = true;
      this.spawnRipple();
    }
    if (key === 'Enter') {
      this.spawnRipple();
      this.destroyRipples();
    }
  }
  _handleKeyup({ key }) {
    if (key === ' ') {
      this.#keyPressed = false;
      this.destroyRipples();
    }
  }
}

customElements.define('md-ripple', M3Ripple);
