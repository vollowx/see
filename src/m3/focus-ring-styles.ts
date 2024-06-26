import { css } from 'lit';

export const focusRingStyles = css`
  :host {
    animation-delay: 0s, calc(var(--md-focus-ring-duration, 600ms) * 0.25);
    animation-duration: calc(var(--md-focus-ring-duration, 600ms) * 0.25),
      calc(var(--md-focus-ring-duration, 600ms) * 0.75);
    animation-timing-function: var(--md-sys-motion-easing-emphasized);
    box-sizing: border-box;
    color: var(--md-focus-ring-color, var(--md-sys-color-secondary));
    display: none;
    pointer-events: none;
    position: absolute;
  }

  :host(:state(visible)) {
    display: flex;
  }

  :host(:not([inward])) {
    animation-name: outward-grow, outward-shrink;
    border-end-end-radius: calc(
      var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, 9999px)) +
        var(--md-focus-ring-outward-offset, 2px)
    );
    border-end-start-radius: calc(
      var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, 9999px)) +
        var(--md-focus-ring-outward-offset, 2px)
    );
    border-start-end-radius: calc(
      var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, 9999px)) +
        var(--md-focus-ring-outward-offset, 2px)
    );
    border-start-start-radius: calc(
      var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, 9999px)) +
        var(--md-focus-ring-outward-offset, 2px)
    );
    inset: calc(-1 * var(--md-focus-ring-outward-offset, 2px));
    outline: var(--md-focus-ring-width, 3px) solid currentColor;
  }

  :host([inward]) {
    animation-name: inward-grow, inward-shrink;
    border-end-end-radius: calc(
      var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, 9999px)) - var(
          --md-focus-ring-inward-offset,
          0px
        )
    );
    border-end-start-radius: calc(
      var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, 9999px)) - var(
          --md-focus-ring-inward-offset,
          0px
        )
    );
    border-start-end-radius: calc(
      var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, 9999px)) - var(
          --md-focus-ring-inward-offset,
          0px
        )
    );
    border-start-start-radius: calc(
      var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, 9999px)) - var(
          --md-focus-ring-inward-offset,
          0px
        )
    );
    border: var(--md-focus-ring-width, 3px) solid currentColor;
    inset: var(--md-focus-ring-inward-offset, 0px);
  }

  @keyframes outward-grow {
    from {
      outline-width: 0;
    }

    to {
      outline-width: var(--md-focus-ring-active-width, 8px);
    }
  }

  @keyframes outward-shrink {
    from {
      outline-width: var(--md-focus-ring-active-width, 8px);
    }
  }

  @keyframes inward-grow {
    from {
      border-width: 0;
    }

    to {
      border-width: var(--md-focus-ring-active-width, 8px);
    }
  }

  @keyframes inward-shrink {
    from {
      border-width: var(--md-focus-ring-active-width, 8px);
    }
  }

  @media (prefers-reduced-motion) {
    :host {
      animation: none;
    }
  }
`;
