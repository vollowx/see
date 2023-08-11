// @ts-check

import BaseElement from '../../../src/components/base/base-element.js';
import { html } from '../../../src/components/base/template.js';

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
    `;
  }
}

customElements.define(DcDemoElement.is, DcDemoElement);
