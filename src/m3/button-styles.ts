import { css } from 'lit';

export const buttonStyles = css`
  :host {
    --_on-color: var(--md-sys-color-on-primary);
    --_color: var(--md-sys-color-primary);

    --_text-color: var(--_on-color);
    --_background-color: var(--_color);
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
    font: var(--md-sys-typography-label-large);
    gap: 8px;
    height: 40px;
    justify-content: center;
    min-width: 64px;
    outline: 0;
    padding-inline: 24px;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    transition: box-shadow 280ms var(--md-sys-motion-easing-emphasized);
    user-select: none;
    vertical-align: top;
  }

  :host([color='secondary']) {
    --_on-color: var(--md-sys-color-on-secondary);
    --_color: var(--md-sys-color-secondary);
  }
  :host([color='tertiary']) {
    --_on-color: var(--md-sys-color-on-tertiary);
    --_color: var(--md-sys-color-tertiary);
  }

  :host([variant='tonal']) {
    --_background-color: var(--md-sys-color-secondary-container);
    --_text-color: var(--md-sys-color-on-secondary-container);
  }
  :host([variant='elevated']) {
    --_background-color: var(--md-sys-color-surface-container-low);
    --_text-color: var(--_color);
    box-shadow: var(--md-sys-elevation-shadow-1);
  }
  :host([variant='outlined']) {
    --_background-color: transparent !important;
    --_text-color: var(--_color);
    border-width: 1px;
    border-style: solid;
    border-color: color-mix(
      in srgb,
      var(--_outline-color) var(--_outline-opacity, 100%),
      transparent
    );
    box-shadow: none !important;
    padding-inline: 23px;
  }
  :host([variant='outlined']) md-focus-ring {
    --md-focus-ring-offset: 3px;
  }
  :host([variant='text']) {
    --_background-color: transparent !important;
    --_text-color: var(--_color);
    box-shadow: none !important;
    padding-inline: 12px;
  }

  @media (hover: hover) and (pointer: fine) {
    :host(:hover:not(:active)) {
      box-shadow: var(--md-sys-elevation-shadow-1);
    }
    :host([variant='elevated']:hover:not(:active)) {
      box-shadow: var(--md-sys-elevation-shadow-2);
    }
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
  :host([variant='outlined']:disabled) {
    --_outline-color: var(--md-sys-color-on-surface);
    --_outline-opacity: 12%;
  }

  ::slotted([slot='icon']),
  ::slotted([slot='trailingicon']) {
    block-size: 1em;
    fill: currentcolor;
    font-size: 18px;
    inline-size: 1em;
  }
  :host(:not([variant='text'])) ::slotted([slot='icon']) {
    margin-inline-start: -8px;
  }
  :host(:not([variant='text'])) ::slotted([slot='trailingicon']) {
    margin-inline-end: -8px;
  }
`;
