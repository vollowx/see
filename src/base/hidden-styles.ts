import { css } from 'lit';

export const hiddenStyles = css`
  :host([hidden]) {
    display: none;
    visibility: hidden;
  }
`;
