import { LitElement, html } from 'lit';
import { customElement } from '../../core/decorators.js';
import { queryAssignedElements } from 'lit/decorators.js';
import { getSpring } from '../system/motion.js';
import { standardButtonGroupStyles } from './standard-button-group-styles.css.js';

const EXPAND_FACTOR = 1.15;

const shapeAnimation = Symbol('shapeAnimation');

/**
 * @tag md-button-group
 *
 * @slot - buttons
 */
@customElement('md-button-group', false)
export class M3StandardButtonGroup extends LitElement {
  @queryAssignedElements()
  $buttons: Array<HTMLElement>;

  static override styles = [standardButtonGroupStyles];
  override render() {
    return html`<slot @slotchange="${this.#handleSlotChange}"></slot>`;
  }

  override connectedCallback() {
    super.connectedCallback();

    this.addEventListener('pointerdown', this.#handlePointerDown);
    this.addEventListener('keydown', this.#handleKeyDown, { capture: true });

    window.addEventListener('pointerup', this.#reset);
    window.addEventListener('pointercancel', this.#reset);
    window.addEventListener('keyup', this.#reset, { capture: true });
    this.#resizeObserver = new ResizeObserver((entries) => {
      if (this.#activeIndex !== -1) return; // Skip if animating

      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const index = this.$buttons.indexOf(target);
        if (index !== -1) {
          const currentWidth = target.style.width;
          target.style.width = '';
          this.#baseWidths[index] = entry.target.getBoundingClientRect().width;
          if (currentWidth) target.style.width = currentWidth;
        }
      });
    });
  }
  override disconnectedCallback() {
    window.removeEventListener('pointerup', this.#reset);
    window.removeEventListener('pointercancel', this.#reset);
    window.removeEventListener('keyup', this.#reset, { capture: true });
    this.#resizeObserver.disconnect();

    super.disconnectedCallback();
  }

  #activeIndex = -1;
  #resizeObserver: ResizeObserver;
  #baseWidths: Array<number> = [];

  #handleSlotChange = () => {
    this.#resizeObserver.disconnect();
    this.$buttons.forEach((btn, i) => {
      this.#baseWidths[i] = btn.getBoundingClientRect().width;
      this.#resizeObserver.observe(btn);
    });
  };
  #handlePointerDown = (e: PointerEvent) => {
    if (this === e.target) return;
    this.updateLayout(e.target as HTMLElement);
  };
  #handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    this.updateLayout(e.target as HTMLElement);
  };
  #reset = (e: any) => {
    if (e && e.type === 'keyup' && e.key !== ' ' && e.key !== 'Enter') return;

    if (this.#activeIndex !== -1) {
      this.#activeIndex = -1;
      this.updateLayout();
    }
  };

  /**
   * Passing no element resets all shape changes
   */
  updateLayout(target: HTMLElement | null = null) {
    const pressedIndex = target ? this.$buttons.indexOf(target) : -1;
    this.#activeIndex = pressedIndex;
    const pressedBaseWidth =
      pressedIndex !== -1 ? this.#baseWidths[pressedIndex] : 0;

    const expansionDelta = pressedBaseWidth * (EXPAND_FACTOR - 1);
    const isPressedAtEdge =
      pressedIndex === 0 || pressedIndex === this.$buttons.length - 1;

    this.$buttons.forEach((btn, i) => {
      const currentWidth = btn.getBoundingClientRect().width;
      let targetWidth = this.#baseWidths[i];

      if (pressedIndex !== -1) {
        if (i === pressedIndex) {
          targetWidth = pressedBaseWidth * EXPAND_FACTOR;
        } else if (Math.abs(i - pressedIndex) === 1) {
          if (isPressedAtEdge)
            targetWidth = this.#baseWidths[i] - expansionDelta;
          else targetWidth = this.#baseWidths[i] - expansionDelta / 2;
        }
      }

      const spring = getSpring(this, 'spatial', 'fast');

      if (btn[shapeAnimation]) btn[shapeAnimation].cancel();

      btn[shapeAnimation] = btn.animate(
        [{ width: `${currentWidth}px` }, { width: `${targetWidth}px` }],
        {
          ...spring,
          fill: 'forwards',
        }
      );

      btn[shapeAnimation].onfinish = () => {
        if (pressedIndex === -1) {
          btn.style.width = '';
          btn[shapeAnimation].cancel();
        }
      };
    });
  }
}
