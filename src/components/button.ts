import { LitElement, html, css, nothing, isServer } from 'lit';
import {
  customElement,
  property,
  query,
  queryAssignedElements,
} from 'lit/decorators.js';

import { ARIAMixinStrict } from '../utils/aria.js';
import { requestUpdateOnAriaChange } from '../utils/delegate.js';
import { dispatchActivationClick, isActivationClick } from '../utils/events.js';
import {
  FormSubmitter,
  FormSubmitterType,
  setupFormSubmitter,
} from '../utils/form-submitter.js';
import {
  internals,
  mixinElementInternals,
} from '../utils/element-internals.js';

const buttonBaseClass = mixinElementInternals(LitElement);

@customElement('x-button')
export default class SEEButton
  extends buttonBaseClass
  implements FormSubmitter
{
  static {
    requestUpdateOnAriaChange(SEEButton);
    setupFormSubmitter(SEEButton);
  }

  /** @nocollapse */
  static readonly formAssociated = true;

  /** @nocollapse */
  static override shadowRootOptions: ShadowRootInit = {
    mode: 'open',
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property() href = '';

  @property() target: '_blank' | '_parent' | '_self' | '_top' | '' = '';

  @property({ type: Boolean, attribute: 'trailing-icon', reflect: true })
  trailingIcon = false;

  @property({ type: Boolean, attribute: 'has-icon', reflect: true }) hasIcon =
    false;

  @property() type: FormSubmitterType = 'submit';

  @property() value = '';

  get name() {
    return this.getAttribute('name') ?? '';
  }
  set name(name: string) {
    this.setAttribute('name', name);
  }

  get form() {
    return this[internals].form;
  }

  @query('[part~="button"]') private readonly buttonElement!: HTMLElement | null;

  @queryAssignedElements({ slot: 'icon', flatten: true })
  private readonly assignedIcons!: HTMLElement[];

  constructor() {
    super();
    if (!isServer) {
      this.addEventListener('click', this.handleActivationClick);
    }
  }

  override focus() {
    this.buttonElement?.focus();
  }

  override blur() {
    this.buttonElement?.blur();
  }

  static override styles = [
    css`
      [part~='button'] {
        all: unset;
      }
    `,
  ];

  protected override render() {
    const buttonOrLink = this.href ? this.renderLink() : this.renderButton();
    return html` ${buttonOrLink} `;
  }

  private renderButton() {
    const { ariaLabel, ariaHasPopup, ariaExpanded } = this as ARIAMixinStrict;
    return html`<button
      part="button"
      ?disabled=${this.disabled}
      aria-label="${ariaLabel || nothing}"
      aria-haspopup="${ariaHasPopup || nothing}"
      aria-expanded="${ariaExpanded || nothing}"
    >
      ${this.renderContent()}
    </button>`;
  }

  private renderLink() {
    const { ariaLabel, ariaHasPopup, ariaExpanded } = this as ARIAMixinStrict;
    return html`<a
      part="button"
      aria-label="${ariaLabel || nothing}"
      aria-haspopup="${ariaHasPopup || nothing}"
      aria-expanded="${ariaExpanded || nothing}"
      href=${this.href}
      target=${this.target || nothing}
      >${this.renderContent()}
    </a>`;
  }

  private renderContent() {
    const icon = html`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"
    ></slot>`;

    return html`
      <span class="touch"></span>
      ${this.trailingIcon ? nothing : icon}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon ? icon : nothing}
    `;
  }

  private readonly handleActivationClick = (event: MouseEvent) => {
    if (!isActivationClick(event) || !this.buttonElement) {
      return;
    }
    this.focus();
    dispatchActivationClick(this.buttonElement);
  };

  private handleSlotChange() {
    this.hasIcon = this.assignedIcons.length > 0;
  }
}
