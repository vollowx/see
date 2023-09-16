// @ts-check

import InternalsMixin from './internals-mixin.js';
import ShadowTemplateMixin from './shadow-template-mixin.js';

const Base = InternalsMixin(ShadowTemplateMixin(HTMLElement));

export default class ReactiveElement extends Base {
  queryCache = new Map();
}
