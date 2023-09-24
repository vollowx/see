type Constructor<T> = new () => T;

type CustomElement = HTMLElement & {
  adoptedCallback?(): void;
  attributeChangedCallback?(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void;
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  update?(): void;
  update?({}: { first?: boolean; dispatch?: boolean }): void;
  shadowRoot: ShadowRoot;
};

type Mixin<BaseMembers, MixinMembers> = <T extends HTMLElement & BaseMembers>(
  Base: Constructor<T>
) => Constructor<T & MixinMembers>;

declare module '*.css?inline' {
  const content: string;
  export default content;
}
