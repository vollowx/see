import { html, css } from '../shared/template.js';
import BaseElement from '../shared/base-element.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';

const TypographyStyle = new CSSStyleSheet();
TypographyStyle.replaceSync(css`
  :host([display-l]) {
    ${TypographyStylesGenerator('display', 'L')}
  }
  :host([display-m]) {
    ${TypographyStylesGenerator('display', 'M')}
  }
  :host([display-s]) {
    ${TypographyStylesGenerator('display', 'S')}
  }
  :host([headline-l]) {
    ${TypographyStylesGenerator('headline', 'L')}
  }
  :host([headline-m]) {
    ${TypographyStylesGenerator('headline', 'M')}
  }
  :host([headline-s]) {
    ${TypographyStylesGenerator('headline', 'S')}
  }
  :host([title-l]) {
    ${TypographyStylesGenerator('title', 'L')}
  }
  :host([title-m]) {
    ${TypographyStylesGenerator('title', 'M')}
  }
  :host([title-s]) {
    ${TypographyStylesGenerator('title', 'S')}
  }
  :host([label-l]) {
    ${TypographyStylesGenerator('label', 'L')}
  }
  :host([label-m]) {
    ${TypographyStylesGenerator('label', 'M')}
  }
  :host([label-s]) {
    ${TypographyStylesGenerator('label', 'S')}
  }
  :host([body-l]) {
    ${TypographyStylesGenerator('body', 'L')}
  }
  :host([body-m]) {
    ${TypographyStylesGenerator('body', 'M')}
  }
  :host([body-s]) {
    ${TypographyStylesGenerator('body', 'S')}
  }
  *:not(style) {
    font: unset;
    margin: unset;
  }
  :host([tag='h1']),
  :host([tag='h2']),
  :host([tag='h3']),
  :host([tag='h4']),
  :host([tag='h5']),
  :host([tag='h6']),
  :host([tag='p']) {
    display: block;
  }
`);

export default class Typography extends BaseElement {
  static get is() {
    return 'md-typography';
  }

  get _styles() {
    return [TypographyStyle];
  }
  get _template() {
    return html`<${this.getAttribute('tag') || 'span'}><slot></slot></${this.getAttribute('tag') || 'span'}>`;
  }
}

customElements.define(Typography.is, Typography);
