import { css } from 'lit';

export const fabStyles = css`
  :host {
    --_text-color: var(--md-sys-color-primary);
    --_background-color: var(--md-sys-color-surface-container-high);
    --_size: 56px;
    --_border-radius: 16px;
    --_icon-size: 24px;
    align-items: center;
    background-color: color-mix(
      in srgb,
      var(--_background-color) var(--_background-opacity, 100%),
      transparent
    );
    border-radius: var(--_border-radius);
    box-shadow: var(--md-sys-elevation-shadow-3);
    box-sizing: border-box;
    color: color-mix(
      in srgb,
      var(--_text-color) var(--_text-opacity, 100%),
      transparent
    );
    cursor: pointer;
    display: inline-flex;
    font: var(--md-sys-typography-label-large);
    gap: 8px; /* 12px (origin) - 4px (label) */
    height: var(--_size);
    justify-content: center;
    min-width: var(--_size);
    outline: 0;
    padding-inline: calc((var(--_size) - var(--_icon-size)) / 2);
    position: relative;
    -webkit-tap-highlight-color: transparent;
    transition: box-shadow 280ms var(--md-sys-motion-easing-emphasized);
    user-select: none;
    vertical-align: middle;
  }

  :host([lowered]) {
    --_background-color: var(--md-sys-color-surface-container-low);
    box-shadow: var(--md-sys-elevation-shadow-1);
  }

  :host([size='small']) {
    --_size: 40px;
    --_border-radius: 12px;
  }
  :host([size='large']) {
    --_size: 96px;
    --_border-radius: 28px;
    --_icon-size: 36px;
  }

  :host([color='primary']) {
    --_text-color: var(--md-sys-color-on-primary);
    --_background-color: var(--md-sys-color-primary);
  }
  :host([color='secondary']) {
    --_text-color: var(--md-sys-color-on-secondary);
    --_background-color: var(--md-sys-color-secondary);
  }
  :host([color='tertiary']) {
    --_text-color: var(--md-sys-color-on-tertiary);
    --_background-color: var(--md-sys-color-tertiary);
  }

  :host(:disabled) {
    --_background-color: var(--md-sys-color-on-surface);
    --_background-opacity: 12%;
    --_text-color: var(--md-sys-color-on-surface);
    --_text-opacity: 38%;
    box-shadow: none;
    cursor: default;
    pointer-events: none;
  }
  @media (hover: hover) and (pointer: fine) {
    :host(:hover:not(:active)) {
      box-shadow: var(--md-sys-elevation-shadow-4);
    }
    :host([lowered]:hover:not(:active)) {
      box-shadow: var(--md-sys-elevation-shadow-2);
    }
  }

  md-focus-ring {
    --md-focus-ring-shape: var(--_border-radius);
  }

  ::slotted(:not([slot='label'])) {
    block-size: 1em;
    display: inline-flex;
    fill: currentcolor;
    font-size: var(--_icon-size);
    inline-size: 1em;
  }
  ::slotted([slot='label']) {
    margin-inline: 4px;
  }
`;
