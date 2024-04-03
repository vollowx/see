import { css } from 'lit';

export const rippleStyles = css`
  :host {
    border-radius: inherit;
    display: block;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
  }

  [part~='ripple'] {
    background-image: radial-gradient(
      closest-side,
      var(--md-ripple-color, currentColor) max(calc(100% - 70px), 65%),
      transparent 100%
    );
    left: 0;
    position: absolute;
    top: 0;
  }

  :host::before {
    background-color: var(--md-ripple-color, currentColor);
    border-radius: inherit;
    content: '';
    display: block;
    inset: 0;
    opacity: 0;
    position: absolute;
    transition: opacity 67ms linear;
  }

  :host(:state(hover))::before {
    opacity: 0.08;
  }
`;
