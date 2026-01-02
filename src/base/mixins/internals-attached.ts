import { LitElement } from 'lit';

export const internals = Symbol('internals');

export declare class InternalsAttachedInterface {
  [internals]: ElementInternals;
}

export const InternalsAttached = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class InternalsAttachedElement extends superClass {
    [internals] = this.attachInternals();
  }
  return InternalsAttachedElement as Constructor<InternalsAttachedInterface> &
    T;
};
