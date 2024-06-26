import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('dc-demo')
export class DcDemo extends LitElement {
  static styles = css`
    :host {
      border-radius: 12px;
      display: flex;
      flex-grow: 1;
    }
    :host([hascontrols]) {
      border: 1px solid var(--md-sys-color-outline);
    }

    [part~='contents'] {
      align-items: center;
      display: flex;
      flex-grow: 999;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
      padding: 24px;
    }
    [part~='controls'] {
      background-color: var(--md-sys-color-surface-container-low);
      border-bottom-right-radius: 12px;
      border-inline-start: 1px solid var(--md-sys-color-outline);
      border-top-right-radius: 12px;
      flex-shrink: 0;
      gap: 16px;
      min-width: 250px;
    }
    :host-context([dir='rtl']) [part~='controls'] {
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 0;
      border-top-left-radius: 12px;
      border-top-right-radius: 0;
    }

    [part~='controls-header'] {
      border-bottom: 1px solid var(--md-sys-color-outline);
      padding: 24px;
    }
    [part~='controls-body'] {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 24px;
    }
    [part~='controls'] h3 {
      font: var(--md-sys-typography-title-medium);
      margin: 0;
    }
    :host(:not([hascontrols])) [part~='controls'] {
      display: none;
    }

    @media (max-width: 600px) {
      :host {
        flex-direction: column;
      }
      [part~='controls'] {
        border-bottom-left-radius: 12px;
        border-inline-start: none;
        border-top: 1px solid var(--md-sys-color-outline);
        border-top-right-radius: 0;
      }
    }
  `;
  render() {
    return html`
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
