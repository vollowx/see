// @ts-check

import BaseElement from '../shared/base-element.js';
import { html } from '../shared/template.js';

import MdButtonElementStyle from './button.css?inline';

export default class MdButtonElement extends BaseElement {
  static get is() {
    return 'md-button';
  }
  render() {
    return html`
      <style>
        ${MdButtonElementStyle}
      </style>
      <span part="focus-ring"></span>
      <slot></slot>
    `;
  }
}
