// @ts-check

import BaseElement from '../../../src/shared/base-element.js';
import { html } from '../../../src/shared/template.js';

import DcDemoElementStyle from './demo.css?inline';

export default class DcDemoElement extends BaseElement {
  static get is() {
    return 'dc-demo';
  }
  render() {
    return html`
      <style>
        ${DcDemoElementStyle}
      </style>
      <div id="contents"><slot></slot></div>
      <div id="sidebar"><slot name="sidebar"></slot></div>
    `;
  }
}

customElements.define(DcDemoElement.is, DcDemoElement);
