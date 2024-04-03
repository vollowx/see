import { css } from 'lit';

export const iconButtonToggleStyles = css`
  :host(:state(checked)) [part~='icon-unchecked'] {
    display: none;
  }
  :host(:not(:state(checked))) [part~='icon-checked'] {
    display: none;
  }

  :host(:not([variant]):state(checked)),
  :host([variant='standard']:state(checked)) {
    --_text-color: var(--md-sys-color-primary);
  }

  :host([variant='filled']:not(:state(checked))) {
    --_background-color: var(--md-sys-color-surface-container-highest);
    --_text-color: var(--md-sys-color-primary);
  }
  :host([variant='tonal']:not(:state(checked))) {
    --_background-color: var(--md-sys-color-surface-container-highest);
    --_text-color: var(--md-sys-color-on-surface-variant);
  }
  :host([variant='outlined']:state(checked)) {
    --_background-color: var(--md-sys-color-inverse-surface);
    --_outline-color: var(--md-sys-color-inverse-surface);
    --_text-color: var(--md-sys-color-inverse-on-surface);
  }
`;
