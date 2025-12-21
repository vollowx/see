import { css } from 'lit';

export const tooltipStyles = css`
  :host {
    align-items: center;
    background-color: var(--md-sys-color-inverse-surface);
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--md-sys-color-inverse-on-surface);
    display: none;
    font: var(--md-sys-typography-body-small);
    left: 0;
    max-width: var(--_max-width, 300px);
    width: max-content;
    min-height: 24px;
    opacity: 0;
    padding: 4px 8px;
    position: absolute;
    top: 0;
    transition: opacity 67ms linear;
    z-index: 9999;
  }
  :host(:state(showing)),
  :host(:state(visible)) {
    display: flex;
    opacity: 1;
  }
  :host(:state(hiding)) {
    display: flex;
    opacity: 0;
  }
`;
