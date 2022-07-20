import { css } from './template.js';

/**
 * This 'StateLayerStyle' is a CSSStyleSheet,
 * includes only the styles of the focus ring.
 * FOR ACTION ELEMENT ONLY.
 */
const StateLayerStyleFAE = new CSSStyleSheet();
StateLayerStyleFAE.replaceSync(css`
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
  :host([focus-from='keyboard']) [part~='state-layer'] {
    opacity: 0.12;
  }
  [part~='focus-controller']:hover [part~='state-layer'] {
    opacity: 0.08;
  }
  @media (hover: none) {
    [part~='focus-controller']:hover [part~='state-layer'] {
      opacity: 0;
    }
  }
`);

export default StateLayerStyleFAE;
