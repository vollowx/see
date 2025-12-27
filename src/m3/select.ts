import { css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SelectMixin } from '../base/select.js';
import { M3Menu } from './menu.js';
import { FormAssociated } from '../base/form-associated.js';
import { InternalsAttached } from '../base/internals-attached.js';

const Base = SelectMixin(FormAssociated(InternalsAttached(M3Menu)));

@customElement('md-select')
export class M3Select extends Base {
  static override styles = [
    ...Base.styles,
    css`
      /* TODO: use md-field */
      .dropdown-trigger {
        border: 1px solid var(--md-sys-color-outline);
        background: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        min-width: 200px;
      }

      .dropdown-trigger[aria-expanded='true'] {
        border-color: var(--md-sys-color-primary);
      }
    `,
  ];
}
