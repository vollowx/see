type Constructor<T> = new () => T;

type Mixin<BaseMembers, MixinMembers> = <T extends HTMLElement & BaseMembers>(
  Base: Constructor<T>
) => Constructor<T & MixinMembers>;

declare module '*.css?inline' {
  const content: CSSResultGroup;
  export default content;
}
