import { css } from 'lit';

export const iconButtonStyles = css`
  :host {
    --_background-color: transparent;
    --_text-color: var(--md-sys-color-on-surface-variant);
    --_outline-color: var(--md-sys-color-outline);
    align-items: center;
    background-color: color-mix(
      in srgb,
      var(--_background-color) var(--_background-opacity, 100%),
      transparent
    );
    border-radius: 9999px;
    box-sizing: border-box;
    color: color-mix(
      in srgb,
      var(--_text-color) var(--_text-opacity, 100%),
      transparent
    );
    cursor: pointer;
    display: inline-flex;
    height: 40px;
    justify-content: center;
    outline: 0;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    vertical-align: top;
    width: 40px;
  }
  :host([variant='filled']) {
    --_text-color: var(--md-sys-color-on-primary);
    --_background-color: var(--md-sys-color-primary);
  }
  :host([variant='tonal']) {
    --_background-color: var(--md-sys-color-secondary);
    --_text-color: var(--md-sys-color-on-secondary);
  }
  :host([variant='outlined']) {
    border-width: 1px;
    border-style: solid;
    border-color: color-mix(
      in srgb,
      var(--_outline-color) var(--_outline-opacity, 100%),
      transparent
    );
  }
  :host([variant='outlined']) md-focus-ring {
    --md-focus-ring-offset: 3px;
  }

  :host(:disabled) {
    --_text-color: var(--md-sys-color-on-surface) !important;
    --_text-opacity: 38%;
    cursor: default;
    pointer-events: none;
  }
  :host([variant='filled']:disabled),
  :host([variant='tonal']:disabled) {
    --_background-color: var(--md-sys-color-on-surface);
    --_background-opacity: 12%;
  }
  :host([variant='outlined']:disabled) {
    --_outline-color: var(--md-sys-color-on-surface);
    --_outline-opacity: 12%;
  }

  ::slotted(*) {
    block-size: 24px;
    fill: currentcolor;
    font-size: 24px;
    inline-size: 24px;
  }
`;
