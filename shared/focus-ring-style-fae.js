import { css } from './template.js';

/**
 * This 'FocusRingStyleFAE' is a CSSStyleSheet,
 * includes only the styles of the focus ring.
 * FOR ACTION ELEMENT ONLY.
 */
const FocusRingStyleFAE = new CSSStyleSheet();
FocusRingStyleFAE.replaceSync(css`
  [part~='focus-ring'] {
    display: none;
    position: absolute;
    box-sizing: border-box;
    inset: calc(
        -1 * (var(--md-focus-ring-padding-vertical, 2px) + var(--md-focus-ring-inner-width, 2px) +
              var(--md-focus-ring-outer-width, 2px))
      )
      calc(
        -1 * (var(--md-focus-ring-padding-horizontal, 2px) + var(--md-focus-ring-inner-width, 2px) +
              var(--md-focus-ring-outer-width, 2px))
      );
    border: var(--md-focus-ring-outer-width, 2px) solid
      var(--md-focus-ring-outer-color, var(--md-sys-color-tertiary-container));
    border-radius: var(--md-focus-ring-radius, 8px);
  }
  [part~='focus-ring']::before {
    content: '';
    position: absolute;
    inset: 0;
    border: var(--md-focus-ring-inner-width, 2px) solid var(--md-focus-ring-inner-color, var(--md-sys-color-tertiary));
    border-radius: calc(var(--md-focus-ring-radius, 8px) - var(--md-focus-ring-inner-width, 2px));
  }
  :host([focus-from='keyboard']) [part~='focus-ring'] {
    display: block;
  }
`);

export default FocusRingStyleFAE;
