import { css } from 'lit';

export const checkboxStyles = css`
  :host {
    --md-focus-ring-radius: 9999px;

    --_container-color: transparent;
    --_outline-color: var(--md-sys-color-on-surface-variant);
    --_mark-color: var(--md-sys-color-surface-container-highest);
    --_ripple-color: var(--md-sys-color-on-surface);
    --_checkbox-size: 18px;
    background-color: color-mix(
      in srgb,
      var(--_container-color) var(--_container-opacity, 100%),
      transparent
    );
    border-width: var(--md-checkbox-outline-width, 2px);
    border-style: solid;
    border-color: color-mix(
      in srgb,
      var(--_outline-color) var(--_outline-opacity, 100%),
      transparent
    );
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-grid;
    height: var(--_checkbox-size);
    margin: 15px;
    outline: 0;
    place-content: center;
    place-items: center;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color 50ms linear,
      border-color 50ms linear;
    user-select: none;
    vertical-align: top;
    width: var(--_checkbox-size);
  }
  :host(:state(checked)),
  :host(:state(indeterminate)) {
    --_container-color: var(--md-sys-color-primary);
    --_outline-color: var(--md-sys-color-primary);
    --_mark-color: var(--md-sys-color-on-primary);
    --_mark-opacity: 100%;
    --_ripple-color: var(--md-sys-color-primary);
  }
  :host([error]) {
    --_outline-color: var(--md-sys-color-error);
    --_mark-color: var(--md-sys-color-surface-container-highest);
    --_ripple-color: var(--md-sys-color-error);
  }
  :host([error]:state(checked)),
  :host([error]:state(indeterminate)) {
    --_container-color: var(--md-sys-color-error);
    --_outline-color: var(--md-sys-color-error);
    --_mark-color: var(--md-sys-color-on-error);
    --_ripple-color: var(--md-sys-color-error);
  }
  :host(:disabled) {
    --_outline-color: var(--md-sys-color-on-surface);
    --_outline-opacity: 38%;
    --_mark-color: var(--md-sys-color-surface-container-highest);
    cursor: default;
    pointer-events: none;
  }
  :host(:disabled:state(checked)),
  :host(:disabled:state(indeterminate)) {
    --_container-color: var(--md-sys-color-on-surface);
    --_container-opacity: 38%;
    --_outline-color: var(--md-sys-color-surface);
    --_outline-opacity: 0%;
    --_mark-color: var(--md-sys-color-surface);
  }
  @media (hover: hover) and (pointer: fine) {
    :host(:hover) {
      --_unchecked-outline-color: var(--md-sys-color-on-surface);
    }
  }
  @media (forced-colors: active) {
    :host {
      forced-color-adjust: none;
    }
  }

  :host(:disabled) {
    --_unchecked-container-opacity: 38%;
  }

  [part~='icon'] {
    fill: color-mix(
      in srgb,
      var(--_mark-color) var(--_mark-opacity, 0%),
      transparent
    );
    height: 18px;
    inset: -2px;
    position: absolute;
    transition: fill 50ms linear;
    width: 18px;
  }
  [part~='mark'] {
    transform: scaleY(-1) translate(7px, -14px) rotate(45deg);
    transition-duration: 150ms;
    transition-timing-function: var(
      --md-sys-motion-easing-emphasized-decelerate
    );
  }
  :host(:state(indeterminate)) [part~='mark'] {
    transform: scaleY(-1) translate(4px, -10px) rotate(0deg);
  }
  :host(:state(checked)) [part~='mark'],
  :host(:state(indeterminate)) [part~='mark'] {
    transition-duration: 350ms;
  }
  [part~='mark-short'] {
    height: 0px;
    transition-property: transform, height;
    width: 2px;
  }
  [part~='mark-long'] {
    height: 2px;
    transition-property: transform, width;
    width: 0px;
  }
  :host(:not(:state(checked)):not(:state(indeterminate)):state(was-checked))
    [part~='mark'],
  :host(:not(:state(checked)):not(:state(indeterminate)):--was-indeterminate)
    [part~='mark'] {
    transition-delay: 150ms;
  }
  :host(:state(checked)) [part~='mark-short'] {
    height: 5.6568542495px;
  }
  :host(:state(checked)) [part~='mark-long'] {
    width: 11.313708499px;
  }
  :host(:state(checked):state(was-unchecked)) [part~='mark-short'] {
    transition-property: none;
  }
  :host(:state(indeterminate)) [part~='mark-short'] {
    height: 2px;
  }
  :host(:state(indeterminate)) [part~='mark-long'] {
    width: 10px;
  }
  :host(:state(indeterminate):state(was-unchecked)) [part~='mark-short'] {
    transition-property: height;
  }
  :host(:state(indeterminate):state(was-unchecked)) [part~='mark-long'] {
    transition-property: width;
  }

  md-focus-ring {
    height: 44px;
    inset: unset;
    width: 44px;
  }
  md-ripple {
    --md-ripple-color: var(--_ripple-color);
    border-radius: 9999px;
    height: 40px;
    inset: unset;
    width: 40px;
  }
`;
