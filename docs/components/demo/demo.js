// @ts-check

import ReactiveElement from '../../../src/core/reactive-element.js';
import { html, sheetsFromCss } from '../../../src/core/template.js';
import { customElement } from '../../../src/core/decorators.js';

import DcDemoStyle from './demo.css?inline';

@customElement('dc-demo')
export default class DcDemo extends ReactiveElement {
  get styles() {
    return [...sheetsFromCss([DcDemoStyle])];
  }
  get template() {
    return html`
      <style>
        ${DcDemoStyle}
      </style>
      <div id="contents"><slot></slot></div>
    `;
  }
}
