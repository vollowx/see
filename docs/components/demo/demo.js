// @ts-check

import ReactiveElement from '../../../src/core/reactive-element.js';
import { html, sheetsFromCss } from '../../../src/core/template.js';
import { customElement } from '../../../src/core/decorators.js';

import DcDemoStyle from './demo.css?inline';

@customElement('dc-demo')
export default class DcDemo extends ReactiveElement {
  get styles() {
    return [...sheetsFromCss(DcDemoStyle)];
  }
  get template() {
    return html`
      <style>
        ${DcDemoStyle}
      </style>
      <div part="contents"><slot></slot></div>
      <div part="controls">
        <div part="controls-header">
          <h3>Playground</h3>
        </div>
        <div part="controls-body">
          <slot name="controls"></slot>
        </div>
      </div>
    `;
  }
}
