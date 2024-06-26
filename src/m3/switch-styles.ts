import { css } from 'lit';

export const switchStyles = css`
  :host {
    --_outline-color: var(--md-sys-color-outline);
    --_track-color: var(--md-sys-color-surface-container-highest);
    --_thumb-color: var(--md-sys-color-outline);
    --_icon-color: var(--md-sys-color-surface-container-highest);
    --_ripple-color: var(--md-sys-color-on-surface);
    background-color: color-mix(
      in srgb,
      var(--_track-color) var(--_track-opacity, 100%),
      transparent
    );
    border-width: 2px;
    border-style: solid;
    border-color: color-mix(
      in srgb,
      var(--_outline-color) var(--_outline-opacity, 100%),
      transparent
    );
    border-radius: 9999px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-grid;
    height: 32px;
    outline: 0;
    place-content: center;
    place-items: center;
    position: relative;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    touch-action: none;
    transition:
      background-color 67ms linear,
      border-color 67ms linear;
    user-select: none;
    vertical-align: top;
    width: 52px;
  }
  :host(:state(checked)) {
    --_outline-color: var(--md-sys-color-primary);
    --_track-color: var(--md-sys-color-primary);
    --_thumb-color: var(--md-sys-color-on-primary);
    --_icon-color: var(--md-sys-color-on-primary-container);
    --_ripple-color: var(--md-sys-color-primary);
  }
  :host(:disabled) {
    --_outline-color: var(--md-sys-color-on-surface);
    --_outline-opacity: 12%;
    --_track-color: var(--md-sys-color-surface-variant);
    --_track-opacity: 12%;
    --_thumb-color: var(--md-sys-color-on-surface);
    --_thumb-opacity: 38%;
    --_icon-color: var(--md-sys-color-surface-container-highest);
    cursor: default;
    pointer-events: none;
  }
  :host(:disabled:state(checked)) {
    --_outline-color: var(--md-sys-color-surface);
    --_track-color: var(--md-sys-color-on-surface);
    --_thumb-color: var(--md-sys-color-surface);
    --_thumb-opacity: 100%;
    --_icon-color: var(--md-sys-color-on-surface);
  }
  :host([icons]:not(:state(checked)):not([checkedicononly]))
    [part~='icon-off'] {
    --_icon-opacity: 100%;
  }
  :host([icons]:state(checked)) [part~='icon-on'] {
    --_icon-opacity: 100%;
  }
  :host([icons]:state(checked):disabled) [part~='icon-on'] {
    --_icon-opacity: 38%;
  }
  @media (hover: hover) and (pointer: fine) {
    :host(:hover) {
      --_thumb-color: var(--md-sys-color-on-surface-variant);
    }
    :host(:state(checked):hover) {
      --_thumb-color: var(--md-sys-color-primary-container);
    }
  }
  @media (forced-colors: active) {
    :host {
      forced-color-adjust: none;
    }
  }

  [part~='thumb'] {
    --_thumb-diameter: 16px;
    --_thumb-diff-default: 20px;
    background-color: color-mix(
      in srgb,
      var(--_thumb-color) var(--_thumb-opacity, 100%),
      transparent
    );
    border-radius: 50%;
    display: grid;
    height: var(--_thumb-diameter);
    /* FIXME: lightningcss compiles this to stuffs with :lang */
    margin-inline-start: calc(
      var(--_thumb-diff-pointer, 0px) - var(--_thumb-diff-default)
    );
    place-content: center;
    place-items: center;
    position: absolute;
    transition:
      background-color 67ms linear,
      width 250ms var(--md-sys-motion-easing-standard),
      height 250ms var(--md-sys-motion-easing-standard),
      margin 300ms var(--md-sys-motion-overshoot);
    width: var(--_thumb-diameter);
    z-index: 1;
  }
  :host(:state(checked)) [part~='thumb'] {
    --_thumb-diameter: 24px;
    --_thumb-diff-default: -20px;
    background-color: var(--_thumb-color);
  }
  :host([icons]:not([checkedicononly])) [part~='thumb'] {
    --_thumb-diameter: 24px;
  }
  :host(:active) [part~='thumb'] {
    --_thumb-diameter: 28px !important;
    --_thumb-color: var(--md-sys-color-on-surface-variant);
  }
  :host(:state(checked):active) [part~='thumb'] {
    --_thumb-color: var(--md-sys-color-primary-container);
  }

  [part~='icons'] {
    fill: color-mix(
      in srgb,
      var(--_icon-color) var(--_icon-opacity, 0%),
      transparent
    );
    height: 16px;
    position: absolute;
    transition: fill 67ms linear;
    width: 16px;
  }

  md-focus-ring {
    inset: -4px;
  }
  md-ripple {
    color: var(--_ripple-color);
    height: 40px;
    inset: unset;
    width: 40px;
  }
`;
