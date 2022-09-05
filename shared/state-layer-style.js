import { css } from './template.js';

/**
 * This 'StateLayerStyle' is a CSSStyleSheet,
 * includes only the styles of the focus ring.
 * When using, you should add a element like
 * ```
 * <span part="state-layer"></span>
 * ```
 * in your element, also remenber to add
 * ```
 * part="focus-controller"
 * ```
 * to your element.
 */
const StateLayerStyle = css`
  [part~='focus-controller'] [part~='state-layer'] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0;
  }
  [part~='focus-controller']:focus-visible [part~='state-layer'] {
    opacity: var(--md-sys-states-focus, 0.12);
  }
  [part~='focus-controller']:hover [part~='state-layer'] {
    opacity: var(--md-sys-states-hover, 0.08);
  }
  @media (hover: none) {
    [part~='focus-controller']:hover [part~='state-layer'] {
      opacity: 0;
    }
  }
`;

export default StateLayerStyle;
