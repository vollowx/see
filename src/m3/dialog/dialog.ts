import { html } from 'lit';
import { query } from 'lit/decorators.js';
import { customElement } from '../../core/decorators';
import { Dialog } from '../../base/dialog';
import { dialogStyles } from './dialog-styles.css.js';

/**
 * TODO: backdrop, close on backdrop clicks
 * TODO: icon and centered title support
 * TODO: test if form actions `cancel` and other things related work
 * @tag md-dialog
 *
 * @csspart container
 * @csspart headline
 * @csspart content
 * @csspart actions
 *
 * @slot headline
 * @slot - content
 * @slot actions
 */
@customElement('md-dialog', false)
export class M3Dialog extends Dialog {
  _config = {
    openEase: 'cubic-bezier(0, 0, 0, 1)',
    closeEase: 'cubic-bezier(0.3, 0, 1, 1)',
    vertSlide: 32,
    openDur: 500,
    closeDur: 200,
    innerFadeInDur: 200,
    innerFadeOutDur: 100,
  }; /* Perhaps make them constants? I don't think that there will be anyone
        making classes inheriting this class... */

  @query('[part=container]') $container: HTMLDivElement;
  @query('[part=inner]') $inner: HTMLDivElement;
  @query('[part=actions]') $actions: HTMLDivElement;
  @query('.actions-placeholder') $actionsPlaceholder: HTMLDivElement;

  static override styles = [dialogStyles];
  override render() {
    return html`
      <dialog part="dialog" @cancel="${this._handleCancel}">
        <div part="container">
          <div part="inner">
            <div part="headline">
              <slot name="headline"></slot>
            </div>
            <div part="content">
              <slot></slot>
            </div>
            <div class="actions-placeholder"></div>
          </div>
          <div part="actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </dialog>
    `;
  }

  #activeAnimations: Animation[] = [];
  #clearAnimations() {
    this.#activeAnimations.forEach((anim) => anim.cancel());
    this.#activeAnimations = [];
  }

  override showModal() {
    this.#clearAnimations();

    // Reset margins to allow browser centering
    this.$dialog.style.marginTop = 'auto';
    this.$dialog.style.marginBottom = 'auto';

    super.showModal();

    const actionsHeight = this.$actions.offsetHeight;
    this.$actionsPlaceholder.style.height = `${actionsHeight}px`;

    this.$container.style.height = 'auto';
    const startHeight = 0;
    const endHeight = this.$container.offsetHeight;

    // Lock the position to prevent auto-centering during animation
    const rect = this.$container.getBoundingClientRect();
    this.$dialog.style.marginTop = `${rect.top}px`;
    this.$dialog.style.marginBottom = 'auto';

    this.$container.style.minHeight = '0px';
    const containerTransform = this.$container.animate(
      [
        {
          height: `${startHeight}px`,
          transform: `translateY(-${this._config.vertSlide}px)`,
        },
        {
          height: `${endHeight}px`,
          transform: 'translateY(0px)',
        },
      ],
      { duration: this._config.openDur, easing: this._config.openEase }
    );

    const innerFadeIn = this.$inner.animate(
      [{ opacity: 0.2 }, { opacity: 1 }],
      {
        duration: this._config.innerFadeInDur,
        easing: 'linear',
        fill: 'forwards',
      }
    );

    const actionsFadeIn = this.$actions.animate(
      [{ opacity: 0.5 }, { opacity: 1 }],
      {
        duration: this._config.innerFadeInDur,
        easing: 'linear',
        fill: 'forwards',
      }
    );

    this.#activeAnimations.push(containerTransform, innerFadeIn, actionsFadeIn);

    containerTransform.onfinish = () => {
      this.$container.style.minHeight = '';
    };
  }

  override close() {
    this.#clearAnimations();

    const startHeight = this.$container.offsetHeight;
    const endHeight = startHeight * 0.35;

    this.$container.style.minHeight = '0px';
    const containerTransform = this.$container.animate(
      [
        { height: `${startHeight}px`, transform: 'translateY(0px)' },
        {
          height: `${endHeight}px`,
          transform: `translateY(-${this._config.vertSlide}px)`,
        },
      ],
      {
        duration: this._config.closeDur,
        easing: this._config.closeEase,
      }
    );

    const innerFadeOut = this.$inner.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: this._config.innerFadeOutDur,
      easing: 'linear',
      fill: 'forwards',
    });

    const actionsFadeOut = this.$actions.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      {
        duration: this._config.innerFadeOutDur,
        easing: 'linear',
        fill: 'forwards',
      }
    );

    const containerFadeOut = this.$container.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      {
        duration: this._config.closeDur - this._config.innerFadeOutDur,
        delay: this._config.innerFadeOutDur,
        easing: 'linear',
        fill: 'forwards',
      }
    );

    this.#activeAnimations.push(
      containerTransform,
      innerFadeOut,
      actionsFadeOut,
      containerFadeOut
    );

    containerTransform.onfinish = () => {
      this.$container.style.minHeight = '';
      super.close();
      this.#clearAnimations();
    };
  }
}
