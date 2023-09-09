// @ts-check

import ShadowTemplateMixin from './shadow-template-mixin.js';

export default class ReactiveElement extends ShadowTemplateMixin(HTMLElement) {
  queryCache = new Map();
}
