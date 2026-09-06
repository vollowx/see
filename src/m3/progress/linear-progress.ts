import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement } from '../../core/decorators.js';
import { ProgressBar } from '../../base/progressbar.js';

import { linearProgressStyles } from './linear-progress-styles.css.js';

/**
 * TODO: wavy?
 * NOTE: buffering progress indicator is no longer documented in MD3
 *
 * @tag md-linear-progress
 *
 * @csspart track
 * @csspart gap
 * @csspart active
 * @csspart before
 * @csspart after
 */
@customElement('md-linear-progress')
export class M3LinearProgress extends ProgressBar {
  static override styles = [linearProgressStyles];
  override render() {
    const progress = Math.min(Math.max(this.value, 0), 100);
    const gapAfterStyle = {
      width: this.indeterminate || (progress > 0 && progress < 100) ? '' : '0',
    };
    const trackAfterStyle = {
      width: this.indeterminate ? '' : `${100 - progress}%`,
    };

    return html`
      <div part="track before"></div>
      <div part="gap before"></div>
      <div part="active"></div>
      <div part="gap after" style=${styleMap(gapAfterStyle)}></div>
      <div part="track after" style=${styleMap(trackAfterStyle)}></div>
      <div part="stop"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-linear-progress': M3LinearProgress;
  }
}
