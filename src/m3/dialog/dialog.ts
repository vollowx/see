import { html } from 'lit';
import { query } from 'lit/decorators.js';
import { customElement } from '../../core/decorators';
import { Dialog } from '../../base/dialog';
import { dialogStyles } from './dialog-styles.css.js';

/**
 * FIXME: frequently call `close()` will keep the dialog open
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
    vertSlide: 36,
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
  @query('[part=scrim]') $scrim: HTMLDivElement;

  static override styles = [dialogStyles];
  override render() {
    return html`
      <dialog
        part="dialog"
        @click="${this._handleClick}"
        @cancel="${this._handleCancel}"
      >
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
      <div part="scrim"></div>
    `;
  }

  #activeAnimations: Animation[] = [];
  #clearAnimations() {
    this.#activeAnimations.forEach((anim) => anim.cancel());
    this.#activeAnimations = [];
  }

  _handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!this.$container.contains(target) && !this.contains(target))
      this.close();
  };

  override show() {
    this.#clearAnimations();

    // Reset margins to allow browser centering
    this.$dialog.style.marginTop = 'auto';
    this.$dialog.style.marginBottom = 'auto';

    super.show();

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
    const container = this.$container.animate(
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

    const scrim = this.$scrim.animate([{ opacity: 0 }, { opacity: 0.32 }], {
      duration: this._config.openDur,
      easing: this._config.openEase,
      fill: 'forwards',
    });

    const inner = this.$inner.animate([{ opacity: 0.2 }, { opacity: 1 }], {
      duration: this._config.innerFadeInDur,
      easing: 'linear',
      fill: 'forwards',
    });

    const actions = this.$actions.animate([{ opacity: 0.5 }, { opacity: 1 }], {
      duration: this._config.innerFadeInDur,
      easing: 'linear',
      fill: 'forwards',
    });

    this.#activeAnimations.push(container, scrim, inner, actions);

    container.onfinish = () => {
      this.$container.style.minHeight = '';
    };
  }

  override close() {
    this.#clearAnimations();

    const startHeight = this.$container.offsetHeight;
    const endHeight = startHeight * 0.35;

    this.$container.style.minHeight = '0px';
    const containerSpatial = this.$container.animate(
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

    const containerEffects = this.$container.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      {
        duration: this._config.closeDur - this._config.innerFadeOutDur,
        delay: this._config.innerFadeOutDur,
        easing: 'linear',
        fill: 'forwards',
      }
    );

    const scrim = this.$scrim.animate([{ opacity: 0.32 }, { opacity: 0 }], {
      duration: this._config.closeDur,
      easing: this._config.closeEase,
      fill: 'forwards',
    });

    const inner = this.$inner.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: this._config.innerFadeOutDur,
      easing: 'linear',
      fill: 'forwards',
    });

    const actions = this.$actions.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: this._config.innerFadeOutDur,
      easing: 'linear',
      fill: 'forwards',
    });

    this.#activeAnimations.push(
      containerSpatial,
      containerEffects,
      scrim,
      inner,
      actions
    );

    containerSpatial.onfinish = () => {
      this.$container.style.minHeight = '';
      super.close();
      this.#clearAnimations();
    };
  }
}
