import { css } from './template.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';

const FormControlLabelStyle = css`
  [part~='fcl-root'] {
    display: inline-flex;
    align-items: center;
  }
  [part~='label'] {
    ${TypographyStylesGenerator('label', 'L')}
  }
  :host([top]) [part~='fcl-root'] {
    flex-direction: column-reverse;
  }
  :host([bottom]) [part~='fcl-root'] {
    flex-direction: column;
  }
  :host([start]) [part~='fcl-root'] {
    flex-direction: row-reverse;
  }
`;

export default FormControlLabelStyle;
