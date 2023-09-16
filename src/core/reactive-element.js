// @ts-check

/// <reference path="shared.d.ts" />

import InternalsMixin from './internals-mixin.js';
import ShadowTemplateMixin from './shadow-template-mixin.js';

// @ts-ignore
// For the shadowRoot is not attached by default
const Base = InternalsMixin(ShadowTemplateMixin(HTMLElement));

export default class ReactiveElement extends Base {
  queryCache = new Map();
}
