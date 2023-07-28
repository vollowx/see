import {
  a as assertNotReached,
  l as listenOnce,
  P as PaperRippleBehavior,
  C as CrSearchFieldMixin,
  I as I18nMixin,
  W as WebUiListenerMixin,
  b as assert,
  R as RelaunchMixin,
  c as RestartType,
  s as sanitizeInnerHtml,
  d as Router,
  r as routes,
  e as CrPolicyPrefMixin,
  f as PrefControlMixin,
  g as PrefsMixin,
  B as BaseMixin,
  M as MetricsBrowserProxyImpl,
  h as PrivacyGuideInteractions,
  i as PrivacyGuideAvailabilityMixin,
  j as RouteObserverMixin,
  k as PrivacyPageBrowserProxyImpl,
  S as SiteSettingsPrefsBrowserProxyImpl,
  m as SafetyHubBrowserProxyImpl,
  N as NotificationSetting,
  n as ContentSettingsTypes,
  o as ChooserType,
  p as focusWithoutInk,
  H as HatsBrowserProxyImpl,
  T as TrustSafetyInteraction,
  q as CookieControlsMode,
  t as SafetyCheckInteractions,
  O as OpenWindowProxyImpl,
  u as getInstance,
  F as FocusRowMixin,
  v as CrScrollableMixin,
  w as SyncBrowserProxyImpl,
  x as ProfileInfoBrowserProxyImpl,
  y as getImage,
  L as ListPropertyUpdateMixin,
  z as TooltipMixin,
  A as ResetBrowserProxyImpl,
  D as SearchEnginesBrowserProxyImpl,
  E as PromiseResolver,
  G as IronSelectableBehavior,
  J as FocusOutlineManager,
  K as CrContainerShadowMixin,
  Q as FindShortcutMixin,
  U as pageVisibility,
  V as setGlobalScrollTarget,
  X as resetGlobalScrollTargetForTesting,
  Y as PluralStringProxyImpl,
} from './shared.rollup.js';
export {
  Z as ControlledRadioButtonElement,
  af as CrActionMenuElement,
  ag as CrButtonElement,
  ah as CrLinkRowElement,
  ai as CrRadioButtonElement,
  aj as CrRadioGroupElement,
  ae as CrSettingsPrefs,
  ak as CrToggleElement,
  $ as DEFAULT_CHECKED_VALUE,
  a0 as DEFAULT_UNCHECKED_VALUE,
  al as DeleteBrowsingDataAction,
  a3 as ExtensionControlBrowserProxyImpl,
  _ as ExtensionControlledIndicatorElement,
  a4 as LifetimeBrowserProxyImpl,
  at as MAX_SIGNIN_PROMO_IMPRESSION,
  a5 as PageStatus,
  am as PrivacyElementInteractions,
  an as PrivacyGuideSettingsStates,
  ao as PrivacyGuideStepsEligibleAndReached,
  av as PrivacySandboxBrowserProxyImpl,
  ax as Route,
  ap as SafeBrowsingInteractions,
  aq as SafetyCheckNotificationsModuleInteractions,
  ar as SafetyCheckUnusedSitePermissionsModuleInteractions,
  ay as SearchEnginesInteractions,
  a9 as SecureDnsMode,
  aa as SecureDnsUiManagementMode,
  a1 as SettingsDropdownMenuElement,
  ad as SettingsPrefsElement,
  au as SettingsSyncAccountControlElement,
  a2 as SettingsToggleButtonElement,
  az as SiteFaviconElement,
  a6 as StatusAction,
  a8 as TrustedVaultBannerState,
  aw as buildRouter,
  ab as prefToString,
  as as setPageVisibilityForTesting,
  ac as stringToPrefValue,
  a7 as syncPrefsIndividualDataTypes,
} from './shared.rollup.js';
import {
  html,
  PolymerElement,
  mixinBehaviors,
  flush,
  templatize,
  dedupingMixin,
  DomIf,
  microTask,
  beforeNextRender,
} from 'chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js';
import { loadTimeData } from 'chrome://resources/js/load_time_data.js';
export { loadTimeData } from 'chrome://resources/js/load_time_data.js';
import './strings.m.js';
import { sendWithPromise, addWebUiListener } from 'chrome://resources/js/cr.js';
import 'chrome://resources/mojo/mojo/public/js/bindings.js';
function getTemplate$G() {
  return html`<!--_html_template_start_-->
    <style>
      :host dialog {
        --drawer-width: 256px;
        --transition-timing: 200ms ease;
        background-color: var(--cr-drawer-background-color, #fff);
        border: none;
        bottom: 0;
        left: calc(-1 * var(--drawer-width));
        margin: 0;
        max-height: initial;
        max-width: initial;
        overflow: hidden;
        padding: 0;
        position: absolute;
        top: 0;
        transition: left var(--transition-timing);
        width: var(--drawer-width);
      }
      @media (prefers-color-scheme: dark) {
        :host dialog {
          background: var(--cr-drawer-background-color, var(--google-grey-900))
            linear-gradient(rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04));
        }
      }
      #container,
      :host dialog {
        height: 100%;
        word-break: break-word;
      }
      :host([show_]) dialog {
        left: 0;
      }
      :host([align='rtl']) dialog {
        left: auto;
        right: calc(-1 * var(--drawer-width));
        transition: right var(--transition-timing);
      }
      :host([show_][align='rtl']) dialog {
        right: 0;
      }
      :host dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
        bottom: 0;
        left: 0;
        opacity: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: opacity var(--transition-timing);
      }
      :host([show_]) dialog::backdrop {
        opacity: 1;
      }
      .drawer-header {
        align-items: center;
        border-bottom: var(--cr-separator-line);
        color: var(--cr-drawer-header-color, inherit);
        display: flex;
        font-size: 123.08%;
        font-weight: var(--cr-drawer-header-font-weight, inherit);
        min-height: 56px;
        padding-inline-start: var(--cr-drawer-header-padding, 24px);
      }
      @media (prefers-color-scheme: dark) {
        .drawer-header {
          color: var(--cr-primary-text-color);
        }
      }
      #heading {
        outline: 0;
      }
      :host ::slotted([slot='body']) {
        height: calc(100% - 56px);
        overflow: auto;
      }
      picture {
        margin-inline-end: 16px;
      }
      #product-logo,
      picture {
        height: 24px;
        width: 24px;
      }
    </style>
    <dialog id="dialog" on-cancel="onDialogCancel_" on-click="onDialogClick_" on-close="onDialogClose_">
      <div id="container" on-click="onContainerClick_">
        <div class="drawer-header">
          <slot name="header-icon">
            <picture>
              <source media="(prefers-color-scheme: dark)" srcset="//resources/images/chrome_logo_dark.svg" />
              <img
                id="product-logo"
                srcset="chrome://theme/current-channel-logo@1x, chrome://theme/current-channel-logo@2x 2x"
                role="presentation"
              />
            </picture>
          </slot>
          <div id="heading" tabindex="-1">[[heading]]</div>
        </div>
        <slot name="body"></slot>
      </div>
    </dialog>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
class CrDrawerElement extends PolymerElement {
  static get is() {
    return 'cr-drawer';
  }
  static get template() {
    return getTemplate$G();
  }
  static get properties() {
    return {
      heading: String,
      show_: { type: Boolean, reflectToAttribute: true },
      align: { type: String, value: 'ltr', reflectToAttribute: true },
    };
  }
  fire_(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, { bubbles: true, composed: true, detail: detail }));
  }
  get open() {
    return this.$.dialog.open;
  }
  set open(_value) {
    assertNotReached('Cannot set |open|.');
  }
  toggle() {
    if (this.open) {
      this.cancel();
    } else {
      this.openDrawer();
    }
  }
  openDrawer() {
    if (this.open) {
      return;
    }
    this.$.dialog.showModal();
    this.show_ = true;
    this.fire_('cr-drawer-opening');
    listenOnce(this.$.dialog, 'transitionend', () => {
      this.fire_('cr-drawer-opened');
    });
  }
  dismiss_(cancel) {
    if (!this.open) {
      return;
    }
    this.show_ = false;
    listenOnce(this.$.dialog, 'transitionend', () => {
      this.$.dialog.close(cancel ? 'canceled' : 'closed');
    });
  }
  cancel() {
    this.dismiss_(true);
  }
  close() {
    this.dismiss_(false);
  }
  wasCanceled() {
    return !this.open && this.$.dialog.returnValue === 'canceled';
  }
  onContainerClick_(event) {
    event.stopPropagation();
  }
  onDialogClick_() {
    this.cancel();
  }
  onDialogCancel_(event) {
    event.preventDefault();
    this.cancel();
  }
  onDialogClose_() {
    this.fire_('close');
  }
}
customElements.define(CrDrawerElement.is, CrDrawerElement);
function getTemplate$F() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style cr-icons">
      :host {
        display: block;
        height: 40px;
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), width 150ms cubic-bezier(0.4, 0, 0.2, 1);
        width: 44px;
      }
      :host-context([chrome-refresh-2023]):host {
        isolation: isolate;
      }
      :host([disabled]) {
        opacity: var(--cr-disabled-opacity);
      }
      [hidden] {
        display: none !important;
      }
      cr-icon-button {
        --cr-icon-button-size: var(--cr-toolbar-icon-container-size, 32px);
        margin: var(--cr-toolbar-icon-margin, 6px);
      }
      :host-context([chrome-refresh-2023]) cr-icon-button {
        --cr-icon-button-fill-color: var(
          --cr-toolbar-search-field-icon-color,
          var(--color-toolbar-search-field-icon, var(--cr-secondary-text-color))
        );
        --cr-icon-button-size: var(--cr-toolbar-icon-container-size, 28px);
        --cr-icon-button-icon-size: 20px;
        margin: var(--cr-toolbar-icon-margin, 0);
      }
      @media (prefers-color-scheme: light) {
        cr-icon-button {
          --cr-icon-button-fill-color: var(--cr-toolbar-search-field-input-icon-color, var(--google-grey-700));
          --cr-icon-button-focus-outline-color: var(
            --cr-toolbar-icon-button-focus-outline-color,
            var(--cr-focus-outline-color)
          );
        }
      }
      @media (prefers-color-scheme: dark) {
        cr-icon-button {
          --cr-icon-button-fill-color: var(--cr-toolbar-search-field-input-icon-color, var(--google-grey-500));
        }
      }
      #icon {
        transition: margin 150ms, opacity 0.2s;
      }
      #prompt {
        color: var(--cr-toolbar-search-field-prompt-color, var(--google-grey-700));
        opacity: 0;
      }
      @media (prefers-color-scheme: dark) {
        #prompt {
          color: var(--cr-toolbar-search-field-prompt-color, #fff);
        }
      }
      @media (prefers-color-scheme: dark) {
        #prompt {
          --cr-toolbar-search-field-prompt-opacity: 1;
          color: var(--cr-secondary-text-color, #fff);
        }
      }
      :host-context([chrome-refresh-2023]) #prompt {
        color: var(
          --cr-toolbar-search-field-prompt-color,
          var(--color-toolbar-search-field-foreground-placeholder, var(--cr-secondary-text-color))
        );
      }
      paper-spinner-lite {
        --paper-spinner-color: var(--cr-toolbar-search-field-input-icon-color, var(--google-grey-700));
        height: var(--cr-icon-size);
        margin: var(--cr-toolbar-search-field-paper-spinner-margin, 0 6px);
        opacity: 0;
        padding: 6px;
        position: absolute;
        width: var(--cr-icon-size);
      }
      @media (prefers-color-scheme: dark) {
        paper-spinner-lite {
          --paper-spinner-color: var(--cr-toolbar-search-field-input-icon-color, white);
        }
      }
      paper-spinner-lite[active] {
        opacity: 1;
      }
      #prompt,
      paper-spinner-lite {
        transition: opacity 0.2s;
      }
      #searchTerm {
        -webkit-font-smoothing: antialiased;
        flex: 1;
        line-height: 185%;
        margin: var(--cr-toolbar-search-field-term-margin, 0 2px);
        position: relative;
      }
      :host-context([chrome-refresh-2023]) #searchTerm {
        font-size: 12px;
        font-weight: 500;
        margin: var(--cr-toolbar-search-field-term-margin, 0);
      }
      label {
        bottom: 0;
        cursor: var(--cr-toolbar-search-field-cursor, text);
        left: 0;
        overflow: hidden;
        position: absolute;
        right: 0;
        top: 0;
        white-space: nowrap;
      }
      :host([has-search-text]) label {
        visibility: hidden;
      }
      input {
        -webkit-appearance: none;
        background: 0 0;
        border: none;
        caret-color: var(--cr-toolbar-search-field-input-caret-color, var(--google-blue-700));
        color: var(--cr-toolbar-search-field-input-text-color, var(--google-grey-900));
        cursor: var(--cr-toolbar-search-field-cursor, text);
        font: inherit;
        outline: 0;
        padding: 0;
        position: relative;
        width: 100%;
      }
      @media (prefers-color-scheme: dark) {
        input {
          color: var(--cr-toolbar-search-field-input-text-color, #fff);
        }
      }
      :host-context([chrome-refresh-2023]) input {
        caret-color: var(--cr-toolbar-serch-field-input-caret-color, currentColor);
        color: var(
          --cr-toolbar-search-field-input-text-color,
          var(--color-toolbar-search-field-foreground, var(--cr-fallback-color-on-surface))
        );
        font-size: 12px;
        font-weight: 500;
      }
      input[type='search']::-webkit-search-cancel-button {
        display: none;
      }
      :host([narrow]) {
        border-radius: var(--cr-toolbar-search-field-border-radius, 0);
      }
      :host(:not([narrow])) {
        background: var(--cr-toolbar-search-field-background, var(--google-grey-100));
        border-radius: var(--cr-toolbar-search-field-border-radius, 46px);
        cursor: var(--cr-toolbar-search-field-cursor, text);
        max-width: var(--cr-toolbar-field-max-width, none);
        padding-inline-end: 0;
        width: var(--cr-toolbar-field-width, 680px);
      }
      @media (prefers-color-scheme: dark) {
        :host(:not([narrow])) {
          background: var(--cr-toolbar-search-field-background, rgba(0, 0, 0, 0.22));
        }
      }
      :host-context([chrome-refresh-2023]):host(:not([narrow])) {
        background: 0 0;
        border-radius: 100px;
        height: 36px;
        overflow: hidden;
        padding: 0 6px;
        position: relative;
      }
      #background,
      #stateBackground {
        display: none;
      }
      :host-context([chrome-refresh-2023]):host(:not([narrow])) #background {
        background: var(
          --cr-toolbar-search-field-background,
          var(--color-toolbar-search-field-background, var(--cr-fallback-color-base-container))
        );
        border-radius: inherit;
        display: block;
        inset: 0;
        pointer-events: none;
        position: absolute;
        z-index: 0;
      }
      :host-context([chrome-refresh-2023]):host([search-focused_]:not([narrow])) {
        outline: 2px solid var(--cr-focus-outline-color);
        outline-offset: 2px;
      }
      :host-context([chrome-refresh-2023]):host(:not([narrow])) #stateBackground {
        display: block;
        inset: 0;
        pointer-events: none;
        position: absolute;
      }
      :host-context([chrome-refresh-2023]):host(:hover:not([search-focused_], [narrow])) #stateBackground {
        background: var(--color-toolbar-search-field-background-hover, var(--cr-hover-background-color));
        z-index: 1;
      }
      :host(:not([narrow]):not([showing-search])) #icon {
        opacity: var(--cr-toolbar-search-field-icon-opacity, 0.7);
      }
      :host-context([chrome-refresh-2023]):host(:not([narrow]):not([showing-search])) #icon {
        opacity: var(--cr-toolbar-search-field-icon-opacity, 1);
      }
      :host(:not([narrow])) #prompt {
        opacity: var(--cr-toolbar-search-field-prompt-opacity, 1);
      }
      :host([narrow]) #prompt {
        opacity: var(--cr-toolbar-search-field-narrow-mode-prompt-opacity, 0);
      }
      :host([narrow]:not([showing-search])) #searchTerm {
        display: none;
      }
      :host([showing-search][spinner-active]) #icon {
        opacity: 0;
      }
      :host([narrow][showing-search]) {
        width: 100%;
      }
      :host([narrow][showing-search]) #icon,
      :host([narrow][showing-search]) paper-spinner-lite {
        margin-inline-start: var(--cr-toolbar-search-icon-margin-inline-start, 18px);
      }
      paper-ripple {
        display: none;
      }
      :host-context([chrome-refresh-2023]):host(:not([narrow])) paper-ripple {
        color: var(--color-toolbar-search-field-background-pressed, var(--cr-active-background-color));
        display: block;
        --paper-ripple-opacity: 1;
      }
      #content {
        align-items: center;
        display: flex;
        height: 100%;
      }
      :host-context([chrome-refresh-2023]) #content {
        position: relative;
        z-index: 2;
      }
    </style>
    <div id="background"></div>
    <div id="stateBackground"></div>
    <div id="content">
      <template is="dom-if" id="spinnerTemplate">
        <paper-spinner-lite active="[[isSpinnerShown_]]"> </paper-spinner-lite>
      </template>
      <cr-icon-button
        id="icon"
        iron-icon="cr:search"
        title="[[label]]"
        dir="ltr"
        tabindex$="[[computeIconTabIndex_(narrow, hasSearchText)]]"
        aria-hidden$="[[computeIconAriaHidden_(narrow, hasSearchText)]]"
        on-click="onSearchIconClicked_"
        disabled="[[disabled]]"
      >
      </cr-icon-button>
      <div id="searchTerm">
        <label id="prompt" for="searchInput" aria-hidden="true">[[label]]</label>
        <input
          id="searchInput"
          aria-labelledby="prompt"
          autocapitalize="off"
          autocomplete="off"
          type="search"
          on-input="onSearchTermInput"
          on-search="onSearchTermSearch"
          on-keydown="onSearchTermKeydown_"
          on-focus="onInputFocus_"
          on-blur="onInputBlur_"
          autofocus$="[[autofocus]]"
          spellcheck="false"
          disabled="[[disabled]]"
        />
      </div>
      <template is="dom-if" if="[[hasSearchText]]">
        <cr-icon-button
          id="clearSearch"
          iron-icon="cr:cancel"
          title="[[clearLabel]]"
          on-click="clearSearch_"
          disabled="[[disabled]]"
        ></cr-icon-button>
      </template>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
const CrToolbarSearchFieldElementBase = mixinBehaviors([PaperRippleBehavior], CrSearchFieldMixin(PolymerElement));
class CrToolbarSearchFieldElement extends CrToolbarSearchFieldElementBase {
  static get is() {
    return 'cr-toolbar-search-field';
  }
  static get template() {
    return getTemplate$F();
  }
  static get properties() {
    return {
      narrow: { type: Boolean, reflectToAttribute: true },
      showingSearch: {
        type: Boolean,
        value: false,
        notify: true,
        observer: 'showingSearchChanged_',
        reflectToAttribute: true,
      },
      disabled: { type: Boolean, value: false, reflectToAttribute: true },
      autofocus: { type: Boolean, value: false, reflectToAttribute: true },
      spinnerActive: { type: Boolean, reflectToAttribute: true },
      isSpinnerShown_: { type: Boolean, computed: 'computeIsSpinnerShown_(spinnerActive, showingSearch)' },
      searchFocused_: { reflectToAttribute: true, type: Boolean, value: false },
    };
  }
  ready() {
    super.ready();
    this.addEventListener('click', (e) => this.showSearch_(e));
    if (document.documentElement.hasAttribute('chrome-refresh-2023')) {
      this.addEventListener('pointerdown', this.onPointerDown_.bind(this));
    }
  }
  getSearchInput() {
    return this.$.searchInput;
  }
  isSearchFocused() {
    return this.searchFocused_;
  }
  showAndFocus() {
    this.showingSearch = true;
    this.focus_();
  }
  onSearchTermInput() {
    super.onSearchTermInput();
    this.showingSearch = this.hasSearchText || this.isSearchFocused();
  }
  onSearchIconClicked_() {
    this.dispatchEvent(new CustomEvent('search-icon-clicked', { bubbles: true, composed: true }));
  }
  focus_() {
    this.getSearchInput().focus();
  }
  computeIconTabIndex_(narrow) {
    return narrow && !this.hasSearchText ? 0 : -1;
  }
  computeIconAriaHidden_(narrow) {
    return Boolean(!narrow || this.hasSearchText).toString();
  }
  computeIsSpinnerShown_() {
    const showSpinner = this.spinnerActive && this.showingSearch;
    if (showSpinner) {
      this.$.spinnerTemplate.if = true;
    }
    return showSpinner;
  }
  onInputFocus_() {
    this.searchFocused_ = true;
  }
  onInputBlur_() {
    this.searchFocused_ = false;
    if (!this.hasSearchText) {
      this.showingSearch = false;
    }
  }
  onSearchTermKeydown_(e) {
    if (e.key === 'Escape') {
      this.showingSearch = false;
    }
  }
  showSearch_(e) {
    if (e.target !== this.shadowRoot.querySelector('#clearSearch')) {
      this.showingSearch = true;
    }
  }
  clearSearch_() {
    this.setValue('');
    this.focus_();
    this.spinnerActive = false;
  }
  showingSearchChanged_(_current, previous) {
    if (previous === undefined) {
      return;
    }
    if (this.showingSearch) {
      this.focus_();
      return;
    }
    this.setValue('');
    this.getSearchInput().blur();
  }
  onPointerDown_(event) {
    this.noink = event.composedPath().some((item) => item.tagName === 'CR-ICON-BUTTON');
    this.ensureRipple();
  }
}
customElements.define(CrToolbarSearchFieldElement.is, CrToolbarSearchFieldElement);
function getTemplate$E() {
  return html`<!--_html_template_start_-->
    <style include="cr-icons cr-hidden-style">
      :host {
        align-items: center;
        background-color: var(--cr-toolbar-background-color);
        color: var(--google-grey-900);
        display: flex;
        height: var(--cr-toolbar-height);
      }
      @media (prefers-color-scheme: dark) {
        :host {
          border-bottom: var(--cr-separator-line);
          box-sizing: border-box;
          color: var(--cr-secondary-text-color);
        }
        :host-context([chrome-refresh-2023]):host {
          background-color: transparent;
          border-bottom: none;
        }
      }
      h1 {
        flex: 1;
        font-size: 170%;
        font-weight: var(--cr-toolbar-header-font-weight, 500);
        letter-spacing: 0.25px;
        line-height: normal;
        margin-inline-start: 6px;
        padding-inline-end: 12px;
        white-space: var(--cr-toolbar-header-white-space, normal);
      }
      @media (prefers-color-scheme: dark) {
        h1 {
          color: var(--cr-primary-text-color);
        }
      }
      #leftContent {
        position: relative;
        transition: opacity 0.1s;
      }
      #leftSpacer {
        align-items: center;
        box-sizing: border-box;
        display: flex;
        padding-inline-start: calc(12px + 6px);
        width: var(--cr-toolbar-left-spacer-width, auto);
      }
      cr-icon-button {
        --cr-icon-button-size: 32px;
        min-width: 32px;
      }
      @media (prefers-color-scheme: light) {
        cr-icon-button {
          --cr-icon-button-fill-color: currentColor;
          --cr-icon-button-focus-outline-color: var(--cr-focus-outline-color);
        }
      }
      #centeredContent {
        display: flex;
        flex: 1 1 0;
        justify-content: center;
      }
      #rightSpacer {
        padding-inline-end: 12px;
      }
      :host([narrow]) #centeredContent {
        justify-content: flex-end;
      }
      :host([has-overlay]) {
        transition: visibility var(--cr-toolbar-overlay-animation-duration);
        visibility: hidden;
      }
      :host([narrow][showing-search_]) #leftContent {
        opacity: 0;
        position: absolute;
      }
      :host(:not([narrow])) #leftContent {
        flex: 1 1 var(--cr-toolbar-field-margin, 0);
      }
      :host(:not([narrow])) #centeredContent {
        flex-basis: var(--cr-toolbar-center-basis, 0);
      }
      :host(:not([narrow])[disable-right-content-grow]) #centeredContent {
        justify-content: start;
        padding-inline-start: 12px;
      }
      :host(:not([narrow])) #rightContent {
        flex: 1 1 0;
        text-align: end;
      }
      :host(:not([narrow])[disable-right-content-grow]) #rightContent {
        flex: 0 1 0;
      }
      picture {
        display: none;
      }
      #menuButton {
        margin-inline-end: 9px;
      }
      #menuButton ~ h1 {
        margin-inline-start: 0;
      }
      :host(:not([narrow])) picture,
      :host([always-show-logo]) picture {
        display: initial;
        margin-inline-end: 16px;
      }
      :host(:not([narrow])) #leftSpacer,
      :host([always-show-logo]) #leftSpacer {
        padding-inline-start: calc(12px + 9px);
      }
      :host(:not([narrow])) :is(picture, #product-logo),
      :host([always-show-logo]) :is(picture, #product-logo) {
        height: 24px;
        width: 24px;
      }
    </style>
    <div id="leftContent">
      <div id="leftSpacer">
        <template is="dom-if" if="[[showMenu]]" restamp>
          <cr-icon-button
            id="menuButton"
            class="no-overlap"
            iron-icon="cr20:menu"
            on-click="onMenuClick_"
            aria-label$="[[menuLabel]]"
            title="[[menuLabel]]"
          >
          </cr-icon-button>
        </template>
        <slot name="product-logo">
          <picture>
            <source media="(prefers-color-scheme: dark)" srcset="//resources/images/chrome_logo_dark.svg" />
            <img
              id="product-logo"
              srcset="chrome://theme/current-channel-logo@1x, chrome://theme/current-channel-logo@2x 2x"
              role="presentation"
            />
          </picture>
        </slot>
        <h1>[[pageName]]</h1>
      </div>
    </div>

    <div id="centeredContent" hidden$="[[!showSearch]]">
      <cr-toolbar-search-field
        id="search"
        narrow="[[narrow]]"
        label="[[searchPrompt]]"
        clear-label="[[clearLabel]]"
        spinner-active="[[spinnerActive]]"
        showing-search="{{showingSearch_}}"
        autofocus$="[[autofocus]]"
      >
      </cr-toolbar-search-field>
      <iron-media-query query="(max-width: [[narrowThreshold]]px)" query-matches="{{narrow}}"> </iron-media-query>
    </div>

    <div id="rightContent">
      <div id="rightSpacer">
        <slot></slot>
      </div>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
class CrToolbarElement extends PolymerElement {
  static get is() {
    return 'cr-toolbar';
  }
  static get template() {
    return getTemplate$E();
  }
  static get properties() {
    return {
      pageName: String,
      searchPrompt: String,
      clearLabel: String,
      menuLabel: String,
      spinnerActive: Boolean,
      showMenu: { type: Boolean, value: false },
      showSearch: { type: Boolean, value: true },
      autofocus: { type: Boolean, value: false, reflectToAttribute: true },
      narrow: { type: Boolean, reflectToAttribute: true, readonly: true, notify: true },
      narrowThreshold: { type: Number, value: 900 },
      alwaysShowLogo: { type: Boolean, value: false, reflectToAttribute: true },
      showingSearch_: { type: Boolean, reflectToAttribute: true },
    };
  }
  getSearchField() {
    return this.$.search;
  }
  onMenuClick_() {
    this.dispatchEvent(new CustomEvent('cr-toolbar-menu-click', { bubbles: true, composed: true }));
  }
  focusMenuButton() {
    requestAnimationFrame(() => {
      const menuButton = this.shadowRoot.querySelector('#menuButton');
      if (menuButton) {
        menuButton.focus();
      }
    });
  }
  isMenuFocused() {
    return !!this.shadowRoot.activeElement && this.shadowRoot.activeElement.id === 'menuButton';
  }
}
customElements.define(CrToolbarElement.is, CrToolbarElement);
const styleMod$2 = document.createElement('dom-module');
styleMod$2.appendChild(
  html`
    <template>
      <style>
        :host {
          color: var(--cr-primary-text-color);
          line-height: 154%;
          overflow: hidden;
          user-select: text;
        }
      </style>
    </template>
  `.content
);
styleMod$2.register('cr-page-host-style');
function getTemplate$D() {
  return html`<!--_html_template_start_-->
    <style>
      :host {
        align-items: center;
        border-top: 1px solid var(--cr-separator-color);
        color: var(--cr-secondary-text-color);
        display: none;
        font-size: 0.8125rem;
        justify-content: center;
        padding: 0 24px;
      }
      :host([is-managed_]) {
        display: flex;
      }
      a[href] {
        color: var(--cr-link-color);
      }
      iron-icon {
        align-self: flex-start;
        flex-shrink: 0;
        height: 20px;
        padding-inline-end: var(--managed-footnote-icon-padding, 8px);
        width: 20px;
      }
    </style>

    <template is="dom-if" if="[[isManaged_]]">
      <iron-icon icon="[[managedByIcon_]]"></iron-icon>
      <div id="content" inner-h-t-m-l="[[getManagementString_(showDeviceInfo)]]"></div>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2018 The Chromium Authors
const ManagedFootnoteElementBase = I18nMixin(WebUiListenerMixin(PolymerElement));
class ManagedFootnoteElement extends ManagedFootnoteElementBase {
  static get is() {
    return 'managed-footnote';
  }
  static get template() {
    return getTemplate$D();
  }
  static get properties() {
    return {
      isManaged_: {
        reflectToAttribute: true,
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('isManaged');
        },
      },
      showDeviceInfo: { type: Boolean, value: false },
      managedByIcon_: {
        reflectToAttribute: true,
        type: String,
        value() {
          return loadTimeData.getString('managedByIcon');
        },
      },
    };
  }
  ready() {
    super.ready();
    this.addWebUiListener('is-managed-changed', (managed) => {
      loadTimeData.overrideValues({ isManaged: managed });
      this.isManaged_ = managed;
    });
  }
  getManagementString_() {
    return this.i18nAdvanced('browserManagedByOrg');
  }
}
customElements.define(ManagedFootnoteElement.is, ManagedFootnoteElement);
chrome.send('observeManagedUI');
// Copyright 2018 The Chromium Authors
const WRAPPER_CSS_CLASS = 'search-highlight-wrapper';
const ORIGINAL_CONTENT_CSS_CLASS = 'search-highlight-original-content';
const HIT_CSS_CLASS = 'search-highlight-hit';
const SEARCH_BUBBLE_CSS_CLASS = 'search-bubble';
function removeHighlights(wrappers) {
  for (const wrapper of wrappers) {
    if (!wrapper.parentElement) {
      continue;
    }
    const originalContent = wrapper.querySelector(`.${ORIGINAL_CONTENT_CSS_CLASS}`);
    assert(originalContent);
    const textNode = originalContent.firstChild;
    assert(textNode);
    wrapper.parentElement.replaceChild(textNode, wrapper);
  }
}
function findAndRemoveHighlights(node) {
  const wrappers = Array.from(node.querySelectorAll(`.${WRAPPER_CSS_CLASS}`));
  assert(wrappers.length === 1);
  removeHighlights(wrappers);
}
function highlight(node, ranges) {
  assert(ranges.length > 0);
  const wrapper = document.createElement('span');
  wrapper.classList.add(WRAPPER_CSS_CLASS);
  assert(node.parentNode);
  node.parentNode.replaceChild(wrapper, node);
  const span = document.createElement('span');
  span.classList.add(ORIGINAL_CONTENT_CSS_CLASS);
  span.style.display = 'none';
  span.appendChild(node);
  wrapper.appendChild(span);
  const text = node.textContent;
  const tokens = [];
  for (let i = 0; i < ranges.length; ++i) {
    const range = ranges[i];
    const prev = ranges[i - 1] || { start: 0, length: 0 };
    const start = prev.start + prev.length;
    const length = range.start - start;
    tokens.push(text.substr(start, length));
    tokens.push(text.substr(range.start, range.length));
  }
  const last = ranges.slice(-1)[0];
  tokens.push(text.substr(last.start + last.length));
  for (let i = 0; i < tokens.length; ++i) {
    if (i % 2 === 0) {
      wrapper.appendChild(document.createTextNode(tokens[i]));
    } else {
      const hitSpan = document.createElement('span');
      hitSpan.classList.add(HIT_CSS_CLASS);
      hitSpan.style.backgroundColor = 'var(--search-highlight-hit-background-color, #ffeb3b)';
      hitSpan.style.color = 'var(--search-highlight-hit-color, #202124)';
      hitSpan.textContent = tokens[i];
      wrapper.appendChild(hitSpan);
    }
  }
  return wrapper;
}
function createEmptySearchBubble(node, horizontallyCenter) {
  let anchor = node;
  if (node.nodeName === 'SELECT') {
    anchor = node.parentNode;
  }
  if (anchor instanceof ShadowRoot) {
    anchor = anchor.host.parentNode;
  }
  let searchBubble = anchor.querySelector(`.${SEARCH_BUBBLE_CSS_CLASS}`);
  if (searchBubble) {
    return searchBubble;
  }
  searchBubble = document.createElement('div');
  searchBubble.classList.add(SEARCH_BUBBLE_CSS_CLASS);
  const innards = document.createElement('div');
  innards.classList.add('search-bubble-innards');
  innards.textContent = '聽';
  searchBubble.appendChild(innards);
  anchor.appendChild(searchBubble);
  const updatePosition = function () {
    const nodeEl = node;
    assert(searchBubble);
    assert(typeof nodeEl.offsetTop === 'number');
    searchBubble.style.top =
      nodeEl.offsetTop +
      (innards.classList.contains('above') ? -searchBubble.offsetHeight : nodeEl.offsetHeight) +
      'px';
    if (horizontallyCenter) {
      const width = nodeEl.offsetWidth - searchBubble.offsetWidth;
      searchBubble.style.left = nodeEl.offsetLeft + width / 2 + 'px';
    }
  };
  updatePosition();
  searchBubble.addEventListener('mouseover', function () {
    innards.classList.toggle('above');
    updatePosition();
  });
  return searchBubble;
}
function stripDiacritics(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function getTemplate$C() {
  return html`<!--_html_template_start_-->
    <style>
      :host {
        display: flex;
        flex-direction: column;
        outline: 0;
        position: relative;
      }
      #header {
        display: flex;
        justify-content: space-between;
        padding-inline-end: var(--cr-section-padding);
      }
      #header .title {
        color: var(--cr-primary-text-color);
        font-size: 108%;
        font-weight: 400;
        letter-spacing: 0.25px;
        margin-bottom: 12px;
        margin-top: var(--cr-section-vertical-margin);
        outline: 0;
        padding-bottom: 4px;
        padding-top: 8px;
      }
      #feedback {
        margin-top: var(--cr-section-vertical-margin);
      }
      :host(:not(.expanded)) #card {
        background-color: var(--cr-card-background-color);
        border-radius: var(--cr-card-border-radius);
        box-shadow: var(--cr-card-shadow);
        flex: 1;
        overflow: hidden;
      }
      @media (forced-colors: active) {
        :host(:not(.expanded)) #card {
          border: var(--cr-border-hcm);
        }
      }
      :host(.expanded) #header,
      :host([hidden-by-search]) {
        display: none;
      }
    </style>
    <div id="header">
      <h2 id="title" class="title" tabindex="-1" aria-hidden$="[[getTitleHiddenStatus_(pageTitle)]]">[[pageTitle]]</h2>
      <template is="dom-if" if="[[showSendFeedbackButton]]">
        <cr-icon-button
          id="feedback"
          iron-icon="settings:feedback"
          dir="ltr"
          aria-labelledby="title"
          aria-roledescription="鈥滃彂閫佸弽棣堚€濇寜閽�"
          on-click="onSendFeedbackClick_"
        >
        </cr-icon-button>
      </template>
    </div>
    <div id="card">
      <slot></slot>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
class SettingsSectionElement extends PolymerElement {
  static get is() {
    return 'settings-section';
  }
  static get template() {
    return getTemplate$C();
  }
  static get properties() {
    return {
      section: String,
      pageTitle: { type: String, value: '' },
      hiddenBySearch: { type: Boolean, value: false, reflectToAttribute: true },
      showSendFeedbackButton: { type: Boolean, value: false },
    };
  }
  getTitleHiddenStatus_() {
    return this.pageTitle ? false : 'true';
  }
  focus() {
    this.shadowRoot.querySelector('.title').focus();
  }
  onSendFeedbackClick_() {
    this.dispatchEvent(new CustomEvent('send-feedback', { bubbles: true, composed: true }));
  }
}
customElements.define(SettingsSectionElement.is, SettingsSectionElement);
const styleMod$1 = document.createElement('dom-module');
styleMod$1.appendChild(
  html`
    <template>
      <style>
        :host(.showing-subpage) settings-section:not(.expanded) {
          display: none;
        }
        :host > div > :not(.expanded) {
          margin-bottom: 3px;
        }
        .expanded {
          min-height: 100%;
        }
      </style>
    </template>
  `.content
);
styleMod$1.register('settings-page-styles');
function getTemplate$B() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style settings-shared settings-page-styles iron-flex">
      :host {
        --about-page-image-space: 10px;
      }
      .info-sections {
        padding: var(--cr-section-vertical-padding) var(--cr-section-padding);
      }
      .info-section {
        margin-bottom: 12px;
      }
      .product-title {
        font-size: 153.85%;
        font-weight: 400;
        margin-bottom: auto;
        margin-top: auto;
      }
      img {
        margin-inline-end: var(--about-page-image-space);
      }
      .icon-container {
        margin-inline-end: var(--about-page-image-space);
        min-width: 32px;
        text-align: center;
      }
      iron-icon[icon='settings:check-circle'] {
        fill: var(--cr-checked-color);
      }
      iron-icon[icon='cr:error'] {
        fill: var(--settings-error-color);
      }
      cr-button {
        white-space: nowrap;
      }
    </style>
    <settings-section page-title="鍏充簬 Chrome" section="about">
      <div class="cr-row two-line first">
        <img
          id="product-logo"
          on-click="onProductLogoClick_"
          srcset="chrome://theme/current-channel-logo@1x, chrome://theme/current-channel-logo@2x 2x"
          alt="Chrome 寰芥爣"
          role="presentation"
        />
        <div class="product-title">Google Chrome</div>
      </div>
      <div class="cr-row two-line">
        <div class="icon-container" hidden="[[!shouldShowIcons_(showUpdateStatus_)]]">
          <iron-icon
            icon$="[[getUpdateStatusIcon_(
                  obsoleteSystemInfo_, currentUpdateStatusEvent_)]]"
            src="[[getThrobberSrcIfUpdating_(
                  obsoleteSystemInfo_, currentUpdateStatusEvent_)]]"
          >
          </iron-icon>
        </div>

        <div class="flex cr-padded-text">
          <div id="updateStatusMessage" hidden="[[!showUpdateStatus_]]">
            <div
              role="alert"
              aria-live="polite"
              inner-h-t-m-l="[[getUpdateStatusMessage_(
                    currentUpdateStatusEvent_)]]"
            ></div>
            <a
              hidden$="[[!shouldShowLearnMoreLink_(
                currentUpdateStatusEvent_)]]"
              target="_blank"
              href="https://support.google.com/chrome?p=update_error"
              aria-label="璇︾粏浜嗚В濡備綍淇鏇存柊閿欒"
            >
              浜嗚В璇︽儏
            </a>
          </div>
          <span id="deprecationWarning" hidden="[[!obsoleteSystemInfo_.obsolete]]">
            姝よ绠楁満灏嗕笉浼氬啀鏀跺埌 Google Chrome 鏇存柊锛屽洜涓� Windows XP 鍜� Windows Vista 宸蹭笉鍐嶅彈鏀寔
            <a
              href="https://support.google.com/chrome/?p=unsupported_windows"
              target="_blank"
              aria-label="璇︾粏浜嗚В绯荤粺瑕佹眰"
            >
              浜嗚В璇︽儏
            </a>
          </span>

          <div class="secondary">鐗堟湰 117.0.5904.0锛堟寮忕増鏈級canary 锛�64 浣嶏級</div>
        </div>

        <div class="separator" hidden="[[!showButtonContainer_]]"></div>
        <span id="buttonContainer" hidden="[[!showButtonContainer_]]">
          <cr-button id="relaunch" hidden="[[!showRelaunch_]]" on-click="onRelaunchClick_"> 閲嶆柊鍚姩 </cr-button>
        </span>
      </div>

      <cr-link-row
        class="hr"
        id="help"
        on-click="onHelpClick_"
        label="鑾峰彇鏈夊叧 Chrome 鐨勫府鍔�"
        external
      ></cr-link-row>

      <cr-link-row
        class="hr"
        id="reportIssue"
        on-click="onReportIssueClick_"
        hidden="[[!prefs.feedback_allowed.value]]"
        label="鎶ュ憡闂"
        external
      ></cr-link-row>
      <cr-link-row
        class="hr"
        id="getTheMostOutOfChrome"
        on-click="onGetTheMostOutOfChromeClick_"
        label="鍏呭垎鍒╃敤 Chrome"
        sub-label="鎮ㄥ彲浠ラ€氳繃鏈寚鍗椾簡瑙ｆ偍鐨勯€夋嫨锛屼互渚胯 Chrome 浠ユ偍鏈熸湜鐨勬柟寮忚繍琛�"
        role-description="瀛愰〉闈㈡寜閽�"
        hidden$="[[!showGetTheMostOutOfChromeSection_]]"
      ></cr-link-row>

      <cr-link-row
        class="hr"
        on-click="onManagementPageClick_"
        start-icon="[[managedByIcon_]]"
        label="鎮ㄧ殑娴忚鍣ㄤ笉鍙楃鐞�"
        role-description="瀛愰〉闈㈡寜閽�"
        hidden$="[[!isManaged_]]"
      ></cr-link-row>
    </settings-section>

    <settings-section>
      <div class="info-sections">
        <div class="info-section">
          <div class="secondary">Google Chrome</div>
          <div class="secondary">鐗堟潈鎵€鏈� 2023 Google LLC. 淇濈暀鎵€鏈夋潈鍒┿€�</div>
        </div>

        <div class="info-section">
          <div class="secondary">
            Chrome 鐨勮癁鐢熺涓嶅紑
            <a target="_blank" href="https://www.chromium.org/">Chromium</a> 寮€婧愰」鐩互鍙婂叾浠�<a
              target="_blank"
              href="chrome://credits/"
              >寮€婧愯蒋浠�</a
            >銆�
          </div>
        </div>

        <div class="secondary">
          <a id="tos" href="chrome://terms/">鏈嶅姟鏉℃</a>
        </div>

        <template is="dom-if" if="[[shouldShowRelaunchDialog]]" restamp>
          <relaunch-confirmation-dialog
            restart-type="[[restartTypeEnum.RELAUNCH]]"
            on-close="onRelaunchDialogClose"
          ></relaunch-confirmation-dialog>
        </template>
      </div>
    </settings-section>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var UpdateStatus;
(function (UpdateStatus) {
  UpdateStatus['CHECKING'] = 'checking';
  UpdateStatus['UPDATING'] = 'updating';
  UpdateStatus['NEARLY_UPDATED'] = 'nearly_updated';
  UpdateStatus['UPDATED'] = 'updated';
  UpdateStatus['FAILED'] = 'failed';
  UpdateStatus['FAILED_HTTP'] = 'failed_http';
  UpdateStatus['FAILED_DOWNLOAD'] = 'failed_download';
  UpdateStatus['DISABLED'] = 'disabled';
  UpdateStatus['DISABLED_BY_ADMIN'] = 'disabled_by_admin';
  UpdateStatus['NEED_PERMISSION_TO_UPDATE'] = 'need_permission_to_update';
})(UpdateStatus || (UpdateStatus = {}));
class AboutPageBrowserProxyImpl {
  pageReady() {
    chrome.send('aboutPageReady');
  }
  refreshUpdateStatus() {
    chrome.send('refreshUpdateStatus');
  }
  openHelpPage() {
    chrome.send('openHelpPage');
  }
  openFeedbackDialog() {
    chrome.send('openFeedbackDialog');
  }
  static getInstance() {
    return instance$b || (instance$b = new AboutPageBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$b = obj;
  }
}
let instance$b = null;
// Copyright 2016 The Chromium Authors
const SettingsAboutPageElementBase = RelaunchMixin(WebUiListenerMixin(I18nMixin(PolymerElement)));
class SettingsAboutPageElement extends SettingsAboutPageElementBase {
  constructor() {
    super(...arguments);
    this.aboutBrowserProxy_ = AboutPageBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-about-page';
  }
  static get template() {
    return getTemplate$B();
  }
  static get properties() {
    return {
      currentUpdateStatusEvent_: {
        type: Object,
        value: { message: '', progress: 0, rollback: false, status: UpdateStatus.DISABLED },
      },
      isManaged_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('isManaged');
        },
      },
      managedByIcon_: {
        type: String,
        value() {
          return loadTimeData.getString('managedByIcon');
        },
      },
      showGetTheMostOutOfChromeSection_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('showGetTheMostOutOfChromeSection') && !loadTimeData.getBoolean('isGuest');
        },
      },
      obsoleteSystemInfo_: {
        type: Object,
        value() {
          return {
            obsolete: loadTimeData.getBoolean('aboutObsoleteNowOrSoon'),
            endOfLine: loadTimeData.getBoolean('aboutObsoleteEndOfTheLine'),
          };
        },
      },
      showUpdateStatus_: { type: Boolean, value: false },
      showButtonContainer_: Boolean,
      showRelaunch_: { type: Boolean, value: false },
    };
  }
  static get observers() {
    return [
      'updateShowUpdateStatus_(' + 'obsoleteSystemInfo_, currentUpdateStatusEvent_)',
      'updateShowRelaunch_(currentUpdateStatusEvent_)',
      'updateShowButtonContainer_(showRelaunch_)',
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.aboutBrowserProxy_.pageReady();
    this.startListening_();
  }
  getPromoteUpdaterClass_() {
    return '';
  }
  startListening_() {
    this.addWebUiListener('update-status-changed', this.onUpdateStatusChanged_.bind(this));
    this.aboutBrowserProxy_.refreshUpdateStatus();
  }
  onUpdateStatusChanged_(event) {
    this.currentUpdateStatusEvent_ = event;
  }
  onLearnMoreClick_(event) {
    event.stopPropagation();
  }
  onHelpClick_() {
    this.aboutBrowserProxy_.openHelpPage();
  }
  onRelaunchClick_() {
    this.performRestart(RestartType.RELAUNCH);
  }
  updateShowUpdateStatus_() {
    if (this.obsoleteSystemInfo_.endOfLine) {
      this.showUpdateStatus_ = false;
      return;
    }
    this.showUpdateStatus_ = this.currentUpdateStatusEvent_.status !== UpdateStatus.DISABLED;
  }
  updateShowButtonContainer_() {
    this.showButtonContainer_ = this.showRelaunch_;
  }
  updateShowRelaunch_() {
    this.showRelaunch_ = this.checkStatus_(UpdateStatus.NEARLY_UPDATED);
  }
  shouldShowLearnMoreLink_() {
    return this.currentUpdateStatusEvent_.status === UpdateStatus.FAILED;
  }
  getUpdateStatusMessage_() {
    switch (this.currentUpdateStatusEvent_.status) {
      case UpdateStatus.CHECKING:
      case UpdateStatus.NEED_PERMISSION_TO_UPDATE:
        return this.i18nAdvanced('aboutUpgradeCheckStarted');
      case UpdateStatus.NEARLY_UPDATED:
        return this.i18nAdvanced('aboutUpgradeRelaunch');
      case UpdateStatus.UPDATED:
        return this.i18nAdvanced('aboutUpgradeUpToDate');
      case UpdateStatus.UPDATING:
        assert(typeof this.currentUpdateStatusEvent_.progress === 'number');
        const progressPercent = this.currentUpdateStatusEvent_.progress + '%';
        if (this.currentUpdateStatusEvent_.progress > 0) {
          return this.i18nAdvanced('aboutUpgradeUpdatingPercent', { substitutions: [progressPercent] });
        }
        return this.i18nAdvanced('aboutUpgradeUpdating');
      default:
        let result = '';
        const message = this.currentUpdateStatusEvent_.message;
        if (message) {
          result += message;
        }
        const connectMessage = this.currentUpdateStatusEvent_.connectionTypes;
        if (connectMessage) {
          result += `<div>${connectMessage}</div>`;
        }
        return sanitizeInnerHtml(result, { tags: ['br', 'pre'] });
    }
  }
  getUpdateStatusIcon_() {
    if (this.obsoleteSystemInfo_.endOfLine) {
      return 'cr:error';
    }
    switch (this.currentUpdateStatusEvent_.status) {
      case UpdateStatus.DISABLED_BY_ADMIN:
        return 'cr20:domain';
      case UpdateStatus.FAILED:
        return 'cr:error';
      case UpdateStatus.UPDATED:
      case UpdateStatus.NEARLY_UPDATED:
        return 'settings:check-circle';
      default:
        return null;
    }
  }
  getThrobberSrcIfUpdating_() {
    if (this.obsoleteSystemInfo_.endOfLine) {
      return null;
    }
    switch (this.currentUpdateStatusEvent_.status) {
      case UpdateStatus.CHECKING:
      case UpdateStatus.UPDATING:
        return 'chrome://resources/images/throbber_small.svg';
      default:
        return null;
    }
  }
  checkStatus_(status) {
    return this.currentUpdateStatusEvent_.status === status;
  }
  onManagementPageClick_() {
    window.location.href = loadTimeData.getString('managementPageUrl');
  }
  onProductLogoClick_() {
    this.$['product-logo'].animate(
      { transform: ['none', 'rotate(-10turn)'] },
      { duration: 500, easing: 'cubic-bezier(1, 0, 0, 1)' }
    );
  }
  onReportIssueClick_() {
    this.aboutBrowserProxy_.openFeedbackDialog();
  }
  onGetTheMostOutOfChromeClick_() {
    Router.getInstance().navigateTo(routes.GET_MOST_CHROME);
  }
  shouldShowIcons_() {
    if (this.obsoleteSystemInfo_.endOfLine) {
      return true;
    }
    return this.showUpdateStatus_;
  }
}
customElements.define(SettingsAboutPageElement.is, SettingsAboutPageElement);
// Copyright 2016 The Chromium Authors
class AppearanceBrowserProxyImpl {
  getDefaultZoom() {
    return chrome.settingsPrivate.getDefaultZoom();
  }
  getThemeInfo(themeId) {
    return chrome.management.get(themeId);
  }
  isChildAccount() {
    return loadTimeData.getBoolean('isChildAccount');
  }
  recordHoverCardImagesEnabledChanged(enabled) {
    chrome.metricsPrivate.recordBoolean('Settings.HoverCards.ImagePreview.Enabled', enabled);
  }
  useDefaultTheme() {
    chrome.send('useDefaultTheme');
  }
  validateStartupPage(url) {
    return sendWithPromise('validateStartupPage', url);
  }
  static getInstance() {
    return instance$a || (instance$a = new AppearanceBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$a = obj;
  }
}
let instance$a = null;
function getTemplate$A() {
  return html`<!--_html_template_start_-->
    <style>
      :host {
        cursor: auto;
        display: block;
        width: 100%;
      }
      cr-input {
        width: 100%;
        --cr-input-width: 50%;
      }
      cr-input::part(row-container) {
        justify-content: normal;
      }
    </style>

    <cr-input
      id="input"
      value="{{value}}"
      error-message="鏃犳晥"
      placeholder="杈撳叆鑷畾涔夌綉鍧€"
      maxlength="102400"
      on-change="onChange_"
      on-keydown="onKeydown_"
      on-input="validate_"
      invalid="{{invalid}}"
      input-tabindex="[[getTabindex_(canTab)]]"
      disabled="[[isDisabled_(disabled, pref.*)]]"
      spellcheck="false"
      on-keyup="stopKeyEventPropagation_"
      on-keypress="stopKeyEventPropagation_"
    >
      <template is="dom-if" if="[[hasPrefPolicyIndicator(pref.*)]]">
        <cr-policy-pref-indicator pref="[[pref]]" icon-aria-label="[[label]]" slot="suffix"> </cr-policy-pref-indicator>
      </template>
    </cr-input>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const HomeUrlInputElementBase = CrPolicyPrefMixin(PrefControlMixin(PolymerElement));
class HomeUrlInputElement extends HomeUrlInputElementBase {
  static get is() {
    return 'home-url-input';
  }
  static get template() {
    return getTemplate$A();
  }
  static get properties() {
    return {
      pref: { observer: 'prefChanged_' },
      disabled: { type: Boolean, value: false, reflectToAttribute: true },
      canTab: Boolean,
      invalid: { type: Boolean, value: false },
      value: { type: String, value: '', notify: true },
    };
  }
  constructor() {
    super();
    this.browserProxy_ = AppearanceBrowserProxyImpl.getInstance();
    this.noExtensionIndicator = true;
  }
  focus() {
    this.$.input.focus();
  }
  prefChanged_() {
    if (!this.pref) {
      return;
    }
    this.setInputValueFromPref_();
  }
  setInputValueFromPref_() {
    assert(this.pref.type === chrome.settingsPrivate.PrefType.URL);
    this.value = this.pref.value;
  }
  getTabindex_(canTab) {
    return canTab ? 0 : -1;
  }
  onChange_() {
    if (this.invalid) {
      this.resetValue_();
      return;
    }
    assert(this.pref.type === chrome.settingsPrivate.PrefType.URL);
    this.set('pref.value', this.value);
  }
  resetValue_() {
    this.invalid = false;
    this.setInputValueFromPref_();
    this.$.input.blur();
  }
  onKeydown_(event) {
    if (event.key === 'Enter' && this.invalid) {
      event.preventDefault();
    } else if (event.key === 'Escape') {
      this.resetValue_();
    }
    this.stopKeyEventPropagation_(event);
  }
  stopKeyEventPropagation_(e) {
    e.stopPropagation();
  }
  isDisabled_(disabled) {
    return disabled || this.isPrefEnforced();
  }
  validate_() {
    if (this.value === '') {
      this.invalid = false;
      return;
    }
    this.browserProxy_.validateStartupPage(this.value).then((isValid) => {
      this.invalid = !isValid;
    });
  }
}
customElements.define(HomeUrlInputElement.is, HomeUrlInputElement);
function getTemplate$z() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style settings-shared md-select iron-flex">
      #custom-input {
        --cr-radio-button-disc-margin-block-start: calc((1.54em + 12px) / 2 - 8px);
        align-items: start;
      }
      #themeRow cr-button {
        margin-inline-end: 20px;
      }
      #themeRow .separator {
        margin-inline-start: 0;
      }
    </style>
    <settings-animated-pages id="pages" section="appearance" focus-config="[[focusConfig_]]">
      <div route-path="default">
        <div class="settings-row first" id="themeRow" hidden="[[!pageVisibility.setTheme]]">
          <cr-link-row
            class="first"
            hidden="[[!pageVisibility.setTheme]]"
            label="涓婚鑳屾櫙"
            sub-label="[[themeSublabel_]]"
            on-click="openThemeUrl_"
            external
          ></cr-link-row>

          <template is="dom-if" if="[[prefs.extensions.theme.id.value]]">
            <div class="separator"></div>
            <cr-button id="useDefault" on-click="onUseDefaultClick_"> 閲嶇疆涓洪粯璁よ缃� </cr-button>
          </template>
        </div>
        <div
          class="hr"
          hidden="[[!showHr_(
                pageVisibility.setTheme, pageVisibility.homeButton)]]"
        ></div>
        <settings-toggle-button
          elide-label
          hidden="[[!pageVisibility.homeButton]]"
          pref="{{prefs.browser.show_home_button}}"
          label="鏄剧ず鈥滀富椤碘€濇寜閽�"
          sub-label="[[getShowHomeSubLabel_(
                prefs.browser.show_home_button.value,
                prefs.homepage_is_newtabpage.value,
                prefs.homepage.value)]]"
        >
        </settings-toggle-button>
        <template is="dom-if" if="[[prefs.browser.show_home_button.value]]">
          <div id="home-button-options" class="list-frame" hidden="[[!pageVisibility.homeButton]]">
            <settings-radio-group pref="{{prefs.homepage_is_newtabpage}}">
              <controlled-radio-button
                class="list-item"
                name="true"
                pref="[[prefs.homepage_is_newtabpage]]"
                label="鎵撳紑鏂扮殑鏍囩椤�"
                no-extension-indicator
              >
              </controlled-radio-button>
              <controlled-radio-button
                id="custom-input"
                class="list-item"
                name="false"
                pref="[[prefs.homepage_is_newtabpage]]"
                no-extension-indicator
              >
                <home-url-input
                  id="customHomePage"
                  pref="{{prefs.homepage}}"
                  can-tab="[[!prefs.homepage_is_newtabpage.value]]"
                >
                </home-url-input>
              </controlled-radio-button>
              <template is="dom-if" if="[[prefs.homepage.extensionId]]">
                <extension-controlled-indicator
                  extension-id="[[prefs.homepage.extensionId]]"
                  extension-can-be-disabled="[[
                        prefs.homepage.extensionCanBeDisabled]]"
                  extension-name="[[prefs.homepage.controlledByName]]"
                  on-disable-extension="onDisableExtension_"
                >
                </extension-controlled-indicator>
              </template>
            </settings-radio-group>
          </div>
        </template>
        <div
          class="hr"
          hidden="[[!showHr_(
                pageVisibility.homeButton, pageVisibility.bookmarksBar)]]"
        ></div>
        <settings-toggle-button
          hidden="[[!pageVisibility.bookmarksBar]]"
          pref="{{prefs.bookmark_bar.show_on_all_tabs}}"
          label="鏄剧ず涔︾鏍�"
        >
        </settings-toggle-button>

        <template is="dom-if" if="[[showHoverCardImagesOption_]]">
          <div id="hoverCardImagesHr" class="hr" hidden="[[!pageVisibility.hoverCardImages]]"></div>
          <settings-toggle-button
            id="hoverCardImagesToggle"
            on-settings-boolean-control-change="onHoverCardImagesEnabledChange_"
            hidden="[[!pageVisibility.hoverCardImages]]"
            pref="{{prefs.browser.hovercard.image_previews_enabled}}"
            label="鍦ㄦ爣绛鹃〉鐨勬偓鍋滈瑙堝崱鐗囦笂鏄剧ず鍥剧墖"
          >
          </settings-toggle-button>
        </template>

        <template is="dom-if" if="[[showSidePanelOptions_]]">
          <div class="cr-row">渚ц竟鏍�</div>
          <div class="list-frame">
            <settings-radio-group
              id="side-panel"
              pref="{{prefs.side_panel.is_right_aligned}}"
              group-aria-label="渚ц竟鏍�"
            >
              <controlled-radio-button
                class="list-item"
                pref="[[prefs.side_panel.is_right_aligned]]"
                label="鏄剧ず鍦ㄥ彸渚�"
                name="true"
                no-extension-indicator
              >
              </controlled-radio-button>
              <controlled-radio-button
                class="list-item"
                pref="[[prefs.side_panel.is_right_aligned]]"
                label="鏄剧ず鍦ㄥ乏渚�"
                name="false"
                no-extension-indicator
              >
              </controlled-radio-button>
            </settings-radio-group>
          </div>
        </template>

        <div class="cr-row">
          <div class="flex cr-padded-text" aria-hidden="true">瀛楀彿</div>
          <settings-dropdown-menu
            id="defaultFontSize"
            label="瀛楀彿"
            pref="{{prefs.webkit.webprefs.default_font_size}}"
            menu-options="[[fontSizeOptions_]]"
          >
          </settings-dropdown-menu>
        </div>
        <cr-link-row
          class="hr"
          id="customize-fonts-subpage-trigger"
          label="鑷畾涔夊瓧浣�"
          on-click="onCustomizeFontsClick_"
          role-description="瀛愰〉闈㈡寜閽�"
        >
        </cr-link-row>
        <div class="cr-row" hidden="[[!pageVisibility.pageZoom]]">
          <div id="pageZoom" class="flex cr-padded-text" aria-hidden="true">缃戦〉缂╂斁</div>
          <select id="zoomLevel" class="md-select" aria-labelledby="pageZoom" on-change="onZoomLevelChange_">
            <template is="dom-repeat" items="[[pageZoomLevels_]]">
              <option value="[[item]]" selected="[[zoomValuesEqual_(item, defaultZoom_)]]">
                [[formatZoom_(item)]]%
              </option>
            </template>
          </select>
        </div>
        <template is="dom-if" if="[[showReaderModeOption_]]">
          <settings-toggle-button
            class="hr"
            pref="{{prefs.dom_distiller.offer_reader_mode}}"
            label="浣跨敤闃呰鍣ㄦā寮忔樉绀虹綉椤�"
            sub-label="璇㈤棶鏄惁浣跨敤闃呰鍣ㄦā寮忥紙鑻ユ敮鎸侊級鏄剧ず鏂囩珷"
          >
          </settings-toggle-button>
        </template>
      </div>
      <template is="dom-if" route-path="/fonts">
        <settings-subpage associated-control="[[$$('#customize-fonts-subpage-trigger')]]" page-title="鑷畾涔夊瓧浣�">
          <settings-appearance-fonts-page prefs="{{prefs}}"> </settings-appearance-fonts-page>
        </settings-subpage>
      </template>
    </settings-animated-pages>
    <template is="dom-if" if="[[showManagedThemeDialog_]]" restamp>
      <managed-dialog
        on-close="onManagedDialogClosed_"
        title="涓婚鐢辫吹鍗曚綅璁惧畾"
        body="鎮ㄧ殑绠＄悊鍛樺凡璁剧疆榛樿涓婚锛屾偍鏃犳硶鏇存敼銆�"
      >
      </managed-dialog>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SIZE_DIFFERENCE_FIXED_STANDARD = 3;
const AUTOGENERATED_THEME_ID = 'autogenerated_theme_id';
var SystemTheme;
(function (SystemTheme) {
  SystemTheme[(SystemTheme['DEFAULT'] = 0)] = 'DEFAULT';
})(SystemTheme || (SystemTheme = {}));
const SettingsAppearancePageElementBase = I18nMixin(PrefsMixin(BaseMixin(PolymerElement)));
class SettingsAppearancePageElement extends SettingsAppearancePageElementBase {
  constructor() {
    super(...arguments);
    this.appearanceBrowserProxy_ = AppearanceBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-appearance-page';
  }
  static get template() {
    return getTemplate$z();
  }
  static get properties() {
    return {
      pageVisibility: Object,
      prefs: { type: Object, notify: true },
      defaultZoom_: Number,
      isWallpaperPolicyControlled_: { type: Boolean, value: true },
      fontSizeOptions_: {
        readOnly: true,
        type: Array,
        value() {
          return [
            { value: 9, name: loadTimeData.getString('verySmall') },
            { value: 12, name: loadTimeData.getString('small') },
            { value: 16, name: loadTimeData.getString('medium') },
            { value: 20, name: loadTimeData.getString('large') },
            { value: 24, name: loadTimeData.getString('veryLarge') },
          ];
        },
      },
      pageZoomLevels_: Array,
      themeSublabel_: String,
      themeUrl_: String,
      systemTheme_: { type: Object, value: SystemTheme.DEFAULT },
      focusConfig_: {
        type: Object,
        value() {
          const map = new Map();
          if (routes.FONTS) {
            map.set(routes.FONTS.path, '#customize-fonts-subpage-trigger');
          }
          return map;
        },
      },
      showReaderModeOption_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('showReaderModeOption');
        },
      },
      isForcedTheme_: {
        type: Boolean,
        computed: 'computeIsForcedTheme_(' + 'prefs.autogenerated.theme.policy.color.controlledBy)',
      },
      showSidePanelOptions_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('showSidePanelOptions');
        },
      },
      showHoverCardImagesOption_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('showHoverCardImagesOption');
        },
      },
      showManagedThemeDialog_: Boolean,
    };
  }
  static get observers() {
    return [
      'defaultFontSizeChanged_(prefs.webkit.webprefs.default_font_size.value)',
      'themeChanged_(' + 'prefs.extensions.theme.id.value, systemTheme_, isForcedTheme_)',
    ];
  }
  ready() {
    super.ready();
    this.$.defaultFontSize.menuOptions = this.fontSizeOptions_;
    this.appearanceBrowserProxy_.getDefaultZoom().then((zoom) => {
      this.defaultZoom_ = zoom;
    });
    this.pageZoomLevels_ = JSON.parse(loadTimeData.getString('presetZoomFactors'));
  }
  formatZoom_(zoom) {
    return Math.round(zoom * 100);
  }
  getShowHomeSubLabel_(showHomepage, isNtp, homepageValue) {
    if (!showHomepage) {
      return this.i18n('homeButtonDisabled');
    }
    if (isNtp) {
      return this.i18n('homePageNtp');
    }
    return homepageValue || this.i18n('customWebAddress');
  }
  onCustomizeFontsClick_() {
    Router.getInstance().navigateTo(routes.FONTS);
  }
  onDisableExtension_() {
    this.dispatchEvent(new CustomEvent('refresh-pref', { bubbles: true, composed: true, detail: 'homepage' }));
  }
  defaultFontSizeChanged_(value) {
    this.set('prefs.webkit.webprefs.default_fixed_font_size.value', value - SIZE_DIFFERENCE_FIXED_STANDARD);
  }
  openThemeUrl_() {
    window.open(this.themeUrl_ || loadTimeData.getString('themesGalleryUrl'));
  }
  onUseDefaultClick_() {
    if (this.isForcedTheme_) {
      this.showManagedThemeDialog_ = true;
      return;
    }
    this.appearanceBrowserProxy_.useDefaultTheme();
  }
  themeChanged_(themeId) {
    if (this.prefs === undefined || this.systemTheme_ === undefined) {
      return;
    }
    if (themeId.length > 0 && themeId !== AUTOGENERATED_THEME_ID && !this.isForcedTheme_) {
      assert(this.systemTheme_ === SystemTheme.DEFAULT);
      this.appearanceBrowserProxy_.getThemeInfo(themeId).then((info) => {
        this.themeSublabel_ = info.name;
      });
      this.themeUrl_ = 'https://chrome.google.com/webstore/detail/' + themeId;
      return;
    }
    this.themeUrl_ = '';
    if (themeId === AUTOGENERATED_THEME_ID || this.isForcedTheme_) {
      this.themeSublabel_ = this.i18n('chromeColors');
      return;
    }
    let i18nId;
    i18nId = 'chooseFromWebStore';
    this.themeSublabel_ = this.i18n(i18nId);
  }
  computeIsForcedTheme_() {
    return !!this.getPref('autogenerated.theme.policy.color').controlledBy;
  }
  onZoomLevelChange_() {
    chrome.settingsPrivate.setDefaultZoom(parseFloat(this.$.zoomLevel.value));
  }
  zoomValuesEqual_(zoom1, zoom2) {
    return Math.abs(zoom1 - zoom2) <= 0.001;
  }
  showHr_(previousIsVisible, nextIsVisible) {
    return previousIsVisible && nextIsVisible;
  }
  onHoverCardImagesEnabledChange_(event) {
    const enabled = event.target.checked;
    this.appearanceBrowserProxy_.recordHoverCardImagesEnabledChanged(enabled);
  }
  onManagedDialogClosed_() {
    this.showManagedThemeDialog_ = false;
  }
}
customElements.define(SettingsAppearancePageElement.is, SettingsAppearancePageElement);
function getTemplate$y() {
  return html`<!--_html_template_start_--><style include="cr-shared-style settings-shared">
      #wrapper {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
      }
      #controlsColumn {
        margin-top: 4px;
      }
      h2 {
        color: var(--cr-primary-text-color);
        font-size: 22px;
        padding-top: 0;
      }
      #title {
        font-weight: 400;
      }
      #bodyText {
        padding-block-end: 16px;
      }
      #startButton {
        margin-bottom: 4px;
        margin-inline-end: 16px;
      }
    </style>
    <div id="wrapper">
      <div id="controlsColumn">
        <h2 id="title">鏌ョ湅闅愮淇濇姢鎸囧崡</h2>
        <div id="bodyText" class="cr-secondary-text">妫€鏌� Chrome 涓噸瑕佺殑闅愮鎺у埗璁剧疆鍜屽畨鍏ㄦ帶浠�</div>
        <cr-button
          class="action-button"
          id="startButton"
          role="button"
          aria-describedby="title bodyText"
          on-click="onPrivacyGuideStartClick_"
        >
          寮€濮嬩娇鐢�
        </cr-button>
        <cr-button id="noThanksButton" role="button" on-click="onNoThanksButtonClick_"> 涓嶇敤浜嗭紝璋㈣阿 </cr-button>
      </div>
      <picture>
        <source
          class="banner"
          srcset="./images/privacy_guide/promo_banner_dark.svg"
          media="(prefers-color-scheme: dark)"
        />
        <img class="banner" alt="" src="./images/privacy_guide/promo_banner.svg" />
      </picture>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
const PrivacyGuidePromoElementBase = PrefsMixin(PolymerElement);
class PrivacyGuidePromoElement extends PrivacyGuidePromoElementBase {
  constructor() {
    super(...arguments);
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-privacy-guide-promo';
  }
  static get template() {
    return getTemplate$y();
  }
  static get properties() {
    return { prefs: { type: Object, notify: true } };
  }
  onPrivacyGuideStartClick_() {
    this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.StartPromo');
    this.metricsBrowserProxy_.recordPrivacyGuideEntryExitHistogram(PrivacyGuideInteractions.PROMO_ENTRY);
    Router.getInstance().navigateTo(routes.PRIVACY_GUIDE);
  }
  onNoThanksButtonClick_() {
    this.setPrefValue('privacy_guide.viewed', true);
  }
}
customElements.define(PrivacyGuidePromoElement.is, PrivacyGuidePromoElement);
function getTemplate$x() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style settings-shared iron-flex">
      .content-settings-header,
      .radio-group {
        padding: 0 var(--cr-section-padding);
      }
      .radio-group-sub-heading {
        padding-bottom: 10px;
      }
      settings-collapse-radio-button {
        --settings-collapse-toggle-min-height: var(--cr-section-min-height);
      }
      settings-collapse-radio-button.two-line {
        --settings-collapse-toggle-min-height: var(--cr-section-two-line-min-height);
      }
      settings-collapse-radio-button:not(:first-of-type) {
        --settings-collapse-separator-line: var(--cr-separator-line);
      }
    </style>
    <template is="dom-if" if="[[showClearBrowsingDataDialog_]]" restamp>
      <settings-clear-browsing-data-dialog prefs="{{prefs}}" on-close="onCbdDialogClosed_">
      </settings-clear-browsing-data-dialog>
    </template>
    <template is="dom-if" if="[[showPrivacyGuideDialog_]]" restamp>
      <settings-privacy-guide-dialog id="privacyGuideDialog" prefs="{{prefs}}" on-close="onPrivacyGuideDialogClosed_">
      </settings-privacy-guide-dialog>
    </template>
    <settings-animated-pages id="pages" section="privacy" focus-config="[[focusConfig_]]">
      <div route-path="default">
        <cr-link-row
          id="clearBrowsingData"
          start-icon="cr:delete"
          label="娓呴櫎娴忚鏁版嵁"
          sub-label="娓呴櫎娴忚璁板綍銆丆ookie銆佺紦瀛樺強鍏朵粬鏁版嵁"
          on-click="onClearBrowsingDataClick_"
        ></cr-link-row>
        <template is="dom-if" if="[[isPrivacyGuideAvailable]]">
          <cr-link-row
            id="privacyGuideLinkRow"
            class="hr"
            start-icon="settings20:wind-rose"
            label="闅愮淇濇姢鎸囧崡"
            sub-label="妫€鏌ラ噸瑕佺殑闅愮鎺у埗璁剧疆鍜屽畨鍏ㄦ帶浠�"
            on-click="onPrivacyGuideClick_"
            role-description="瀛愰〉闈㈡寜閽�"
          >
          </cr-link-row>
        </template>
        <template is="dom-if" if="[[isPrivacySandboxSettings4_]]">
          <cr-link-row
            id="thirdPartyCookiesLinkRow"
            start-icon="settings:cookie"
            class="hr"
            label="绗笁鏂� Cookie"
            sub-label="[[computeThirdPartyCookiesSublabel_(
                  prefs.profile.cookie_controls_mode.*)]]"
            on-click="onCookiesClick_"
            role-description="瀛愰〉闈㈡寜閽�"
          >
          </cr-link-row>
        </template>
        <template is="dom-if" if="[[!isPrivacySandboxSettings4_]]">
          <cr-link-row
            id="cookiesLinkRow"
            start-icon="settings:cookie"
            class="hr"
            label="Cookie 鍙婂叾浠栫綉绔欐暟鎹�"
            sub-label="[[cookieSettingDescription_]]"
            on-click="onCookiesClick_"
            role-description="瀛愰〉闈㈡寜閽�"
          >
          </cr-link-row>
        </template>
        <template
          is="dom-if"
          if="[[isPrivacySandboxSettings4Enabled_(
                isPrivacySandboxRestricted_,
                isPrivacySandboxRestrictedNoticeEnabled_,
                isPrivacySandboxSettings4_)]]"
        >
          <cr-link-row
            id="privacySandboxLinkRow"
            start-icon="settings20:ads-click"
            class="hr"
            label="骞垮憡闅愮鏉冭缃�"
            sub-label="[[computeAdPrivacySublabel_(
                  isPrivacySandboxRestricted_,
                  isPrivacySandboxRestrictedNoticeEnabled_,
                  isPrivacySandboxSettings4_)]]"
            on-click="onPrivacySandboxClick_"
            role-description="瀛愰〉闈㈡寜閽�"
          >
          </cr-link-row>
        </template>
        <cr-link-row
          id="securityLinkRow"
          start-icon="cr:security"
          class="hr"
          label="瀹夊叏"
          sub-label="瀹夊叏娴忚锛堜繚鎶ゆ偍鍏嶅彈鍗遍櫓缃戠珯鐨勪镜瀹筹級鍜屽叾浠栧畨鍏ㄨ缃�"
          on-click="onSecurityPageClick_"
          role-description="瀛愰〉闈㈡寜閽�"
        ></cr-link-row>
        <cr-link-row
          id="permissionsLinkRow"
          start-icon="settings:permissions"
          class="hr"
          label="缃戠珯璁剧疆"
          sub-label="鎺у埗缃戠珯鍙互浣跨敤鍜屾樉绀轰粈涔堜俊鎭紙濡備綅缃俊鎭€佹憚鍍忓ご銆佸脊鍑哄紡绐楀彛鍙婂叾浠栵級"
          on-click="onPermissionsPageClick_"
          role-description="瀛愰〉闈㈡寜閽�"
        ></cr-link-row>
        <template
          is="dom-if"
          if="[[isPrivacySandboxSettings3Enabled_(isPrivacySandboxRestricted_, isPrivacySandboxSettings4_)]]"
        >
          <cr-link-row
            id="privacySandboxLinkRow"
            start-icon="settings20:experiment"
            class="hr"
            label="Privacy Sandbox"
            sub-label="[[computePrivacySandboxSublabel_(
                  prefs.privacy_sandbox.*)]]"
            on-click="onPrivacySandboxClick_"
            external
            role-description="瀛愰〉闈㈡寜閽�"
          >
          </cr-link-row>
          <a
            id="privacySandboxLink"
            href="privacySandbox"
            target="_blank"
            tabindex="-1"
            aria-disabled="true"
            role="none"
          ></a>
        </template>
      </div>

      <template is="dom-if" if="[[enableSecurityKeysSubpage_]]">
        <template is="dom-if" route-path="/securityKeys">
          <settings-subpage associated-control="[[$$('#securityLinkRow')]]" page-title="绠＄悊瀹夊叏瀵嗛挜">
            <security-keys-subpage></security-keys-subpage>
          </settings-subpage>
        </template>
      </template>

      <template is="dom-if" route-path="/securityKeys/phones">
        <settings-subpage associated-control="[[$$('#securityLinkRow')]]" page-title="绠＄悊鎵嬫満">
          <security-keys-phones-subpage></security-keys-phones-subpage>
        </settings-subpage>
      </template>

      <template is="dom-if" route-path="/content">
        <settings-subpage
          associated-control="[[$$('#permissionsLinkRow')]]"
          id="site-settings"
          page-title="缃戠珯璁剧疆"
          learn-more-url="https://support.google.com/chrome/?p=settings_manage_exceptions"
        >
          <settings-site-settings-page focus-config="[[focusConfig_]]" prefs="{{prefs}}"> </settings-site-settings-page>
        </settings-subpage>
      </template>

      <template is="dom-if" if="[[enableSafetyHub_]]">
        <template is="dom-if" route-path="/safetyHub">
          <settings-subpage id="safetyHub" class="multi-card">
            <settings-safety-hub-page> </settings-safety-hub-page>
          </settings-subpage>
        </template>
      </template>

      <template is="dom-if" route-path="/security">
        <settings-subpage
          id="security"
          page-title="瀹夊叏"
          associated-control="[[$$('#securityLinkRow')]]"
          learn-more-url="https://support.google.com/chrome?p=cpn_safe_browsing"
        >
          <settings-security-page prefs="{{prefs}}" focus-config="[[focusConfig_]]"> </settings-security-page>
        </settings-subpage>
      </template>

      <template is="dom-if" route-path="/adPrivacy">
        <settings-subpage
          id="privacy-sandbox"
          page-title="骞垮憡闅愮鏉冭缃�"
          associated-control="[[$$('#privacySandboxLinkRow')]]"
          learn-more-url="https://support.google.com/chrome/?p=ad_privacy&amp;hl=zh-CN"
        >
          <settings-privacy-sandbox-page prefs="{{prefs}}" focus-config="[[focusConfig_]]">
          </settings-privacy-sandbox-page>
        </settings-subpage>
      </template>

      <template is="dom-if" route-path="/adPrivacy/interests">
        <settings-subpage
          id="privacy-sandbox-topics"
          page-title="骞垮憡涓婚"
          associated-control="[[$$('#privacySandboxLinkRow')]]"
          learn-more-url="https://support.google.com/chrome/?p=ad_privacy&amp;hl=zh-CN"
        >
          <settings-privacy-sandbox-topics-subpage prefs="{{prefs}}"> </settings-privacy-sandbox-topics-subpage>
        </settings-subpage>
      </template>

      <template is="dom-if" route-path="/adPrivacy/sites">
        <settings-subpage
          id="privacy-sandbox-fledge"
          page-title="缃戠珯寤鸿鐨勫箍鍛�"
          associated-control="[[$$('#privacySandboxLinkRow')]]"
          learn-more-url="https://support.google.com/chrome/?p=ad_privacy&amp;hl=zh-CN"
        >
          <settings-privacy-sandbox-fledge-subpage prefs="{{prefs}}"> </settings-privacy-sandbox-fledge-subpage>
        </settings-subpage>
      </template>

      <template is="dom-if" route-path="/adPrivacy/measurement">
        <settings-subpage
          id="privacy-sandbox-ad-measurement"
          page-title="骞垮憡琛￠噺"
          associated-control="[[$$('#privacySandboxLinkRow')]]"
          learn-more-url="https://support.google.com/chrome/?p=ad_privacy&amp;hl=zh-CN"
        >
          <settings-privacy-sandbox-ad-measurement-subpage prefs="{{prefs}}">
          </settings-privacy-sandbox-ad-measurement-subpage>
        </settings-subpage>
      </template>

      <template is="dom-if" route-path="/content/all" no-search>
        <settings-subpage
          page-title="鎵€鏈夌綉绔�"
          search-label="鎼滅储"
          search-term="{{searchFilter_}}"
          preserve-search-term
        >
          <all-sites filter="[[searchFilter_]]"></all-sites>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/automaticDownloads" no-search>
        <settings-subpage page-title="鑷姩涓嬭浇椤�" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯鍙兘浼氳嚜鍔ㄥ皢鐩稿叧鏂囦欢涓€璧蜂笅杞斤紝浠庤€屼负鎮ㄨ妭鐪佹椂闂�
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.AUTOMATIC_DOWNLOADS]]"
            allow-option-label="缃戠珯鍙互璇锋眰鑷姩涓嬭浇澶氫釜鏂囦欢"
            allow-option-icon="cr:file-download"
            block-option-label="涓嶅厑璁哥綉绔欒嚜鍔ㄤ笅杞藉涓枃浠�"
            block-option-icon="settings:file-download-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.AUTOMATIC_DOWNLOADS]]"
            allow-header="鍏佽鑷姩涓嬭浇澶氫釜鏂囦欢"
            block-header="涓嶅厑璁歌嚜鍔ㄤ笅杞藉涓枃浠�"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/backgroundSync" no-search>
        <settings-subpage page-title="鍚庡彴鍚屾" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            褰撴偍绂诲紑缃戠珯鍚庯紝缃戠珯鍙繚鎸佸悓姝ヤ互瀹屾垚鍚勯」浠诲姟锛堜緥濡備笂浼犵収鐗囨垨鍙戦€佽亰澶╂秷鎭級
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.BACKGROUND_SYNC]]"
            allow-option-label="鏈€杩戝叧闂殑缃戠珯鍙互瀹屾垚鏁版嵁鏀跺彂鎿嶄綔"
            allow-option-icon="cr:sync"
            block-option-label="涓嶅厑璁稿凡鍏抽棴鐨勭綉绔欏畬鎴愭暟鎹敹鍙戞搷浣�"
            block-option-sub-label="鍏抽棴缃戦〉鍚庯紝鎮ㄥ凡鍚姩鐨勪换鍔″彲鑳戒細鏃犳硶瀹屾垚"
            block-option-icon="settings:sync-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.BACKGROUND_SYNC]]"
            allow-header="鍏佽瀹屾垚鏁版嵁鏀跺彂鎿嶄綔"
            block-header="涓嶅厑璁稿畬鎴愭暟鎹敹鍙戞搷浣�"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/camera" no-search>
        <settings-subpage page-title="鎽勫儚澶�" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <media-picker label="鎽勫儚澶�" type="camera"> </media-picker>
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氫娇鐢ㄦ偍鐨勬憚鍍忓ご浠ュ疄鐜伴€氫俊鍔熻兘锛堜緥濡傝棰戣亰澶╋級
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.CAMERA]]"
            allow-option-label="缃戠珯鍙互璇锋眰浣跨敤鎮ㄧ殑鎽勫儚澶�"
            allow-option-icon="cr:videocam"
            block-option-label="涓嶅厑璁哥綉绔欎娇鐢ㄦ偍鐨勬憚鍍忓ご"
            block-option-sub-label="鎵€鏈夐渶瑕佷娇鐢ㄦ憚鍍忓ご鐨勫姛鑳介兘灏嗘棤娉曟甯歌繍琛�"
            block-option-icon="settings:videocam-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.CAMERA]]"
            read-only-list
            allow-header="鍏佽浣跨敤鎮ㄧ殑鎽勫儚澶�"
            block-header="涓嶅厑璁镐娇鐢ㄦ偍鐨勬憚鍍忓ご"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" if="[[isPrivacySandboxSettings4_]]">
        <template is="dom-if" route-path="/cookies">
          <settings-subpage
            id="cookies"
            page-title="绗笁鏂� Cookie"
            learn-more-url="https://support.google.com/chrome?p=cpn_cookies"
            search-label="鎼滅储"
            search-term="{{searchFilter_}}"
            associated-control="[[$$('#thirdPartyCookiesLinkRow')]]"
          >
            <settings-cookies-page prefs="{{prefs}}" focus-config="[[focusConfig_]]" search-term="[[searchFilter_]]">
            </settings-cookies-page>
          </settings-subpage>
        </template>
      </template>
      <template is="dom-if" if="[[!isPrivacySandboxSettings4_]]">
        <template is="dom-if" route-path="/cookies">
          <settings-subpage
            id="cookies"
            page-title="Cookie 鍙婂叾浠栫綉绔欐暟鎹�"
            learn-more-url="https://support.google.com/chrome?p=cpn_cookies"
            search-label="鎼滅储"
            search-term="{{searchFilter_}}"
            associated-control="[[$$('#cookiesLinkRow')]]"
          >
            <settings-cookies-page prefs="{{prefs}}" focus-config="[[focusConfig_]]" search-term="[[searchFilter_]]">
            </settings-cookies-page>
          </settings-subpage>
        </template>
      </template>
      <template is="dom-if" route-path="/preloading" no-search>
        <settings-subpage id="preloading" page-title="棰勫姞杞界綉椤�">
          <settings-preloading-page prefs="{{prefs}}"> </settings-preloading-page>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/images" no-search>
        <settings-subpage page-title="鍥剧墖" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氭樉绀哄浘鐗囦互鎻愪緵鎻掑浘锛堜緥濡傜綉搴楁垨鏂伴椈鎶ラ亾鐨勫浘鐗囷級
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.IMAGES]]"
            allow-option-label="缃戠珯鍙互鏄剧ず鍥剧墖"
            allow-option-icon="settings:photo"
            block-option-label="涓嶅厑璁哥綉绔欐樉绀哄浘鐗�"
            block-option-sub-label="鎵€鏈夐渶瑕佷娇鐢ㄥ浘鐗囩殑鍔熻兘閮藉皢鏃犳硶姝ｅ父杩愯"
            block-option-icon="settings:photo-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.IMAGES]]"
            allow-header="鍏佽鏄剧ず鍥剧墖"
            block-header="涓嶅厑璁告樉绀哄浘鐗�"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/insecureContent" no-search>
        <settings-subpage page-title="涓嶅畨鍏ㄥ唴瀹�" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            瀹夊叏缃戠珯鍙兘浼氬唴宓屼笉瀹夊叏鐨勫唴瀹癸紝渚嬪鍥剧墖鎴� Web 妗嗘灦
          </div>
          <div class="cr-row first secondary">榛樿鎯呭喌涓嬶紝瀹夊叏缃戠珯浼氭嫤鎴笉瀹夊叏鍐呭</div>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.MIXEDSCRIPT]]"
            allow-header="鍏佽鏄剧ず涓嶅畨鍏ㄥ唴瀹�"
            block-header="涓嶅厑璁告樉绀轰笉瀹夊叏鍐呭"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" if="[[enableFederatedIdentityApiContentSetting_]]">
        <template is="dom-if" route-path="/content/federatedIdentityApi" no-search>
          <settings-subpage page-title="绗笁鏂圭櫥褰�" search-label="鎼滅储" search-term="{{searchFilter_}}">
            <div class="content-settings-header secondary">
              鍏佽鎮ㄤ娇鐢ㄦ偍鍦ㄨ韩浠芥湇鍔′腑娉ㄥ唽鐨勫笎鍙风櫥褰曠綉绔�
            </div>
            <settings-category-default-radio-group
              category="[[contentSettingsTypesEnum_.FEDERATED_IDENTITY_API]]"
              allow-option-label="缃戠珯鍙互鏄剧ず鏉ヨ嚜韬唤鏈嶅姟鐨勭櫥褰曟彁绀�"
              allow-option-icon="settings:federated-identity-api"
              block-option-label="灞忚斀鏉ヨ嚜韬唤鏈嶅姟鐨勭櫥褰曟彁绀�"
              block-option-icon="settings:federated-identity-api-off"
            >
            </settings-category-default-radio-group>
            <category-setting-exceptions
              category="[[contentSettingsTypesEnum_.FEDERATED_IDENTITY_API]]"
              allow-header="鍙互鏄剧ず绗笁鏂圭櫥褰曟彁绀�"
              block-header="涓嶅緱鏄剧ず绗笁鏂圭櫥褰曟彁绀�"
              search-filter="[[searchFilter_]]"
            >
            </category-setting-exceptions>
          </settings-subpage>
        </template>
      </template>
      <template is="dom-if" if="[[isPrivacySandboxSettings4_]]">
        <template is="dom-if" route-path="/content/siteData" no-search>
          <settings-subpage page-title="璁惧绔綉绔欐暟鎹�" search-label="鎼滅储" search-term="{{searchFilter_}}">
            <settings-site-data prefs="{{prefs}}" search-term="[[searchFilter_]]"> </settings-site-data>
          </settings-subpage>
        </template>
      </template>
      <template is="dom-if" route-path="/content/location" no-search>
        <settings-subpage page-title="浣嶇疆淇℃伅" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氫娇鐢ㄦ偍鐨勪綅缃俊鎭互瀹炵幇鐩稿叧鍔熻兘鎴栨彁渚涚浉鍏充俊鎭紙渚嬪鏈湴鏂伴椈鎴栭檮杩戠殑鍟嗗簵锛�
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.GEOLOCATION]]"
            allow-option-label="缃戠珯鍙互璇锋眰鍙栧緱鎮ㄧ殑浣嶇疆淇℃伅"
            allow-option-icon="settings:location-on"
            block-option-label="涓嶅厑璁哥綉绔欐煡鐪嬫偍鎵€鍦ㄧ殑浣嶇疆"
            block-option-sub-label="鎵€鏈夐渶瑕佷娇鐢ㄦ偍鐨勪綅缃俊鎭殑鍔熻兘閮藉皢鏃犳硶姝ｅ父杩愯"
            block-option-icon="settings:location-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.GEOLOCATION]]"
            read-only-list
            allow-header="鍏佽鏌ョ湅鎮ㄧ殑浣嶇疆淇℃伅"
            block-header="涓嶅厑璁告煡鐪嬫偍鐨勪綅缃俊鎭�"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/handlers" no-search>
        <settings-subpage page-title="鍗忚澶勭悊绋嬪簭">
          <protocol-handlers
            toggle-off-label="涓嶅厑璁镐换浣曠綉绔欏鐞嗗崗璁�"
            toggle-on-label="鍏佽缃戠珯瑕佹眰鎴愪负鍗忚鐨勯粯璁ゅ鐞嗙▼搴忥紙鎺ㄨ崘锛�"
          >
          </protocol-handlers>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/zoomLevels" no-search>
        <settings-subpage page-title="缂╂斁绾у埆">
          <div class="content-settings-header secondary">鎮ㄥ彲浠ヨ缃壒瀹氱綉绔欑殑缂╂斁绾у埆</div>
          <zoom-levels></zoom-levels>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/pdfDocuments" no-search>
        <settings-subpage page-title="PDF 鏂囨。">
          <div class="radio-group">
            <div class="secondary">缃戠珯鏈夋椂浼氬彂甯� PDF 鏂囦欢锛屼緥濡傛枃妗ｃ€佸悎鍚屽拰琛ㄥ崟</div>
            <h2>榛樿琛屼负</h2>
            <div class="secondary radio-sub-heading">缃戠珯浼氬湪鎮ㄨ闂椂鑷姩閲囩敤姝よ缃�</div>
            <settings-radio-group
              pref="{{prefs.plugins.always_open_pdf_externally}}"
              selectable-elements="settings-collapse-radio-button"
            >
              <settings-collapse-radio-button
                no-collapse
                pref="[[prefs.plugins.always_open_pdf_externally]]"
                label="涓嬭浇 PDF 鏂囦欢"
                name="true"
                disabled$="[[isGuest_]]"
                icon="cr:file-download"
              >
              </settings-collapse-radio-button>
              <settings-collapse-radio-button
                no-collapse
                pref="[[prefs.plugins.always_open_pdf_externally]]"
                label="鍦� Chrome 涓墦寮€ PDF 鏂囦欢"
                name="false"
                disabled$="[[isGuest_]]"
                icon="settings:open-in-browser"
              >
              </settings-collapse-radio-button>
            </settings-radio-group>
          </div>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/javascript" no-search>
        <settings-subpage page-title="JavaScript" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浣跨敤 JavaScript 鏄剧ず浜掑姩鍔熻兘锛屼緥濡傝棰戞父鎴忔垨缃戠粶琛ㄥ崟
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.JAVASCRIPT]]"
            allow-option-label="缃戠珯鍙互浣跨敤 JavaScript"
            allow-option-icon="settings:code"
            block-option-label="涓嶅厑璁哥綉绔欎娇鐢� JavaScript"
            block-option-icon="settings:code-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.JAVASCRIPT]]"
            allow-header="鍏佽浣跨敤 JavaScript"
            block-header="涓嶅厑璁镐娇鐢� JavaScript"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/sound" no-search>
        <settings-subpage page-title="澹伴煶" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯鍙兘浼氭挱鏀惧０闊虫潵涓洪煶涔愩€佽棰戝拰鍏朵粬濯掍綋鎻愪緵闊抽
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.SOUND]]"
            allow-option-label="缃戠珯鍙互鎾斁澹伴煶"
            allow-option-icon="settings:volume-up"
            block-option-label="涓嶅厑璁哥綉绔欐挱鏀惧０闊�"
            block-option-sub-label="鎵€鏈夐渶瑕佷娇鐢ㄥ０闊崇殑鍔熻兘閮藉皢鏃犳硶姝ｅ父杩愯"
            block-option-icon="settings:volume-up-off"
          >
          </settings-category-default-radio-group>
          <settings-toggle-button
            id="block-autoplay-setting"
            class="hr"
            label="璁� Chrome 閫夋嫨浣曟椂鍏佽缃戠珯鎾斁澹伴煶锛堟帹鑽愶級"
            pref="{{blockAutoplayStatus_.pref}}"
            disabled="[[!blockAutoplayStatus_.enabled]]"
            hidden="[[!enableBlockAutoplayContentSetting_]]"
            on-settings-boolean-control-change="onBlockAutoplayToggleChange_"
            no-set-pref
          >
          </settings-toggle-button>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.SOUND]]"
            allow-header="鍏佽鎾斁澹伴煶"
            block-header="涓嶅厑璁告挱鏀惧０闊�"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" if="[[privateStateTokensEnabled_]]">
        <template is="dom-if" route-path="/content/autoVerify" no-search>
          <settings-subpage page-title="鑷姩楠岃瘉">
            <settings-anti-abuse-page></settings-anti-abuse-page>
          </settings-subpage>
        </template>
      </template>
      <template is="dom-if" route-path="/content/microphone" no-search>
        <settings-subpage page-title="楹﹀厠椋�" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <media-picker label="楹﹀厠椋�" type="mic"> </media-picker>
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氫娇鐢ㄦ偍鐨勯害鍏嬮浠ュ疄鐜伴€氫俊鍔熻兘锛堜緥濡傝棰戣亰澶╋級
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.MIC]]"
            allow-option-label="缃戠珯鍙互璇锋眰浣跨敤鎮ㄧ殑楹﹀厠椋�"
            allow-option-icon="cr:mic"
            block-option-label="涓嶅厑璁哥綉绔欎娇鐢ㄦ偍鐨勯害鍏嬮"
            block-option-sub-label="鎵€鏈夐渶瑕佷娇鐢ㄩ害鍏嬮鐨勫姛鑳介兘灏嗘棤娉曟甯歌繍琛�"
            block-option-icon="settings:mic-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.MIC]]"
            read-only-list
            allow-header="鍏佽浣跨敤鎮ㄧ殑楹﹀厠椋�"
            block-header="涓嶅厑璁镐娇鐢ㄦ偍鐨勯害鍏嬮"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/sensors" no-search>
        <settings-subpage page-title="绉诲姩浼犳劅鍣�" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氫娇鐢ㄦ偍璁惧鐨勭Щ鍔ㄤ紶鎰熷櫒浠ュ疄鐜版煇浜涘姛鑳斤紙渚嬪铏氭嫙鐜板疄鎴栧仴韬窡韪級
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.SENSORS]]"
            allow-option-label="缃戠珯鍙互浣跨敤绉诲姩浼犳劅鍣�"
            allow-option-icon="settings:sensors"
            block-option-label="涓嶅厑璁哥綉绔欎娇鐢ㄧЩ鍔ㄤ紶鎰熷櫒"
            block-option-sub-label="鎵€鏈夐渶瑕佷娇鐢ㄧЩ鍔ㄤ紶鎰熷櫒鐨勫姛鑳介兘灏嗘棤娉曟甯歌繍琛�"
            block-option-icon="settings:sensors-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.SENSORS]]"
            read-only-list
            allow-header="鍏佽浣跨敤绉诲姩浼犳劅鍣�"
            block-header="涓嶅厑璁镐娇鐢ㄧЩ鍔ㄤ紶鎰熷櫒"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/notifications" no-search>
        <settings-subpage page-title="閫氱煡" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div id="notificationRadioGroup" class="radio-group">
            <template is="dom-if" if="[[!safetyCheckNotificationPermissionsEnabled_]]">
              <div class="secondary">缃戠珯閫氬父浼氬彂閫侀€氱煡锛屼互渚挎偍鐭ユ倝閲嶅ぇ鏂伴椈鎴栬亰澶╂秷鎭�</div>
            </template>
            <template is="dom-if" if="[[showNotificationPermissionsReview_]]">
              <review-notification-permissions> </review-notification-permissions>
            </template>
            <h2>榛樿琛屼负</h2>
            <div id="notificationSubHeading" class="secondary radio-sub-heading">
              [[notificationsDefaultBehaviorLabel_]]
            </div>
            <settings-radio-group
              pref="{{prefs.generated.notification}}"
              selectable-elements="settings-collapse-radio-button"
            >
              <settings-collapse-radio-button
                no-collapse
                name="[[notificationSettingEnum_.ASK]]"
                pref="[[prefs.generated.notification]]"
                label="缃戠珯鍙互璇㈤棶鑳藉惁鍚戞偍鍙戦€侀€氱煡"
                icon="settings:notifications"
              >
              </settings-collapse-radio-button>
              <template is="dom-if" if="[[enableQuietNotificationPromptsSetting_]]">
                <settings-collapse-radio-button
                  no-collapse
                  class="two-line"
                  name="[[notificationSettingEnum_.QUIETER_MESSAGING]]"
                  pref="[[prefs.generated.notification]]"
                  label="浣跨敤骞叉壈鎬ф洿浣庣殑鎻愮ず鏂瑰紡"
                  sub-label="绂佹缃戠珯鍦ㄨ闂兘鍚﹀悜鎮ㄥ彂閫侀€氱煡鏃跺共鎵版偍"
                  icon="settings:notifications"
                >
                </settings-collapse-radio-button>
              </template>
              <settings-collapse-radio-button
                no-collapse
                class="two-line"
                name="[[notificationSettingEnum_.BLOCK]]"
                pref="[[prefs.generated.notification]]"
                label="涓嶅厑璁哥綉绔欏彂閫侀€氱煡"
                sub-label="鎵€鏈夐渶瑕佷娇鐢ㄩ€氱煡鐨勫姛鑳介兘灏嗘棤娉曟甯歌繍琛�"
                icon="settings:notifications-off"
              >
              </settings-collapse-radio-button>
            </settings-radio-group>
          </div>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.NOTIFICATIONS]]"
            allow-header="鍏佽鍙戦€侀€氱煡"
            block-header="涓嶅厑璁稿彂閫侀€氱煡"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/popups" no-search>
        <settings-subpage
          page-title="寮瑰嚭寮忕獥鍙ｅ拰閲嶅畾鍚�"
          search-label="鎼滅储"
          search-term="{{searchFilter_}}"
        >
          <div class="content-settings-header secondary">
            缃戠珯鍙兘浼氬彂閫佸脊鍑哄紡绐楀彛浠ュ睍绀哄箍鍛婏紝鎴栬€呬娇鐢ㄩ噸瀹氬悜灏嗘偍寮曞鑷虫偍鍙兘涓嶆兂璁块棶鐨勭綉绔�
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.POPUPS]]"
            allow-option-label="缃戠珯鍙互鍙戦€佸脊鍑哄紡绐楀彛骞朵娇鐢ㄩ噸瀹氬悜"
            allow-option-icon="cr:open-in-new"
            block-option-label="涓嶅厑璁哥綉绔欐樉绀哄脊鍑哄紡绐楀彛鎴栦娇鐢ㄩ噸瀹氬悜"
            block-option-icon="settings:open-in-new-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.POPUPS]]"
            allow-header="鍏佽鍙戦€佸脊鍑哄紡绐楀彛骞朵娇鐢ㄩ噸瀹氬悜"
            block-header="涓嶅厑璁稿彂閫佸脊鍑哄紡绐楀彛鎴栦娇鐢ㄩ噸瀹氬悜"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" if="[[enableSafeBrowsingSubresourceFilter_]]" no-search>
        <template is="dom-if" route-path="/content/ads" no-search>
          <settings-subpage page-title="渚垫壈鎬у箍鍛�" search-label="鎼滅储" search-term="{{searchFilter_}}">
            <div class="content-settings-header secondary">
              缃戠珯閫氬父浼氭樉绀哄箍鍛婏紝浠ヤ究鑳藉鍏嶈垂鎻愪緵鍐呭鎴栨湇鍔°€備絾鏄紝鎴戜滑宸茬煡鏌愪簺缃戠珯浼氬睍绀轰镜鎵版€ф垨璇鎬у箍鍛娿€�
            </div>
            <settings-category-default-radio-group
              category="[[contentSettingsTypesEnum_.ADS]]"
              allow-option-label="鎮ㄨ闂殑浠讳綍缃戠珯閮藉彲鍚戞偍灞曠ず浠讳綍骞垮憡"
              allow-option-icon="settings:ads"
              block-option-label="鍦ㄥ凡鐭ヤ細灞曠ず渚垫壈鎬ф垨璇鎬у箍鍛婄殑缃戠珯涓婂睆钄藉箍鍛�"
              block-option-icon="settings:ads-off"
            >
            </settings-category-default-radio-group>
            <category-setting-exceptions
              category="[[contentSettingsTypesEnum_.ADS]]"
              read-only-list
              allow-header="鍏佽灞曠ず浠讳綍骞垮憡"
              block-header="涓嶅厑璁稿睍绀轰镜鎵版€ф垨璇鎬у箍鍛�"
              search-filter="[[searchFilter_]]"
            >
            </category-setting-exceptions>
          </settings-subpage>
        </template>
      </template>
      <template is="dom-if" route-path="/content/midiDevices" no-search>
        <settings-subpage page-title="MIDI 璁惧" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氳繛鎺ュ埌 MIDI 璁惧浠ヤ究鍒涗綔鍜岀紪杈戦煶涔�
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.MIDI_DEVICES]]"
            allow-option-label="缃戠珯鍙互璇锋眰杩炴帴鍒� MIDI 璁惧"
            allow-option-icon="settings:midi"
            block-option-label="涓嶅厑璁哥綉绔欒繛鎺ュ埌 MIDI 璁惧"
            block-option-icon="settings:midi-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.MIDI_DEVICES]]"
            read-only-list
            allow-header="鍏佽杩炴帴鍒� MIDI 璁惧"
            block-header="涓嶅厑璁歌繛鎺ュ埌 MIDI 璁惧"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/usbDevices" no-search>
        <settings-subpage
          page-title="USB 璁惧"
          learn-more-url="https://support.google.com/chrome?p=webusb&amp;hl=zh-CN"
        >
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氳繛鎺ュ埌 USB 璁惧浠ュ疄鐜版煇浜涘姛鑳斤紙渚嬪鎵撳嵃鏂囨。鎴栦繚瀛樺埌瀛樺偍璁惧锛�
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.USB_DEVICES]]"
            allow-option-label="缃戠珯鍙互璇锋眰杩炴帴鍒� USB 璁惧"
            allow-option-icon="settings:usb"
            block-option-label="涓嶅厑璁哥綉绔欒繛鎺ュ埌 USB 璁惧"
            block-option-icon="settings:usb-off"
          >
          </settings-category-default-radio-group>
          <chooser-exception-list
            category="[[contentSettingsTypesEnum_.USB_DEVICES]]"
            chooser-type="[[chooserTypeEnum_.USB_DEVICES]]"
          >
          </chooser-exception-list>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/serialPorts" no-search>
        <settings-subpage
          page-title="涓茶绔彛"
          learn-more-url="https://support.google.com/chrome?p=webserial&amp;hl=zh-CN"
        >
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氳繛鎺ュ埌涓茶绔彛浠ュ疄鐜版暟鎹紶杈撳姛鑳斤紙渚嬪璁剧疆鎮ㄧ殑缃戠粶锛�
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.SERIAL_PORTS]]"
            allow-option-label="缃戠珯鍙互璇锋眰杩炴帴鍒颁覆琛岀鍙�"
            allow-option-icon="settings:serial-port"
            block-option-label="涓嶅厑璁哥綉绔欒繛鎺ュ埌涓茶绔彛"
            block-option-icon="settings:serial-port-off"
          >
          </settings-category-default-radio-group>
          <chooser-exception-list
            category="[[contentSettingsTypesEnum_.SERIAL_PORTS]]"
            chooser-type="[[chooserTypeEnum_.SERIAL_PORTS]]"
          >
          </chooser-exception-list>
        </settings-subpage>
      </template>
      <template is="dom-if" if="[[enableWebBluetoothNewPermissionsBackend_]]">
        <template is="dom-if" route-path="/content/bluetoothDevices" no-search>
          <settings-subpage
            page-title="钃濈墮璁惧"
            learn-more-url="https://support.google.com/chrome?p=bluetooth&amp;hl=zh-CN"
          >
            <div class="content-settings-header secondary">
              缃戠珯閫氬父浼氳繛鎺ュ埌钃濈墮璁惧浠ュ疄鐜版煇浜涘姛鑳斤紙渚嬪璁剧疆鎴栧悓姝ヤ綆鍔熻€椾俊鏍囥€佸仴搴锋垨鍋ヨ韩璺熻釜鍣紝鎴栨櫤鑳界伅娉★級
            </div>
            <settings-category-default-radio-group
              category="[[contentSettingsTypesEnum_.BLUETOOTH_DEVICES]]"
              allow-option-label="缃戠珯鍙互璇锋眰杩炴帴鍒拌摑鐗欒澶�"
              allow-option-icon="settings:bluetooth"
              block-option-label="涓嶅厑璁哥綉绔欒繛鎺ュ埌钃濈墮璁惧"
              block-option-icon="settings:bluetooth-off"
            >
            </settings-category-default-radio-group>
            <chooser-exception-list
              category="[[contentSettingsTypesEnum_.BLUETOOTH_DEVICES]]"
              chooser-type="[[chooserTypeEnum_.BLUETOOTH_DEVICES]]"
            >
            </chooser-exception-list>
          </settings-subpage>
        </template>
      </template>
      <template is="dom-if" route-path="/content/filesystem" no-search>
        <settings-subpage page-title="鏂囦欢淇敼">
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氳闂偍璁惧涓婄殑鏂囦欢鍜屾枃浠跺す浠ュ疄鐜版煇浜涘姛鑳斤紙渚嬪鑷姩淇濆瓨鎮ㄧ殑宸ヤ綔鎴愭灉锛�
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.FILE_SYSTEM_WRITE]]"
            allow-option-label="缃戠珯鍙互璇锋眰淇敼鎮ㄨ澶囦笂鐨勬枃浠跺拰鏂囦欢澶�"
            allow-option-icon="settings:save-original"
            block-option-label="涓嶅厑璁哥綉绔欎慨鏀规偍璁惧涓婄殑鏂囦欢鎴栨枃浠跺す"
            block-option-icon="settings:file-editing-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.FILE_SYSTEM_WRITE]]"
            read-only-list
            block-header="涓嶅緱淇敼鎮ㄨ澶囦笂鐨勬枃浠舵垨鏂囦欢澶�"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
          <template is="dom-if" if="[[showPersistentPermissions_]]">
            <file-system-site-list></file-system-site-list>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/hidDevices" no-search>
        <settings-subpage
          page-title="HID 璁惧"
          learn-more-url="https://support.google.com/chrome?p=webhid&amp;hl=zh-CN"
        >
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氳繛鎺ュ埌 HID
            璁惧浠ュ疄鐜版煇浜涢渶瑕佷娇鐢ㄩ潪鏍囧噯閿洏銆佹父鎴忔帶鍒跺櫒鍜屽叾浠栬澶囩殑鍔熻兘
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.HID_DEVICES]]"
            allow-option-label="缃戠珯鍙互璇锋眰杩炴帴鍒� HID 璁惧"
            allow-option-icon="settings:hid-device"
            block-option-label="涓嶅厑璁哥綉绔欒繛鎺ュ埌 HID 璁惧"
            block-option-icon="settings:hid-device-off"
          >
          </settings-category-default-radio-group>
          <chooser-exception-list
            category="[[contentSettingsTypesEnum_.HID_DEVICES]]"
            chooser-type="[[chooserTypeEnum_.HID_DEVICES]]"
          >
          </chooser-exception-list>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/siteDetails" no-search>
        <settings-subpage page-title="[[pageTitle]]">
          <site-details page-title="{{pageTitle}}" block-autoplay-enabled="[[blockAutoplayStatus_.pref.value]]">
          </site-details>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/protectedContent" no-search>
        <settings-subpage page-title="鍙椾繚鎶ゅ唴瀹� ID" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="radio-group">
            <div class="secondary">
              缃戠珯鍙兘闇€瑕佷娇鐢ㄤ竴椤瑰唴瀹逛繚鎶ゆ湇鍔★紝鎵嶈兘鎾斁鍙楃増鏉冧繚鎶ょ殑鍐呭
            </div>
            <h2>榛樿琛屼负</h2>
            <div class="secondary radio-sub-heading">缃戠珯浼氬湪鎮ㄨ闂椂鑷姩閲囩敤姝よ缃�</div>
            <settings-radio-group
              pref="{{prefs.webkit.webprefs.encrypted_media_enabled}}"
              selectable-elements="settings-collapse-radio-button"
            >
              <settings-collapse-radio-button
                no-collapse
                pref="[[prefs.webkit.webprefs.encrypted_media_enabled]]"
                label="缃戠珯鍙互鎾斁鍙椾繚鎶ゅ唴瀹�"
                name="true"
                disabled$="[[isGuest_]]"
                icon="settings:protected-content"
              >
              </settings-collapse-radio-button>
              <settings-collapse-radio-button
                no-collapse
                pref="[[prefs.webkit.webprefs.encrypted_media_enabled]]"
                label="涓嶅厑璁哥綉绔欐挱鏀惧彈淇濇姢鍐呭"
                sub-label="鍙楃増鏉冧繚鎶ょ殑濯掍綋鍙兘鏃犳硶鎾斁"
                name="false"
                disabled$="[[isGuest_]]"
                icon="settings:protected-content-off"
              >
              </settings-collapse-radio-button>
            </settings-radio-group>
          </div>

          <settings-category-default-radio-group
            header="鍙椾繚鎶ゅ唴瀹� ID"
            description="缃戠珯鍙兘杩橀渶瑕佷娇鐢ㄦ爣璇嗙鏉ヨ瘑鍒偍鐨勮澶�"
            category="[[contentSettingsTypesEnum_.PROTECTED_CONTENT]]"
            block-option-label="涓嶅厑璁哥綉绔欎娇鐢ㄦ爣璇嗙鏉ユ挱鏀惧彈淇濇姢鍐呭"
            block-option-sub-label="鍙兘浼氳嚧浣垮獟浣撹川閲忛檷浣�"
            block-option-icon="settings:protected-content-off"
            allow-option-label="缃戠珯鍙互浣跨敤鏍囪瘑绗︽潵鎾斁鍙椾繚鎶ゅ唴瀹�"
            allow-option-sub-label="Chrome 瀹炴椂瀛楀箷鍔熻兘鍙兘鏃犳硶杩愯"
            allow-option-icon="settings:protected-content"
            disabled$="[[isGuest_]]"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            description="涓嬪垪缃戠珯閲囩敤鐨勬槸鑷畾涔夎缃�"
            category="[[contentSettingsTypesEnum_.PROTECTED_CONTENT]]"
            allow-header="鍙互浣跨敤鏍囪瘑绗︽潵鎾斁鍙椾繚鎶ゅ唴瀹�"
            block-header="涓嶅緱浣跨敤鏍囪瘑绗︽潵鎾斁鍙椾繚鎶ゅ唴瀹�"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/clipboard" no-search>
        <settings-subpage page-title="鍓创鏉�" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氳鍙栨偍鐨勫壀璐存澘鍐呭浠ュ疄鐜版煇浜涘姛鑳斤紙渚嬪淇濈暀鎮ㄦ墍澶嶅埗鏂囧瓧鐨勬牸寮忥級
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.CLIPBOARD]]"
            allow-option-label="缃戠珯鍙互璇锋眰鏌ョ湅鎮ㄥ壀璐存澘涓殑鏂囧瓧鍜屽浘鐗�"
            allow-option-icon="settings:clipboard"
            block-option-label="涓嶅厑璁哥綉绔欐煡鐪嬫偍鍓创鏉夸腑鐨勬枃瀛楁垨鍥剧墖"
            block-option-icon="settings:clipboard-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.CLIPBOARD]]"
            allow-header="鍏佽鏌ョ湅鎮ㄧ殑鍓创鏉�"
            block-header="涓嶅厑璁告煡鐪嬫偍鐨勫壀璐存澘"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" if="[[enablePaymentHandlerContentSetting_]]">
        <template is="dom-if" route-path="/content/paymentHandler" no-search>
          <settings-subpage page-title="浠樻澶勭悊绋嬪簭" search-label="鎼滅储" search-term="{{searchFilter_}}">
            <div class="content-settings-header secondary">
              缃戠珯閫氬父浼氬畨瑁呬粯娆惧鐞嗙▼搴忎互瀹炵幇璐墿鍔熻兘锛堜緥濡傛洿杞绘澗鐨勭粨绠楋級
            </div>
            <settings-category-default-radio-group
              category="[[contentSettingsTypesEnum_.PAYMENT_HANDLER]]"
              allow-option-label="缃戠珯鍙互瀹夎浠樻澶勭悊绋嬪簭"
              allow-option-icon="settings:payment-handler"
              block-option-label="涓嶅厑璁哥綉绔欏畨瑁呬粯娆惧鐞嗙▼搴�"
              block-option-icon="settings:payment-handler-off"
            >
            </settings-category-default-radio-group>
            <category-setting-exceptions
              category="[[contentSettingsTypesEnum_.PAYMENT_HANDLER]]"
              allow-header="鍏佽瀹夎浠樻澶勭悊绋嬪簭"
              block-header="涓嶅厑璁稿畨瑁呬粯娆惧鐞嗙▼搴�"
              search-filter="[[searchFilter_]]"
            >
            </category-setting-exceptions>
          </settings-subpage>
        </template>
      </template>
      <template is="dom-if" if="[[enableExperimentalWebPlatformFeatures_]]">
        <template is="dom-if" route-path="/content/bluetoothScanning" no-search>
          <settings-subpage page-title="钃濈墮鎵弿" search-label="鎼滅储" search-term="{{searchFilter_}}">
            <div class="content-settings-header secondary">
              缃戠珯閫氬父浼氬鎵捐摑鐗欒澶囦互瀹炵幇鏌愪簺鍔熻兘锛堜緥濡傝缃垨鍚屾浣庡姛鑰椾俊鏍囥€佸仴搴�/鍋ヨ韩鏅鸿兘鎵嬬幆鎴栨櫤鑳界伅娉★級
            </div>
            <settings-category-default-radio-group
              category="[[contentSettingsTypesEnum_.BLUETOOTH_SCANNING]]"
              allow-option-label="缃戠珯鍙互璇锋眰瀵绘壘钃濈墮璁惧"
              allow-option-icon="settings:bluetooth-scanning"
              block-option-label="涓嶅厑璁哥綉绔欏鎵捐摑鐗欒澶�"
              block-option-icon="settings:bluetooth-off"
            >
            </settings-category-default-radio-group>
            <category-setting-exceptions
              category="[[contentSettingsTypesEnum_.BLUETOOTH_SCANNING]]"
              read-only-list
              block-header="涓嶅緱瀵绘壘钃濈墮璁惧"
              allow-header="鍙互瀵绘壘钃濈墮璁惧"
              search-filter="[[searchFilter_]]"
            >
            </category-setting-exceptions>
          </settings-subpage>
        </template>
      </template>
      <template is="dom-if" route-path="/content/vr" no-search>
        <settings-subpage page-title="铏氭嫙鐜板疄" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氫娇鐢ㄦ偍鐨勮櫄鎷熺幇瀹炶澶囧拰鏁版嵁浠ヨ鎮ㄨ繘鍏� VR 浼氳瘽
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.VR]]"
            allow-option-label="缃戠珯鍙互璇锋眰浣跨敤铏氭嫙鐜板疄璁惧鍜屾暟鎹�"
            allow-option-icon="settings:vr-headset"
            block-option-label="涓嶅厑璁哥綉绔欎娇鐢ㄨ櫄鎷熺幇瀹炶澶囨垨鏁版嵁"
            block-option-icon="settings:vr-headset-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.VR]]"
            read-only-list
            allow-header="鍏佽浣跨敤铏氭嫙鐜板疄璁惧鍜屾暟鎹�"
            block-header="涓嶅緱浣跨敤铏氭嫙鐜板疄璁惧鎴栨暟鎹�"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/ar" no-search>
        <settings-subpage page-title="澧炲己鐜板疄" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氳窡韪偍鐨勬憚鍍忓ご浣嶇疆浠ュ疄鐜� AR 鍔熻兘锛堜緥濡傛父鎴忔垨鏂瑰悜鎻愰啋锛�
          </div>

          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.AR]]"
            allow-option-label="鍦ㄧ綉绔欐兂涓烘偍鐨勫懆杈圭幆澧冨垱寤� 3D 鍦板浘鎴栬窡韪憚鍍忓ご浣嶇疆鏃惰闂偍"
            allow-option-icon="settings:vr-headset"
            block-option-label="涓嶅厑璁哥綉绔欎负鎮ㄧ殑鍛ㄨ竟鐜鍒涘缓 3D 鍦板浘鎴栬窡韪憚鍍忓ご浣嶇疆"
            block-option-icon="settings:vr-headset-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.AR]]"
            read-only-list
            allow-header="鍏佽璺熻釜鎮ㄧ殑鎽勫儚澶翠綅缃�"
            block-header="涓嶅厑璁歌窡韪偍鐨勬憚鍍忓ご浣嶇疆"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/idleDetection" no-search>
        <settings-subpage page-title="鎮ㄧ殑璁惧浣跨敤鎯呭喌" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氭娴嬫偍浣曟椂鍦ㄤ富鍔ㄤ娇鐢ㄨ嚜宸辩殑璁惧锛屼互渚垮湪鑱婂ぉ搴旂敤涓婅缃偍鏄惁绌洪棽
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.IDLE_DETECTION]]"
            allow-option-label="缃戠珯鍙互璇㈤棶鑳藉惁浜嗚В鎮ㄤ綍鏃跺湪涓诲姩浣跨敤鑷繁鐨勮澶�"
            allow-option-icon="settings:devices"
            block-option-label="涓嶅厑璁哥綉绔欎簡瑙ｆ偍浣曟椂鍦ㄤ富鍔ㄤ娇鐢ㄨ嚜宸辩殑璁惧"
            block-option-icon="settings:devices-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.IDLE_DETECTION]]"
            allow-header="鍏佽浠ヤ笅缃戠珯浜嗚В鎮ㄤ綍鏃跺湪涓诲姩浣跨敤璁惧"
            block-header="涓嶅厑璁镐互涓嬬綉绔欎簡瑙ｆ偍浣曟椂鍦ㄤ富鍔ㄤ娇鐢ㄨ澶�"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/windowManagement" no-search>
        <settings-subpage page-title="绐楀彛绠＄悊" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氳闂偍鐨勬樉绀哄睆鐨勭浉鍏充俊鎭紝浠ヤ究鏅鸿兘鍦版墦寮€鍜屾斁缃獥鍙ｏ紝渚嬪骞舵帓鏄剧ず鏂囨。鎴栧叏灞忓唴瀹�
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.WINDOW_MANAGEMENT]]"
            allow-option-label="缃戠珯鍙互璇㈤棶鑳藉惁绠＄悊鎮ㄧ殑鎵€鏈夋樉绀哄睆涓婄殑绐楀彛"
            allow-option-icon="settings:window-management"
            block-option-label="涓嶅厑璁哥綉绔欑鐞嗘偍鐨勬墍鏈夋樉绀哄睆涓婄殑绐楀彛"
            block-option-icon="settings:window-management-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.WINDOW_MANAGEMENT]]"
            allow-header="鍙互绠＄悊鎮ㄧ殑鎵€鏈夋樉绀哄睆涓婄殑绐楀彛"
            block-header="涓嶅緱绠＄悊鎮ㄧ殑鎵€鏈夋樉绀哄睆涓婄殑绐楀彛"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/localFonts" no-search>
        <settings-subpage page-title="瀛椾綋" search-label="鎼滅储" search-term="{{searchFilter_}}">
          <div class="content-settings-header secondary">
            缃戠珯閫氬父浼氫娇鐢ㄦ偍鐨勫瓧浣擄紝浠ヤ究鎮ㄨ兘澶熷埄鐢ㄥ湪绾胯璁″拰鍒跺浘宸ュ叿鍒涗綔楂樹繚鐪熷唴瀹�
          </div>
          <settings-category-default-radio-group
            category="[[contentSettingsTypesEnum_.LOCAL_FONTS]]"
            allow-option-label="缃戠珯鍙互璇㈤棶鑳藉惁浣跨敤鎮ㄨ澶囦笂瀹夎鐨勫瓧浣�"
            allow-option-icon="settings:local-fonts"
            block-option-label="涓嶅厑璁哥綉绔欎娇鐢ㄦ偍璁惧涓婂畨瑁呯殑瀛椾綋"
            block-option-icon="settings:local-fonts-off"
          >
          </settings-category-default-radio-group>
          <category-setting-exceptions
            category="[[contentSettingsTypesEnum_.LOCAL_FONTS]]"
            block-header="涓嶅緱浣跨敤鎮ㄨ澶囦笂瀹夎鐨勫瓧浣�"
            allow-header="鍙互浣跨敤鎮ㄨ澶囦笂瀹夎鐨勫瓧浣�"
            search-filter="[[searchFilter_]]"
          >
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" if="[[enablePermissionStorageAccessApi_]]">
        <template is="dom-if" route-path="/content/storageAccess" no-search>
          <settings-subpage page-title="Embedded content" search-label="鎼滅储" search-term="{{searchFilter_}}">
            <div class="content-settings-header secondary">
              Sites you visit can embed content from other sites, for example images, ads, and text. These other sites
              can ask for permission to use info they鈥檝e saved about you as you browse the site.
            </div>

            <settings-category-default-radio-group
              category="[[contentSettingsTypesEnum_.STORAGE_ACCESS]]"
              allow-option-label="Sites can ask to use info they鈥檝e saved about you"
              allow-option-icon="settings:storage-access"
              block-option-label="Sites are blocked from asking you to use info they鈥檝e saved about you"
              block-option-icon="settings:block"
            >
            </settings-category-default-radio-group>
            <category-setting-exceptions
              category="[[contentSettingsTypesEnum_.STORAGE_ACCESS]]"
              block-header="Not allowed to access info they&#39;ve about you while embedded in another site"
              allow-header="Allowed to access info they&#39;ve about you while embedded in another site"
              search-filter="[[searchFilter_]]"
              read-only-list
            >
            </category-setting-exceptions>
          </settings-subpage>
        </template>
      </template>
    </settings-animated-pages>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsPrivacyPageElementBase = PrivacyGuideAvailabilityMixin(
  RouteObserverMixin(WebUiListenerMixin(I18nMixin(PrefsMixin(BaseMixin(PolymerElement)))))
);
class SettingsPrivacyPageElement extends SettingsPrivacyPageElementBase {
  constructor() {
    super(...arguments);
    this.browserProxy_ = PrivacyPageBrowserProxyImpl.getInstance();
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
    this.siteSettingsPrefsBrowserProxy_ = SiteSettingsPrefsBrowserProxyImpl.getInstance();
    this.safetyHubBrowserProxy_ = SafetyHubBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-privacy-page';
  }
  static get template() {
    return getTemplate$x();
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      isGuest_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('isGuest');
        },
      },
      showClearBrowsingDataDialog_: Boolean,
      showPrivacyGuideDialog_: Boolean,
      enableSafeBrowsingSubresourceFilter_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('enableSafeBrowsingSubresourceFilter');
        },
      },
      cookieSettingDescription_: String,
      enableBlockAutoplayContentSetting_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('enableBlockAutoplayContentSetting');
        },
      },
      blockAutoplayStatus_: {
        type: Object,
        value() {
          return {};
        },
      },
      enablePaymentHandlerContentSetting_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('enablePaymentHandlerContentSetting');
        },
      },
      enableFederatedIdentityApiContentSetting_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('enableFederatedIdentityApiContentSetting');
        },
      },
      enableExperimentalWebPlatformFeatures_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('enableExperimentalWebPlatformFeatures');
        },
      },
      enableSecurityKeysSubpage_: {
        type: Boolean,
        readOnly: true,
        value() {
          return loadTimeData.getBoolean('enableSecurityKeysSubpage');
        },
      },
      enableQuietNotificationPromptsSetting_: {
        type: Boolean,
        value: () => loadTimeData.getBoolean('enableQuietNotificationPromptsSetting'),
      },
      enableWebBluetoothNewPermissionsBackend_: {
        type: Boolean,
        value: () => loadTimeData.getBoolean('enableWebBluetoothNewPermissionsBackend'),
      },
      showNotificationPermissionsReview_: { type: Boolean, value: false },
      isPrivacySandboxRestricted_: {
        type: Boolean,
        value: () => loadTimeData.getBoolean('isPrivacySandboxRestricted'),
      },
      isPrivacySandboxRestrictedNoticeEnabled_: {
        type: Boolean,
        value: () => loadTimeData.getBoolean('isPrivacySandboxRestrictedNoticeEnabled'),
      },
      isPrivacySandboxSettings4_: { type: Boolean, value: () => loadTimeData.getBoolean('isPrivacySandboxSettings4') },
      privateStateTokensEnabled_: { type: Boolean, value: () => loadTimeData.getBoolean('privateStateTokensEnabled') },
      enablePermissionStorageAccessApi_: {
        type: Boolean,
        value: () => loadTimeData.getBoolean('enablePermissionStorageAccessApi'),
      },
      showPersistentPermissions_: {
        type: Boolean,
        readOnly: true,
        value: function () {
          return loadTimeData.getBoolean('showPersistentPermissions');
        },
      },
      focusConfig_: {
        type: Object,
        value() {
          const map = new Map();
          if (routes.SECURITY) {
            map.set(routes.SECURITY.path, '#securityLinkRow');
          }
          if (routes.COOKIES) {
            const selector = loadTimeData.getBoolean('isPrivacySandboxSettings4')
              ? '#thirdPartyCookiesLinkRow'
              : '#cookiesLinkRow';
            map.set(`${routes.COOKIES.path}_${routes.PRIVACY.path}`, selector);
            map.set(`${routes.COOKIES.path}_${routes.BASIC.path}`, selector);
          }
          if (routes.SITE_SETTINGS) {
            map.set(routes.SITE_SETTINGS.path, '#permissionsLinkRow');
          }
          if (routes.PRIVACY_GUIDE) {
            map.set(routes.PRIVACY_GUIDE.path, '#privacyGuideLinkRow');
          }
          if (routes.PRIVACY_SANDBOX) {
            map.set(routes.PRIVACY_SANDBOX.path, '#privacySandboxLinkRow');
          }
          return map;
        },
      },
      notificationSettingEnum_: { type: Object, value: NotificationSetting },
      searchFilter_: String,
      contentSettingsTypesEnum_: { type: Object, value: ContentSettingsTypes },
      chooserTypeEnum_: { type: Object, value: ChooserType },
      safetyCheckNotificationPermissionsEnabled_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('safetyCheckNotificationPermissionsEnabled');
        },
      },
      notificationsDefaultBehaviorLabel_: {
        type: String,
        computed: 'computeNotificationsDefaultBehaviorLabel_(safetyCheckNotificationPermissionsEnabled_)',
      },
      enableSafetyHub_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('enableSafetyHub');
        },
      },
    };
  }
  ready() {
    super.ready();
    this.onBlockAutoplayStatusChanged_({
      pref: { key: '', type: chrome.settingsPrivate.PrefType.BOOLEAN, value: false },
      enabled: false,
    });
    this.addWebUiListener('onBlockAutoplayStatusChanged', (status) => this.onBlockAutoplayStatusChanged_(status));
    this.siteSettingsPrefsBrowserProxy_
      .getCookieSettingDescription()
      .then((description) => (this.cookieSettingDescription_ = description));
    this.addWebUiListener(
      'cookieSettingDescriptionChanged',
      (description) => (this.cookieSettingDescription_ = description)
    );
    this.addWebUiListener('notification-permission-review-list-maybe-changed', (sites) =>
      this.onReviewNotificationPermissionListChanged_(sites)
    );
    this.safetyHubBrowserProxy_
      .getNotificationPermissionReview()
      .then((sites) => this.onReviewNotificationPermissionListChanged_(sites));
  }
  currentRouteChanged() {
    this.showClearBrowsingDataDialog_ = Router.getInstance().getCurrentRoute() === routes.CLEAR_BROWSER_DATA;
    this.showPrivacyGuideDialog_ =
      Router.getInstance().getCurrentRoute() === routes.PRIVACY_GUIDE && this.isPrivacyGuideAvailable;
  }
  onBlockAutoplayStatusChanged_(autoplayStatus) {
    this.blockAutoplayStatus_ = autoplayStatus;
  }
  onBlockAutoplayToggleChange_(event) {
    const target = event.target;
    this.browserProxy_.setBlockAutoplayEnabled(target.checked);
  }
  onClearBrowsingDataClick_() {
    this.interactedWithPage_();
    Router.getInstance().navigateTo(routes.CLEAR_BROWSER_DATA);
  }
  onCookiesClick_() {
    this.interactedWithPage_();
    Router.getInstance().navigateTo(routes.COOKIES);
  }
  onCbdDialogClosed_() {
    Router.getInstance().navigateTo(routes.CLEAR_BROWSER_DATA.parent);
    setTimeout(() => {
      const toFocus = this.shadowRoot.querySelector('#clearBrowsingData');
      assert(toFocus);
      focusWithoutInk(toFocus);
    });
  }
  onPrivacyGuideDialogClosed_() {
    Router.getInstance().navigateToPreviousRoute();
    const toFocus = this.shadowRoot.querySelector('#privacyGuideLinkRow');
    assert(toFocus);
    focusWithoutInk(toFocus);
  }
  onPermissionsPageClick_() {
    this.interactedWithPage_();
    Router.getInstance().navigateTo(routes.SITE_SETTINGS);
  }
  onSecurityPageClick_() {
    this.interactedWithPage_();
    this.metricsBrowserProxy_.recordAction('SafeBrowsing.Settings.ShowedFromParentSettings');
    Router.getInstance().navigateTo(routes.SECURITY);
  }
  onPrivacySandboxClick_() {
    this.interactedWithPage_();
    this.metricsBrowserProxy_.recordAction('Settings.PrivacySandbox.OpenedFromSettingsParent');
    if (this.isPrivacySandboxSettings4_) {
      Router.getInstance().navigateTo(routes.PRIVACY_SANDBOX);
      return;
    }
    this.shadowRoot.querySelector('#privacySandboxLink').dispatchEvent(new MouseEvent('click'));
  }
  onPrivacyGuideClick_() {
    this.metricsBrowserProxy_.recordPrivacyGuideEntryExitHistogram(PrivacyGuideInteractions.SETTINGS_LINK_ROW_ENTRY);
    this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.StartPrivacySettings');
    Router.getInstance().navigateTo(routes.PRIVACY_GUIDE, undefined, true);
  }
  onReviewNotificationPermissionListChanged_(permissions) {
    if (this.showNotificationPermissionsReview_) {
      return;
    }
    this.showNotificationPermissionsReview_ = this.safetyCheckNotificationPermissionsEnabled_ && permissions.length > 0;
  }
  interactedWithPage_() {
    HatsBrowserProxyImpl.getInstance().trustSafetyInteractionOccurred(TrustSafetyInteraction.USED_PRIVACY_CARD);
  }
  computePrivacySandboxSublabel_() {
    const enabled = this.getPref('privacy_sandbox.apis_enabled_v2').value;
    return enabled ? this.i18n('privacySandboxTrialsEnabled') : this.i18n('privacySandboxTrialsDisabled');
  }
  computeAdPrivacySublabel_() {
    const restricted = this.isPrivacySandboxRestricted_ && this.isPrivacySandboxRestrictedNoticeEnabled_;
    return restricted ? this.i18n('adPrivacyRestrictedLinkRowSubLabel') : this.i18n('adPrivacyLinkRowSubLabel');
  }
  computeNotificationsDefaultBehaviorLabel_() {
    return this.safetyCheckNotificationPermissionsEnabled_
      ? this.i18n('siteSettingsNotificationsDefaultBehaviorDescription')
      : this.i18n('siteSettingsDefaultBehaviorDescription');
  }
  computeThirdPartyCookiesSublabel_() {
    const currentCookieSetting = this.getPref('profile.cookie_controls_mode').value;
    switch (currentCookieSetting) {
      case CookieControlsMode.OFF:
        return this.i18n('thirdPartyCookiesLinkRowSublabelEnabled');
      case CookieControlsMode.INCOGNITO_ONLY:
        return this.i18n('thirdPartyCookiesLinkRowSublabelDisabledIncognito');
      case CookieControlsMode.BLOCK_THIRD_PARTY:
        return this.i18n('thirdPartyCookiesLinkRowSublabelDisabled');
      default:
        assertNotReached();
    }
  }
  isPrivacySandboxSettings3Enabled_() {
    return !this.isPrivacySandboxRestricted_ && !this.isPrivacySandboxSettings4_;
  }
  isPrivacySandboxSettings4Enabled_() {
    return (
      (!this.isPrivacySandboxRestricted_ || this.isPrivacySandboxRestrictedNoticeEnabled_) &&
      this.isPrivacySandboxSettings4_
    );
  }
}
customElements.define(SettingsPrivacyPageElement.is, SettingsPrivacyPageElement);
// Copyright 2020 The Chromium Authors
var SafetyCheckCallbackConstants;
(function (SafetyCheckCallbackConstants) {
  SafetyCheckCallbackConstants['PARENT_CHANGED'] = 'safety-check-parent-status-changed';
  SafetyCheckCallbackConstants['UPDATES_CHANGED'] = 'safety-check-updates-status-changed';
  SafetyCheckCallbackConstants['PASSWORDS_CHANGED'] = 'safety-check-passwords-status-changed';
  SafetyCheckCallbackConstants['SAFE_BROWSING_CHANGED'] = 'safety-check-safe-browsing-status-changed';
  SafetyCheckCallbackConstants['EXTENSIONS_CHANGED'] = 'safety-check-extensions-status-changed';
})(SafetyCheckCallbackConstants || (SafetyCheckCallbackConstants = {}));
var SafetyCheckParentStatus;
(function (SafetyCheckParentStatus) {
  SafetyCheckParentStatus[(SafetyCheckParentStatus['BEFORE'] = 0)] = 'BEFORE';
  SafetyCheckParentStatus[(SafetyCheckParentStatus['CHECKING'] = 1)] = 'CHECKING';
  SafetyCheckParentStatus[(SafetyCheckParentStatus['AFTER'] = 2)] = 'AFTER';
})(SafetyCheckParentStatus || (SafetyCheckParentStatus = {}));
var SafetyCheckUpdatesStatus;
(function (SafetyCheckUpdatesStatus) {
  SafetyCheckUpdatesStatus[(SafetyCheckUpdatesStatus['CHECKING'] = 0)] = 'CHECKING';
  SafetyCheckUpdatesStatus[(SafetyCheckUpdatesStatus['UPDATED'] = 1)] = 'UPDATED';
  SafetyCheckUpdatesStatus[(SafetyCheckUpdatesStatus['UPDATING'] = 2)] = 'UPDATING';
  SafetyCheckUpdatesStatus[(SafetyCheckUpdatesStatus['RELAUNCH'] = 3)] = 'RELAUNCH';
  SafetyCheckUpdatesStatus[(SafetyCheckUpdatesStatus['DISABLED_BY_ADMIN'] = 4)] = 'DISABLED_BY_ADMIN';
  SafetyCheckUpdatesStatus[(SafetyCheckUpdatesStatus['FAILED_OFFLINE'] = 5)] = 'FAILED_OFFLINE';
  SafetyCheckUpdatesStatus[(SafetyCheckUpdatesStatus['FAILED'] = 6)] = 'FAILED';
  SafetyCheckUpdatesStatus[(SafetyCheckUpdatesStatus['UNKNOWN'] = 7)] = 'UNKNOWN';
  SafetyCheckUpdatesStatus[(SafetyCheckUpdatesStatus['OUTDATED'] = 8)] = 'OUTDATED';
  SafetyCheckUpdatesStatus[(SafetyCheckUpdatesStatus['UPDATE_TO_ROLLBACK_VERSION_DISALLOWED'] = 9)] =
    'UPDATE_TO_ROLLBACK_VERSION_DISALLOWED';
})(SafetyCheckUpdatesStatus || (SafetyCheckUpdatesStatus = {}));
var SafetyCheckPasswordsStatus;
(function (SafetyCheckPasswordsStatus) {
  SafetyCheckPasswordsStatus[(SafetyCheckPasswordsStatus['CHECKING'] = 0)] = 'CHECKING';
  SafetyCheckPasswordsStatus[(SafetyCheckPasswordsStatus['SAFE'] = 1)] = 'SAFE';
  SafetyCheckPasswordsStatus[(SafetyCheckPasswordsStatus['COMPROMISED'] = 2)] = 'COMPROMISED';
  SafetyCheckPasswordsStatus[(SafetyCheckPasswordsStatus['OFFLINE'] = 3)] = 'OFFLINE';
  SafetyCheckPasswordsStatus[(SafetyCheckPasswordsStatus['NO_PASSWORDS'] = 4)] = 'NO_PASSWORDS';
  SafetyCheckPasswordsStatus[(SafetyCheckPasswordsStatus['SIGNED_OUT'] = 5)] = 'SIGNED_OUT';
  SafetyCheckPasswordsStatus[(SafetyCheckPasswordsStatus['QUOTA_LIMIT'] = 6)] = 'QUOTA_LIMIT';
  SafetyCheckPasswordsStatus[(SafetyCheckPasswordsStatus['ERROR'] = 7)] = 'ERROR';
  SafetyCheckPasswordsStatus[(SafetyCheckPasswordsStatus['FEATURE_UNAVAILABLE'] = 8)] = 'FEATURE_UNAVAILABLE';
  SafetyCheckPasswordsStatus[(SafetyCheckPasswordsStatus['WEAK_PASSWORDS_EXIST'] = 9)] = 'WEAK_PASSWORDS_EXIST';
  SafetyCheckPasswordsStatus[(SafetyCheckPasswordsStatus['REUSED_PASSWORDS_EXIST'] = 10)] = 'REUSED_PASSWORDS_EXIST';
  SafetyCheckPasswordsStatus[(SafetyCheckPasswordsStatus['MUTED_COMPROMISED_EXIST'] = 11)] = 'MUTED_COMPROMISED_EXIST';
})(SafetyCheckPasswordsStatus || (SafetyCheckPasswordsStatus = {}));
var SafetyCheckSafeBrowsingStatus;
(function (SafetyCheckSafeBrowsingStatus) {
  SafetyCheckSafeBrowsingStatus[(SafetyCheckSafeBrowsingStatus['CHECKING'] = 0)] = 'CHECKING';
  SafetyCheckSafeBrowsingStatus[(SafetyCheckSafeBrowsingStatus['ENABLED'] = 1)] = 'ENABLED';
  SafetyCheckSafeBrowsingStatus[(SafetyCheckSafeBrowsingStatus['DISABLED'] = 2)] = 'DISABLED';
  SafetyCheckSafeBrowsingStatus[(SafetyCheckSafeBrowsingStatus['DISABLED_BY_ADMIN'] = 3)] = 'DISABLED_BY_ADMIN';
  SafetyCheckSafeBrowsingStatus[(SafetyCheckSafeBrowsingStatus['DISABLED_BY_EXTENSION'] = 4)] = 'DISABLED_BY_EXTENSION';
  SafetyCheckSafeBrowsingStatus[(SafetyCheckSafeBrowsingStatus['ENABLED_STANDARD'] = 5)] = 'ENABLED_STANDARD';
  SafetyCheckSafeBrowsingStatus[(SafetyCheckSafeBrowsingStatus['ENABLED_ENHANCED'] = 6)] = 'ENABLED_ENHANCED';
  SafetyCheckSafeBrowsingStatus[(SafetyCheckSafeBrowsingStatus['ENABLED_STANDARD_AVAILABLE_ENHANCED'] = 7)] =
    'ENABLED_STANDARD_AVAILABLE_ENHANCED';
})(SafetyCheckSafeBrowsingStatus || (SafetyCheckSafeBrowsingStatus = {}));
var SafetyCheckExtensionsStatus;
(function (SafetyCheckExtensionsStatus) {
  SafetyCheckExtensionsStatus[(SafetyCheckExtensionsStatus['CHECKING'] = 0)] = 'CHECKING';
  SafetyCheckExtensionsStatus[(SafetyCheckExtensionsStatus['ERROR'] = 1)] = 'ERROR';
  SafetyCheckExtensionsStatus[(SafetyCheckExtensionsStatus['NO_BLOCKLISTED_EXTENSIONS'] = 2)] =
    'NO_BLOCKLISTED_EXTENSIONS';
  SafetyCheckExtensionsStatus[(SafetyCheckExtensionsStatus['BLOCKLISTED_ALL_DISABLED'] = 3)] =
    'BLOCKLISTED_ALL_DISABLED';
  SafetyCheckExtensionsStatus[(SafetyCheckExtensionsStatus['BLOCKLISTED_REENABLED_ALL_BY_USER'] = 4)] =
    'BLOCKLISTED_REENABLED_ALL_BY_USER';
  SafetyCheckExtensionsStatus[(SafetyCheckExtensionsStatus['BLOCKLISTED_REENABLED_SOME_BY_USER'] = 5)] =
    'BLOCKLISTED_REENABLED_SOME_BY_USER';
  SafetyCheckExtensionsStatus[(SafetyCheckExtensionsStatus['BLOCKLISTED_REENABLED_ALL_BY_ADMIN'] = 6)] =
    'BLOCKLISTED_REENABLED_ALL_BY_ADMIN';
})(SafetyCheckExtensionsStatus || (SafetyCheckExtensionsStatus = {}));
class SafetyCheckBrowserProxyImpl {
  runSafetyCheck() {
    chrome.send('performSafetyCheck');
  }
  getParentRanDisplayString() {
    return sendWithPromise('getSafetyCheckRanDisplayString');
  }
  static getInstance() {
    return instance$9 || (instance$9 = new SafetyCheckBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$9 = obj;
  }
}
let instance$9 = null;
function getTemplate$w() {
  return html`<!--_html_template_start_--><style
      include="cr-shared-style settings-shared iron-flex cr-actionable-row-style"
    >
      :host {
        border-top: var(--cr-separator-line);
        padding: 0 var(--cr-section-padding);
      }
      :host([row-clickable]) #managedIcon {
        padding-inline-end: 0;
      }
      iron-icon {
        display: flex;
        flex-shrink: 0;
        padding-inline-end: var(--cr-icon-button-margin-start);
        width: var(--cr-link-row-icon-width, var(--cr-icon-size));
      }
      .button-icon {
        padding-inline-end: 0;
      }
      .icon-blue {
        fill: var(--google-blue-600);
      }
      .icon-red {
        fill: var(--google-red-600);
      }
      @media (prefers-color-scheme: dark) {
        .icon-blue {
          fill: var(--google-blue-300);
        }
        .icon-red {
          fill: var(--google-red-300);
        }
      }
    </style>
    <iron-icon
      id="statusIcon"
      icon="[[getStatusIcon_(iconStatus)]]"
      src="[[getStatusIconSrc_(iconStatus)]]"
      class$="[[getStatusIconClass_(iconStatus)]]"
      role="img"
      aria-label="[[getStatusIconAriaLabel_(iconStatus)]]"
    >
    </iron-icon>
    <div class="flex cr-padded-text">
      <div id="label" inner-h-t-m-l="[[sanitizeInnerHtml_(label)]]"></div>
      <div id="subLabel" class="secondary" no-search inner-h-t-m-l="[[sanitizeInnerHtml_(subLabel)]]"></div>
    </div>
    <template is="dom-if" if="[[showButton_(buttonLabel)]]" restamp>
      <cr-button
        id="button"
        class$="[[buttonClass]]"
        on-click="onButtonClick_"
        aria-label="[[buttonAriaLabel]]"
        no-search
      >
        [[buttonLabel]]
        <template is="dom-if" if="[[showButtonIcon_(buttonIcon)]]">
          <iron-icon class="button-icon icon-blue" icon="[[buttonIcon]]" slot="suffix-icon"> </iron-icon>
        </template>
      </cr-button>
    </template>
    <template is="dom-if" if="[[showManagedIcon_(managedIcon)]]">
      <iron-icon id="managedIcon" icon="[[managedIcon]]" aria-hidden="true"> </iron-icon>
    </template>
    <template is="dom-if" if="[[rowClickable]]">
      <cr-icon-button
        id="rowClickableIndicator"
        iron-icon="[[rowClickableIcon_]]"
        aria-describedby="subLabel"
        aria-labelledby="label"
        aria-roledescription$="[[getRoleDescription_(rowClickableIcon_)]]"
      >
      </cr-icon-button>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2020 The Chromium Authors
var SafetyCheckIconStatus;
(function (SafetyCheckIconStatus) {
  SafetyCheckIconStatus[(SafetyCheckIconStatus['RUNNING'] = 0)] = 'RUNNING';
  SafetyCheckIconStatus[(SafetyCheckIconStatus['SAFE'] = 1)] = 'SAFE';
  SafetyCheckIconStatus[(SafetyCheckIconStatus['INFO'] = 2)] = 'INFO';
  SafetyCheckIconStatus[(SafetyCheckIconStatus['WARNING'] = 3)] = 'WARNING';
  SafetyCheckIconStatus[(SafetyCheckIconStatus['NOTIFICATION_PERMISSIONS'] = 4)] = 'NOTIFICATION_PERMISSIONS';
  SafetyCheckIconStatus[(SafetyCheckIconStatus['UNUSED_SITE_PERMISSIONS'] = 5)] = 'UNUSED_SITE_PERMISSIONS';
  SafetyCheckIconStatus[(SafetyCheckIconStatus['EXTENSIONS_REVIEW'] = 6)] = 'EXTENSIONS_REVIEW';
})(SafetyCheckIconStatus || (SafetyCheckIconStatus = {}));
const SettingsSafetyCheckChildElementBase = I18nMixin(PolymerElement);
class SettingsSafetyCheckChildElement extends SettingsSafetyCheckChildElementBase {
  static get is() {
    return 'settings-safety-check-child';
  }
  static get template() {
    return getTemplate$w();
  }
  static get properties() {
    return {
      iconStatus: { type: Number, value: SafetyCheckIconStatus.RUNNING },
      label: String,
      subLabel: String,
      buttonLabel: String,
      buttonAriaLabel: String,
      buttonClass: String,
      buttonIcon: String,
      rowClickable: { type: Boolean, value: false, reflectToAttribute: true, observer: 'onRowClickableChanged_' },
      external: { type: Boolean, value: false },
      rowClickableIcon_: { type: String, computed: 'computeRowClickableIcon_(external)' },
      managedIcon: String,
    };
  }
  getStatusIcon_() {
    switch (this.iconStatus) {
      case SafetyCheckIconStatus.RUNNING:
        return null;
      case SafetyCheckIconStatus.SAFE:
        return 'cr:check';
      case SafetyCheckIconStatus.INFO:
        return 'cr:info';
      case SafetyCheckIconStatus.WARNING:
        return 'cr:warning';
      case SafetyCheckIconStatus.NOTIFICATION_PERMISSIONS:
        return 'settings:notifications-none';
      case SafetyCheckIconStatus.UNUSED_SITE_PERMISSIONS:
        return 'cr:info-outline';
      case SafetyCheckIconStatus.EXTENSIONS_REVIEW:
        return 'cr:extension';
      default:
        assertNotReached();
    }
  }
  getStatusIconSrc_() {
    if (this.iconStatus === SafetyCheckIconStatus.RUNNING) {
      return 'chrome://resources/images/throbber_small.svg';
    }
    return null;
  }
  getStatusIconClass_() {
    switch (this.iconStatus) {
      case SafetyCheckIconStatus.RUNNING:
      case SafetyCheckIconStatus.SAFE:
        return 'icon-blue';
      case SafetyCheckIconStatus.WARNING:
        return 'icon-red';
      default:
        return '';
    }
  }
  getStatusIconAriaLabel_() {
    switch (this.iconStatus) {
      case SafetyCheckIconStatus.RUNNING:
        return this.i18n('safetyCheckIconRunningAriaLabel');
      case SafetyCheckIconStatus.SAFE:
        return this.i18n('safetyCheckIconSafeAriaLabel');
      case SafetyCheckIconStatus.INFO:
        return this.i18n('safetyCheckIconInfoAriaLabel');
      case SafetyCheckIconStatus.WARNING:
        return this.i18n('safetyCheckIconWarningAriaLabel');
      case SafetyCheckIconStatus.NOTIFICATION_PERMISSIONS:
      case SafetyCheckIconStatus.UNUSED_SITE_PERMISSIONS:
      case SafetyCheckIconStatus.EXTENSIONS_REVIEW:
        return undefined;
      default:
        assertNotReached();
    }
  }
  showButton_() {
    return !!this.buttonLabel;
  }
  onButtonClick_() {
    this.dispatchEvent(new CustomEvent('button-click', { bubbles: true, composed: true }));
  }
  showManagedIcon_() {
    return !!this.managedIcon;
  }
  showButtonIcon_() {
    return !!this.buttonIcon;
  }
  computeRowClickableIcon_() {
    return this.external ? 'cr:open-in-new' : 'cr:arrow-right';
  }
  getRoleDescription_() {
    return this.rowClickableIcon_ === 'cr:arrow-right' ? this.i18n('subpageArrowRoleDescription') : '';
  }
  onRowClickableChanged_() {
    this.toggleAttribute('effectively-disabled_', !this.rowClickable);
  }
  sanitizeInnerHtml_(rawString) {
    return sanitizeInnerHtml(rawString);
  }
}
customElements.define(SettingsSafetyCheckChildElement.is, SettingsSafetyCheckChildElement);
function getTemplate$v() {
  return html`<!--_html_template_start_--><settings-safety-check-child
      id="safetyCheckChild"
      icon-status="[[getIconStatus_(status_)]]"
      label="鎵╁睍绋嬪簭"
      sub-label="[[displayString_]]"
      button-label="[[getButtonLabel_(status_)]]"
      button-aria-label="鏌ョ湅鎵╁睍绋嬪簭"
      button-class="action-button"
      on-button-click="onButtonClick_"
      on-click="onRowClick_"
      row-clickable="[[isRowClickable_(status_)]]"
      external
      managed-icon="[[getManagedIcon_(status_)]]"
      role="presentation"
    >
    </settings-safety-check-child>
    <!--_html_template_end_-->`;
}
// Copyright 2020 The Chromium Authors
const SettingsSafetyCheckExtensionsChildElementBase = WebUiListenerMixin(I18nMixin(PolymerElement));
class SettingsSafetyCheckExtensionsChildElement extends SettingsSafetyCheckExtensionsChildElementBase {
  constructor() {
    super(...arguments);
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-safety-check-extensions-child';
  }
  static get template() {
    return getTemplate$v();
  }
  static get properties() {
    return {
      status_: { type: Number, value: SafetyCheckExtensionsStatus.CHECKING },
      displayString_: String,
      rowClickableStatuses: {
        readOnly: true,
        type: Object,
        value: () =>
          new Set([
            SafetyCheckExtensionsStatus.NO_BLOCKLISTED_EXTENSIONS,
            SafetyCheckExtensionsStatus.ERROR,
            SafetyCheckExtensionsStatus.BLOCKLISTED_ALL_DISABLED,
            SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_ALL_BY_ADMIN,
          ]),
      },
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addWebUiListener(
      SafetyCheckCallbackConstants.EXTENSIONS_CHANGED,
      this.onSafetyCheckExtensionsChanged_.bind(this)
    );
  }
  onSafetyCheckExtensionsChanged_(event) {
    this.status_ = event.newState;
    this.displayString_ = event.displayString;
  }
  getIconStatus_() {
    switch (this.status_) {
      case SafetyCheckExtensionsStatus.CHECKING:
        return SafetyCheckIconStatus.RUNNING;
      case SafetyCheckExtensionsStatus.ERROR:
      case SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_ALL_BY_ADMIN:
        return SafetyCheckIconStatus.INFO;
      case SafetyCheckExtensionsStatus.NO_BLOCKLISTED_EXTENSIONS:
      case SafetyCheckExtensionsStatus.BLOCKLISTED_ALL_DISABLED:
        return SafetyCheckIconStatus.SAFE;
      case SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_ALL_BY_USER:
      case SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_SOME_BY_USER:
        return SafetyCheckIconStatus.WARNING;
      default:
        assertNotReached();
    }
  }
  getButtonLabel_() {
    switch (this.status_) {
      case SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_ALL_BY_USER:
      case SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_SOME_BY_USER:
        return this.i18n('safetyCheckReview');
      default:
        return null;
    }
  }
  onButtonClick_() {
    this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(SafetyCheckInteractions.EXTENSIONS_REVIEW);
    this.metricsBrowserProxy_.recordAction('Settings.SafetyCheck.ReviewExtensions');
    this.openExtensionsPage_();
  }
  getManagedIcon_() {
    switch (this.status_) {
      case SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_ALL_BY_ADMIN:
        return 'cr20:domain';
      default:
        return null;
    }
  }
  isRowClickable_() {
    return this.rowClickableStatuses.has(this.status_);
  }
  onRowClick_() {
    if (this.isRowClickable_()) {
      this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(
        SafetyCheckInteractions.EXTENSIONS_CARET_NAVIGATION
      );
      this.metricsBrowserProxy_.recordAction('Settings.SafetyCheck.ReviewExtensionsThroughCaretNavigation');
      this.openExtensionsPage_();
    }
  }
  openExtensionsPage_() {
    OpenWindowProxyImpl.getInstance().openUrl('chrome://extensions');
  }
}
customElements.define(SettingsSafetyCheckExtensionsChildElement.is, SettingsSafetyCheckExtensionsChildElement);
// Copyright 2018 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var PasswordCheckReferrer;
(function (PasswordCheckReferrer) {
  PasswordCheckReferrer[(PasswordCheckReferrer['SAFETY_CHECK'] = 0)] = 'SAFETY_CHECK';
  PasswordCheckReferrer[(PasswordCheckReferrer['PASSWORD_SETTINGS'] = 1)] = 'PASSWORD_SETTINGS';
  PasswordCheckReferrer[(PasswordCheckReferrer['PHISH_GUARD_DIALOG'] = 2)] = 'PHISH_GUARD_DIALOG';
  PasswordCheckReferrer[(PasswordCheckReferrer['PASSWORD_BREACH_DIALOG'] = 3)] = 'PASSWORD_BREACH_DIALOG';
  PasswordCheckReferrer[(PasswordCheckReferrer['COUNT'] = 4)] = 'COUNT';
})(PasswordCheckReferrer || (PasswordCheckReferrer = {}));
var PasswordManagerPage;
(function (PasswordManagerPage) {
  PasswordManagerPage[(PasswordManagerPage['PASSWORDS'] = 0)] = 'PASSWORDS';
  PasswordManagerPage[(PasswordManagerPage['CHECKUP'] = 1)] = 'CHECKUP';
})(PasswordManagerPage || (PasswordManagerPage = {}));
class PasswordManagerImpl {
  recordPasswordsPageAccessInSettings() {
    chrome.passwordsPrivate.recordPasswordsPageAccessInSettings();
  }
  recordPasswordCheckReferrer(referrer) {
    chrome.metricsPrivate.recordEnumerationValue(
      'PasswordManager.BulkCheck.PasswordCheckReferrer',
      referrer,
      PasswordCheckReferrer.COUNT
    );
  }
  showPasswordManager(page) {
    chrome.send('showPasswordManager', [page]);
  }
  static getInstance() {
    return instance$8 || (instance$8 = new PasswordManagerImpl());
  }
  static setInstance(obj) {
    instance$8 = obj;
  }
}
let instance$8 = null;
function getTemplate$u() {
  return html`<!--_html_template_start_--><settings-safety-check-child
      id="safetyCheckChild"
      icon-status="[[getIconStatus_(status_)]]"
      label="瀵嗙爜绠＄悊宸ュ叿"
      sub-label="[[displayString_]]"
      button-label="[[getButtonLabel_(status_)]]"
      button-aria-label="鏌ョ湅瀵嗙爜"
      button-class="action-button"
      on-button-click="onButtonClick_"
      on-click="onRowClick_"
      row-clickable="[[isRowClickable_(status_)]]"
      role="presentation"
    >
    </settings-safety-check-child>
    <!--_html_template_end_-->`;
}
// Copyright 2020 The Chromium Authors
const SettingsSafetyCheckPasswordsChildElementBase = WebUiListenerMixin(I18nMixin(PolymerElement));
class SettingsSafetyCheckPasswordsChildElement extends SettingsSafetyCheckPasswordsChildElementBase {
  constructor() {
    super(...arguments);
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-safety-check-passwords-child';
  }
  static get template() {
    return getTemplate$u();
  }
  static get properties() {
    return {
      status_: { type: Number, value: SafetyCheckPasswordsStatus.CHECKING },
      displayString_: String,
      rowClickableStatuses: {
        readOnly: true,
        type: Object,
        value: () =>
          new Set([
            SafetyCheckPasswordsStatus.SAFE,
            SafetyCheckPasswordsStatus.QUOTA_LIMIT,
            SafetyCheckPasswordsStatus.ERROR,
            SafetyCheckPasswordsStatus.WEAK_PASSWORDS_EXIST,
          ]),
      },
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addWebUiListener(
      SafetyCheckCallbackConstants.PASSWORDS_CHANGED,
      this.onSafetyCheckPasswordsChanged_.bind(this)
    );
  }
  onSafetyCheckPasswordsChanged_(event) {
    this.status_ = event.newState;
    this.displayString_ = event.displayString;
  }
  getIconStatus_() {
    switch (this.status_) {
      case SafetyCheckPasswordsStatus.CHECKING:
        return SafetyCheckIconStatus.RUNNING;
      case SafetyCheckPasswordsStatus.SAFE:
        return SafetyCheckIconStatus.SAFE;
      case SafetyCheckPasswordsStatus.COMPROMISED:
        return SafetyCheckIconStatus.WARNING;
      case SafetyCheckPasswordsStatus.OFFLINE:
      case SafetyCheckPasswordsStatus.NO_PASSWORDS:
      case SafetyCheckPasswordsStatus.SIGNED_OUT:
      case SafetyCheckPasswordsStatus.QUOTA_LIMIT:
      case SafetyCheckPasswordsStatus.ERROR:
      case SafetyCheckPasswordsStatus.FEATURE_UNAVAILABLE:
      case SafetyCheckPasswordsStatus.WEAK_PASSWORDS_EXIST:
      case SafetyCheckPasswordsStatus.REUSED_PASSWORDS_EXIST:
      case SafetyCheckPasswordsStatus.MUTED_COMPROMISED_EXIST:
        return SafetyCheckIconStatus.INFO;
      default:
        assertNotReached();
    }
  }
  getButtonLabel_() {
    switch (this.status_) {
      case SafetyCheckPasswordsStatus.COMPROMISED:
        return this.i18n('safetyCheckReview');
      default:
        return null;
    }
  }
  onButtonClick_() {
    this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(
      SafetyCheckInteractions.PASSWORDS_MANAGE_COMPROMISED_PASSWORDS
    );
    this.metricsBrowserProxy_.recordAction('Settings.SafetyCheck.ManagePasswords');
    this.openPasswordCheckPage_();
  }
  isRowClickable_() {
    return this.rowClickableStatuses.has(this.status_);
  }
  onRowClick_() {
    if (this.isRowClickable_()) {
      this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(
        this.status_ === SafetyCheckPasswordsStatus.WEAK_PASSWORDS_EXIST
          ? SafetyCheckInteractions.PASSWORDS_MANAGE_WEAK_PASSWORDS
          : SafetyCheckInteractions.PASSWORDS_CARET_NAVIGATION
      );
      this.metricsBrowserProxy_.recordAction(
        this.status_ === SafetyCheckPasswordsStatus.WEAK_PASSWORDS_EXIST
          ? 'Settings.SafetyCheck.ManageWeakPasswords'
          : 'Settings.SafetyCheck.ManagePasswordsThroughCaretNavigation'
      );
      this.openPasswordCheckPage_();
    }
  }
  openPasswordCheckPage_() {
    PasswordManagerImpl.getInstance().recordPasswordCheckReferrer(PasswordCheckReferrer.SAFETY_CHECK);
    PasswordManagerImpl.getInstance().showPasswordManager(PasswordManagerPage.CHECKUP);
  }
}
customElements.define(SettingsSafetyCheckPasswordsChildElement.is, SettingsSafetyCheckPasswordsChildElement);
function getTemplate$t() {
  return html`<!--_html_template_start_--><settings-safety-check-child
      id="safetyCheckChild"
      icon-status="[[getIconStatus_(status_)]]"
      label="瀹夊叏娴忚"
      sub-label="[[displayString_]]"
      button-label="[[getButtonLabel_(status_)]]"
      button-aria-label="绠＄悊瀹夊叏娴忚璁剧疆"
      button-class="action-button"
      on-button-click="onButtonClick_"
      on-click="onRowClick_"
      row-clickable="[[isRowClickable_(status_)]]"
      managed-icon="[[getManagedIcon_(status_)]]"
      role="presentation"
    >
    </settings-safety-check-child>
    <!--_html_template_end_-->`;
}
// Copyright 2020 The Chromium Authors
const SettingsSafetyCheckSafeBrowsingChildElementBase = WebUiListenerMixin(I18nMixin(PolymerElement));
class SettingsSafetyCheckSafeBrowsingChildElement extends SettingsSafetyCheckSafeBrowsingChildElementBase {
  constructor() {
    super(...arguments);
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-safety-check-safe-browsing-child';
  }
  static get template() {
    return getTemplate$t();
  }
  static get properties() {
    return {
      status_: { type: Number, value: SafetyCheckSafeBrowsingStatus.CHECKING },
      displayString_: String,
      rowClickableStatuses: {
        readOnly: true,
        type: Object,
        value: () =>
          new Set([
            SafetyCheckSafeBrowsingStatus.ENABLED_STANDARD,
            SafetyCheckSafeBrowsingStatus.ENABLED_ENHANCED,
            SafetyCheckSafeBrowsingStatus.ENABLED_STANDARD_AVAILABLE_ENHANCED,
            SafetyCheckSafeBrowsingStatus.DISABLED_BY_ADMIN,
            SafetyCheckSafeBrowsingStatus.DISABLED_BY_EXTENSION,
          ]),
      },
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addWebUiListener(
      SafetyCheckCallbackConstants.SAFE_BROWSING_CHANGED,
      this.onSafetyCheckSafeBrowsingChanged_.bind(this)
    );
  }
  onSafetyCheckSafeBrowsingChanged_(event) {
    this.displayString_ = event.displayString;
    this.status_ = event.newState;
  }
  getIconStatus_() {
    switch (this.status_) {
      case SafetyCheckSafeBrowsingStatus.CHECKING:
        return SafetyCheckIconStatus.RUNNING;
      case SafetyCheckSafeBrowsingStatus.ENABLED_STANDARD:
      case SafetyCheckSafeBrowsingStatus.ENABLED_ENHANCED:
      case SafetyCheckSafeBrowsingStatus.ENABLED_STANDARD_AVAILABLE_ENHANCED:
        return SafetyCheckIconStatus.SAFE;
      case SafetyCheckSafeBrowsingStatus.ENABLED:
        assertNotReached();
      case SafetyCheckSafeBrowsingStatus.DISABLED:
      case SafetyCheckSafeBrowsingStatus.DISABLED_BY_ADMIN:
      case SafetyCheckSafeBrowsingStatus.DISABLED_BY_EXTENSION:
        return SafetyCheckIconStatus.INFO;
      default:
        assertNotReached();
    }
  }
  getButtonLabel_() {
    switch (this.status_) {
      case SafetyCheckSafeBrowsingStatus.DISABLED:
        return this.i18n('safetyCheckSafeBrowsingButton');
      default:
        return null;
    }
  }
  onButtonClick_() {
    this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(SafetyCheckInteractions.SAFE_BROWSING_MANAGE);
    this.metricsBrowserProxy_.recordAction('Settings.SafetyCheck.ManageSafeBrowsing');
    this.openSecurityPage_();
  }
  getManagedIcon_() {
    switch (this.status_) {
      case SafetyCheckSafeBrowsingStatus.DISABLED_BY_ADMIN:
        return 'cr20:domain';
      case SafetyCheckSafeBrowsingStatus.DISABLED_BY_EXTENSION:
        return 'cr:extension';
      default:
        return null;
    }
  }
  isRowClickable_() {
    return this.rowClickableStatuses.has(this.status_);
  }
  onRowClick_() {
    if (this.isRowClickable_()) {
      this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(
        SafetyCheckInteractions.SAFE_BROWSING_CARET_NAVIGATION
      );
      this.metricsBrowserProxy_.recordAction('Settings.SafetyCheck.ManageSafeBrowsingThroughCaretNavigation');
      this.openSecurityPage_();
    }
  }
  openSecurityPage_() {
    this.metricsBrowserProxy_.recordAction('SafeBrowsing.Settings.ShowedFromSafetyCheck');
    Router.getInstance().navigateTo(routes.SECURITY, undefined, true);
  }
}
customElements.define(SettingsSafetyCheckSafeBrowsingChildElement.is, SettingsSafetyCheckSafeBrowsingChildElement);
function getTemplate$s() {
  return html`<!--_html_template_start_--><settings-safety-check-child
      id="safetyCheckChild"
      icon-status="[[getIconStatus_(status_)]]"
      label="鏇存柊"
      sub-label="[[displayString_]]"
      button-label="[[getButtonLabel_(status_)]]"
      button-aria-label="閲嶅惎 Chrome"
      button-class="action-button"
      on-button-click="onButtonClick_"
      managed-icon="[[getManagedIcon_(status_)]]"
      role="presentation"
    >
    </settings-safety-check-child>

    <template is="dom-if" if="[[shouldShowRelaunchDialog]]" restamp>
      <relaunch-confirmation-dialog
        restart-type="[[restartTypeEnum.RELAUNCH]]"
        on-close="onRelaunchDialogClose"
      ></relaunch-confirmation-dialog>
    </template>

    <!--_html_template_end_-->`;
}
// Copyright 2020 The Chromium Authors
const SettingsSafetyCheckUpdatesChildElementBase = RelaunchMixin(WebUiListenerMixin(I18nMixin(PolymerElement)));
class SettingsSafetyCheckUpdatesChildElement extends SettingsSafetyCheckUpdatesChildElementBase {
  constructor() {
    super(...arguments);
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-safety-check-updates-child';
  }
  static get template() {
    return getTemplate$s();
  }
  static get properties() {
    return { status_: { type: Number, value: SafetyCheckUpdatesStatus.CHECKING }, displayString_: String };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addWebUiListener(SafetyCheckCallbackConstants.UPDATES_CHANGED, this.onSafetyCheckUpdatesChanged_.bind(this));
  }
  onSafetyCheckUpdatesChanged_(event) {
    this.status_ = event.newState;
    this.displayString_ = event.displayString;
  }
  getIconStatus_() {
    switch (this.status_) {
      case SafetyCheckUpdatesStatus.CHECKING:
      case SafetyCheckUpdatesStatus.UPDATING:
        return SafetyCheckIconStatus.RUNNING;
      case SafetyCheckUpdatesStatus.UPDATED:
        return SafetyCheckIconStatus.SAFE;
      case SafetyCheckUpdatesStatus.RELAUNCH:
      case SafetyCheckUpdatesStatus.DISABLED_BY_ADMIN:
      case SafetyCheckUpdatesStatus.UPDATE_TO_ROLLBACK_VERSION_DISALLOWED:
      case SafetyCheckUpdatesStatus.FAILED_OFFLINE:
      case SafetyCheckUpdatesStatus.UNKNOWN:
        return SafetyCheckIconStatus.INFO;
      case SafetyCheckUpdatesStatus.FAILED:
        return SafetyCheckIconStatus.WARNING;
      default:
        assertNotReached();
    }
  }
  getButtonLabel_() {
    switch (this.status_) {
      case SafetyCheckUpdatesStatus.RELAUNCH:
        return this.i18n('aboutRelaunch');
      default:
        return null;
    }
  }
  onButtonClick_() {
    this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(SafetyCheckInteractions.UPDATES_RELAUNCH);
    this.metricsBrowserProxy_.recordAction('Settings.SafetyCheck.RelaunchAfterUpdates');
    this.performRestart(RestartType.RELAUNCH);
  }
  getManagedIcon_() {
    switch (this.status_) {
      case SafetyCheckUpdatesStatus.DISABLED_BY_ADMIN:
        return 'cr20:domain';
      default:
        return null;
    }
  }
}
customElements.define(SettingsSafetyCheckUpdatesChildElement.is, SettingsSafetyCheckUpdatesChildElement);
// Copyright 2023 The Chromium Authors
class SafetyCheckExtensionsBrowserProxyImpl {
  getNumberOfExtensionsThatNeedReview() {
    return sendWithPromise('getNumberOfExtensionsThatNeedReview');
  }
  static getInstance() {
    return instance$7 || (instance$7 = new SafetyCheckExtensionsBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$7 = obj;
  }
}
let instance$7 = null;
function getTemplate$r() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style settings-shared iron-flex">
      #safetyCheckCollapse .list-item.selected {
        min-height: var(--cr-section-two-line-min-height);
      }
      iron-icon {
        display: flex;
        flex-shrink: 0;
        padding-inline-end: var(--cr-icon-button-margin-start);
        width: var(--cr-link-row-icon-width, var(--cr-icon-size));
      }
    </style>
    <div id="safetyCheckParent" class="cr-row first two-line">
      <iron-icon icon="settings20:safety-check" aria-hidden="true"> </iron-icon>
      <div class="flex cr-padded-text" no-search>[[parentDisplayString_]]</div>
      <template is="dom-if" if="[[shouldShowParentButton_(parentStatus_)]]" restamp>
        <cr-button
          id="safetyCheckParentButton"
          class="action-button"
          on-click="onRunSafetyCheckClick_"
          no-search
          aria-label="绔嬪嵆杩涜瀹夊叏妫€鏌�"
        >
          绔嬪嵆妫€鏌�
        </cr-button>
      </template>
      <template is="dom-if" if="[[shouldShowParentIconButton_(parentStatus_)]]" restamp>
        <cr-icon-button
          iron-icon="settings:refresh"
          on-click="onRunSafetyCheckClick_"
          aria-label="鍐嶆杩愯瀹夊叏妫€鏌�"
        >
        </cr-icon-button>
      </template>
    </div>
    <iron-collapse id="safetyCheckCollapse" opened="[[shouldShowChildren_(parentStatus_)]]">
      <settings-safety-check-updates-child> </settings-safety-check-updates-child>
      <settings-safety-check-passwords-child> </settings-safety-check-passwords-child>
      <settings-safety-check-safe-browsing-child> </settings-safety-check-safe-browsing-child>
      <template is="dom-if" if="[[!safetyCheckExtensionsReviewEnabled_]]" restamp>
        <settings-safety-check-extensions-child> </settings-safety-check-extensions-child>
      </template>
    </iron-collapse>
    <template
      is="dom-if"
      if="[[shouldShowSafetyCheckExtensionsReview_(
          safetyCheckNumberOfExtensionsThatNeedReview_)]]"
      restamp
    >
      <safety-check-extensions> </safety-check-extensions>
    </template>
    <template
      is="dom-if"
      if="[[shouldShowUnusedSitePermissions_(
          unusedSitePermissions_, safetyCheckUnusedSitePermissionsEnabled_)]]"
      restamp
    >
      <settings-safety-check-unused-site-permissions> </settings-safety-check-unused-site-permissions>
    </template>
    <template
      is="dom-if"
      if="[[shouldShowNotificationPermissions_(
          notificationPermissionSites_, safetyCheckNotificationPermissionsEnabled_)]]"
      restamp
    >
      <settings-safety-check-notification-permissions> </settings-safety-check-notification-permissions>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2020 The Chromium Authors
const SettingsSafetyCheckPageElementBase = RouteObserverMixin(WebUiListenerMixin(I18nMixin(PolymerElement)));
class SettingsSafetyCheckPageElement extends SettingsSafetyCheckPageElementBase {
  constructor() {
    super(...arguments);
    this.notificationPermissionSites_ = [];
    this.unusedSitePermissions_ = [];
    this.shouldRecordMetrics_ = false;
    this.permissionsBrowserProxy_ = SafetyHubBrowserProxyImpl.getInstance();
    this.safetyCheckBrowserProxy_ = SafetyCheckBrowserProxyImpl.getInstance();
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
    this.updateTimerId_ = -1;
  }
  static get is() {
    return 'settings-safety-check-page';
  }
  static get template() {
    return getTemplate$r();
  }
  static get properties() {
    return {
      parentStatus_: { type: Number, value: SafetyCheckParentStatus.BEFORE },
      parentDisplayString_: String,
      safetyCheckNotificationPermissionsEnabled_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('safetyCheckNotificationPermissionsEnabled');
        },
      },
      safetyCheckUnusedSitePermissionsEnabled_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('safetyCheckUnusedSitePermissionsEnabled');
        },
      },
      safetyCheckExtensionsReviewEnabled_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('safetyCheckExtensionsReviewEnabled');
        },
      },
      notificationPermissionSites_: Array,
    };
  }
  async connectedCallback() {
    super.connectedCallback();
    this.addWebUiListener(SafetyCheckCallbackConstants.PARENT_CHANGED, this.onSafetyCheckParentChanged_.bind(this));
    this.addWebUiListener(
      SafetyCheckCallbackConstants.EXTENSIONS_CHANGED,
      this.shouldShowSafetyCheckExtensionsReview_.bind(this)
    );
    this.parentDisplayString_ = this.i18n('safetyCheckParentPrimaryLabelBefore');
    if (
      Router.getInstance().getCurrentRoute() === routes.SAFETY_CHECK &&
      Router.getInstance().getQueryParameters().has('activateSafetyCheck')
    ) {
      this.runSafetyCheck_();
    }
    this.addWebUiListener('notification-permission-review-list-maybe-changed', (sites) =>
      this.onReviewNotificationPermissionListChanged_(sites)
    );
    this.notificationPermissionSites_ = await this.permissionsBrowserProxy_.getNotificationPermissionReview();
    this.addWebUiListener('unused-permission-review-list-maybe-changed', (sites) =>
      this.onUnusedSitePermissionListChanged_(sites)
    );
    this.unusedSitePermissions_ = await this.permissionsBrowserProxy_.getRevokedUnusedSitePermissionsList();
    this.safetyCheckNumberOfExtensionsThatNeedReview_ =
      await SafetyCheckExtensionsBrowserProxyImpl.getInstance().getNumberOfExtensionsThatNeedReview();
    if (this.shouldRecordMetrics_) {
      this.metricsBrowserProxy_.recordSafetyCheckNotificationsModuleEntryPointShown(
        this.shouldShowNotificationPermissions_()
      );
      this.metricsBrowserProxy_.recordSafetyCheckUnusedSitePermissionsModuleEntryPointShown(
        this.shouldShowUnusedSitePermissions_()
      );
      this.shouldRecordMetrics_ = false;
    }
  }
  currentRouteChanged(currentRoute) {
    if (currentRoute.path === routes.PRIVACY.path) {
      this.shouldRecordMetrics_ = true;
    }
  }
  runSafetyCheck_() {
    this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(SafetyCheckInteractions.RUN_SAFETY_CHECK);
    this.metricsBrowserProxy_.recordAction('Settings.SafetyCheck.Start');
    this.safetyCheckBrowserProxy_.runSafetyCheck();
    getInstance().announce(this.i18n('safetyCheckAriaLiveRunning'));
  }
  onSafetyCheckParentChanged_(event) {
    this.parentStatus_ = event.newState;
    this.parentDisplayString_ = event.displayString;
    if (this.parentStatus_ === SafetyCheckParentStatus.CHECKING) {
      flush();
      this.focusIconButton_();
    } else if (this.parentStatus_ === SafetyCheckParentStatus.AFTER) {
      const update = async () => {
        this.parentDisplayString_ = await this.safetyCheckBrowserProxy_.getParentRanDisplayString();
      };
      window.clearInterval(this.updateTimerId_);
      this.updateTimerId_ = window.setInterval(update, 6e4);
      update();
      getInstance().announce(this.i18n('safetyCheckAriaLiveAfter'));
    }
  }
  shouldShowParentButton_() {
    return this.parentStatus_ === SafetyCheckParentStatus.BEFORE;
  }
  shouldShowParentIconButton_() {
    return this.parentStatus_ !== SafetyCheckParentStatus.BEFORE;
  }
  onRunSafetyCheckClick_() {
    HatsBrowserProxyImpl.getInstance().trustSafetyInteractionOccurred(TrustSafetyInteraction.RAN_SAFETY_CHECK);
    this.runSafetyCheck_();
  }
  focusIconButton_() {
    this.shadowRoot.querySelector('cr-icon-button').focus();
  }
  shouldShowChildren_() {
    return this.parentStatus_ !== SafetyCheckParentStatus.BEFORE;
  }
  onReviewNotificationPermissionListChanged_(sites) {
    this.notificationPermissionSites_ = sites;
  }
  shouldShowNotificationPermissions_() {
    return this.notificationPermissionSites_.length !== 0 && this.safetyCheckNotificationPermissionsEnabled_;
  }
  onUnusedSitePermissionListChanged_(sites) {
    this.unusedSitePermissions_ = sites;
  }
  shouldShowUnusedSitePermissions_() {
    return this.safetyCheckUnusedSitePermissionsEnabled_ && this.unusedSitePermissions_.length !== 0;
  }
  shouldShowSafetyCheckExtensionsReview_() {
    if (this.safetyCheckExtensionsReviewEnabled_ && this.safetyCheckNumberOfExtensionsThatNeedReview_ !== 0) {
      this.metricsBrowserProxy_.recordAction('Settings.SafetyCheck.ShownExtensionsReviewRow');
      return true;
    }
    return false;
  }
}
customElements.define(SettingsSafetyCheckPageElement.is, SettingsSafetyCheckPageElement);
function getTemplate$q() {
  return html`<!--_html_template_start_-->
    <style include="settings-shared">
      cr-link-row {
        --cr-icon-button-margin-start: 20px;
      }
      cr-link-row:not([hidden]) + cr-link-row {
        border-top: var(--cr-separator-line);
      }
    </style>
    <settings-animated-pages id="pages" section="autofill" focus-config="[[focusConfig_]]">
      <div route-path="default">
        <cr-link-row
          id="passwordManagerButton"
          start-icon="settings20:vpn-key"
          label="Google 瀵嗙爜绠＄悊宸ュ叿"
          on-click="onPasswordsClick_"
          role-description="瀛愰〉闈㈡寜閽�"
          external
        >
        </cr-link-row>
        <cr-link-row
          id="paymentManagerButton"
          start-icon="settings20:credit-card"
          label="浠樻鏂瑰紡"
          on-click="onPaymentsClick_"
          role-description="瀛愰〉闈㈡寜閽�"
        ></cr-link-row>
        <cr-link-row
          id="addressesManagerButton"
          start-icon="settings:location-on"
          label="鍦板潃鍜屽叾浠栦俊鎭�"
          on-click="onAddressesClick_"
          role-description="瀛愰〉闈㈡寜閽�"
        ></cr-link-row>
      </div>

      <template is="dom-if" route-path="/passkeys">
        <settings-subpage
          associated-control="[[$$('#passwordManagerButton')]]"
          page-title="瀵嗛挜"
          search-label="鎼滅储瀵嗛挜"
          search-term="{{passkeyFilter_}}"
        >
          <settings-passkeys-subpage filter="[[passkeyFilter_]]"> </settings-passkeys-subpage>
        </settings-subpage>
      </template>

      <template is="dom-if" route-path="/payments">
        <settings-subpage
          associated-control="[[$$('#paymentManagerButton')]]"
          page-title="浠樻鏂瑰紡"
          learn-more-url="https://support.google.com/chrome/answer/142893?visit_id=636857416902558798-696405304&amp;p=settings_autofill&amp;rd=1"
        >
          <settings-payments-section id="paymentsSection" prefs="{{prefs}}"> </settings-payments-section>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/addresses">
        <settings-subpage
          associated-control="[[$$('#addressesManagerButton')]]"
          page-title="鍦板潃鍜屽叾浠栦俊鎭�"
          learn-more-url="https://support.google.com/chrome/answer/142893?visit_id=636857416902558798-696405304&amp;p=settings_autofill&amp;rd=1"
        >
          <settings-autofill-section id="autofillSection" prefs="{{prefs}}"> </settings-autofill-section>
        </settings-subpage>
      </template>
    </settings-animated-pages>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsAutofillPageElementBase = PrefsMixin(BaseMixin(PolymerElement));
class SettingsAutofillPageElement extends SettingsAutofillPageElementBase {
  static get is() {
    return 'settings-autofill-page';
  }
  static get template() {
    return getTemplate$q();
  }
  static get properties() {
    return {
      passkeyFilter_: String,
      focusConfig_: {
        type: Object,
        value() {
          const map = new Map();
          if (routes.PAYMENTS) {
            map.set(routes.PAYMENTS.path, '#paymentManagerButton');
          }
          if (routes.ADDRESSES) {
            map.set(routes.ADDRESSES.path, '#addressesManagerButton');
          }
          return map;
        },
      },
    };
  }
  onAddressesClick_() {
    Router.getInstance().navigateTo(routes.ADDRESSES);
  }
  onPaymentsClick_() {
    Router.getInstance().navigateTo(routes.PAYMENTS);
  }
  onPasswordsClick_() {
    PasswordManagerImpl.getInstance().recordPasswordsPageAccessInSettings();
    PasswordManagerImpl.getInstance().showPasswordManager(PasswordManagerPage.PASSWORDS);
  }
}
customElements.define(SettingsAutofillPageElement.is, SettingsAutofillPageElement);
// Copyright 2021 The Chromium Authors
function isValidArray(arr) {
  if (arr instanceof Array && Object.isFrozen(arr)) {
    return true;
  }
  return false;
}
function getStaticString(literal) {
  const isStaticString =
    isValidArray(literal) &&
    !!literal.raw &&
    isValidArray(literal.raw) &&
    literal.length === literal.raw.length &&
    literal.length === 1;
  assert(isStaticString, 'static_types.js only allows static strings');
  return literal.join('');
}
function createTypes(_ignore, literal) {
  return getStaticString(literal);
}
const rules = { createHTML: createTypes, createScript: createTypes, createScriptURL: createTypes };
let staticPolicy;
if (window.trustedTypes) {
  staticPolicy = window.trustedTypes.createPolicy('static-types', rules);
} else {
  staticPolicy = rules;
}
function getTrustedHTML(literal) {
  return staticPolicy.createHTML('', literal);
}
function getTrustedScriptURL(literal) {
  return staticPolicy.createScriptURL('', literal);
}
// Copyright 2020 The Chromium Authors
let lazyLoadPromise = null;
function ensureLazyLoaded() {
  if (lazyLoadPromise === null) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = getTrustedScriptURL`./lazy_load.js`;
    document.body.appendChild(script);
    lazyLoadPromise = Promise.all(
      [
        'settings-appearance-page',
        'settings-autofill-section',
        'settings-payments-section',
        'settings-clear-browsing-data-dialog',
        'settings-search-engines-page',
        'settings-a11y-page',
        'settings-downloads-page',
        'settings-languages-page',
        'settings-reset-page',
        'settings-system-page',
        'settings-edit-dictionary-page',
      ].map((name) => customElements.whenDefined(name))
    ).then(() => {});
  }
  return lazyLoadPromise;
}
// Copyright 2017 The Chromium Authors
class SettingsIdleLoadElement extends PolymerElement {
  constructor() {
    super(...arguments);
    this.child_ = null;
    this.instance_ = null;
    this.idleCallback_ = 0;
    this.loading_ = null;
  }
  static get is() {
    return 'settings-idle-load';
  }
  static get template() {
    return html`<slot></slot>`;
  }
  connectedCallback() {
    super.connectedCallback();
    this.idleCallback_ = window.requestIdleCallback(() => {
      this.get();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.cancelIdleCallback(this.idleCallback_);
  }
  requestLazyModule_() {
    return new Promise((resolve, reject) => {
      ensureLazyLoaded().then(() => {
        const template = this.shadowRoot
          .querySelector('slot')
          .assignedNodes({ flatten: true })
          .filter((n) => n.nodeType === Node.ELEMENT_NODE)[0];
        const TemplateClass = templatize(template, this, {
          mutableData: false,
          forwardHostProp: this._forwardHostPropV2,
        });
        this.instance_ = new TemplateClass();
        assert(!this.child_);
        this.child_ = this.instance_.root.firstElementChild;
        this.parentNode.insertBefore(this.instance_.root, this);
        resolve(this.child_);
        this.dispatchEvent(new CustomEvent('lazy-loaded', { bubbles: true, composed: true }));
      }, reject);
    });
  }
  get() {
    if (this.loading_) {
      return this.loading_;
    }
    this.loading_ = this.requestLazyModule_();
    return this.loading_;
  }
  _forwardHostPropV2(prop, value) {
    if (this.instance_) {
      this.instance_.forwardHostProp(prop, value);
    }
  }
}
customElements.define(SettingsIdleLoadElement.is, SettingsIdleLoadElement);
function getTemplate$p() {
  return html`<!--_html_template_start_-->
    <style include="settings-shared"></style>
    <cr-dialog id="dialog" close-text="鍏抽棴">
      <div slot="title">[[dialogTitle_]]</div>
      <div slot="body">
        <cr-input
          id="url"
          label="缃戠珯缃戝潃"
          value="{{url_}}"
          on-input="validate_"
          spellcheck="false"
          maxlength="[[urlLimit_]]"
          invalid="[[hasError_(error_)]]"
          autofocus
          error-message="[[errorMessage_('缃戝潃鏃犳晥',
                '璇疯緭鍏ヤ竴涓緝鐭殑缃戝潃', error_)]]"
        >
        </cr-input>
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onCancelClick_" id="cancel">鍙栨秷</cr-button>
        <cr-button id="actionButton" class="action-button" on-click="onActionButtonClick_"
          >[[actionButtonText_]]</cr-button
        >
      </div>
    </cr-dialog>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
class StartupUrlsPageBrowserProxyImpl {
  loadStartupPages() {
    chrome.send('onStartupPrefsPageLoad');
  }
  useCurrentPages() {
    chrome.send('setStartupPagesToCurrentPages');
  }
  validateStartupPage(url) {
    return sendWithPromise('validateStartupPage', url);
  }
  addStartupPage(url) {
    return sendWithPromise('addStartupPage', url);
  }
  editStartupPage(modelIndex, url) {
    return sendWithPromise('editStartupPage', modelIndex, url);
  }
  removeStartupPage(index) {
    chrome.send('removeStartupPage', [index]);
  }
  static getInstance() {
    return instance$6 || (instance$6 = new StartupUrlsPageBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$6 = obj;
  }
}
let instance$6 = null;
// Copyright 2016 The Chromium Authors
var UrlInputError;
(function (UrlInputError) {
  UrlInputError[(UrlInputError['NONE'] = 0)] = 'NONE';
  UrlInputError[(UrlInputError['INVALID_URL'] = 1)] = 'INVALID_URL';
  UrlInputError[(UrlInputError['TOO_LONG'] = 2)] = 'TOO_LONG';
})(UrlInputError || (UrlInputError = {}));
class SettingsStartupUrlDialogElement extends PolymerElement {
  constructor() {
    super(...arguments);
    this.browserProxy_ = StartupUrlsPageBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-startup-url-dialog';
  }
  static get template() {
    return getTemplate$p();
  }
  static get properties() {
    return {
      error_: { type: Number, value: UrlInputError.NONE },
      url_: String,
      urlLimit_: { readOnly: true, type: Number, value: 100 * 1024 },
      model: Object,
      dialogTitle_: String,
      actionButtonText_: String,
    };
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.model) {
      this.dialogTitle_ = loadTimeData.getString('onStartupEditPage');
      this.actionButtonText_ = loadTimeData.getString('save');
      this.$.actionButton.disabled = false;
      this.url_ = this.model.url;
    } else {
      this.dialogTitle_ = loadTimeData.getString('onStartupAddNewPage');
      this.actionButtonText_ = loadTimeData.getString('add');
      this.$.actionButton.disabled = true;
    }
    this.$.dialog.showModal();
  }
  hasError_() {
    return this.error_ !== UrlInputError.NONE;
  }
  errorMessage_(invalidUrl, tooLong) {
    return ['', invalidUrl, tooLong][this.error_];
  }
  onCancelClick_() {
    this.$.dialog.close();
  }
  onActionButtonClick_() {
    const whenDone = this.model
      ? this.browserProxy_.editStartupPage(this.model.modelIndex, this.url_)
      : this.browserProxy_.addStartupPage(this.url_);
    whenDone.then((success) => {
      if (success) {
        this.$.dialog.close();
      }
    });
  }
  validate_() {
    if (this.url_.length === 0) {
      this.$.actionButton.disabled = true;
      this.error_ = UrlInputError.NONE;
      return;
    }
    if (this.url_.length >= this.urlLimit_) {
      this.$.actionButton.disabled = true;
      this.error_ = UrlInputError.TOO_LONG;
      return;
    }
    this.browserProxy_.validateStartupPage(this.url_).then((isValid) => {
      this.$.actionButton.disabled = !isValid;
      this.error_ = isValid ? UrlInputError.NONE : UrlInputError.INVALID_URL;
    });
  }
}
customElements.define(SettingsStartupUrlDialogElement.is, SettingsStartupUrlDialogElement);
function getTemplate$o() {
  return html`<!--_html_template_start_-->
    <style include="settings-shared">
      .hide-overflow {
        overflow: hidden;
      }
    </style>
    <div class="list-item" focus-row-container>
      <site-favicon url="[[model.url]]"></site-favicon>
      <div class="middle hide-overflow">
        <div class="text-elide">[[model.title]]</div>
        <div class="text-elide secondary">[[model.url]]</div>
      </div>
      <template is="dom-if" if="[[editable]]">
        <cr-icon-button
          class="icon-more-vert"
          id="dots"
          on-click="onDotsClick_"
          title="鏇村鎿嶄綔"
          focus-row-control
          focus-type="menu"
        >
        </cr-icon-button>
        <cr-lazy-render id="menu">
          <template>
            <cr-action-menu role-description="鑿滃崟">
              <button class="dropdown-item" on-click="onEditClick_">缂栬緫</button>
              <button class="dropdown-item" id="remove" on-click="onRemoveClick_">绉婚櫎</button>
            </cr-action-menu>
          </template>
        </cr-lazy-render>
      </template>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
const EDIT_STARTUP_URL_EVENT = 'edit-startup-url';
const SettingsStartupUrlEntryElementBase = FocusRowMixin(PolymerElement);
class SettingsStartupUrlEntryElement extends SettingsStartupUrlEntryElementBase {
  static get is() {
    return 'settings-startup-url-entry';
  }
  static get template() {
    return getTemplate$o();
  }
  static get properties() {
    return { editable: { type: Boolean, reflectToAttribute: true }, model: Object };
  }
  onRemoveClick_() {
    this.shadowRoot.querySelector('cr-action-menu').close();
    StartupUrlsPageBrowserProxyImpl.getInstance().removeStartupPage(this.model.modelIndex);
  }
  onEditClick_(e) {
    e.preventDefault();
    this.shadowRoot.querySelector('cr-action-menu').close();
    this.dispatchEvent(
      new CustomEvent(EDIT_STARTUP_URL_EVENT, {
        bubbles: true,
        composed: true,
        detail: { model: this.model, anchor: this.shadowRoot.querySelector('#dots') },
      })
    );
  }
  onDotsClick_() {
    const actionMenu = this.shadowRoot.querySelector('#menu').get();
    const dots = this.shadowRoot.querySelector('#dots');
    assert(dots);
    actionMenu.showAt(dots);
  }
}
customElements.define(SettingsStartupUrlEntryElement.is, SettingsStartupUrlEntryElement);
function getTemplate$n() {
  return html`<!--_html_template_start_-->
    <style include="settings-shared action-link iron-flex">
      #editOptions > div {
        border-top: var(--cr-separator-line);
      }
      #outer {
        max-height: 355px;
      }
      #container settings-startup-url-entry {
        cursor: default;
      }
    </style>
    <div id="outer" class="layout vertical flex list-frame">
      <div id="container" class="scroll-container" scrollable>
        <iron-list
          items="[[startupPages_]]"
          scroll-target="container"
          preserve-focus
          risk-selection
          class="cr-separators"
        >
          <template>
            <settings-startup-url-entry
              model="[[item]]"
              first$="[[!index]]"
              tabindex$="[[tabIndex]]"
              iron-list-tab-index="[[tabIndex]]"
              last-focused="{{lastFocused_}}"
              list-blurred="{{listBlurred_}}"
              focus-row-index="[[index]]"
              editable="[[shouldAllowUrlsEdit_(
                    prefs.session.startup_urls.enforcement)]]"
            >
            </settings-startup-url-entry>
          </template>
        </iron-list>
      </div>
    </div>
    <div id="editOptions" class="list-frame">
      <template
        is="dom-if"
        if="[[shouldAllowUrlsEdit_(
          prefs.session.startup_urls.enforcement)]]"
        restamp
      >
        <div class="list-item" id="addPage">
          <a is="action-link" class="list-button" on-click="onAddPageClick_"> 娣诲姞鏂扮綉椤� </a>
        </div>
        <div class="list-item" id="useCurrentPages">
          <a is="action-link" class="list-button" on-click="onUseCurrentPagesClick_"> 浣跨敤褰撳墠缃戦〉 </a>
        </div>
      </template>
      <template is="dom-if" if="[[prefs.session.startup_urls.extensionId]]" restamp>
        <extension-controlled-indicator
          extension-id="[[prefs.session.startup_urls.extensionId]]"
          extension-name="[[prefs.session.startup_urls.controlledByName]]"
          extension-can-be-disabled="[[
                prefs.session.startup_urls.extensionCanBeDisabled]]"
        >
        </extension-controlled-indicator>
      </template>
    </div>
    <template is="dom-if" if="[[showStartupUrlDialog_]]" restamp>
      <settings-startup-url-dialog model="[[startupUrlDialogModel_]]" on-close="destroyUrlDialog_">
      </settings-startup-url-dialog>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsStartupUrlsPageElementBase = CrScrollableMixin(WebUiListenerMixin(PolymerElement));
class SettingsStartupUrlsPageElement extends SettingsStartupUrlsPageElementBase {
  static get is() {
    return 'settings-startup-urls-page';
  }
  static get template() {
    return getTemplate$n();
  }
  static get properties() {
    return {
      prefs: Object,
      startupPages_: Array,
      showStartupUrlDialog_: Boolean,
      startupUrlDialogModel_: Object,
      lastFocused_: Object,
      listBlurred_: Boolean,
    };
  }
  constructor() {
    super();
    this.browserProxy_ = StartupUrlsPageBrowserProxyImpl.getInstance();
    this.startupUrlDialogAnchor_ = null;
  }
  connectedCallback() {
    super.connectedCallback();
    this.addWebUiListener('update-startup-pages', (startupPages) => {
      if (this.startupUrlDialogModel_) {
        this.destroyUrlDialog_();
      }
      this.startupPages_ = startupPages;
      this.updateScrollableContents();
    });
    this.browserProxy_.loadStartupPages();
    this.addEventListener(EDIT_STARTUP_URL_EVENT, (event) => {
      const e = event;
      this.startupUrlDialogModel_ = e.detail.model;
      this.startupUrlDialogAnchor_ = e.detail.anchor;
      this.showStartupUrlDialog_ = true;
      e.stopPropagation();
    });
  }
  onAddPageClick_(e) {
    e.preventDefault();
    this.showStartupUrlDialog_ = true;
    this.startupUrlDialogAnchor_ = this.shadowRoot.querySelector('#addPage a[is=action-link]');
  }
  destroyUrlDialog_() {
    this.showStartupUrlDialog_ = false;
    this.startupUrlDialogModel_ = null;
    if (this.startupUrlDialogAnchor_) {
      focusWithoutInk(this.startupUrlDialogAnchor_);
      this.startupUrlDialogAnchor_ = null;
    }
  }
  onUseCurrentPagesClick_() {
    this.browserProxy_.useCurrentPages();
  }
  shouldAllowUrlsEdit_() {
    return this.get('prefs.session.startup_urls.enforcement') !== chrome.settingsPrivate.Enforcement.ENFORCED;
  }
}
customElements.define(SettingsStartupUrlsPageElement.is, SettingsStartupUrlsPageElement);
// Copyright 2016 The Chromium Authors
class OnStartupBrowserProxyImpl {
  getNtpExtension() {
    return sendWithPromise('getNtpExtension');
  }
  static getInstance() {
    return instance$5 || (instance$5 = new OnStartupBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$5 = obj;
  }
}
let instance$5 = null;
function getTemplate$m() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style settings-shared iron-flex">
      .block {
        display: block;
      }
    </style>
    <div class="cr-row first">
      <settings-radio-group
        id="onStartupRadioGroup"
        class="flex"
        pref="{{prefs.session.restore_on_startup}}"
        group-aria-label="鍚姩鏃�"
      >
        <controlled-radio-button
          name="[[getName_(prefValues_.OPEN_NEW_TAB)]]"
          pref="[[prefs.session.restore_on_startup]]"
          label="鎵撳紑鏂版爣绛鹃〉"
          no-extension-indicator
        >
        </controlled-radio-button>
        <template is="dom-if" if="[[ntpExtension_]]">
          <extension-controlled-indicator
            extension-id="[[ntpExtension_.id]]"
            extension-name="[[ntpExtension_.name]]"
            extension-can-be-disabled="[[ntpExtension_.canBeDisabled]]"
          >
          </extension-controlled-indicator>
        </template>
        <controlled-radio-button
          name="[[getName_(prefValues_.CONTINUE)]]"
          pref="[[prefs.session.restore_on_startup]]"
          label="缁х画娴忚涓婃鎵撳紑鐨勭綉椤�"
        >
        </controlled-radio-button>
        <controlled-radio-button
          name="[[getName_(prefValues_.OPEN_SPECIFIC)]]"
          pref="[[prefs.session.restore_on_startup]]"
          label="鎵撳紑鐗瑰畾缃戦〉鎴栦竴缁勭綉椤�"
        >
        </controlled-radio-button>
        <controlled-radio-button
          name="[[getName_(
          prefValues_.CONTINUE_AND_OPEN_SPECIFIC)]]"
          pref="[[prefs.session.restore_on_startup]]"
          label="缁х画娴忚涓婃鎵撳紑鐨勭綉椤靛苟鎵撳紑涓€缁勭壒瀹氱綉椤�"
          hidden="[[!showContinueAndOpenSpecific_(
              prefs.session.restore_on_startup)]]"
        >
        </controlled-radio-button>
      </settings-radio-group>
    </div>
    <template is="dom-if" if="[[showStartupUrls_(prefs.session.restore_on_startup.value)]]">
      <settings-startup-urls-page prefs="[[prefs]]"> </settings-startup-urls-page>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
var PrefValues;
(function (PrefValues) {
  PrefValues[(PrefValues['CONTINUE'] = 1)] = 'CONTINUE';
  PrefValues[(PrefValues['OPEN_NEW_TAB'] = 5)] = 'OPEN_NEW_TAB';
  PrefValues[(PrefValues['OPEN_SPECIFIC'] = 4)] = 'OPEN_SPECIFIC';
  PrefValues[(PrefValues['CONTINUE_AND_OPEN_SPECIFIC'] = 6)] = 'CONTINUE_AND_OPEN_SPECIFIC';
})(PrefValues || (PrefValues = {}));
const SettingsOnStartupPageElementBase = WebUiListenerMixin(PolymerElement);
class SettingsOnStartupPageElement extends SettingsOnStartupPageElementBase {
  static get is() {
    return 'settings-on-startup-page';
  }
  static get template() {
    return getTemplate$m();
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      ntpExtension_: Object,
      prefValues_: { readOnly: true, type: Object, value: PrefValues },
    };
  }
  connectedCallback() {
    super.connectedCallback();
    const updateNtpExtension = (ntpExtension) => {
      this.ntpExtension_ = ntpExtension;
    };
    OnStartupBrowserProxyImpl.getInstance().getNtpExtension().then(updateNtpExtension);
    this.addWebUiListener('update-ntp-extension', updateNtpExtension);
  }
  getName_(value) {
    return value.toString();
  }
  showStartupUrls_(restoreOnStartup) {
    return restoreOnStartup === PrefValues.OPEN_SPECIFIC || restoreOnStartup === PrefValues.CONTINUE_AND_OPEN_SPECIFIC;
  }
  showContinueAndOpenSpecific_(pref) {
    return (
      pref.enforcement === chrome.settingsPrivate.Enforcement.ENFORCED ||
      pref.enforcement === chrome.settingsPrivate.Enforcement.RECOMMENDED
    );
  }
}
customElements.define(SettingsOnStartupPageElement.is, SettingsOnStartupPageElement);
function getTemplate$l() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style settings-shared iron-flex">
      .sync-row {
        align-items: center;
        flex: auto;
      }
      #profile-icon {
        background: center/cover no-repeat;
        border-radius: 20px;
        flex-shrink: 0;
        height: 40px;
        width: 40px;
      }
      #sync-setup {
        --cr-secondary-text-color: var(--settings-error-color);
      }
      cr-link-row {
        --cr-link-row-icon-width: 40px;
        border-top: var(--cr-separator-line);
      }
      .icon-container {
        display: flex;
        flex-shrink: 0;
        justify-content: center;
        width: 40px;
      }
      #toast {
        left: 0;
        z-index: 1;
      }
      :host-context([dir='rtl']) #toast {
        left: auto;
        right: 0;
      }
      settings-sync-account-control[showing-promo]::part(banner) {
        border-top-left-radius: var(--cr-card-border-radius);
        border-top-right-radius: var(--cr-card-border-radius);
      }
      settings-sync-account-control[showing-promo]::part(title) {
        font-size: 1.1rem;
        line-height: 1.625rem;
      }
    </style>
    <settings-animated-pages id="pages" section="people" focus-config="[[focusConfig_]]">
      <div route-path="default">
        <template
          is="dom-if"
          if="[[shouldShowSyncAccountControl_(
            syncStatus.syncSystemEnabled)]]"
        >
          <settings-sync-account-control
            sync-status="[[syncStatus]]"
            prefs="{{prefs}}"
            promo-label-with-account="鍦� Chrome 涓晠浜� Google 鐨勬櫤鑳芥妧鏈�"
            promo-label-with-no-account="鍦� Chrome 涓晠浜� Google 鐨勬櫤鑳芥妧鏈�"
            promo-secondary-label-with-account="鍦ㄦ偍鐨勬墍鏈夎澶囦笂鍚屾骞朵釜鎬у寲璁剧疆 Chrome"
            promo-secondary-label-with-no-account="鍦ㄦ偍鐨勬墍鏈夎澶囦笂鍚屾骞朵釜鎬у寲璁剧疆 Chrome"
          >
          </settings-sync-account-control>
        </template>
        <template
          is="dom-if"
          if="[[!shouldShowSyncAccountControl_(
            syncStatus.syncSystemEnabled, signinAllowed_)]]"
          restamp
        >
          <div
            id="profile-row"
            class="cr-row first two-line"
            actionable$="[[isProfileActionable_]]"
            on-click="onProfileClick_"
          >
            <template is="dom-if" if="[[syncStatus]]">
              <div id="profile-icon" style="background-image:[[getIconImageSet_(profileIconUrl_) ]]"></div>
              <div class="flex cr-row-gap cr-padded-text text-elide">
                <span id="profile-name">[[profileName_]]</span>
              </div>

              <cr-icon-button
                class="subpage-arrow"
                aria-label="鑷畾涔変釜浜鸿祫鏂�"
                aria-describedby="profile-name"
                aria-roledescription="瀛愰〉闈㈡寜閽�"
              >
              </cr-icon-button>
            </template>
          </div>
        </template>

        <cr-link-row
          id="sync-setup"
          label="鍚屾鍔熻兘鍜� Google 鏈嶅姟"
          sub-label="[[getSyncAndGoogleServicesSubtext_(syncStatus)]]"
          on-click="onSyncClick_"
          role-description="瀛愰〉闈㈡寜閽�"
        >
        </cr-link-row>

        <template is="dom-if" if="[[signinAllowed_]]">
          <cr-link-row
            id="manage-google-account"
            label="绠＄悊鎮ㄧ殑 Google 甯愬彿"
            hidden="[[!shouldShowGoogleAccount_]]"
            on-click="openGoogleAccount_"
            external
          ></cr-link-row>

          <cr-link-row
            id="edit-profile"
            label="鑷畾涔夋偍鐨� Chrome 涓汉璧勬枡"
            on-click="onProfileClick_"
          ></cr-link-row>
        </template>

        <cr-link-row
          id="importDataDialogTrigger"
          label="瀵煎叆涔︾鍜岃缃�"
          on-click="onImportDataClick_"
        ></cr-link-row>
      </div>
      <template is="dom-if" route-path="/syncSetup">
        <settings-subpage
          associated-control="[[$$('#sync-setup')]]"
          page-title="鍚屾鍔熻兘鍜� Google 鏈嶅姟"
          learn-more-url="https://support.google.com/chrome?p=syncgoogleservices"
        >
          <settings-sync-page
            sync-status="[[syncStatus]]"
            prefs="{{prefs}}"
            page-visibility="[[pageVisibility.privacy]]"
            focus-config="[[focusConfig_]]"
          >
          </settings-sync-page>
        </settings-subpage>
      </template>

      <template is="dom-if" route-path="/syncSetup/advanced">
        <settings-subpage
          page-title="绠＄悊鎮ㄧ殑鍚屾鏁版嵁"
          associated-control="[[$$('#sync-setup')]]"
          learn-more-url="https://support.google.com/chrome?p=syncgoogleservices"
        >
          <settings-sync-controls sync-status="[[syncStatus]]"> </settings-sync-controls>
        </settings-subpage>
      </template>

      <template is="dom-if" route-path="/manageProfile">
        <settings-subpage
          associated-control="[[getEditPersonAssocControl_(signinAllowed_)]]"
          page-title="鑷畾涔変釜浜鸿祫鏂�"
        >
          <settings-manage-profile profile-name="[[profileName_]]" sync-status="[[syncStatus]]">
          </settings-manage-profile>
        </settings-subpage>
      </template>
    </settings-animated-pages>

    <template is="dom-if" if="[[showSignoutDialog_]]" restamp>
      <settings-signout-dialog sync-status="[[syncStatus]]" on-close="onDisconnectDialogClosed_">
      </settings-signout-dialog>
    </template>

    <template is="dom-if" if="[[showImportDataDialog_]]" restamp>
      <settings-import-data-dialog prefs="{{prefs}}" on-close="onImportDataDialogClosed_">
      </settings-import-data-dialog>
    </template>
    <cr-toast duration="3000" id="toast">
      <span>璁剧疆宸蹭繚瀛樸€傚凡寮€濮嬪悓姝ャ€�</span>
    </cr-toast>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsPeoplePageElementBase = RouteObserverMixin(WebUiListenerMixin(BaseMixin(PolymerElement)));
class SettingsPeoplePageElement extends SettingsPeoplePageElementBase {
  constructor() {
    super(...arguments);
    this.syncBrowserProxy_ = SyncBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-people-page';
  }
  static get template() {
    return getTemplate$l();
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      signinAllowed_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('signinAllowed');
        },
      },
      storedAccounts: Object,
      syncStatus: Object,
      pageVisibility: Object,
      authToken_: { type: String, value: '' },
      profileIconUrl_: String,
      isProfileActionable_: {
        type: Boolean,
        value() {
          {
            return true;
          }
        },
        readOnly: true,
      },
      profileName_: String,
      shouldShowGoogleAccount_: {
        type: Boolean,
        value: false,
        computed:
          'computeShouldShowGoogleAccount_(storedAccounts, syncStatus,' +
          'storedAccounts.length, syncStatus.signedIn, syncStatus.hasError)',
      },
      showImportDataDialog_: { type: Boolean, value: false },
      showSignoutDialog_: Boolean,
      focusConfig_: {
        type: Object,
        value() {
          const map = new Map();
          if (routes.SYNC) {
            map.set(routes.SYNC.path, '#sync-setup');
          }
          if (routes.MANAGE_PROFILE) {
            map.set(
              routes.MANAGE_PROFILE.path,
              loadTimeData.getBoolean('signinAllowed') ? '#edit-profile' : '#profile-row .subpage-arrow'
            );
          }
          return map;
        },
      },
    };
  }
  connectedCallback() {
    super.connectedCallback();
    {
      ProfileInfoBrowserProxyImpl.getInstance().getProfileInfo().then(this.handleProfileInfo_.bind(this));
      this.addWebUiListener('profile-info-changed', this.handleProfileInfo_.bind(this));
    }
    this.syncBrowserProxy_.getSyncStatus().then(this.handleSyncStatus_.bind(this));
    this.addWebUiListener('sync-status-changed', this.handleSyncStatus_.bind(this));
    const handleStoredAccounts = (accounts) => {
      this.storedAccounts = accounts;
    };
    this.syncBrowserProxy_.getStoredAccounts().then(handleStoredAccounts);
    this.addWebUiListener('stored-accounts-updated', handleStoredAccounts);
    this.addWebUiListener('sync-settings-saved', () => {
      this.$.toast.show();
    });
  }
  currentRouteChanged() {
    this.showImportDataDialog_ = Router.getInstance().getCurrentRoute() === routes.IMPORT_DATA;
    if (Router.getInstance().getCurrentRoute() === routes.SIGN_OUT) {
      if (this.syncStatus && !this.syncStatus.signedIn) {
        Router.getInstance().navigateToPreviousRoute();
      } else {
        this.showSignoutDialog_ = true;
      }
    }
  }
  getEditPersonAssocControl_() {
    return this.signinAllowed_
      ? this.shadowRoot.querySelector('#edit-profile')
      : this.shadowRoot.querySelector('#profile-row');
  }
  getSyncAndGoogleServicesSubtext_() {
    if (this.syncStatus && this.syncStatus.hasError && this.syncStatus.statusText) {
      return this.syncStatus.statusText;
    }
    return '';
  }
  handleProfileInfo_(info) {
    this.profileName_ = info.name;
    this.profileIconUrl_ = info.iconUrl;
  }
  handleSyncStatus_(syncStatus) {
    const shouldRecordSigninImpression = !this.syncStatus && syncStatus && this.signinAllowed_ && !syncStatus.signedIn;
    this.syncStatus = syncStatus;
    if (shouldRecordSigninImpression && !this.shouldShowSyncAccountControl_()) {
      chrome.metricsPrivate.recordUserAction('Signin_Impression_FromSettings');
    }
  }
  computeShouldShowGoogleAccount_() {
    if (this.storedAccounts === undefined || this.syncStatus === undefined) {
      return false;
    }
    return (this.storedAccounts.length > 0 || !!this.syncStatus.signedIn) && !this.syncStatus.hasError;
  }
  onProfileClick_() {
    Router.getInstance().navigateTo(routes.MANAGE_PROFILE);
  }
  onDisconnectDialogClosed_() {
    this.showSignoutDialog_ = false;
    if (Router.getInstance().getCurrentRoute() === routes.SIGN_OUT) {
      Router.getInstance().navigateToPreviousRoute();
    }
  }
  onSyncClick_() {
    Router.getInstance().navigateTo(routes.SYNC);
  }
  onImportDataClick_() {
    Router.getInstance().navigateTo(routes.IMPORT_DATA);
  }
  onImportDataDialogClosed_() {
    Router.getInstance().navigateToPreviousRoute();
    focusWithoutInk(this.$.importDataDialogTrigger);
  }
  openGoogleAccount_() {
    OpenWindowProxyImpl.getInstance().openUrl(loadTimeData.getString('googleAccountUrl'));
    chrome.metricsPrivate.recordUserAction('ManageGoogleAccount_Clicked');
  }
  shouldShowSyncAccountControl_() {
    if (this.syncStatus === undefined) {
      return false;
    }
    return !!this.syncStatus.syncSystemEnabled && this.signinAllowed_;
  }
  getIconImageSet_(iconUrl) {
    return getImage(iconUrl);
  }
}
customElements.define(SettingsPeoplePageElement.is, SettingsPeoplePageElement);
function getTemplate$k() {
  return html`<!--_html_template_start_--><style include="cr-shared-style settings-shared">
      .battery-saver-radio-group {
        padding-block-end: var(--cr-section-vertical-padding);
      }
    </style>
    <settings-toggle-button
      id="toggleButton"
      on-change="onChange_"
      pref="{{prefs.performance_tuning.battery_saver_mode.state}}"
      label="鑺傝兘妯″紡"
      sub-label="寮€鍚璁剧疆鍚庯紝Chrome 浼氶€氳繃闄愬埗鍚庡彴娲诲姩鍜岃瑙夋晥鏋滐紙渚嬪娴佺晠婊氬姩鍜岃棰戝抚閫熺巼锛夋潵鑺傜渷鐢垫睜鐢甸噺銆�"
      learn-more-url="https://support.google.com/chrome/?p=chrome_battery_saver"
      numeric-unchecked-value="[[batterySaverModeStateEnum_.DISABLED]]"
      numeric-checked-value="[[batterySaverModeStateEnum_.ENABLED_BELOW_THRESHOLD]]"
    >
    </settings-toggle-button>
    <iron-collapse
      id="radioGroupCollapse"
      opened="[[isBatterySaverModeEnabled_(
    prefs.performance_tuning.battery_saver_mode.state.value)]]"
    >
      <div class="cr-row continuation battery-saver-radio-group">
        <settings-radio-group
          id="radioGroup"
          on-change="onChange_"
          pref="{{prefs.performance_tuning.battery_saver_mode.state}}"
          group-aria-label="鑺傝兘妯″紡閫夐」"
        >
          <controlled-radio-button
            label="浠呭湪鎴戠殑鐢垫睜鐢甸噺涓嶉珮浜� 20% 鏃跺紑鍚�"
            name="[[batterySaverModeStateEnum_.ENABLED_BELOW_THRESHOLD]]"
            pref="[[prefs.performance_tuning.battery_saver_mode.state]]"
          >
          </controlled-radio-button>
          <controlled-radio-button
            id="enabledOnBatteryButton"
            label="鍦ㄦ嫈涓嬭绠楁満鐢垫簮绾挎椂寮€鍚�"
            name="[[batterySaverModeStateEnum_.ENABLED_ON_BATTERY]]"
            pref="[[prefs.performance_tuning.battery_saver_mode.state]]"
          >
          </controlled-radio-button>
        </settings-radio-group>
      </div> </iron-collapse
    ><!--_html_template_end_-->`;
}
// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var BatterySaverModeState;
(function (BatterySaverModeState) {
  BatterySaverModeState[(BatterySaverModeState['DISABLED'] = 0)] = 'DISABLED';
  BatterySaverModeState[(BatterySaverModeState['ENABLED_BELOW_THRESHOLD'] = 1)] = 'ENABLED_BELOW_THRESHOLD';
  BatterySaverModeState[(BatterySaverModeState['ENABLED_ON_BATTERY'] = 2)] = 'ENABLED_ON_BATTERY';
  BatterySaverModeState[(BatterySaverModeState['ENABLED'] = 3)] = 'ENABLED';
  BatterySaverModeState[(BatterySaverModeState['COUNT'] = 4)] = 'COUNT';
})(BatterySaverModeState || (BatterySaverModeState = {}));
var HighEfficiencyModeExceptionListAction;
(function (HighEfficiencyModeExceptionListAction) {
  HighEfficiencyModeExceptionListAction[(HighEfficiencyModeExceptionListAction['ADD_MANUAL'] = 0)] = 'ADD_MANUAL';
  HighEfficiencyModeExceptionListAction[(HighEfficiencyModeExceptionListAction['EDIT'] = 1)] = 'EDIT';
  HighEfficiencyModeExceptionListAction[(HighEfficiencyModeExceptionListAction['REMOVE'] = 2)] = 'REMOVE';
  HighEfficiencyModeExceptionListAction[(HighEfficiencyModeExceptionListAction['ADD_FROM_CURRENT'] = 3)] =
    'ADD_FROM_CURRENT';
  HighEfficiencyModeExceptionListAction[(HighEfficiencyModeExceptionListAction['COUNT'] = 4)] = 'COUNT';
})(HighEfficiencyModeExceptionListAction || (HighEfficiencyModeExceptionListAction = {}));
var HighEfficiencyModeState;
(function (HighEfficiencyModeState) {
  HighEfficiencyModeState[(HighEfficiencyModeState['DISABLED'] = 0)] = 'DISABLED';
  HighEfficiencyModeState[(HighEfficiencyModeState['ENABLED'] = 1)] = 'ENABLED';
  HighEfficiencyModeState[(HighEfficiencyModeState['ENABLED_ON_TIMER'] = 2)] = 'ENABLED_ON_TIMER';
  HighEfficiencyModeState[(HighEfficiencyModeState['COUNT'] = 3)] = 'COUNT';
})(HighEfficiencyModeState || (HighEfficiencyModeState = {}));
class PerformanceMetricsProxyImpl {
  recordBatterySaverModeChanged(state) {
    chrome.metricsPrivate.recordEnumerationValue(
      'PerformanceControls.BatterySaver.SettingsChangeMode',
      state,
      BatterySaverModeState.COUNT
    );
  }
  recordHighEfficiencyModeChanged(state) {
    chrome.metricsPrivate.recordEnumerationValue(
      'PerformanceControls.HighEfficiency.SettingsChangeMode2',
      state,
      HighEfficiencyModeState.COUNT
    );
  }
  recordExceptionListAction(action) {
    chrome.metricsPrivate.recordEnumerationValue(
      'PerformanceControls.HighEfficiency.SettingsChangeExceptionList',
      action,
      HighEfficiencyModeExceptionListAction.COUNT
    );
  }
  static getInstance() {
    return instance$4 || (instance$4 = new PerformanceMetricsProxyImpl());
  }
  static setInstance(obj) {
    instance$4 = obj;
  }
}
let instance$4 = null;
// Copyright 2022 The Chromium Authors
const BATTERY_SAVER_MODE_PREF = 'performance_tuning.battery_saver_mode.state';
const SettingsBatteryPageElementBase = PrefsMixin(PolymerElement);
class SettingsBatteryPageElement extends SettingsBatteryPageElementBase {
  constructor() {
    super(...arguments);
    this.metricsProxy_ = PerformanceMetricsProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-battery-page';
  }
  static get template() {
    return getTemplate$k();
  }
  static get properties() {
    return { batterySaverModeStateEnum_: { readOnly: true, type: Object, value: BatterySaverModeState } };
  }
  isBatterySaverModeEnabled_(value) {
    return value !== BatterySaverModeState.DISABLED;
  }
  onChange_() {
    this.metricsProxy_.recordBatterySaverModeChanged(this.getPref(BATTERY_SAVER_MODE_PREF).value);
  }
}
customElements.define(SettingsBatteryPageElement.is, SettingsBatteryPageElement);
function getTemplate$j() {
  return html`<!--_html_template_start_--><cr-input
      id="input"
      label="缃戠珯"
      aria-label$="娣诲姞缃戠珯"
      placeholder="example.com"
      value="{{rule}}"
      on-input="validate"
      error-message="[[errorMessage]]"
      invalid="[[inputInvalid]]"
      spellcheck="false"
      autofocus
    >
    </cr-input>
    <!--_html_template_end_-->`;
}
// Copyright 2022 The Chromium Authors
class PerformanceBrowserProxyImpl {
  getCurrentOpenSites() {
    return sendWithPromise('getCurrentOpenSites');
  }
  getDeviceHasBattery() {
    return sendWithPromise('getDeviceHasBattery');
  }
  openBatterySaverFeedbackDialog() {
    chrome.send('openBatterySaverFeedbackDialog');
  }
  openHighEfficiencyFeedbackDialog() {
    chrome.send('openHighEfficiencyFeedbackDialog');
  }
  validateTabDiscardExceptionRule(rule) {
    return sendWithPromise('validateTabDiscardExceptionRule', rule);
  }
  static getInstance() {
    return instance$3 || (instance$3 = new PerformanceBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$3 = obj;
  }
}
let instance$3 = null;
// Copyright 2023 The Chromium Authors
const MAX_TAB_DISCARD_EXCEPTION_RULE_LENGTH = 10 * 1024;
const TAB_DISCARD_EXCEPTIONS_PREF = 'performance_tuning.tab_discarding.exceptions';
const TAB_DISCARD_EXCEPTIONS_MANAGED_PREF = 'performance_tuning.tab_discarding.exceptions_managed';
const TabDiscardExceptionValidationMixin = dedupingMixin((superClass) => {
  class TabDiscardExceptionValidationMixin extends I18nMixin(superClass) {
    constructor() {
      super(...arguments);
      this.browserProxy_ = PerformanceBrowserProxyImpl.getInstance();
    }
    static get properties() {
      return {
        errorMessage: { type: String, value: '' },
        inputInvalid: { type: Boolean, value: false },
        rule: String,
        submitDisabled: { type: Boolean, value: true, notify: true },
      };
    }
    validate() {
      const rule = this.rule.trim();
      if (!rule) {
        this.inputInvalid = false;
        this.submitDisabled = true;
        this.errorMessage = '';
        return;
      }
      if (rule.length > MAX_TAB_DISCARD_EXCEPTION_RULE_LENGTH) {
        this.inputInvalid = true;
        this.submitDisabled = true;
        this.errorMessage = this.i18n('onStartupUrlTooLong');
        return;
      }
      this.browserProxy_.validateTabDiscardExceptionRule(rule).then((valid) => {
        this.inputInvalid = !valid;
        this.submitDisabled = !valid;
        this.errorMessage = valid ? '' : this.i18n('onStartupInvalidUrl');
      });
    }
  }
  return TabDiscardExceptionValidationMixin;
});
// Copyright 2023 The Chromium Authors
const TabDiscardExceptionAddInputElementBase = TabDiscardExceptionValidationMixin(
  ListPropertyUpdateMixin(PrefsMixin(PolymerElement))
);
class TabDiscardExceptionAddInputElement extends TabDiscardExceptionAddInputElementBase {
  constructor() {
    super(...arguments);
    this.metricsProxy_ = PerformanceMetricsProxyImpl.getInstance();
  }
  static get is() {
    return 'tab-discard-exception-add-input';
  }
  static get template() {
    return getTemplate$j();
  }
  submit() {
    assert(!this.submitDisabled);
    const rule = this.rule.trim();
    this.appendPrefListItem(TAB_DISCARD_EXCEPTIONS_PREF, rule);
    this.metricsProxy_.recordExceptionListAction(HighEfficiencyModeExceptionListAction.ADD_MANUAL);
  }
}
customElements.define(TabDiscardExceptionAddInputElement.is, TabDiscardExceptionAddInputElement);
function getTemplate$i() {
  return html`<!--_html_template_start_--><cr-dialog id="dialog" close-text="鍏抽棴" show-on-attach>
      <div slot="title">娣诲姞缃戠珯</div>
      <div slot="body">
        <tab-discard-exception-add-input id="input" prefs="{{prefs}}" submit-disabled="{{submitDisabled}}">
        </tab-discard-exception-add-input>
      </div>
      <div slot="button-container">
        <cr-button id="cancelButton" class="cancel-button" on-click="onCancelClick_"> 鍙栨秷 </cr-button>
        <cr-button
          id="actionButton"
          class="action-button"
          on-click="onSubmitClick_"
          disabled$="[[submitDisabled]]"
          aria-label$="娣诲姞鍒扳€滃缁堣杩欎簺缃戠珯淇濇寔娲诲姩鐘舵€佲€濆垪琛�"
        >
          娣诲姞
        </cr-button>
      </div>
    </cr-dialog>
    <!--_html_template_end_-->`;
}
// Copyright 2023 The Chromium Authors
const TabDiscardExceptionAddDialogElementBase = PrefsMixin(PolymerElement);
class TabDiscardExceptionAddDialogElement extends TabDiscardExceptionAddDialogElementBase {
  static get is() {
    return 'tab-discard-exception-add-dialog';
  }
  static get template() {
    return getTemplate$i();
  }
  onCancelClick_() {
    this.$.dialog.cancel();
  }
  onSubmitClick_() {
    this.$.dialog.close();
    this.$.input.submit();
  }
}
customElements.define(TabDiscardExceptionAddDialogElement.is, TabDiscardExceptionAddDialogElement);
function getTemplate$h() {
  return html`<!--_html_template_start_--><cr-input
      id="input"
      label="缃戠珯"
      aria-label$="淇敼缃戠珯"
      placeholder="example.com"
      value="{{rule}}"
      on-input="validate"
      error-message="[[errorMessage]]"
      invalid="[[inputInvalid]]"
      spellcheck="false"
      autofocus
    >
    </cr-input>
    <!--_html_template_end_-->`;
}
// Copyright 2023 The Chromium Authors
const TabDiscardExceptionEditInputElementBase = TabDiscardExceptionValidationMixin(
  ListPropertyUpdateMixin(PrefsMixin(PolymerElement))
);
class TabDiscardExceptionEditInputElement extends TabDiscardExceptionEditInputElementBase {
  constructor() {
    super(...arguments);
    this.metricsProxy_ = PerformanceMetricsProxyImpl.getInstance();
  }
  static get is() {
    return 'tab-discard-exception-edit-input';
  }
  static get template() {
    return getTemplate$h();
  }
  static get properties() {
    return { ruleToEdit: { type: String, value: '' } };
  }
  ready() {
    super.ready();
    this.rule = this.ruleToEdit;
    this.submitDisabled = false;
  }
  submit() {
    assert(!this.submitDisabled);
    const rule = this.rule.trim();
    if (rule !== this.ruleToEdit) {
      if (this.getPref(TAB_DISCARD_EXCEPTIONS_PREF).value.includes(rule)) {
        this.deletePrefListItem(TAB_DISCARD_EXCEPTIONS_PREF, this.ruleToEdit);
      } else {
        this.updatePrefListItem(TAB_DISCARD_EXCEPTIONS_PREF, this.ruleToEdit, rule);
      }
    }
    this.metricsProxy_.recordExceptionListAction(HighEfficiencyModeExceptionListAction.EDIT);
  }
  setRuleToEditForTesting() {
    this.rule = this.ruleToEdit;
  }
}
customElements.define(TabDiscardExceptionEditInputElement.is, TabDiscardExceptionEditInputElement);
function getTemplate$g() {
  return html`<!--_html_template_start_--><cr-dialog id="dialog" close-text="鍏抽棴" show-on-attach>
      <div slot="title">淇敼缃戠珯</div>
      <div slot="body">
        <tab-discard-exception-edit-input
          id="input"
          prefs="{{prefs}}"
          rule-to-edit="[[ruleToEdit]]"
          submit-disabled="{{submitDisabled}}"
        >
        </tab-discard-exception-edit-input>
      </div>
      <div slot="button-container">
        <cr-button id="cancelButton" class="cancel-button" on-click="onCancelClick_"> 鍙栨秷 </cr-button>
        <cr-button
          id="actionButton"
          class="action-button"
          on-click="onSubmitClick_"
          disabled$="[[submitDisabled]]"
          aria-label$="淇濆瓨鍒扳€滃缁堣杩欎簺缃戠珯淇濇寔娲诲姩鐘舵€佲€濆垪琛�"
        >
          淇濆瓨
        </cr-button>
      </div>
    </cr-dialog>
    <!--_html_template_end_-->`;
}
// Copyright 2023 The Chromium Authors
const TabDiscardExceptionEditDialogElementBase = PrefsMixin(PolymerElement);
class TabDiscardExceptionEditDialogElement extends TabDiscardExceptionEditDialogElementBase {
  static get is() {
    return 'tab-discard-exception-edit-dialog';
  }
  static get template() {
    return getTemplate$g();
  }
  static get properties() {
    return { ruleToEdit: { type: String, value: '' } };
  }
  onCancelClick_() {
    this.$.dialog.cancel();
  }
  onSubmitClick_() {
    this.$.dialog.close();
    this.$.input.submit();
  }
  setRuleToEditForTesting(rule) {
    this.ruleToEdit = rule;
    this.$.input.setRuleToEditForTesting();
  }
}
customElements.define(TabDiscardExceptionEditDialogElement.is, TabDiscardExceptionEditDialogElement);
function getTemplate$f() {
  return html`<!--_html_template_start_--><style include="settings-shared">
      cr-policy-pref-indicator::part(tooltip) {
        clip: rect(0 0 0 0);
        height: 1px;
        overflow: hidden;
        width: 1px;
      }
      cr-policy-pref-indicator {
        padding-inline-end: 8px;
      }
    </style>
    <div class="list-item">
      <div class="start text-elide">[[entry.site]]</div>
      <template is="dom-if" if="[[entry.managed]]">
        <cr-policy-pref-indicator
          pref="[[prefs.performance_tuning.tab_discarding.exceptions_managed]]"
          on-mouseenter="onShowTooltip_"
          on-focus="onShowTooltip_"
        >
        </cr-policy-pref-indicator>
      </template>
      <template is="dom-if" if="[[!entry.managed]]">
        <cr-icon-button class="icon-more-vert" title="鏇村鎿嶄綔" on-click="onMenuClick_" aria-label="鏇村鎿嶄綔">
        </cr-icon-button>
      </template>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2022 The Chromium Authors
const TabDiscardExceptionEntryElementBase = BaseMixin(PolymerElement);
class TabDiscardExceptionEntryElement extends TabDiscardExceptionEntryElementBase {
  static get is() {
    return 'tab-discard-exception-entry';
  }
  static get template() {
    return getTemplate$f();
  }
  static get properties() {
    return { entry: Object, prefs: Object };
  }
  onMenuClick_(e) {
    this.fire('menu-click', { target: e.target, site: this.entry.site });
  }
  onShowTooltip_() {
    const indicator = this.shadowRoot.querySelector('cr-policy-pref-indicator');
    assert(!!indicator);
    this.fire('show-tooltip', { target: indicator, text: indicator.indicatorTooltip });
  }
}
customElements.define(TabDiscardExceptionEntryElement.is, TabDiscardExceptionEntryElement);
function getTemplate$e() {
  return html`<!--_html_template_start_--><style include="settings-shared">
      .ripple-padding {
        padding-inline-end: 20px;
        padding-inline-start: 20px;
      }
      cr-checkbox::part(label-container) {
        min-width: 0;
      }
      .label-slot {
        align-items: center;
        display: flex;
      }
      .checkbox-label {
        margin-inline-start: 10px;
      }
    </style>
    <cr-checkbox id="checkbox" class="list-item no-outline ripple-padding" tab-index="-1">
      <div class="label-slot">
        <site-favicon url="[[item]]"></site-favicon>
        <div class="checkbox-label text-elide">[[item]]</div>
      </div>
    </cr-checkbox>
    <!--_html_template_end_-->`;
}
// Copyright 2023 The Chromium Authors
class TabDiscardExceptionCurrentSitesEntryElement extends PolymerElement {
  static get is() {
    return 'tab-discard-exception-current-sites-entry';
  }
  static get template() {
    return getTemplate$e();
  }
  static get properties() {
    return { item: String };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.onKeyDown_);
    this.addEventListener('keyup', this.onKeyUp_);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.onKeyDown_);
    this.removeEventListener('keyup', this.onKeyUp_);
  }
  onKeyDown_(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.repeat) {
      return;
    }
    if (e.key === 'Enter') {
      this.$.checkbox.click();
    }
  }
  onKeyUp_(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    }
    if (e.key === ' ') {
      this.$.checkbox.click();
    }
  }
}
customElements.define(TabDiscardExceptionCurrentSitesEntryElement.is, TabDiscardExceptionCurrentSitesEntryElement);
function getTemplate$d() {
  return html`<!--_html_template_start_-->
    <div id="container" scrollable>
      <iron-list
        id="list"
        scroll-target="container"
        role="listbox"
        items="[[currentSites_]]"
        selected-items="{{selectedSites_}}"
        selection-enabled
        multi-selection
        aria-multiselectable="true"
        hidden$="[[!currentSites_.length]]"
      >
        <template>
          <tab-discard-exception-current-sites-entry
            item="[[item]]"
            role="option"
            aria-description="褰撳墠鎵撳紑鐨勭綉绔�"
            aria-selected="[[selected]]"
            tab-index="[[tabIndex]]"
            on-change="onToggleSelection_"
          >
          </tab-discard-exception-current-sites-entry>
        </template>
      </iron-list>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2023 The Chromium Authors
const TabDiscardExceptionCurrentSitesListElementBase = ListPropertyUpdateMixin(
  CrScrollableMixin(PrefsMixin(PolymerElement))
);
class TabDiscardExceptionCurrentSitesListElement extends TabDiscardExceptionCurrentSitesListElementBase {
  constructor() {
    super(...arguments);
    this.browserProxy_ = PerformanceBrowserProxyImpl.getInstance();
    this.metricsProxy_ = PerformanceMetricsProxyImpl.getInstance();
    this.updateIntervalID_ = undefined;
  }
  static get is() {
    return 'tab-discard-exception-current-sites-list';
  }
  static get template() {
    return getTemplate$d();
  }
  static get properties() {
    return {
      currentSites_: { type: Array, value: [] },
      selectedSites_: { type: Array, value: [] },
      submitDisabled: { type: Boolean, computed: 'computeSubmitDisabled_(selectedSites_.length)', notify: true },
      updateIntervalMS_: { type: Number, value: 1e3 },
      visible: { type: Boolean, value: true, observer: 'onVisibilityChanged_' },
    };
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateCurrentSites_();
    this.dispatchEvent(new CustomEvent('sites-populated', { detail: { length: this.currentSites_.length } }));
    this.onVisibilityChanged_();
    this.onVisibilityChangedListener_ = this.onVisibilityChanged_.bind(this);
    document.addEventListener('visibilitychange', this.onVisibilityChangedListener_);
  }
  disconnectedCallback() {
    document.removeEventListener('visibilitychange', this.onVisibilityChangedListener_);
    this.stopUpdatingCurrentSites_();
  }
  onVisibilityChanged_() {
    if (this.visible && document.visibilityState === 'visible') {
      this.startUpdatingCurrentSites_();
    } else {
      this.stopUpdatingCurrentSites_();
    }
  }
  startUpdatingCurrentSites_() {
    if (this.updateIntervalID_ === undefined) {
      this.updateCurrentSites_().then(() => {
        this.updateIntervalID_ = setInterval(this.updateCurrentSites_.bind(this), this.updateIntervalMS_);
      });
    }
  }
  stopUpdatingCurrentSites_() {
    if (this.updateIntervalID_ !== undefined) {
      clearInterval(this.updateIntervalID_);
      this.updateIntervalID_ = undefined;
    }
  }
  setUpdateIntervalForTesting(updateIntervalMS) {
    this.updateIntervalMS_ = updateIntervalMS;
  }
  getIsUpdatingForTesting() {
    return this.updateIntervalID_ !== undefined;
  }
  async updateCurrentSites_() {
    const currentSites = await this.browserProxy_.getCurrentOpenSites();
    const existingSites = new Set(this.getPref(TAB_DISCARD_EXCEPTIONS_PREF).value);
    this.updateList(
      'currentSites_',
      (x) => x,
      currentSites.filter((rule) => !existingSites.has(rule))
    );
    if (this.currentSites_.length) {
      this.updateScrollableContents();
    }
  }
  computeSubmitDisabled_() {
    return !this.selectedSites_.length;
  }
  onToggleSelection_(e) {
    this.$.list.toggleSelectionForIndex(e.model.index);
  }
  submit() {
    assert(!this.submitDisabled);
    this.selectedSites_.forEach((rule) => {
      this.appendPrefListItem(TAB_DISCARD_EXCEPTIONS_PREF, rule);
    });
    this.metricsProxy_.recordExceptionListAction(HighEfficiencyModeExceptionListAction.ADD_FROM_CURRENT);
  }
}
customElements.define(TabDiscardExceptionCurrentSitesListElement.is, TabDiscardExceptionCurrentSitesListElement);
function getTemplate$c() {
  return html`<!--_html_template_start_--><style>
      cr-tabs {
        --cr-tabs-font-size: 100%;
        --cr-tabs-height: 40px;
      }
      #dialog {
        --border-top-color: var(--google-grey-300);
        --cr-dialog-body-border-top: 1px solid var(--border-top-color);
      }
      @media (prefers-color-scheme: dark) {
        #dialog {
          --border-top-color: var(--cr-separator-color);
        }
      }
      #dialog::part(wrapper) {
        overflow: hidden;
      }
      #dialog [slot='title'] {
        padding-bottom: 8px;
      }
      #dialog::part(body-container) {
        height: 250px;
      }
      #body {
        padding-inline-end: 0;
        padding-inline-start: 0;
      }
      #helpText {
        padding-bottom: 20px;
      }
      #inputPage {
        padding-inline-end: 20px;
        padding-inline-start: 20px;
        padding-top: 20px;
      }
    </style>
    <cr-dialog id="dialog" close-text="鍏抽棴">
      <div slot="title">娣诲姞缃戠珯</div>
      <div slot="header">
        <cr-tabs id="tabs" tab-names="[[tabNames_]]" selected="{{selectedTab_}}"> </cr-tabs>
      </div>
      <div id="body" slot="body">
        <iron-pages selected="[[selectedTab_]]">
          <tab-discard-exception-current-sites-list
            id="list"
            prefs="{{prefs}}"
            on-sites-populated="onSitesPopulated_"
            visible="[[isAddCurrentSitesTabSelected_(selectedTab_)]]"
            submit-disabled="{{submitDisabledList_}}"
          >
          </tab-discard-exception-current-sites-list>
          <div id="inputPage">
            <div id="helpText">
              鎮ㄦ坊鍔犵殑缃戠珯灏嗗缁堜繚鎸佹椿璺冪姸鎬侊紝涓旂郴缁熶笉浼氫粠瀹冧滑涓噴鏀惧唴瀛樸€�<a
                href="https://support.google.com/chrome/?p=performance_site_exclusion"
                target="_blank"
                >璇︾粏浜嗚В缃戠珯鎺掗櫎</a
              >
            </div>
            <tab-discard-exception-add-input id="input" prefs="{{prefs}}" submit-disabled="{{submitDisabledManual_}}">
            </tab-discard-exception-add-input>
          </div>
        </iron-pages>
      </div>
      <div slot="button-container">
        <cr-button id="cancelButton" class="cancel-button" on-click="onCancelClick_"> 鍙栨秷 </cr-button>
        <cr-button
          id="actionButton"
          class="action-button"
          on-click="onSubmitClick_"
          disabled$="[[isSubmitDisabled_(
            submitDisabledList_, submitDisabledManual_, selectedTab_)]]"
          aria-label$="娣诲姞鍒扳€滃缁堣杩欎簺缃戠珯淇濇寔娲诲姩鐘舵€佲€濆垪琛�"
        >
          娣诲姞
        </cr-button>
      </div>
    </cr-dialog>
    <!--_html_template_end_-->`;
}
// Copyright 2023 The Chromium Authors
var TabDiscardExceptionAddDialogTabs;
(function (TabDiscardExceptionAddDialogTabs) {
  TabDiscardExceptionAddDialogTabs[(TabDiscardExceptionAddDialogTabs['CURRENT_SITES'] = 0)] = 'CURRENT_SITES';
  TabDiscardExceptionAddDialogTabs[(TabDiscardExceptionAddDialogTabs['MANUAL'] = 1)] = 'MANUAL';
})(TabDiscardExceptionAddDialogTabs || (TabDiscardExceptionAddDialogTabs = {}));
const TabDiscardExceptionTabbedAddDialogElementBase = PrefsMixin(PolymerElement);
class TabDiscardExceptionTabbedAddDialogElement extends TabDiscardExceptionTabbedAddDialogElementBase {
  static get is() {
    return 'tab-discard-exception-tabbed-add-dialog';
  }
  static get template() {
    return getTemplate$c();
  }
  static get properties() {
    return {
      selectedTab_: { type: Number, value: TabDiscardExceptionAddDialogTabs.MANUAL },
      tabNames_: {
        type: Array,
        value: [
          loadTimeData.getString('tabDiscardingExceptionsAddDialogCurrentTabs'),
          loadTimeData.getString('tabDiscardingExceptionsAddDialogManual'),
        ],
      },
      submitDisabledList_: Boolean,
      submitDisabledManual_: Boolean,
    };
  }
  onSitesPopulated_(e) {
    if (e.detail.length > 0) {
      this.selectedTab_ = TabDiscardExceptionAddDialogTabs.CURRENT_SITES;
    }
    this.$.dialog.showModal();
  }
  isAddCurrentSitesTabSelected_() {
    return this.selectedTab_ === TabDiscardExceptionAddDialogTabs.CURRENT_SITES;
  }
  onCancelClick_() {
    this.$.dialog.cancel();
  }
  onSubmitClick_() {
    this.$.dialog.close();
    if (this.isAddCurrentSitesTabSelected_()) {
      this.$.list.submit();
    } else {
      this.$.input.submit();
    }
  }
  isSubmitDisabled_() {
    if (this.isAddCurrentSitesTabSelected_()) {
      return this.submitDisabledList_;
    }
    return this.submitDisabledManual_;
  }
}
customElements.define(TabDiscardExceptionTabbedAddDialogElement.is, TabDiscardExceptionTabbedAddDialogElement);
function getTemplate$b() {
  return html`<!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex">
      .cr-padded-text {
        flex: 1;
      }
      .list-frame {
        padding-inline-start: var(--cr-section-indent-width);
      }
      #outer > tab-discard-exception-entry:not(:first-of-type) {
        border-top: var(--cr-separator-line);
      }
      #expandButton {
        padding-inline-end: 0;
        padding-inline-start: 0;
        --cr-icon-button-margin-end: 0;
      }
    </style>
    <div class="cr-row">
      <div class="cr-padded-text">濮嬬粓璁╄繖浜涚綉绔欎繚鎸佹椿鍔ㄧ姸鎬�</div>
      <cr-button
        id="addButton"
        on-click="onAddClick_"
        aria-label="娣诲姞鍒扳€滃缁堣杩欎簺缃戠珯淇濇寔娲诲姩鐘舵€佲€濆垪琛�"
      >
        娣诲姞
      </cr-button>
    </div>
    <div id="noSitesAdded" class="list-frame" hidden$="[[hasSites_(siteList_.*)]]">
      <div class="list-item secondary">鏈坊鍔犱换浣曠綉绔�</div>
    </div>
    <div id="outer" class="layout vertical list-frame" role="list" hidden$="[[!hasSites_(siteList_.*)]]">
      <template is="dom-repeat" id="list" items="[[getSiteList_(siteList_.*)]]">
        <tab-discard-exception-entry
          prefs="[[prefs]]"
          entry="[[item]]"
          role="listitem"
          on-menu-click="onMenuClick_"
          on-show-tooltip="onShowTooltip_"
        >
        </tab-discard-exception-entry>
      </template>
      <cr-expand-button
        id="expandButton"
        no-hover
        class="hr"
        hidden$="[[!hasOverflowSites_(siteList_.*)]]"
        expanded="{{overflowSiteListExpanded}}"
      >
        <div>鏇村缃戠珯</div>
      </cr-expand-button>
      <iron-collapse id="collapse" hidden$="[[!hasOverflowSites_(siteList_.*)]]" opened="[[overflowSiteListExpanded]]">
        <template is="dom-repeat" id="overflowList" items="[[getOverflowSiteList_(siteList_.*)]]">
          <div class="hr">
            <tab-discard-exception-entry
              prefs="[[prefs]]"
              entry="[[item]]"
              role="listitem"
              on-menu-click="onMenuClick_"
              on-show-tooltip="onShowTooltip_"
            >
            </tab-discard-exception-entry>
          </div>
        </template>
      </iron-collapse>
    </div>
    <paper-tooltip id="tooltip" fit-to-visible-bounds manual-mode position="top"> [[tooltipText_]] </paper-tooltip>
    <cr-lazy-render id="menu">
      <template>
        <cr-action-menu role-description="鑿滃崟">
          <button id="edit" class="dropdown-item" role="menuitem" on-click="onEditClick_">缂栬緫</button>
          <button id="delete" class="dropdown-item" role="menuitem" on-click="onDeleteClick_">绉婚櫎</button>
        </cr-action-menu>
      </template>
    </cr-lazy-render>
    <template is="dom-if" if="[[showAddDialog_]]" restamp>
      <tab-discard-exception-add-dialog prefs="{{prefs}}" on-close="onAddDialogClose_">
      </tab-discard-exception-add-dialog>
    </template>
    <template is="dom-if" if="[[showTabbedAddDialog_]]" restamp>
      <tab-discard-exception-tabbed-add-dialog prefs="{{prefs}}" on-close="onTabbedAddDialogClose_">
      </tab-discard-exception-tabbed-add-dialog>
    </template>
    <template is="dom-if" if="[[showEditDialog_]]" restamp>
      <tab-discard-exception-edit-dialog
        prefs="{{prefs}}"
        on-close="onEditDialogClose_"
        rule-to-edit="[[selectedRule_]]"
      >
      </tab-discard-exception-edit-dialog>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2022 The Chromium Authors
const TAB_DISCARD_EXCEPTIONS_OVERFLOW_SIZE = 5;
const TabDiscardExceptionListElementBase = TooltipMixin(ListPropertyUpdateMixin(PrefsMixin(PolymerElement)));
class TabDiscardExceptionListElement extends TabDiscardExceptionListElementBase {
  constructor() {
    super(...arguments);
    this.metricsProxy_ = PerformanceMetricsProxyImpl.getInstance();
  }
  static get is() {
    return 'tab-discard-exception-list';
  }
  static get template() {
    return getTemplate$b();
  }
  static get properties() {
    return {
      siteList_: { type: Array, value: [] },
      overflowSiteListExpanded: { type: Boolean, value: false },
      selectedRule_: { type: String, value: '' },
      isDiscardExceptionsImprovementsEnabled_: {
        readOnly: true,
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('isDiscardExceptionsImprovementsEnabled');
        },
      },
      showAddDialog_: { type: Boolean, value: false },
      showTabbedAddDialog_: { type: Boolean, value: false },
      showEditDialog_: { type: Boolean, value: false },
      tooltipText_: String,
    };
  }
  static get observers() {
    return [
      `onPrefsChanged_(prefs.${TAB_DISCARD_EXCEPTIONS_PREF}.value.*,` +
        `prefs.${TAB_DISCARD_EXCEPTIONS_MANAGED_PREF}.value.*)`,
    ];
  }
  hasSites_() {
    return this.siteList_.length > 0;
  }
  hasOverflowSites_() {
    return this.siteList_.length > TAB_DISCARD_EXCEPTIONS_OVERFLOW_SIZE;
  }
  getSiteList_() {
    return this.siteList_.slice(-TAB_DISCARD_EXCEPTIONS_OVERFLOW_SIZE).reverse();
  }
  getOverflowSiteList_() {
    return this.siteList_.slice(0, -TAB_DISCARD_EXCEPTIONS_OVERFLOW_SIZE).reverse();
  }
  onAddClick_() {
    assert(!this.showEditDialog_);
    if (this.isDiscardExceptionsImprovementsEnabled_) {
      this.showTabbedAddDialog_ = true;
    } else {
      this.showAddDialog_ = true;
    }
  }
  onMenuClick_(e) {
    e.stopPropagation();
    this.selectedRule_ = e.detail.site;
    this.$.menu.get().showAt(e.detail.target);
  }
  onEditClick_() {
    assert(this.selectedRule_);
    assert(!this.showAddDialog_);
    assert(!this.showTabbedAddDialog_);
    this.showEditDialog_ = true;
    this.$.menu.get().close();
  }
  onDeleteClick_() {
    this.deletePrefListItem(TAB_DISCARD_EXCEPTIONS_PREF, this.selectedRule_);
    this.metricsProxy_.recordExceptionListAction(HighEfficiencyModeExceptionListAction.REMOVE);
    this.$.menu.get().close();
  }
  onAddDialogClose_() {
    this.showAddDialog_ = false;
  }
  onTabbedAddDialogClose_() {
    this.showTabbedAddDialog_ = false;
  }
  onEditDialogClose_() {
    this.showEditDialog_ = false;
  }
  onPrefsChanged_() {
    const newSites = [];
    for (const pref of [TAB_DISCARD_EXCEPTIONS_MANAGED_PREF, TAB_DISCARD_EXCEPTIONS_PREF]) {
      const { value: sites, enforcement: enforcement } = this.getPref(pref);
      const siteToExceptionEntry = (site) => ({
        site: site,
        managed: enforcement === chrome.settingsPrivate.Enforcement.ENFORCED,
      });
      newSites.push(...sites.map(siteToExceptionEntry));
    }
    this.updateList('siteList_', (entry) => entry.site, newSites);
  }
  onShowTooltip_(e) {
    this.tooltipText_ = e.detail.text;
    this.showTooltipAtTarget(this.$.tooltip, e.detail.target);
  }
}
customElements.define(TabDiscardExceptionListElement.is, TabDiscardExceptionListElement);
// Copyright 2023 The Chromium Authors
function getDiscardTimerOptions() {
  return [
    { value: 5, name: loadTimeData.getString('tabDiscardTimerFiveMinutes') },
    { value: 15, name: loadTimeData.getString('tabDiscardTimerFifteenMinutes') },
    { value: 30, name: loadTimeData.getString('tabDiscardTimerThirtyMinutes') },
    { value: 60, name: loadTimeData.getString('tabDiscardTimerOneHour') },
    { value: 2 * 60, name: loadTimeData.getString('tabDiscardTimerTwoHours') },
    { value: 4 * 60, name: loadTimeData.getString('tabDiscardTimerFourHours') },
    { value: 8 * 60, name: loadTimeData.getString('tabDiscardTimerEightHours') },
    { value: 16 * 60, name: loadTimeData.getString('tabDiscardTimerSixteenHours') },
    { value: 24 * 60, name: loadTimeData.getString('tabDiscardTimerTwentyFourHours') },
  ];
}
function getTemplate$a() {
  return html`<!--_html_template_start_--><style include="cr-shared-style settings-shared">
      .high-efficiency-radio-group {
        display: flex;
        flex-direction: column;
        padding: 0 var(--cr-section-padding);
      }
      .badge {
        align-items: center;
        background: var(--google-grey-600);
        border-radius: 4px;
        color: #fff;
        display: inline-flex;
        font-size: 10px;
        height: 15px;
        margin-inline-start: 15px;
        padding: 0 4px;
      }
      @media (prefers-color-scheme: dark) {
        .badge {
          background: var(--google-grey-500);
          color: var(--google-grey-900);
        }
      }
      #enabledOnTimerButton::part(labelWrapper) {
        align-items: center;
        display: flex;
        justify-content: space-between;
      }
    </style>
    <settings-toggle-button
      id="toggleButton"
      on-change="onChange_"
      pref="{{prefs.performance_tuning.high_efficiency_mode.state}}"
      label="鍐呭瓨鑺傜渷绋嬪簭"
      sub-label="寮€鍚璁剧疆鍚庯紝Chrome 浼氶噴鏀鹃棽缃爣绛鹃〉鍗犵敤鐨勫唴瀛樸€傝繖鍙浣跨敤涓殑鏍囩椤靛拰鍏朵粬搴旂敤鑾峰緱鏇村璁＄畻鏈鸿祫婧愶紝骞惰 Chrome 淇濇寔蹇€熻繍琛屻€傚綋鎮ㄨ繑鍥炲埌闂茬疆鏍囩椤垫椂锛屽畠浠細鑷姩閲嶆柊鍙樹负娲诲姩鐘舵€併€�"
      learn-more-url="https://support.google.com/chrome/?p=chrome_memory_saver"
      numeric-unchecked-value="[[highEfficiencyModeStateEnum_.DISABLED]]"
      numeric-checked-value="[[toggleButtonCheckedValue_(
        isHighEfficiencyMultistateModeEnabled_)]]"
    >
    </settings-toggle-button>
    <template is="dom-if" if="[[isHighEfficiencyMultistateModeEnabled_]]">
      <iron-collapse
        id="radioGroupCollapse"
        opened="[[isHighEfficiencyModeEnabled_(
          prefs.performance_tuning.high_efficiency_mode.state.value)]]"
      >
        <div class="high-efficiency-radio-group">
          <settings-radio-group
            id="radioGroup"
            on-change="onChange_"
            pref="{{prefs.performance_tuning.high_efficiency_mode.state}}"
            group-aria-label="鐪佸唴瀛樻ā寮忛€夐」"
          >
            <controlled-radio-button
              label="鏍规嵁浣跨敤鎯呭喌閲婃斁鍐呭瓨"
              name="[[highEfficiencyModeStateEnum_.ENABLED]]"
              pref="[[prefs.performance_tuning.high_efficiency_mode.state]]"
            >
              <div class="badge" hidden$="[[!showHighEfficiencyHeuristicModeRecommendedBadge_]]">鎺ㄨ崘</div>
            </controlled-radio-button>
            <controlled-radio-button
              id="enabledOnTimerButton"
              label="鍦ㄦ爣绛鹃〉澶勪簬闂茬疆鐘舵€佹椂閲婃斁鍐呭瓨"
              name="[[highEfficiencyModeStateEnum_.ENABLED_ON_TIMER]]"
              pref="[[prefs.performance_tuning.high_efficiency_mode.state]]"
              exportparts="labelWrapper"
            >
              <settings-dropdown-menu
                id="discardTimeDropdown"
                label="閫夋嫨鏃堕棿鑼冨洿"
                disabled="[[!isHighEfficiencyModeEnabledOnTimer_(
                  prefs.performance_tuning.high_efficiency_mode.state.value)]]"
                pref="{{prefs.performance_tuning.high_efficiency_mode.time_before_discard_in_minutes}}"
                menu-options="[[discardTimerOptions_]]"
                on-click="onDropdownClick_"
              >
              </settings-dropdown-menu>
            </controlled-radio-button>
          </settings-radio-group>
        </div>
      </iron-collapse>
    </template>
    <tab-discard-exception-list id="tabDiscardExceptionsList" prefs="{{prefs}}"> </tab-discard-exception-list
    ><!--_html_template_end_-->`;
}
// Copyright 2022 The Chromium Authors
const HIGH_EFFICIENCY_MODE_PREF = 'performance_tuning.high_efficiency_mode.state';
const SettingsPerformancePageElementBase = PrefsMixin(PolymerElement);
class SettingsPerformancePageElement extends SettingsPerformancePageElementBase {
  constructor() {
    super(...arguments);
    this.metricsProxy_ = PerformanceMetricsProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-performance-page';
  }
  static get template() {
    return getTemplate$a();
  }
  static get properties() {
    return {
      discardTimerOptions_: { readOnly: true, type: Array, value: getDiscardTimerOptions },
      isHighEfficiencyMultistateModeEnabled_: {
        readOnly: true,
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('isHighEfficiencyMultistateModeEnabled');
        },
      },
      showHighEfficiencyHeuristicModeRecommendedBadge_: {
        readOnly: true,
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('highEfficiencyShowRecommendedBadge');
        },
      },
      highEfficiencyModeStateEnum_: { readOnly: true, type: Object, value: HighEfficiencyModeState },
    };
  }
  onChange_() {
    this.metricsProxy_.recordHighEfficiencyModeChanged(this.getPref(HIGH_EFFICIENCY_MODE_PREF).value);
  }
  toggleButtonCheckedValue_() {
    return this.isHighEfficiencyMultistateModeEnabled_
      ? HighEfficiencyModeState.ENABLED
      : HighEfficiencyModeState.ENABLED_ON_TIMER;
  }
  isHighEfficiencyModeEnabled_(value) {
    return value !== HighEfficiencyModeState.DISABLED;
  }
  isHighEfficiencyModeEnabledOnTimer_(value) {
    return value === HighEfficiencyModeState.ENABLED_ON_TIMER;
  }
  onDropdownClick_(e) {
    e.stopPropagation();
  }
}
customElements.define(SettingsPerformancePageElement.is, SettingsPerformancePageElement);
function getTemplate$9() {
  return html`<!--_html_template_start_-->
    <style include="settings-shared"></style>
    <cr-dialog id="dialog" close-text="鍏抽棴" ignore-popstate on-cancel="onCancel_">
      <div slot="title">閮ㄥ垎璁剧疆宸查噸缃�</div>
      <div slot="body">
        <span id="description">
          Chrome妫€娴嬪埌鎮ㄧ殑閮ㄥ垎璁剧疆琚叾浠栫▼搴忕鏀逛簡锛屽洜姝ゅ凡灏嗚繖浜涜缃噸缃负鍘熷榛樿璁剧疆銆�
          <a
            id="learnMore"
            aria-label="璇︾粏浜嗚В濡備綍閲嶇疆璁剧疆"
            href="https://support.google.com/chrome/?p=ui_automatic_settings_reset"
            target="_blank"
            >浜嗚В璇︽儏</a
          >
        </span>
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onOkClick_" id="ok"> 纭畾 </cr-button>
        <cr-button class="action-button" on-click="onResetClick_" id="reset"> 閲嶇疆鎵€鏈夎缃� </cr-button>
      </div>
    </cr-dialog>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
class SettingsResetProfileBannerElement extends PolymerElement {
  static get is() {
    return 'settings-reset-profile-banner';
  }
  static get template() {
    return getTemplate$9();
  }
  connectedCallback() {
    super.connectedCallback();
    this.$.dialog.showModal();
  }
  onOkClick_() {
    this.$.dialog.cancel();
  }
  onCancel_() {
    ResetBrowserProxyImpl.getInstance().onHideResetProfileBanner();
  }
  onResetClick_() {
    this.$.dialog.close();
    Router.getInstance().navigateTo(routes.RESET_DIALOG);
  }
}
customElements.define(SettingsResetProfileBannerElement.is, SettingsResetProfileBannerElement);
function getTemplate$8() {
  return html`<!--_html_template_start_--><style include="cr-shared-style iron-flex settings-shared md-select">
      #search-wrapper {
        align-items: center;
        display: flex;
        min-height: var(--cr-section-min-height);
      }
    </style>
    <settings-animated-pages id="pages" section="search" focus-config="[[focusConfig_]]">
      <div route-path="default">
        <div class="cr-row first">
          <div id="searchExplanation" class="flex cr-padded-text">
            鍦板潃鏍忎腑浣跨敤鐨勬悳绱㈠紩鎿庛€�
            <a
              href="https://support.google.com/chrome/?p=settings_omnibox"
              aria-label="璇︾粏浜嗚В榛樿鎼滅储寮曟搸"
              target="_blank"
            >
              浜嗚В璇︽儏
            </a>
          </div>
          <template
            is="dom-if"
            if="[[isDefaultSearchControlledByPolicy_(
          prefs.default_search_provider_data.template_url_data)]]"
          >
            <cr-policy-pref-indicator
              pref="[[
            prefs.default_search_provider_data.template_url_data]]"
            >
            </cr-policy-pref-indicator>
          </template>
          <select
            class="md-select"
            on-change="onChange_"
            aria-labelledby="searchExplanation"
            disabled$="[[isDefaultSearchEngineEnforced_(
              prefs.default_search_provider_data.template_url_data)]]"
          >
            <template is="dom-repeat" items="[[searchEngines_]]">
              <option selected="[[item.default]]">[[item.name]]</option>
            </template>
          </select>
        </div>
        <template is="dom-if" if="[[prefs.default_search_provider_data.template_url_data.extensionId]]">
          <div class="cr-row continuation">
            <extension-controlled-indicator
              class="flex"
              extension-id="[[
                prefs.default_search_provider_data.template_url_data.extensionId]]"
              extension-name="[[
                prefs.default_search_provider_data.template_url_data.controlledByName]]"
              extension-can-be-disabled="[[
                prefs.default_search_provider_data.template_url_data.extensionCanBeDisabled]]"
              on-disable-extension="onDisableExtension_"
            >
            </extension-controlled-indicator>
          </div>
        </template>

        <cr-link-row
          class="hr"
          id="enginesSubpageTrigger"
          label="绠＄悊鎼滅储寮曟搸鍜岀綉绔欐悳绱�"
          on-click="onManageSearchEnginesClick_"
          role-description="瀛愰〉闈㈡寜閽�"
        ></cr-link-row>
      </div>
      <template is="dom-if" route-path="/searchEngines">
        <settings-subpage
          associated-control="[[$$('#enginesSubpageTrigger')]]"
          page-title="绠＄悊鎼滅储寮曟搸鍜岀綉绔欐悳绱�"
          search-label="鎼滅储"
          search-term="{{searchEnginesFilter_}}"
        >
          <settings-search-engines-page prefs="{{prefs}}" filter="[[searchEnginesFilter_]]">
          </settings-search-engines-page
        ></settings-subpage>
      </template>
    </settings-animated-pages>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsSearchPageElementBase = BaseMixin(PolymerElement);
class SettingsSearchPageElement extends SettingsSearchPageElementBase {
  constructor() {
    super(...arguments);
    this.browserProxy_ = SearchEnginesBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-search-page';
  }
  static get template() {
    return getTemplate$8();
  }
  static get properties() {
    return {
      prefs: Object,
      searchEngines_: {
        type: Array,
        value() {
          return [];
        },
      },
      searchEnginesFilter_: String,
      focusConfig_: Object,
    };
  }
  ready() {
    super.ready();
    const updateSearchEngines = (searchEngines) => {
      this.set('searchEngines_', searchEngines.defaults);
    };
    this.browserProxy_.getSearchEnginesList().then(updateSearchEngines);
    addWebUiListener('search-engines-changed', updateSearchEngines);
    this.focusConfig_ = new Map();
    if (routes.SEARCH_ENGINES) {
      this.focusConfig_.set(routes.SEARCH_ENGINES.path, '#enginesSubpageTrigger');
    }
  }
  onChange_() {
    const select = this.shadowRoot.querySelector('select');
    const searchEngine = this.searchEngines_[select.selectedIndex];
    this.browserProxy_.setDefaultSearchEngine(searchEngine.modelIndex);
  }
  onDisableExtension_() {
    this.dispatchEvent(
      new CustomEvent('refresh-pref', { bubbles: true, composed: true, detail: 'default_search_provider.enabled' })
    );
  }
  onManageSearchEnginesClick_() {
    Router.getInstance().navigateTo(routes.SEARCH_ENGINES);
  }
  isDefaultSearchControlledByPolicy_(pref) {
    return pref.controlledBy === chrome.settingsPrivate.ControlledBy.USER_POLICY;
  }
  isDefaultSearchEngineEnforced_(pref) {
    return pref.enforcement === chrome.settingsPrivate.Enforcement.ENFORCED;
  }
}
customElements.define(SettingsSearchPageElement.is, SettingsSearchPageElement);
// Copyright 2016 The Chromium Authors
class DefaultBrowserBrowserProxyImpl {
  requestDefaultBrowserState() {
    return sendWithPromise('requestDefaultBrowserState');
  }
  setAsDefaultBrowser() {
    chrome.send('setAsDefaultBrowser');
  }
  static getInstance() {
    return instance$2 || (instance$2 = new DefaultBrowserBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$2 = obj;
  }
}
let instance$2 = null;
function getTemplate$7() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style settings-shared iron-flex"></style>
    <template is="dom-if" if="[[maySetDefaultBrowser_]]">
      <div class="cr-row first">
        <div class="flex cr-padded-text">
          <div id="canBeDefaultBrowser">榛樿娴忚鍣�</div>
          <div class="secondary">灏� Google Chrome 娴忚鍣ㄨ涓洪粯璁ゆ祻瑙堝櫒</div>
        </div>
        <div class="separator"></div>
        <cr-button on-click="onSetDefaultBrowserClick_"> 璁句负榛樿閫夐」 </cr-button>
      </div>
    </template>
    <template is="dom-if" if="[[!maySetDefaultBrowser_]]">
      <div class="cr-row first">
        <div class="flex cr-padded-text" hidden$="[[!isDefault_]]" id="isDefault">
          Google Chrome 鏄偍鐨勯粯璁ゆ祻瑙堝櫒
        </div>
        <div class="flex cr-padded-text" hidden$="[[!isSecondaryInstall_]]" id="isSecondaryInstall">
          杩欐槸 Google Chrome 鐨勫苟琛屽畨瑁咃紝鎮ㄦ棤娉曞皢姝ゆ祻瑙堝櫒璁句负榛樿娴忚鍣ㄣ€�
        </div>
        <div class="cr-padded-text" hidden$="[[!isUnknownError_]]" id="isUnknownError">
          Google Chrome 鏃犳硶纭畾鎴栬缃粯璁ゆ祻瑙堝櫒
        </div>
      </div>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsDefaultBrowserPageElementBase = WebUiListenerMixin(PolymerElement);
class SettingsDefaultBrowserPageElement extends SettingsDefaultBrowserPageElementBase {
  constructor() {
    super(...arguments);
    this.browserProxy_ = DefaultBrowserBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-default-browser-page';
  }
  static get template() {
    return getTemplate$7();
  }
  static get properties() {
    return {
      isDefault_: Boolean,
      isSecondaryInstall_: Boolean,
      isUnknownError_: Boolean,
      maySetDefaultBrowser_: Boolean,
    };
  }
  ready() {
    super.ready();
    this.addWebUiListener('browser-default-state-changed', this.updateDefaultBrowserState_.bind(this));
    this.browserProxy_.requestDefaultBrowserState().then(this.updateDefaultBrowserState_.bind(this));
  }
  updateDefaultBrowserState_(defaultBrowserState) {
    this.isDefault_ = false;
    this.isSecondaryInstall_ = false;
    this.isUnknownError_ = false;
    this.maySetDefaultBrowser_ = false;
    if (defaultBrowserState.isDefault) {
      this.isDefault_ = true;
    } else if (!defaultBrowserState.canBeDefault) {
      this.isSecondaryInstall_ = true;
    } else if (!defaultBrowserState.isDisabledByPolicy && !defaultBrowserState.isUnknownError) {
      this.maySetDefaultBrowser_ = true;
    } else {
      this.isUnknownError_ = true;
    }
  }
  onSetDefaultBrowserClick_() {
    this.browserProxy_.setAsDefaultBrowser();
  }
}
customElements.define(SettingsDefaultBrowserPageElement.is, SettingsDefaultBrowserPageElement);
// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const MAX_PRIVACY_GUIDE_PROMO_IMPRESSION = 10;
const PRIVACY_GUIDE_PROMO_IMPRESSION_COUNT_KEY = 'privacy-guide-promo-count';
class PrivacyGuideBrowserProxyImpl {
  getPromoImpressionCount() {
    return parseInt(window.localStorage.getItem(PRIVACY_GUIDE_PROMO_IMPRESSION_COUNT_KEY), 10) || 0;
  }
  incrementPromoImpressionCount() {
    window.localStorage.setItem(
      PRIVACY_GUIDE_PROMO_IMPRESSION_COUNT_KEY,
      (this.getPromoImpressionCount() + 1).toString()
    );
  }
  static getInstance() {
    return instance$1 || (instance$1 = new PrivacyGuideBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$1 = obj;
  }
}
let instance$1 = null;
// Copyright 2016 The Chromium Authors
const SKIP_SEARCH_CSS_ATTRIBUTE = 'no-search';
const IGNORED_ELEMENTS = new Set([
  'CONTENT',
  'CR-ACTION-MENU',
  'CR-DIALOG',
  'CR-ICON-BUTTON',
  'CR-SLIDER',
  'DIALOG',
  'IMG',
  'IRON-ICON',
  'IRON-LIST',
  'PAPER-RIPPLE',
  'PAPER-SPINNER-LITE',
  'SLOT',
  'STYLE',
  'TEMPLATE',
]);
function findAndHighlightMatches(request, root) {
  let foundMatches = false;
  const highlights = [];
  function isInSubpage(node) {
    while (node !== null) {
      if (node.nodeName === 'SETTINGS-SUBPAGE') {
        return true;
      }
      node = node instanceof ShadowRoot ? node.host : node.parentNode;
    }
    return false;
  }
  function doSearch(node) {
    if (
      node.nodeName === 'DOM-IF' &&
      node.hasAttribute('route-path') &&
      !node.if &&
      !node['noSearch'] &&
      !node.hasAttribute(SKIP_SEARCH_CSS_ATTRIBUTE)
    ) {
      request.queue.addRenderTask(new RenderTask(request, node));
      return;
    }
    if (IGNORED_ELEMENTS.has(node.nodeName)) {
      return;
    }
    if (node instanceof HTMLElement) {
      const element = node;
      if (
        element.hasAttribute(SKIP_SEARCH_CSS_ATTRIBUTE) ||
        element.hasAttribute('hidden') ||
        element.style.display === 'none'
      ) {
        return;
      }
    }
    if (node.nodeType === Node.TEXT_NODE) {
      const textContent = node.nodeValue;
      if (textContent.trim().length === 0) {
        return;
      }
      const strippedText = stripDiacritics(textContent);
      const ranges = [];
      for (let match; (match = request.regExp.exec(strippedText)); ) {
        ranges.push({ start: match.index, length: match[0].length });
      }
      if (ranges.length > 0) {
        foundMatches = true;
        revealParentSection(node, ranges.length, request.bubbles);
        if (node.parentNode.nodeName === 'OPTION') {
          const select = node.parentNode.parentNode;
          assert(select.nodeName === 'SELECT');
          if (isInSubpage(select)) {
            return;
          }
          showBubble(select, ranges.length, request.bubbles, true);
        } else {
          request.addTextObserver(node);
          highlights.push(highlight(node, ranges));
        }
      }
      return;
    }
    let child = node.firstChild;
    while (child !== null) {
      const nextSibling = child.nextSibling;
      doSearch(child);
      child = nextSibling;
    }
    const shadowRoot = node.shadowRoot;
    if (shadowRoot) {
      doSearch(shadowRoot);
    }
  }
  doSearch(root);
  request.addHighlights(highlights);
  return foundMatches;
}
function revealParentSection(node, numResults, bubbles) {
  let associatedControl = null;
  let parent = node;
  while (parent.nodeName !== 'SETTINGS-SECTION') {
    parent = parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent.host : parent.parentNode;
    if (!parent) {
      return;
    }
    if (parent.nodeName === 'SETTINGS-SUBPAGE') {
      const subpage = parent;
      assert(
        subpage.associatedControl,
        'An associated control was expected for SETTINGS-SUBPAGE ' + subpage.pageTitle + ', but was not found.'
      );
      associatedControl = subpage.associatedControl;
    }
  }
  parent.hiddenBySearch = false;
  if (associatedControl) {
    showBubble(associatedControl, numResults, bubbles, false);
  }
}
function showBubble(control, numResults, bubbles, horizontallyCenter) {
  const bubble = createEmptySearchBubble(control, horizontallyCenter);
  const numHits = numResults + (bubbles.get(bubble) || 0);
  bubbles.set(bubble, numHits);
  const msgName = numHits === 1 ? 'searchResultBubbleText' : 'searchResultsBubbleText';
  bubble.firstChild.textContent = loadTimeData.getStringF(msgName, numHits);
}
class Task {
  constructor(request, node) {
    this.request = request;
    this.node = node;
  }
}
class RenderTask extends Task {
  exec() {
    const routePath = this.node.getAttribute('route-path');
    const content = DomIf._contentForTemplate(this.node.firstElementChild);
    const subpageTemplate = content.querySelector('settings-subpage');
    subpageTemplate.setAttribute('route-path', routePath);
    assert(!this.node.if);
    this.node.if = true;
    return new Promise((resolve) => {
      const parent = this.node.parentNode;
      microTask.run(() => {
        const renderedNode = parent.querySelector('[route-path="' + routePath + '"]');
        assert(renderedNode);
        this.request.queue.addSearchAndHighlightTask(new SearchAndHighlightTask(this.request, renderedNode));
        resolve();
      });
    });
  }
}
class SearchAndHighlightTask extends Task {
  exec() {
    const foundMatches = findAndHighlightMatches(this.request, this.node);
    this.request.updateMatches(foundMatches);
    return Promise.resolve();
  }
}
class TopLevelSearchTask extends Task {
  exec() {
    const shouldSearch = this.request.regExp !== null;
    this.setSectionsVisibility_(!shouldSearch);
    if (shouldSearch) {
      const foundMatches = findAndHighlightMatches(this.request, this.node);
      this.request.updateMatches(foundMatches);
    }
    return Promise.resolve();
  }
  setSectionsVisibility_(visible) {
    const sections = this.node.querySelectorAll('settings-section');
    for (let i = 0; i < sections.length; i++) {
      sections[i].hiddenBySearch = !visible;
    }
  }
}
class TaskQueue {
  constructor(request) {
    this.onEmptyCallback_ = null;
    this.request_ = request;
    this.reset();
    this.running_ = false;
  }
  reset() {
    this.queues_ = { high: [], middle: [], low: [] };
  }
  addTopLevelSearchTask(task) {
    this.queues_.high.push(task);
    this.consumePending_();
  }
  addSearchAndHighlightTask(task) {
    this.queues_.middle.push(task);
    this.consumePending_();
  }
  addRenderTask(task) {
    this.queues_.low.push(task);
    this.consumePending_();
  }
  onEmpty(onEmptyCallback) {
    this.onEmptyCallback_ = onEmptyCallback;
  }
  popNextTask_() {
    return this.queues_.high.shift() || this.queues_.middle.shift() || this.queues_.low.shift();
  }
  consumePending_() {
    if (this.running_) {
      return;
    }
    const task = this.popNextTask_();
    if (!task) {
      this.running_ = false;
      if (this.onEmptyCallback_) {
        this.onEmptyCallback_();
      }
      return;
    }
    this.running_ = true;
    window.requestIdleCallback(() => {
      if (!this.request_.canceled) {
        task.exec().then(() => {
          this.running_ = false;
          this.consumePending_();
        });
      }
    });
  }
}
class SearchRequest {
  constructor(rawQuery, root) {
    this.rawQuery_ = rawQuery;
    this.root_ = root;
    this.regExp = this.generateRegExp_();
    this.canceled = false;
    this.foundMatches_ = false;
    this.resolver = new PromiseResolver();
    this.queue = new TaskQueue(this);
    this.queue.onEmpty(() => {
      this.resolver.resolve(this);
    });
    this.textObservers_ = new Set();
    this.highlights_ = [];
    this.bubbles = new Map();
  }
  addHighlights(highlights) {
    this.highlights_.push(...highlights);
  }
  removeAllTextObservers() {
    this.textObservers_.forEach((observer) => {
      observer.disconnect();
    });
    this.textObservers_.clear();
  }
  removeAllHighlightsAndBubbles() {
    removeHighlights(this.highlights_);
    this.bubbles.forEach((_count, bubble) => bubble.remove());
    this.highlights_ = [];
    this.bubbles.clear();
  }
  addTextObserver(textNode) {
    const originalParentNode = textNode.parentNode;
    const observer = new MutationObserver((mutations) => {
      const oldValue = mutations[0].oldValue.trim();
      const newValue = textNode.nodeValue.trim();
      if (oldValue !== newValue) {
        observer.disconnect();
        this.textObservers_.delete(observer);
        findAndRemoveHighlights(originalParentNode);
      }
    });
    observer.observe(textNode, { characterData: true, characterDataOldValue: true });
    this.textObservers_.add(observer);
  }
  start() {
    this.queue.addTopLevelSearchTask(new TopLevelSearchTask(this, this.root_));
  }
  generateRegExp_() {
    let regExp = null;
    const strippedQuery = stripDiacritics(this.rawQuery_.trim());
    const sanitizedQuery = strippedQuery.replace(SANITIZE_REGEX, '\\$&');
    if (sanitizedQuery.length > 0) {
      regExp = new RegExp(`(${sanitizedQuery})`, 'ig');
    }
    return regExp;
  }
  isSame(rawQuery) {
    return this.rawQuery_ === rawQuery;
  }
  updateMatches(found) {
    this.foundMatches_ = this.foundMatches_ || found;
  }
  didFindMatches() {
    return this.foundMatches_;
  }
}
const SANITIZE_REGEX = /[-[\]{}()*+?.,\\^$|#\s]/g;
class SearchManagerImpl {
  constructor() {
    this.activeRequests_ = new Set();
    this.completedRequests_ = new Set();
    this.lastSearchedText_ = null;
  }
  search(text, page) {
    if (text !== this.lastSearchedText_) {
      this.activeRequests_.forEach(function (request) {
        request.removeAllTextObservers();
        request.removeAllHighlightsAndBubbles();
        request.canceled = true;
        request.resolver.resolve(request);
      });
      this.activeRequests_.clear();
      this.completedRequests_.forEach((request) => {
        request.removeAllTextObservers();
        request.removeAllHighlightsAndBubbles();
      });
      this.completedRequests_.clear();
    }
    this.lastSearchedText_ = text;
    const request = new SearchRequest(text, page);
    this.activeRequests_.add(request);
    request.start();
    return request.resolver.promise.then(() => {
      this.activeRequests_.delete(request);
      this.completedRequests_.add(request);
      return request;
    });
  }
}
let instance = null;
function getSearchManager() {
  if (instance === null) {
    instance = new SearchManagerImpl();
  }
  return instance;
}
function setSearchManagerForTesting(searchManager) {
  instance = searchManager;
}
// Copyright 2016 The Chromium Authors
var RouteState;
(function (RouteState) {
  RouteState['INITIAL'] = 'initial';
  RouteState['DIALOG'] = 'dialog';
  RouteState['SECTION'] = 'section';
  RouteState['SUBPAGE'] = 'subpage';
  RouteState['TOP_LEVEL'] = 'top-level';
})(RouteState || (RouteState = {}));
let guestTopLevelRoute = routes.SEARCH;
const TOP_LEVEL_EQUIVALENT_ROUTE = loadTimeData.getBoolean('isGuest') ? guestTopLevelRoute : routes.PEOPLE;
function classifyRoute(route) {
  if (!route) {
    return RouteState.INITIAL;
  }
  const routes = Router.getInstance().getRoutes();
  if (route === routes.BASIC) {
    return RouteState.TOP_LEVEL;
  }
  if (route.isSubpage()) {
    return RouteState.SUBPAGE;
  }
  if (route.isNavigableDialog) {
    return RouteState.DIALOG;
  }
  return RouteState.SECTION;
}
const MainPageMixin = dedupingMixin((superClass) => {
  const superClassBase = BaseMixin(superClass);
  class MainPageMixin extends superClassBase {
    constructor(...args) {
      super(...args);
      this.scroller = null;
      this.lastScrollTop_ = 0;
      this.validTransitions_ = (function () {
        const allStates = new Set([RouteState.DIALOG, RouteState.SECTION, RouteState.SUBPAGE, RouteState.TOP_LEVEL]);
        return new Map([
          [RouteState.INITIAL, allStates],
          [RouteState.DIALOG, new Set([RouteState.SECTION, RouteState.SUBPAGE, RouteState.TOP_LEVEL])],
          [RouteState.SECTION, allStates],
          [RouteState.SUBPAGE, allStates],
          [RouteState.TOP_LEVEL, allStates],
        ]);
      })();
    }
    connectedCallback() {
      this.scroller = this.domHost ? this.domHost.parentElement : document.body;
      super.connectedCallback();
    }
    containsRoute(_route) {
      return false;
    }
    shouldExpandAdvanced_(route) {
      const routes = Router.getInstance().getRoutes();
      return this.tagName === 'SETTINGS-BASIC-PAGE' && !!routes.ADVANCED && routes.ADVANCED.contains(route);
    }
    ensureSectionForRoute_(route) {
      const section = this.getSection(route.section);
      if (section !== null) {
        return Promise.resolve(section);
      }
      const waitFn = beforeNextRender.bind(null, this);
      return new Promise((resolve) => {
        if (this.shouldExpandAdvanced_(route)) {
          this.fire('hide-container');
          waitFn(() => {
            this.$$('#advancedPageTemplate')
              .get()
              .then(() => {
                resolve(this.getSection(route.section));
              });
          });
        } else {
          waitFn(() => {
            resolve(this.getSection(route.section));
          });
        }
      });
    }
    ensureSectionsForRoute_(route) {
      const sections = this.querySettingsSections_(route.section);
      if (sections.length > 0) {
        return Promise.resolve(sections);
      }
      const waitFn = beforeNextRender.bind(null, this);
      return new Promise((resolve) => {
        if (this.shouldExpandAdvanced_(route)) {
          this.fire('hide-container');
          waitFn(() => {
            this.$$('#advancedPageTemplate')
              .get()
              .then(() => {
                resolve(this.querySettingsSections_(route.section));
              });
          });
        } else {
          waitFn(() => {
            resolve(this.querySettingsSections_(route.section));
          });
        }
      });
    }
    enterSubpage_(route) {
      this.lastScrollTop_ = this.scroller.scrollTop;
      this.scroller.scrollTop = 0;
      this.classList.add('showing-subpage');
      this.fire('subpage-expand');
      ensureLazyLoaded();
      this.ensureSectionForRoute_(route).then((section) => {
        section.classList.add('expanded');
        this.fire('settings-section-expanded');
        this.fire('show-container');
      });
    }
    enterMainPage_(oldRoute) {
      const oldSection = this.getSection(oldRoute.section);
      oldSection.classList.remove('expanded');
      this.classList.remove('showing-subpage');
      return new Promise((res) => {
        requestAnimationFrame(() => {
          if (Router.getInstance().lastRouteChangeWasPopstate()) {
            this.scroller.scrollTop = this.lastScrollTop_;
          }
          this.fire('showing-main-page');
          res();
        });
      });
    }
    switchToSections_(newRoute) {
      this.ensureSectionsForRoute_(newRoute).then((sections) => {
        const oldSections = this.shadowRoot.querySelectorAll(`settings-section[active]`);
        for (const s of oldSections) {
          s.toggleAttribute('active', false);
        }
        for (const s of sections) {
          s.toggleAttribute('active', true);
        }
        this.fire('show-container');
      });
    }
    getStateTransition_(newRoute, oldRoute) {
      const containsNew = this.containsRoute(newRoute);
      const containsOld = this.containsRoute(oldRoute);
      if (!containsNew && !containsOld) {
        return null;
      }
      if (containsOld && !containsNew) {
        return [classifyRoute(oldRoute), RouteState.TOP_LEVEL];
      }
      if (!containsOld && containsNew) {
        return [RouteState.TOP_LEVEL, classifyRoute(newRoute)];
      }
      return [classifyRoute(oldRoute), classifyRoute(newRoute)];
    }
    currentRouteChanged(newRoute, oldRoute) {
      const transition = this.getStateTransition_(newRoute, oldRoute);
      if (transition === null) {
        return;
      }
      const oldState = transition[0];
      const newState = transition[1];
      assert(this.validTransitions_.get(oldState).has(newState));
      if (oldState === RouteState.TOP_LEVEL) {
        if (newState === RouteState.SECTION) {
          this.switchToSections_(newRoute);
        } else if (newState === RouteState.SUBPAGE) {
          this.switchToSections_(newRoute);
          this.enterSubpage_(newRoute);
        } else if (newState === RouteState.TOP_LEVEL) {
          this.switchToSections_(TOP_LEVEL_EQUIVALENT_ROUTE);
        } else if (newState === RouteState.DIALOG) {
          this.switchToSections_(newRoute);
        }
        return;
      }
      if (oldState === RouteState.SECTION) {
        if (newState === RouteState.SECTION) {
          this.switchToSections_(newRoute);
        } else if (newState === RouteState.SUBPAGE) {
          this.switchToSections_(newRoute);
          this.enterSubpage_(newRoute);
        } else if (newState === RouteState.TOP_LEVEL) {
          this.switchToSections_(TOP_LEVEL_EQUIVALENT_ROUTE);
          this.scroller.scrollTop = 0;
        }
        return;
      }
      if (oldState === RouteState.SUBPAGE) {
        if (newState === RouteState.SECTION) {
          this.enterMainPage_(oldRoute);
          this.switchToSections_(newRoute);
        } else if (newState === RouteState.SUBPAGE) {
          if (!oldRoute.contains(newRoute) && !newRoute.contains(oldRoute)) {
            this.enterMainPage_(oldRoute).then(() => {
              this.enterSubpage_(newRoute);
            });
            return;
          }
          if (oldRoute.contains(newRoute)) {
            this.scroller.scrollTop = 0;
            return;
          }
        } else if (newState === RouteState.TOP_LEVEL) {
          this.enterMainPage_(oldRoute);
        } else if (newState === RouteState.DIALOG) {
          this.enterMainPage_(oldRoute);
          this.switchToSections_(newRoute);
        }
        return;
      }
      if (oldState === RouteState.INITIAL) {
        if ([RouteState.SECTION, RouteState.DIALOG].includes(newState)) {
          this.switchToSections_(newRoute);
        } else if (newState === RouteState.SUBPAGE) {
          this.switchToSections_(newRoute);
          this.enterSubpage_(newRoute);
        } else if (newState === RouteState.TOP_LEVEL) {
          this.switchToSections_(TOP_LEVEL_EQUIVALENT_ROUTE);
        }
        return;
      }
      if (oldState === RouteState.DIALOG) {
        if (newState === RouteState.SUBPAGE) {
          this.switchToSections_(newRoute);
          this.enterSubpage_(newRoute);
        }
      }
    }
    getSection(section) {
      if (!section) {
        return null;
      }
      return this.$$(`settings-section[section="${section}"]`);
    }
    querySettingsSections_(sectionName) {
      const result = [];
      const section = this.getSection(sectionName);
      if (section) {
        result.push(section);
      }
      const extraSections = this.shadowRoot.querySelectorAll(`settings-section[nest-under-section="${sectionName}"]`);
      if (extraSections.length > 0) {
        result.push(...extraSections);
      }
      return result;
    }
  }
  return MainPageMixin;
});
function getTemplate$6() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style settings-page-styles cr-hidden-style iron-flex">
      :host([is-subpage-animating]) {
        overflow: hidden;
      }
      :host(:not([in-search-mode])) settings-section:not([active]) {
        display: none;
      }
    </style>
    <template
      is="dom-if"
      if="[[showBasicPage_(
        currentRoute_, inSearchMode, hasExpandedSection_)]]"
    >
      <div id="basicPage">
        <template is="dom-if" if="[[showResetProfileBanner_]]" restamp>
          <settings-reset-profile-banner on-close="onResetProfileBannerClosed_"> </settings-reset-profile-banner>
        </template>
        <template is="dom-if" if="[[showPage_(pageVisibility.people)]]" restamp>
          <settings-section page-title="鎮ㄤ笌 Google" section="people">
            <settings-people-page prefs="{{prefs}}" page-visibility="[[pageVisibility]]"> </settings-people-page>
          </settings-section>
        </template>
        <template is="dom-if" if="[[showPage_(pageVisibility.autofill)]]" restamp>
          <settings-section page-title="鑷姩濉厖鍜屽瘑鐮�" section="autofill">
            <settings-autofill-page prefs="{{prefs}}"></settings-autofill-page>
          </settings-section>
        </template>
        <settings-section
          id="privacyGuidePromoSection"
          page-title=""
          hidden$="[[!showPrivacyGuidePromo_]]"
          nest-under-section="privacy"
          no-search
        >
          <settings-privacy-guide-promo id="privacyGuidePromo" prefs="{{prefs}}"> </settings-privacy-guide-promo>
        </settings-section>
        <template is="dom-if" if="[[showPage_(pageVisibility.safetyCheck)]]" restamp>
          <settings-section
            page-title="瀹夊叏妫€鏌�"
            section="safetyCheck"
            nest-under-section="privacy"
            id="safetyCheckSettingsSection"
          >
            <settings-safety-check-page prefs="{{prefs}}"> </settings-safety-check-page>
          </settings-section>
        </template>
        <template is="dom-if" if="[[showPage_(pageVisibility.privacy)]]" restamp>
          <settings-section page-title="闅愮鍜屽畨鍏�" section="privacy">
            <settings-privacy-page prefs="{{prefs}}" page-visibility="[[pageVisibility.privacy]]">
            </settings-privacy-page>
          </settings-section>
        </template>
        <template is="dom-if" if="[[showPerformancePage_(pageVisibility.performance)]]" restamp>
          <settings-section
            page-title="鎬ц兘"
            show-send-feedback-button
            on-send-feedback="onSendHighEfficiencyFeedbackClick_"
            section="performance"
            id="performanceSettingsSection"
          >
            <settings-performance-page prefs="{{prefs}}"> </settings-performance-page>
          </settings-section>
        </template>
        <template is="dom-if" if="[[showBatteryPage_(pageVisibility.performance)]]" restamp>
          <settings-section
            page-title="鐢垫簮"
            section="battery"
            nest-under-section="performance"
            show-send-feedback-button
            on-send-feedback="onSendBatterySaverFeedbackClick_"
            id="batterySettingsSection"
            hidden="[[!showBatterySettings_]]"
          >
            <settings-battery-page prefs="{{prefs}}"> </settings-battery-page>
          </settings-section>
        </template>
        <template is="dom-if" if="[[showPage_(pageVisibility.appearance)]]" restamp>
          <settings-section page-title="澶栬" section="appearance">
            <settings-appearance-page prefs="{{prefs}}" page-visibility="[[pageVisibility.appearance]]">
            </settings-appearance-page>
          </settings-section>
        </template>
        <settings-section page-title="鎼滅储寮曟搸" section="search">
          <settings-search-page prefs="{{prefs}}"></settings-search-page>
        </settings-section>

        <template is="dom-if" if="[[showPage_(pageVisibility.defaultBrowser)]]" restamp>
          <settings-section page-title="榛樿娴忚鍣�" section="defaultBrowser">
            <settings-default-browser-page></settings-default-browser-page>
          </settings-section>
        </template>

        <template is="dom-if" if="[[showPage_(pageVisibility.onStartup)]]" restamp>
          <settings-section page-title="鍚姩鏃�" section="onStartup">
            <settings-on-startup-page prefs="{{prefs}}"> </settings-on-startup-page>
          </settings-section>
        </template>
      </div>
    </template>
    <template is="dom-if" if="[[showAdvancedSettings_(pageVisibility.advancedSettings)]]">
      <settings-idle-load id="advancedPageTemplate">
        <template>
          <div
            id="advancedPage"
            hidden$="[[!showAdvancedPage_(
              currentRoute_, inSearchMode, hasExpandedSection_,
              advancedToggleExpanded)]]"
          >
            <template is="dom-if" if="[[showPage_(pageVisibility.languages)]]" restamp>
              <settings-languages languages="{{languages}}" prefs="{{prefs}}" language-helper="{{languageHelper}}">
              </settings-languages>

              <settings-section page-title="棣栭€夎瑷€" section="languages">
                <settings-languages-page
                  prefs="{{prefs}}"
                  languages="{{languages}}"
                  language-helper="{{languageHelper}}"
                >
                </settings-languages-page>
              </settings-section>
            </template>

            <template is="dom-if" if="[[showPage_(pageVisibility.spellCheck)]]" restamp>
              <settings-section
                page-title="鎷煎啓妫€鏌�"
                section="spellCheck"
                nest-under-section="languages"
                id="spellCheckSettingsSection"
              >
                <settings-spell-check-page
                  prefs="{{prefs}}"
                  languages="{{languages}}"
                  language-helper="{{languageHelper}}"
                >
                </settings-spell-check-page>
              </settings-section>
            </template>
            <settings-section page-title="Google 缈昏瘧" section="translate" nest-under-section="languages">
              <settings-translate-page prefs="{{prefs}}" languages="{{languages}}" language-helper="{{languageHelper}}">
              </settings-translate-page>
            </settings-section>

            <template is="dom-if" if="[[showPage_(pageVisibility.downloads)]]" restamp>
              <settings-section page-title="涓嬭浇鍐呭" section="downloads">
                <settings-downloads-page prefs="{{prefs}}"> </settings-downloads-page>
              </settings-section>
            </template>
            <template is="dom-if" if="[[showPage_(pageVisibility.a11y)]]" restamp>
              <settings-section page-title="鏃犻殰纰�" section="a11y">
                <settings-a11y-page prefs="{{prefs}}" languages="{{languages}}" language-helper="{{languageHelper}}">
                </settings-a11y-page>
              </settings-section>
            </template>

            <settings-section page-title="绯荤粺" section="system">
              <settings-system-page prefs="{{prefs}}"></settings-system-page>
            </settings-section>

            <template is="dom-if" if="[[showPage_(pageVisibility.reset)]]" restamp>
              <settings-section page-title="閲嶇疆璁剧疆" section="reset">
                <settings-reset-page prefs="{{prefs}}"></settings-reset-page>
              </settings-section>
            </template>

            <template is="dom-if" if="[[showGetMostChrome_(pageVisibility.getMostChrome)]]" restamp>
              <settings-section page-title="鍏呭垎鍒╃敤 Chrome" section="getMostChrome" no-search>
                <settings-get-most-chrome-page></settings-get-most-chrome-page>
              </settings-section>
            </template>
          </div>
        </template>
      </settings-idle-load>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsBasicPageElementBase = PrefsMixin(
  MainPageMixin(RouteObserverMixin(PrivacyGuideAvailabilityMixin(WebUiListenerMixin(PolymerElement))))
);
class SettingsBasicPageElement extends SettingsBasicPageElementBase {
  constructor() {
    super(...arguments);
    this.privacyGuideBrowserProxy_ = PrivacyGuideBrowserProxyImpl.getInstance();
    this.performanceBrowserProxy_ = PerformanceBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-basic-page';
  }
  static get template() {
    return getTemplate$6();
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      languages: { type: Object, notify: true },
      languageHelper: Object,
      pageVisibility: {
        type: Object,
        value() {
          return {};
        },
      },
      inSearchMode: { type: Boolean, value: false, reflectToAttribute: true },
      advancedToggleExpanded: { type: Boolean, value: false, notify: true, observer: 'advancedToggleExpandedChanged_' },
      hasExpandedSection_: { type: Boolean, value: false },
      showResetProfileBanner_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('showResetProfileBanner');
        },
      },
      showPrivacyGuidePromo_: { type: Boolean, value: false },
      currentRoute_: Object,
      advancedTogglingInProgress_: { type: Boolean, value: false, reflectToAttribute: true },
      showBatterySettings_: { type: Boolean, value: false },
    };
  }
  static get observers() {
    return ['updatePrivacyGuidePromoVisibility_(isPrivacyGuideAvailable, prefs.privacy_guide.viewed.value)'];
  }
  ready() {
    super.ready();
    this.setAttribute('role', 'main');
    this.addEventListener('subpage-expand', this.onSubpageExpanded_);
  }
  connectedCallback() {
    super.connectedCallback();
    this.addWebUiListener('device-has-battery-changed', this.onDeviceHasBatteryChanged_.bind(this));
    this.performanceBrowserProxy_.getDeviceHasBattery().then(this.onDeviceHasBatteryChanged_.bind(this));
    this.currentRoute_ = Router.getInstance().getCurrentRoute();
  }
  currentRouteChanged(newRoute, oldRoute) {
    this.currentRoute_ = newRoute;
    if (routes.ADVANCED && routes.ADVANCED.contains(newRoute)) {
      this.advancedToggleExpanded = true;
    }
    if (oldRoute && oldRoute.isSubpage()) {
      if (!newRoute.isSubpage() || newRoute.section !== oldRoute.section) {
        this.hasExpandedSection_ = false;
      }
    } else {
      assert(!this.hasExpandedSection_);
    }
    super.currentRouteChanged(newRoute, oldRoute);
    if (newRoute === routes.PRIVACY) {
      this.updatePrivacyGuidePromoVisibility_();
    }
  }
  containsRoute(route) {
    return !route || routes.BASIC.contains(route) || (routes.ADVANCED && routes.ADVANCED.contains(route));
  }
  showPage_(visibility) {
    return visibility !== false;
  }
  getIdleLoad_() {
    return this.shadowRoot.querySelector('#advancedPageTemplate').get();
  }
  updatePrivacyGuidePromoVisibility_() {
    if (
      !this.isPrivacyGuideAvailable ||
      this.pageVisibility.privacy === false ||
      this.prefs === undefined ||
      this.getPref('privacy_guide.viewed').value ||
      this.privacyGuideBrowserProxy_.getPromoImpressionCount() >= MAX_PRIVACY_GUIDE_PROMO_IMPRESSION ||
      this.currentRoute_ !== routes.PRIVACY
    ) {
      this.showPrivacyGuidePromo_ = false;
      return;
    }
    this.showPrivacyGuidePromo_ = true;
    if (!this.privacyGuidePromoWasShown_) {
      this.privacyGuideBrowserProxy_.incrementPromoImpressionCount();
      this.privacyGuidePromoWasShown_ = true;
    }
  }
  onDeviceHasBatteryChanged_(deviceHasBattery) {
    this.showBatterySettings_ = deviceHasBattery;
  }
  searchContents(query) {
    const whenSearchDone = [getSearchManager().search(query, this.shadowRoot.querySelector('#basicPage'))];
    if (this.pageVisibility.advancedSettings !== false) {
      whenSearchDone.push(
        this.getIdleLoad_().then(function (advancedPage) {
          return getSearchManager().search(query, advancedPage);
        })
      );
    }
    return Promise.all(whenSearchDone).then(function (requests) {
      return {
        canceled: requests.some(function (r) {
          return r.canceled;
        }),
        didFindMatches: requests.some(function (r) {
          return r.didFindMatches();
        }),
        wasClearSearch: requests[0].isSame(''),
      };
    });
  }
  onResetProfileBannerClosed_() {
    this.showResetProfileBanner_ = false;
  }
  onSubpageExpanded_() {
    this.hasExpandedSection_ = true;
  }
  advancedToggleExpandedChanged_() {
    if (!this.advancedToggleExpanded) {
      return;
    }
    beforeNextRender(this, () => {
      this.getIdleLoad_();
    });
  }
  fire_(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, { bubbles: true, composed: true, detail: detail }));
  }
  showBasicPage_(currentRoute, _inSearchMode, hasExpandedSection) {
    return !hasExpandedSection || routes.BASIC.contains(currentRoute);
  }
  showAdvancedPage_(currentRoute, inSearchMode, hasExpandedSection, advancedToggleExpanded) {
    return hasExpandedSection
      ? routes.ADVANCED && routes.ADVANCED.contains(currentRoute)
      : advancedToggleExpanded || inSearchMode;
  }
  showAdvancedSettings_(visibility) {
    return visibility !== false;
  }
  showPerformancePage_(visibility) {
    return visibility !== false;
  }
  showBatteryPage_(visibility) {
    return visibility !== false;
  }
  showGetMostChrome_(visibility) {
    return visibility !== false && loadTimeData.getBoolean('showGetTheMostOutOfChromeSection');
  }
  onSendHighEfficiencyFeedbackClick_(e) {
    e.stopPropagation();
    this.performanceBrowserProxy_.openHighEfficiencyFeedbackDialog();
  }
  onSendBatterySaverFeedbackClick_(e) {
    e.stopPropagation();
    this.performanceBrowserProxy_.openBatterySaverFeedbackDialog();
  }
}
customElements.define(SettingsBasicPageElement.is, SettingsBasicPageElement);
function getTemplate$5() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style cr-hidden-style settings-shared">
      #noSearchResults {
        margin-top: 80px;
        text-align: center;
      }
      #noSearchResults div:first-child {
        font-size: 123%;
        margin-bottom: 10px;
      }
      managed-footnote {
        border-top: none;
        margin-bottom: calc(-21px - 8px);
        padding-bottom: 16px;
        padding-top: 12px;
        position: relative;
        z-index: 1;
      }
    </style>
    <div id="noSearchResults" hidden$="[[!showNoResultsFound_]]">
      <div>鏈壘鍒颁换浣曟悳绱㈢粨鏋�</div>
      <div>
        濡傛灉鎮ㄦ壘涓嶅埌瑕佹煡鎵剧殑鍐呭锛岃鍙傞槄
        <a target="_blank" href="https://support.google.com/chrome/?p=settings_search_help">Google Chrome 甯姪</a>
      </div>
    </div>
    <template
      is="dom-if"
      if="[[showManagedHeader_(inSearchMode_, showingSubpage_,
        showPages_.about)]]"
      restamp
    >
      <managed-footnote></managed-footnote>
    </template>
    <template is="dom-if" if="[[showPages_.settings]]">
      <settings-basic-page
        class="cr-centered-card-container"
        prefs="{{prefs}}"
        page-visibility="[[pageVisibility]]"
        on-subpage-expand="onShowingSubpage_"
        on-showing-main-page="onShowingMainPage_"
        in-search-mode="[[inSearchMode_]]"
        advanced-toggle-expanded="{{advancedToggleExpanded}}"
      >
      </settings-basic-page>
    </template>
    <template is="dom-if" if="[[showPages_.about]]">
      <settings-about-page role="main" class="cr-centered-card-container" prefs="{{prefs}}"> </settings-about-page>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsMainElementBase = RouteObserverMixin(PolymerElement);
class SettingsMainElement extends SettingsMainElementBase {
  static get is() {
    return 'settings-main';
  }
  static get template() {
    return getTemplate$5();
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      advancedToggleExpanded: { type: Boolean, notify: true },
      showPages_: {
        type: Object,
        value() {
          return { about: false, settings: false };
        },
      },
      inSearchMode_: { type: Boolean, value: false },
      showNoResultsFound_: { type: Boolean, value: false },
      showingSubpage_: Boolean,
      toolbarSpinnerActive: { type: Boolean, value: false, notify: true },
      pageVisibility: Object,
    };
  }
  currentRouteChanged() {
    const inAbout = routes.ABOUT.contains(Router.getInstance().getCurrentRoute());
    this.showPages_ = { about: inAbout, settings: !inAbout };
  }
  onShowingSubpage_() {
    this.showingSubpage_ = true;
  }
  onShowingMainPage_() {
    this.showingSubpage_ = false;
  }
  searchContents(query) {
    this.inSearchMode_ = true;
    this.toolbarSpinnerActive = true;
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        const page = this.shadowRoot.querySelector('settings-basic-page');
        page.searchContents(query).then((result) => {
          resolve();
          if (result.canceled) {
            return;
          }
          this.toolbarSpinnerActive = false;
          this.inSearchMode_ = !result.wasClearSearch;
          this.showNoResultsFound_ = this.inSearchMode_ && !result.didFindMatches;
          if (this.inSearchMode_) {
            getInstance().announce(
              this.showNoResultsFound_
                ? loadTimeData.getString('searchNoResults')
                : loadTimeData.getStringF('searchResults', query)
            );
          }
        });
      }, 0);
    });
  }
  showManagedHeader_() {
    return !this.inSearchMode_ && !this.showingSubpage_ && !this.showPages_.about;
  }
}
customElements.define(SettingsMainElement.is, SettingsMainElement);
// Copyright 2020 The Chromium Authors
const CrMenuSelectorBase = mixinBehaviors([IronSelectableBehavior], PolymerElement);
class CrMenuSelector extends CrMenuSelectorBase {
  static get is() {
    return 'cr-menu-selector';
  }
  connectedCallback() {
    super.connectedCallback();
    this.focusOutlineManager_ = FocusOutlineManager.forDocument(document);
  }
  ready() {
    super.ready();
    this.setAttribute('role', 'menu');
    this.addEventListener('focusin', this.onFocusin_.bind(this));
    this.addEventListener('keydown', this.onKeydown_.bind(this));
    this.addEventListener('iron-deselect', (e) => this.onIronDeselected_(e));
    this.addEventListener('iron-select', (e) => this.onIronSelected_(e));
  }
  getAllFocusableItems_() {
    return Array.from(this.querySelectorAll('[role=menuitem]:not([disabled]):not([hidden])'));
  }
  onFocusin_(e) {
    const focusMovedWithKeyboard = this.focusOutlineManager_.visible;
    const focusMovedFromOutside = e.relatedTarget === null || !this.contains(e.relatedTarget);
    if (focusMovedWithKeyboard && focusMovedFromOutside) {
      this.getAllFocusableItems_()[0].focus();
    }
  }
  onIronDeselected_(e) {
    e.detail.item.removeAttribute('aria-current');
  }
  onIronSelected_(e) {
    e.detail.item.setAttribute('aria-current', 'page');
  }
  onKeydown_(event) {
    const items = this.getAllFocusableItems_();
    assert(items.length >= 1);
    const currentFocusedIndex = items.indexOf(this.querySelector(':focus'));
    let newFocusedIndex = currentFocusedIndex;
    switch (event.key) {
      case 'Tab':
        if (event.shiftKey) {
          items[0].focus();
        } else {
          items[items.length - 1].focus({ preventScroll: true });
        }
        return;
      case 'ArrowDown':
        newFocusedIndex = (currentFocusedIndex + 1) % items.length;
        break;
      case 'ArrowUp':
        newFocusedIndex = (currentFocusedIndex + items.length - 1) % items.length;
        break;
      case 'Home':
        newFocusedIndex = 0;
        break;
      case 'End':
        newFocusedIndex = items.length - 1;
        break;
    }
    if (newFocusedIndex === currentFocusedIndex) {
      return;
    }
    event.preventDefault();
    items[newFocusedIndex].focus();
  }
}
customElements.define(CrMenuSelector.is, CrMenuSelector);
const styleMod = document.createElement('dom-module');
styleMod.appendChild(
  html`
    <template>
      <style>
        .cr-nav-menu-item {
          --iron-icon-fill-color: var(--google-grey-700);
          --iron-icon-height: 20px;
          --iron-icon-width: 20px;
          --cr-icon-ripple-size: 20px;
          align-items: center;
          border-end-end-radius: 100px;
          border-start-end-radius: 100px;
          box-sizing: border-box;
          color: var(--google-grey-900);
          display: flex;
          font-size: 14px;
          font-weight: 500;
          line-height: 14px;
          margin-inline-end: 2px;
          margin-inline-start: 1px;
          min-height: 40px;
          overflow: hidden;
          padding-block-end: 10px;
          padding-block-start: 10px;
          padding-inline-start: 23px;
          position: relative;
          text-decoration: none;
        }
        :host-context(cr-drawer) .cr-nav-menu-item {
          margin-inline-end: 8px;
        }
        .cr-nav-menu-item:hover {
          background: var(--google-grey-200);
        }
        .cr-nav-menu-item[selected] {
          --iron-icon-fill-color: var(--google-blue-600);
          background: var(--google-blue-50);
          color: var(--google-blue-700);
        }
        @media (prefers-color-scheme: dark) {
          .cr-nav-menu-item {
            --iron-icon-fill-color: var(--google-grey-500);
            color: #fff;
          }
          .cr-nav-menu-item:hover {
            --iron-icon-fill-color: white;
            background: var(--google-grey-800);
          }
          .cr-nav-menu-item[selected] {
            --iron-icon-fill-color: black;
            background: var(--google-blue-300);
            color: var(--google-grey-900);
          }
        }
        .cr-nav-menu-item:focus {
          outline: auto 5px -webkit-focus-ring-color;
          z-index: 1;
        }
        .cr-nav-menu-item:focus:not([selected]):not(:hover) {
          background: 0 0;
        }
        .cr-nav-menu-item iron-icon {
          flex-shrink: 0;
          margin-inline-end: 20px;
          pointer-events: none;
          vertical-align: top;
        }
      </style>
    </template>
  `.content
);
styleMod.register('cr-nav-menu-item-style');
function getTemplate$4() {
  return html`<!--_html_template_start_-->
    <style include="cr-hidden-style cr-icons cr-nav-menu-item-style">
      :host {
        box-sizing: border-box;
        display: block;
        padding-bottom: 5px;
        padding-top: 8px;
      }
      :host * {
        -webkit-tap-highlight-color: transparent;
      }
      #menu {
        color: var(--google-grey-700);
        display: flex;
        flex-direction: column;
        min-width: fit-content;
      }
      #extensionsLink > .cr-icon {
        height: var(--cr-icon-size);
        margin-inline-end: 14px;
        width: var(--cr-icon-size);
      }
      .menu-separator {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        margin-bottom: 8px;
        margin-top: 8px;
      }
      #aboutIcon {
        --cr-icon-image: url(//resources/images/chrome_logo_dark.svg);
        -webkit-mask-size: 18px;
        background-color: var(--iron-icon-fill-color);
        display: block;
        height: var(--cr-icon-size);
        margin-inline-end: 20px;
        margin-inline-start: 0;
        width: var(--cr-icon-size);
      }
      @media (prefers-color-scheme: dark) {
        #menu {
          color: var(--cr-primary-text-color);
        }
        .menu-separator {
          border-bottom: var(--cr-separator-line);
        }
      }
    </style>

    <div role="navigation">
      <cr-menu-selector
        id="menu"
        selectable="a:not(#extensionsLink)"
        attr-for-selected="href"
        on-iron-activate="onSelectorActivate_"
        on-click="onLinkClick_"
        selected-attribute="selected"
      >
        <a role="menuitem" id="people" href="/people" hidden="[[!pageVisibility.people]]" class="cr-nav-menu-item">
          <iron-icon icon="cr:person"></iron-icon>
          鎮ㄤ笌 Google
          <paper-ripple></paper-ripple>
        </a>
        <a
          role="menuitem"
          id="autofill"
          href="/autofill"
          hidden="[[!pageVisibility.autofill]]"
          class="cr-nav-menu-item"
        >
          <iron-icon icon="settings:assignment"></iron-icon>
          鑷姩濉厖鍜屽瘑鐮�
          <paper-ripple></paper-ripple>
        </a>
        <a role="menuitem" href="/privacy" hidden="[[!pageVisibility.privacy]]" class="cr-nav-menu-item">
          <iron-icon icon="cr:security"></iron-icon>
          闅愮鍜屽畨鍏�
          <paper-ripple></paper-ripple>
        </a>
        <a
          role="menuitem"
          id="performance"
          href="/performance"
          class="cr-nav-menu-item"
          hidden="[[!pageVisibility.performance]]"
        >
          <iron-icon icon="settings:performance"></iron-icon>
          鎬ц兘
          <paper-ripple></paper-ripple>
        </a>
        <a
          role="menuitem"
          id="appearance"
          href="/appearance"
          hidden="[[!pageVisibility.appearance]]"
          class="cr-nav-menu-item"
        >
          <iron-icon icon="settings:palette"></iron-icon>
          澶栬
          <paper-ripple></paper-ripple>
        </a>
        <a role="menuitem" href="/search" class="cr-nav-menu-item">
          <iron-icon icon="cr:search"></iron-icon>
          鎼滅储寮曟搸
          <paper-ripple></paper-ripple>
        </a>

        <a
          role="menuitem"
          id="defaultBrowser"
          class="cr-nav-menu-item"
          href="/defaultBrowser"
          hidden="[[!pageVisibility.defaultBrowser]]"
        >
          <iron-icon icon="settings:web"></iron-icon>
          榛樿娴忚鍣�
          <paper-ripple></paper-ripple>
        </a>

        <a
          role="menuitem"
          id="onStartup"
          href="/onStartup"
          class="cr-nav-menu-item"
          hidden="[[!pageVisibility.onStartup]]"
        >
          <iron-icon icon="settings:power-settings-new"></iron-icon>
          鍚姩鏃�
          <paper-ripple></paper-ripple>
        </a>
        <div class="menu-separator"></div>
        <a
          role="menuitem"
          id="languages"
          href="/languages"
          class="cr-nav-menu-item"
          hidden="[[!pageVisibility.languages]]"
        >
          <iron-icon icon="settings:language"></iron-icon>
          璇█
          <paper-ripple></paper-ripple>
        </a>
        <a
          role="menuitem"
          id="downloads"
          href="/downloads"
          class="cr-nav-menu-item"
          hidden="[[!pageVisibility.downloads]]"
        >
          <iron-icon icon="cr:file-download"></iron-icon>
          涓嬭浇鍐呭
          <paper-ripple></paper-ripple>
        </a>
        <a
          role="menuitem"
          id="accessibility"
          href="/accessibility"
          class="cr-nav-menu-item"
          hidden="[[!pageVisibility.a11y]]"
        >
          <iron-icon icon="settings:accessibility"></iron-icon>
          鏃犻殰纰�
          <paper-ripple></paper-ripple>
        </a>

        <a role="menuitem" id="system" href="/system" class="cr-nav-menu-item" hidden="[[!pageVisibility.system]]">
          <iron-icon icon="settings:build"></iron-icon>
          绯荤粺
          <paper-ripple></paper-ripple>
        </a>

        <a role="menuitem" id="reset" href="/reset" hidden="[[!pageVisibility.reset]]" class="cr-nav-menu-item">
          <iron-icon icon="settings:restore"></iron-icon>
          閲嶇疆璁剧疆
          <paper-ripple></paper-ripple>
        </a>
        <div hidden="[[!pageVisibility.advancedSettings]]" class="menu-separator"></div>
        <a
          role="menuitem"
          id="extensionsLink"
          class="cr-nav-menu-item"
          href="chrome://extensions"
          target="_blank"
          hidden="[[!pageVisibility.extensions]]"
          on-click="onExtensionsLinkClick_"
          title="鍦ㄦ柊鏍囩椤典腑鎵撳紑"
        >
          <iron-icon icon="cr:extension"></iron-icon>
          <span>鎵╁睍绋嬪簭</span>
          <div class="cr-icon icon-external"></div>
          <paper-ripple></paper-ripple>
        </a>
        <a role="menuitem" id="about-menu" href="/help" class="cr-nav-menu-item">
          <span id="aboutIcon" class="cr-icon" role="presentation"></span>
          鍏充簬 Chrome
          <paper-ripple></paper-ripple>
        </a>
      </cr-menu-selector>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsMenuElementBase = RouteObserverMixin(PolymerElement);
class SettingsMenuElement extends SettingsMenuElementBase {
  static get is() {
    return 'settings-menu';
  }
  static get template() {
    return getTemplate$4();
  }
  static get properties() {
    return { pageVisibility: Object };
  }
  ready() {
    super.ready();
    this.routes_ = Router.getInstance().getRoutes();
  }
  currentRouteChanged(newRoute) {
    if (loadTimeData.getBoolean('showGetTheMostOutOfChromeSection') && newRoute === this.routes_.GET_MOST_CHROME) {
      const about = this.shadowRoot.querySelector('#about-menu');
      assert(about);
      this.setSelectedUrl_(about.href);
      return;
    }
    const anchors = this.shadowRoot.querySelectorAll('a');
    for (let i = 0; i < anchors.length; ++i) {
      const anchorRoute = Router.getInstance().getRouteForPath(anchors[i].getAttribute('href'));
      if (anchorRoute && anchorRoute.contains(newRoute)) {
        this.setSelectedUrl_(anchors[i].href);
        return;
      }
    }
    this.setSelectedUrl_('');
  }
  focusFirstItem() {
    const firstFocusableItem = this.shadowRoot.querySelector('[role=menuitem]:not([hidden])');
    if (firstFocusableItem) {
      firstFocusableItem.focus();
    }
  }
  onLinkClick_(event) {
    if (event.target.matches('a:not(#extensionsLink)')) {
      event.preventDefault();
    }
  }
  setSelectedUrl_(url) {
    this.$.menu.selected = url;
  }
  onSelectorActivate_(event) {
    this.setSelectedUrl_(event.detail.selected);
    const path = new URL(event.detail.selected).pathname;
    const route = Router.getInstance().getRouteForPath(path);
    assert(route, 'settings-menu has an entry with an invalid route.');
    Router.getInstance().navigateTo(route, undefined, true);
  }
  onExtensionsLinkClick_() {
    chrome.metricsPrivate.recordUserAction('SettingsMenu_ExtensionsLinkClicked');
  }
}
customElements.define(SettingsMenuElement.is, SettingsMenuElement);
function getTemplate$3() {
  return html`<!--_html_template_start_-->
    <style include="cr-page-host-style settings-shared">
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        --settings-menu-width: 250px;
        --settings-main-basis: calc(var(--cr-centered-card-max-width) / var(--cr-centered-card-width-percentage));
      }
      cr-toolbar {
        min-height: 56px;
        --cr-toolbar-center-basis: var(--settings-main-basis);
      }
      cr-toolbar:not([narrow]) {
        --cr-toolbar-left-spacer-width: var(--settings-menu-width);
      }
      @media (prefers-color-scheme: light) {
        cr-toolbar {
          --iron-icon-fill-color: white;
        }
      }
      #cr-container-shadow-top {
        z-index: 2;
      }
      #container {
        align-items: flex-start;
        display: flex;
        flex: 1;
        overflow: overlay;
        position: relative;
      }
      #left,
      #main,
      #right {
        flex: 1 1 0;
      }
      #left {
        height: 100%;
        position: sticky;
        top: 0;
      }
      #left settings-menu {
        max-height: 100%;
        overflow: auto;
        overscroll-behavior: contain;
        width: var(--settings-menu-width);
      }
      #main {
        flex-basis: var(--settings-main-basis);
      }
      @media (max-width: 980px) {
        #main {
          min-width: auto;
          padding: 0 3px;
        }
      }
    </style>
    <settings-prefs id="prefs" prefs="{{prefs}}"></settings-prefs>
    <cr-toolbar
      id="toolbar"
      page-name="璁剧疆"
      clear-label="娓呴櫎鎼滅储瀛楄瘝"
      autofocus
      search-prompt="鍦ㄨ缃腑鎼滅储"
      on-cr-toolbar-menu-click="onMenuButtonClick_"
      spinner-active="[[toolbarSpinnerActive_]]"
      menu-label="涓昏彍鍗�"
      on-search-changed="onSearchChanged_"
      role="banner"
      narrow="{{narrow_}}"
      narrow-threshold="980"
      show-menu="[[narrow_]]"
    >
    </cr-toolbar>
    <cr-drawer id="drawer" on-close="onMenuClose_" heading="璁剧疆" align="ltr">
      <div slot="body">
        <template is="dom-if" id="drawerTemplate">
          <settings-menu id="drawerMenu" page-visibility="[[pageVisibility_]]" on-iron-activate="onIronActivate_">
          </settings-menu>
        </template>
      </div>
    </cr-drawer>
    <div id="container" class="no-outline">
      <div id="left" hidden$="[[narrow_]]">
        <settings-menu id="leftMenu" page-visibility="[[pageVisibility_]]" on-iron-activate="onIronActivate_">
        </settings-menu>
      </div>
      <settings-main
        id="main"
        prefs="{{prefs}}"
        toolbar-spinner-active="{{toolbarSpinnerActive_}}"
        page-visibility="[[pageVisibility_]]"
      >
      </settings-main>

      <div id="right" hidden$="[[narrow_]]"></div>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsUiElementBase = RouteObserverMixin(CrContainerShadowMixin(FindShortcutMixin(PolymerElement)));
class SettingsUiElement extends SettingsUiElementBase {
  static get is() {
    return 'settings-ui';
  }
  static get template() {
    return getTemplate$3();
  }
  static get properties() {
    return {
      prefs: Object,
      toolbarSpinnerActive_: { type: Boolean, value: false },
      narrow_: { type: Boolean, observer: 'onNarrowChanged_' },
      pageVisibility_: { type: Object, value: pageVisibility },
      lastSearchQuery_: { type: String, value: '' },
    };
  }
  constructor() {
    super();
    Router.getInstance().initializeRouteFromUrl();
  }
  ready() {
    super.ready();
    listenOnce(this.$.drawer, 'cr-drawer-opening', () => {
      this.$.drawerTemplate.if = true;
    });
    window.addEventListener('popstate', () => {
      this.$.drawer.cancel();
    });
    window.CrPolicyStrings = {
      controlledSettingExtension: loadTimeData.getString('controlledSettingExtension'),
      controlledSettingExtensionWithoutName: loadTimeData.getString('controlledSettingExtensionWithoutName'),
      controlledSettingPolicy: loadTimeData.getString('controlledSettingPolicy'),
      controlledSettingRecommendedMatches: loadTimeData.getString('controlledSettingRecommendedMatches'),
      controlledSettingRecommendedDiffers: loadTimeData.getString('controlledSettingRecommendedDiffers'),
      controlledSettingChildRestriction: loadTimeData.getString('controlledSettingChildRestriction'),
      controlledSettingParent: loadTimeData.getString('controlledSettingParent'),
    };
    this.addEventListener('show-container', () => {
      this.$.container.style.visibility = 'visible';
    });
    this.addEventListener('hide-container', () => {
      this.$.container.style.visibility = 'hidden';
    });
    this.addEventListener('refresh-pref', this.onRefreshPref_.bind(this));
  }
  connectedCallback() {
    super.connectedCallback();
    document.documentElement.classList.remove('loading');
    setTimeout(function () {
      chrome.send('metricsHandler:recordTime', ['Settings.TimeUntilInteractive', window.performance.now()]);
    });
    document.fonts.load('bold 12px Roboto');
    setGlobalScrollTarget(this.$.container);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    Router.getInstance().resetRouteForTesting();
    resetGlobalScrollTargetForTesting();
  }
  currentRouteChanged(route) {
    if (route === routes.PRIVACY_GUIDE) {
      this.enableShadowBehavior(true);
    } else if (route.depth <= 1) {
      this.enableShadowBehavior(true);
    } else if (!route.isNavigableDialog) {
      this.enableShadowBehavior(false);
      this.showDropShadows();
    }
    const urlSearchQuery = Router.getInstance().getQueryParameters().get('search') || '';
    if (urlSearchQuery === this.lastSearchQuery_) {
      return;
    }
    this.lastSearchQuery_ = urlSearchQuery;
    const toolbar = this.shadowRoot.querySelector('cr-toolbar');
    const searchField = toolbar.getSearchField();
    if (urlSearchQuery !== searchField.getValue()) {
      searchField.setValue(urlSearchQuery, true);
    }
    this.$.main.searchContents(urlSearchQuery);
  }
  handleFindShortcut(modalContextOpen) {
    if (modalContextOpen) {
      return false;
    }
    this.shadowRoot.querySelector('cr-toolbar').getSearchField().showAndFocus();
    return true;
  }
  searchInputHasFocus() {
    return this.shadowRoot.querySelector('cr-toolbar').getSearchField().isSearchFocused();
  }
  onRefreshPref_(e) {
    return this.$.prefs.refresh(e.detail);
  }
  onSearchChanged_(e) {
    const query = e.detail;
    Router.getInstance().navigateTo(
      routes.BASIC,
      query.length > 0 ? new URLSearchParams('search=' + encodeURIComponent(query)) : undefined,
      true
    );
  }
  onIronActivate_() {
    this.$.drawer.close();
  }
  onMenuButtonClick_() {
    this.$.drawer.toggle();
  }
  onMenuClose_() {
    if (!this.$.drawer.wasCanceled()) {
      return;
    }
    this.$.container.setAttribute('tabindex', '-1');
    this.$.container.focus();
    listenOnce(this.$.container, ['blur', 'pointerdown'], () => {
      this.$.container.removeAttribute('tabindex');
    });
  }
  onNarrowChanged_() {
    if (this.$.drawer.open && !this.narrow_) {
      this.$.drawer.close();
    }
    const focusedElement = this.shadowRoot.activeElement;
    if (this.narrow_ && focusedElement === this.$.leftMenu) {
      this.$.toolbar.focusMenuButton();
    } else if (!this.narrow_ && this.$.toolbar.isMenuFocused()) {
      this.$.leftMenu.focusFirstItem();
    } else if (!this.narrow_ && focusedElement === this.shadowRoot.querySelector('#drawerMenu')) {
      const boundCloseListener = () => {
        this.$.leftMenu.focusFirstItem();
        this.$.drawer.removeEventListener('close', boundCloseListener);
      };
      this.$.drawer.addEventListener('close', boundCloseListener);
    }
  }
}
customElements.define(SettingsUiElement.is, SettingsUiElement);
function getTemplate$2() {
  return html`<!--_html_template_start_--><style include="settings-shared"></style>
    <settings-safety-check-child
      id="safetyCheckChild"
      icon-status="[[safetyCheckIconEnum_.EXTENSIONS_REVIEW]]"
      label="[[displayString_]]"
      button-label="鏌ョ湅"
      button-aria-label="鏌ョ湅鎵╁睍绋嬪簭"
      on-button-click="onButtonClick_"
      role="presentation"
      button-icon="cr:open-in-new"
      class="two-line"
    >
    </settings-safety-check-child>
    <!--_html_template_end_-->`;
}
// Copyright 2023 The Chromium Authors
const SafetyCheckExtensionsElementBase = WebUiListenerMixin(PolymerElement);
class SafetyCheckExtensionsElement extends SafetyCheckExtensionsElementBase {
  static get is() {
    return 'safety-check-extensions';
  }
  static get template() {
    return getTemplate$2();
  }
  static get properties() {
    return { displayString_: String, safetyCheckIconEnum_: { type: Object, value: SafetyCheckIconStatus } };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addWebUiListener('safety-check-extensions-status-changed', this.onSafetyCheckExtensionsChanged_.bind(this));
    this.onSafetyCheckExtensionsChanged_();
  }
  async onSafetyCheckExtensionsChanged_() {
    const numExtensions =
      await SafetyCheckExtensionsBrowserProxyImpl.getInstance().getNumberOfExtensionsThatNeedReview();
    this.displayString_ = await PluralStringProxyImpl.getInstance().getPluralString(
      'safetyCheckExtensionsReviewLabel',
      numExtensions
    );
  }
  onButtonClick_() {
    MetricsBrowserProxyImpl.getInstance().recordAction('Settings.SafetyCheck.ReviewExtensionsThroughSafetyCheck');
    OpenWindowProxyImpl.getInstance().openUrl('chrome://extensions');
  }
}
customElements.define(SafetyCheckExtensionsElement.is, SafetyCheckExtensionsElement);
function getTemplate$1() {
  return html`<!--_html_template_start_--><style include="cr-shared-style settings-shared"></style>
    <settings-safety-check-child
      id="safetyCheckChild"
      icon-status="[[iconStatus_]]"
      label="[[headerString_]]"
      button-label="鏌ョ湅"
      button-aria-label="鏌ョ湅閫氱煡鏉冮檺"
      on-button-click="onButtonClick_"
      role="presentation"
      class="two-line"
    >
    </settings-safety-check-child
    ><!--_html_template_end_-->`;
}
// Copyright 2022 The Chromium Authors
const SettingsSafetyCheckNotificationPermissionsElementBase = WebUiListenerMixin(PolymerElement);
class SettingsSafetyCheckNotificationPermissionsElement extends SettingsSafetyCheckNotificationPermissionsElementBase {
  constructor() {
    super(...arguments);
    this.safetyHubBrowserProxy_ = SafetyHubBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-safety-check-notification-permissions';
  }
  static get template() {
    return getTemplate$1();
  }
  static get properties() {
    return {
      iconStatus_: {
        type: SafetyCheckIconStatus,
        value() {
          return SafetyCheckIconStatus.NOTIFICATION_PERMISSIONS;
        },
      },
      headerString_: String,
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addWebUiListener('notification-permission-review-list-maybe-changed', (sites) => this.onSitesChanged_(sites));
    this.safetyHubBrowserProxy_.getNotificationPermissionReview().then(this.onSitesChanged_.bind(this));
  }
  onButtonClick_() {
    Router.getInstance().navigateTo(routes.SITE_SETTINGS_NOTIFICATIONS, undefined, true);
  }
  async onSitesChanged_(sites) {
    this.headerString_ = await PluralStringProxyImpl.getInstance().getPluralString(
      'safetyCheckNotificationPermissionReviewHeaderLabel',
      sites.length
    );
  }
}
customElements.define(
  SettingsSafetyCheckNotificationPermissionsElement.is,
  SettingsSafetyCheckNotificationPermissionsElement
);
function getTemplate() {
  return html`<!--_html_template_start_--><style include="cr-shared-style settings-shared"></style>
    <settings-safety-check-child
      id="safetyCheckChild"
      icon-status="[[iconStatus_]]"
      label="[[headerString_]]"
      button-label="鏌ョ湅"
      button-aria-label="鏌ョ湅宸叉挙娑堢殑鏉冮檺"
      on-button-click="onButtonClick_"
      role="presentation"
      class="two-line"
    >
    </settings-safety-check-child
    ><!--_html_template_end_-->`;
}
// Copyright 2022 The Chromium Authors
const SettingsSafetyCheckUnusedSitePermissionsElementBase = WebUiListenerMixin(PolymerElement);
class SettingsSafetyCheckUnusedSitePermissionsElement extends SettingsSafetyCheckUnusedSitePermissionsElementBase {
  constructor() {
    super(...arguments);
    this.browserProxy_ = SafetyHubBrowserProxyImpl.getInstance();
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-safety-check-unused-site-permissions';
  }
  static get template() {
    return getTemplate();
  }
  static get properties() {
    return {
      iconStatus_: {
        type: SafetyCheckIconStatus,
        value() {
          return SafetyCheckIconStatus.UNUSED_SITE_PERMISSIONS;
        },
      },
      headerString_: String,
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addWebUiListener('unused-permission-review-list-maybe-changed', (sites) => {
      this.onSitesChanged_(sites);
    });
    this.browserProxy_.getRevokedUnusedSitePermissionsList().then(this.onSitesChanged_.bind(this));
  }
  async onSitesChanged_(sites) {
    this.headerString_ = await PluralStringProxyImpl.getInstance().getPluralString(
      'safetyCheckUnusedSitePermissionsHeaderLabel',
      sites.length
    );
  }
  onButtonClick_() {
    this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(
      SafetyCheckInteractions.UNUSED_SITE_PERMISSIONS_REVIEW
    );
    this.metricsBrowserProxy_.recordAction('Settings.SafetyCheck.ReviewUnusedSitePermissions');
    Router.getInstance().navigateTo(routes.SITE_SETTINGS, undefined, true);
  }
}
customElements.define(
  SettingsSafetyCheckUnusedSitePermissionsElement.is,
  SettingsSafetyCheckUnusedSitePermissionsElement
);
export {
  AboutPageBrowserProxyImpl,
  AppearanceBrowserProxyImpl,
  BATTERY_SAVER_MODE_PREF,
  BaseMixin,
  BatterySaverModeState,
  CrDrawerElement,
  CrToolbarElement,
  CrToolbarSearchFieldElement,
  DefaultBrowserBrowserProxyImpl,
  EDIT_STARTUP_URL_EVENT,
  HIGH_EFFICIENCY_MODE_PREF,
  HatsBrowserProxyImpl,
  HighEfficiencyModeExceptionListAction,
  HighEfficiencyModeState,
  HomeUrlInputElement,
  MAX_TAB_DISCARD_EXCEPTION_RULE_LENGTH,
  MetricsBrowserProxyImpl,
  OnStartupBrowserProxyImpl,
  OpenWindowProxyImpl,
  PasswordCheckReferrer,
  PasswordManagerImpl,
  PasswordManagerPage,
  PerformanceBrowserProxyImpl,
  PerformanceMetricsProxyImpl,
  PrefsMixin,
  PrivacyGuideBrowserProxyImpl,
  PrivacyGuideInteractions,
  PrivacyPageBrowserProxyImpl,
  ProfileInfoBrowserProxyImpl,
  RelaunchMixin,
  ResetBrowserProxyImpl,
  RestartType,
  Router,
  SafetyCheckBrowserProxyImpl,
  SafetyCheckCallbackConstants,
  SafetyCheckExtensionsBrowserProxyImpl,
  SafetyCheckExtensionsElement,
  SafetyCheckExtensionsStatus,
  SafetyCheckIconStatus,
  SafetyCheckInteractions,
  SafetyCheckParentStatus,
  SafetyCheckPasswordsStatus,
  SafetyCheckSafeBrowsingStatus,
  SafetyCheckUpdatesStatus,
  SearchEnginesBrowserProxyImpl,
  SearchRequest,
  SettingsAboutPageElement,
  SettingsAppearancePageElement,
  SettingsAutofillPageElement,
  SettingsBasicPageElement,
  SettingsBatteryPageElement,
  SettingsDefaultBrowserPageElement,
  SettingsIdleLoadElement,
  SettingsMainElement,
  SettingsMenuElement,
  SettingsOnStartupPageElement,
  SettingsPeoplePageElement,
  SettingsPerformancePageElement,
  PluralStringProxyImpl as SettingsPluralStringProxyImpl,
  SettingsPrivacyPageElement,
  SettingsResetProfileBannerElement,
  SettingsSafetyCheckChildElement,
  SettingsSafetyCheckExtensionsChildElement,
  SettingsSafetyCheckNotificationPermissionsElement,
  SettingsSafetyCheckPageElement,
  SettingsSafetyCheckPasswordsChildElement,
  SettingsSafetyCheckSafeBrowsingChildElement,
  SettingsSafetyCheckUnusedSitePermissionsElement,
  SettingsSafetyCheckUpdatesChildElement,
  SettingsSearchPageElement,
  SettingsSectionElement,
  SettingsStartupUrlDialogElement,
  SettingsStartupUrlEntryElement,
  SettingsStartupUrlsPageElement,
  SettingsUiElement,
  StartupUrlsPageBrowserProxyImpl,
  SyncBrowserProxyImpl,
  SystemTheme,
  TAB_DISCARD_EXCEPTIONS_MANAGED_PREF,
  TAB_DISCARD_EXCEPTIONS_OVERFLOW_SIZE,
  TAB_DISCARD_EXCEPTIONS_PREF,
  TabDiscardExceptionAddDialogElement,
  TabDiscardExceptionAddDialogTabs,
  TabDiscardExceptionCurrentSitesEntryElement,
  TabDiscardExceptionEditDialogElement,
  TabDiscardExceptionEntryElement,
  TabDiscardExceptionListElement,
  TabDiscardExceptionTabbedAddDialogElement,
  TooltipMixin,
  TrustSafetyInteraction,
  UpdateStatus,
  getSearchManager,
  getTrustedHTML,
  pageVisibility,
  routes,
  setSearchManagerForTesting,
};
