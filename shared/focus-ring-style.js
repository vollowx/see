import { css } from './template.js';

/**
 * This 'FocusRingStyle' is a CSSStyleSheet,
 * includes only the styles of the focus ring.
 * When using, you should add a element like
 * ```
 * <span part="focus-ring"></span>
 * ```
 * in your element, also remenber to add
 * ```
 * part="focus-controller"
 * ```
 * to your element.
 *
 * Of course, this way is full of limitation,
 * so if you need more customization, just do
 * not use this.
 */
const FocusRingStyle = new CSSStyleSheet();
FocusRingStyle.replaceSync(css`
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
  [part~='focus-controller']:focus:focus-visible [part~='focus-ring'] {
    display: block;
  }
`);

export default FocusRingStyle;
