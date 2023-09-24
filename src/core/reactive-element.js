// @ts-check

import ReactiveMixin from './reactive-mixin';

// @ts-ignore
const Base = ReactiveMixin(HTMLElement);

export default class ReactiveElement extends Base {}
