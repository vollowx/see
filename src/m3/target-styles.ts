import { css } from 'lit';

export const targetStyles = css`
  [part~='target'] {
    box-sizing: border-box;
    content: '';
    height: 100%;
    left: 50%;
    min-height: 48px;
    min-width: 48px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
`;
