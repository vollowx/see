import Switch from '../base/switch.js';
import { html, sheetsFromCss } from '../core/template.js';
import { customElement, property, query } from '../core/decorators.js';

import MdFocusRing from './focus-ring.js';
import MdRipple from './ripple.js';

import MdSwitchStyle from './switch.css?inline';
import MdTargetStyle from './target.css?inline';

// FIXME: Drag-and-drop breaks the support for working with `<label>`. Temporarily disabled.
// function isRTL() {
//   return document.documentElement.dir === 'rtl';
// }

/**
 * @element md-switch
 *
 * @csspart thumb
 * @csspart label
 */
@customElement('md-switch')
export default class MdSwitch extends Switch {
  get styles() {
    return [...super.styles, ...sheetsFromCss(MdTargetStyle, MdSwitchStyle)];
  }
  get template() {
    return html`
      <md-focus-ring></md-focus-ring>
      <div part="thumb">
        <md-ripple spacebehavior="always"></md-ripple>
        <span part="target"></span>
        ${this.templateOffIcon}${this.templateOnIcon}
      </div>
    `;
  }
  get templateOnIcon() {
    return html`
      <svg part="icons icon-on" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z"
        />
      </svg>
    `.innerHTML;
  }
  get templateOffIcon() {
    return html`
      <svg part="icons icon-off" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z"
        />
      </svg>
    `.innerHTML;
  }
  // /** @type {MdRipple} */
  // @query('md-ripple') $ripple;
  // /** @type {HTMLSpanElement} */
  // @query('[part~="thumb"]') $thumb;
  // connectedCallback() {
  //   super.connectedCallback();
  //   this.$ripple.attach(this);
  //   this.addEventListener('pointerdown', this.#boundPointerDown);
  //   this.addEventListener('pointerup', this.#boundPointerUp);
  // }
  // disconnectedCallback() {
  //   super.disconnectedCallback();
  //   this.removeEventListener('pointerdown', this.#boundPointerDown);
  //   this.removeEventListener('pointerup', this.#boundPointerUp);
  // }
  @property({ type: Boolean }) icons = false;
  @property({ type: Boolean }) checkedIconOnly = false;

  // #pointerDownX = 0;
  //
  // #boundPointerDown = this.#handlePointerDown.bind(this);
  // #boundPointerMove = this.#handlePointerMove.bind(this);
  // #boundPointerUp = this.#handlePointerUp.bind(this);
  // /** @param {PointerEvent} e */
  // #handlePointerDown(e) {
  //   this._ignoreClick = false;
  //
  //   if (e.button !== 0) return;
  //   this.#pointerDownX = e.clientX;
  //   this.setPointerCapture(e.pointerId);
  //   this.addEventListener('pointermove', this.#boundPointerMove);
  // }
  // /** @param {PointerEvent} e */
  // #handlePointerMove(e) {
  //   this._ignoreClick = true;
  //
  //   const diff = (isRTL() ? -1 : 1) * (e.clientX - this.#pointerDownX);
  //   const limitedDiff = this.checked
  //     ? Math.min(0, Math.max(-20, diff))
  //     : Math.min(20, Math.max(0, diff));
  //   this.$thumb.style.setProperty(
  //     '--_thumb-diff-pointer',
  //     `${2 * limitedDiff}px`
  //   );
  //   // Thumb loses its `:active` status before pointer up event
  //   this.$thumb.style.setProperty('--_thumb-diameter', '28px');
  //   this.$thumb.style.transitionDuration = '0s';
  // }
  // /** @param {PointerEvent} e */
  // #handlePointerUp(e) {
  //   this.removeEventListener('pointermove', this.#boundPointerMove);
  //   this.releasePointerCapture(e.pointerId);
  //
  //   const trackRect = this.getBoundingClientRect();
  //   const thumbRect = this.$thumb.getBoundingClientRect();
  //   const diff =
  //     thumbRect.left +
  //     thumbRect.width / 2 -
  //     trackRect.left -
  //     trackRect.width / 2;
  //   const shouldBeChecked = (diff >= 0 && !isRTL()) || (diff < 0 && isRTL());
  //
  //   this.$thumb.style.setProperty('--_thumb-diff-pointer', '');
  //   this.$thumb.style.setProperty('--_thumb-diameter', '');
  //   this.$thumb.style.transitionDuration = '';
  //
  //   if (this.checked != shouldBeChecked) this.__toggleStatus();
  // }
}
