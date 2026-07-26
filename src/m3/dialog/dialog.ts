import { html } from 'lit';
import { query, state, customElement } from 'lit/decorators.js';
import { Dialog } from '../../base/dialog';
import { dialogStyles } from './dialog-styles.css.js';

/**
 * TODO: test if form actions `cancel` and other things related work - no,
 *       event listener needed
 *
 * @tag md-dialog
 *
 * @csspart container
 * @csspart headline
 * @csspart content
 * @csspart actions
 *
 * @slot icon
 * @slot headline
 * @slot - content
 * @slot actions
 */
@customElement('md-dialog')
export class M3Dialog extends Dialog {
  _config = {
    openEase: 'cubic-bezier(0, 0, 0, 1)',
    closeEase: 'cubic-bezier(0.3, 0, 1, 1)',
    vertSlide: 36,
    openDur: 500,
    closeDur: 200,
    bodyFadeInDur: 200,
    bodyFadeOutDur: 100,
  }; /* Perhaps make them constants? I don't think that there will be anyone
        making classes inheriting this class... */

  @state() private hasIcon = false;
  @query('[part=container]') $container: HTMLDivElement;
  @query('[part=body]') $body: HTMLDivElement;
  @query('[part=actions]') $actions: HTMLDivElement;
  @query('.actions-placeholder') $actionsPlaceholder: HTMLDivElement;
  @query('[part=scrim]') $scrim: HTMLDivElement;

  static override styles = [dialogStyles];
  override render() {
    return html`
      <dialog
        part="dialog"
        @click="${this.#handleClick}"
        @cancel="${this._handleCancel}"
      >
        <div part="container">
          <div part="body">
            <div part="headline" class=${this.hasIcon ? 'has-icon' : ''}>
              <slot
                name="icon"
                @slotchange="${this.#handleIconSlotChange}"
              ></slot>
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
    this.#opening = this.#closing = false;
  }

  #handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!this.$container.contains(target) && !this.contains(target))
      this.close();
  };
  #handleIconSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this.hasIcon = slot.assignedElements({ flatten: true }).length > 0;
  }

  #opening = false;
  override show() {
    if (this.#opening) return;

    this.#clearAnimations();
    this.#opening = true;

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

    const body = this.$body.animate([{ opacity: 0.2 }, { opacity: 1 }], {
      duration: this._config.bodyFadeInDur,
      easing: 'linear',
      fill: 'forwards',
    });

    const actions = this.$actions.animate([{ opacity: 0.5 }, { opacity: 1 }], {
      duration: this._config.bodyFadeInDur,
      easing: 'linear',
      fill: 'forwards',
    });

    this.#activeAnimations.push(container, scrim, body, actions);

    container.onfinish = () => {
      this.$container.style.minHeight = '';
      this.#clearAnimations();
    };
  }

  #closing = false;
  override close() {
    if (this.#closing) return;
    this.#clearAnimations();
    this.#closing = true;

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
        duration: this._config.closeDur - this._config.bodyFadeOutDur,
        delay: this._config.bodyFadeOutDur,
        easing: 'linear',
        fill: 'forwards',
      }
    );

    const scrim = this.$scrim.animate([{ opacity: 0.32 }, { opacity: 0 }], {
      duration: this._config.closeDur,
      easing: this._config.closeEase,
      fill: 'forwards',
    });

    const body = this.$body.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: this._config.bodyFadeOutDur,
      easing: 'linear',
      fill: 'forwards',
    });

    const actions = this.$actions.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: this._config.bodyFadeOutDur,
      easing: 'linear',
      fill: 'forwards',
    });

    this.#activeAnimations.push(
      containerSpatial,
      containerEffects,
      scrim,
      body,
      actions
    );

    containerSpatial.onfinish = () => {
      this.$container.style.minHeight = '';
      super.close();
      this.#clearAnimations();
    };
  }
}
