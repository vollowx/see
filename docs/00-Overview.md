---
title: Overview - seele
components:
  - m3/button/common-button
---

# seele

seele (**S**tandard **E**xtensible **Ele**ments) is an extensible
[Web Components][web-comps] library with a focus on accessibility and
keyboard navigation.

<!-- @uncomment
<md-button size="xl" style="width: 100%; margin-block-start: 8px" onclick="navigation.navigate('./m3/playground/')">
  <iconify-icon slot="icon" icon="material-symbols:category-outline"></iconify-icon>
  Playground
</md-button>
<md-button variant="tonal" size="l" style="width: 100%; margin-block-start: 8px" onclick="navigation.navigate('https://vollowx.github.io/timor/')">
  <iconify-icon slot="icon" icon="material-symbols:globe-clock"></iconify-icon>
  Demo app - Timor
</md-button>
<p><i>* As per experience from the Eleventy website, yes, this is probably necessary.</i></p>
<p><i>* And yes, this button requires Firefox 147 and Safari 26.2 to be a working link.</i></p>
-->

To try seele without installing it, you can use [importmap](importmap) like
below.
Note that styles required to properly display the components are not included.

```html
<script type="importmap">
  {
    "imports": {
      "@vollowx/seele/": "https://esm.run/@vollowx/seele/"
    }
  }
</script>
<script type="module">
  import '@vollowx/seele/m3/button/common-button.js';
</script>
<md-button variant="outlined">Button</md-button>
```

## Installation

seele is published on npm at [`@vollowx/seele`](npm-package), so you can install
it with:

```sh
npm i @vollowx/seele
```

To start using seele, you will need a bundler and dev server that can resolve
Node package paths, for example [web-dev-server](web-dev-server) and
[esbuild](esbuild). You can take a look at [seele-example](seele-example), which
contains a minimal setup for using seele (or actually any other Web Components
library).

## Usage

```typescript
// Import all components (not recommended)
import '@vollowx/seele';

// Or import specific components
// They all follow such path: @/catagory/group/component.js

import '@vollowx/seele/m3/button/common-button.js';
import '@vollowx/seele/m3/checkbox/checkbox.js';

import '@vollowx/seele/win98/button/button.js';
```

The `<catagory>` can be `core`, `base` or a design system (see the next
section). The path to one component does not necessarily match the name of it,
for example `<md-loading>` is imported from
`@vollowx/seele/m3/loading-indicator/loading-indicator.js`. Such relationship
is documented on each component's page.

## Design systems

This library implements the following design systems (each identified by a
prefix):

- [Material You Expressive](./05-Material_You_Expressive/00-Overview.md), prefixed as `m3`
- [Windows 98](./06-Windows_98/00-Overview.md), prefixed as `win98`

Each design system contains not only conponents, but also assets like styles
and helper utils. Refer to the overview page of each system for more details.

To see all components you can import directly, see [all.ts](all).

## Compatibility

See [Compatibility](./03-Compatibility.md).

## Notes

1. If a component gets some properties or parts by extending or mixing, the
   properties and parts are only shown at the super class or mixins.

2. The order you import components matters for now, for example `<md-menu>` looks
   for `<md-menu-item>`s in its slot at `connectedCallback()`, and if they are not
   registered at that moment, they will miss the chance of getting the events
   added. Such case happens for autocomplete, menu and tabs, and is solved for
   dialog and radio.

   The easist solution is to do things like loading menu items before menu, and
   such cases will be handled more flexibly in the future.

This documentation is also available at:

- as Markdown
  - [SourceHut](https://git.sr.ht/~lucaz/seele/tree/main/item/docs/00-Overview.md)
  - [GitHub](https://github.com/vollowx/seele/blob/main/docs/00-Overview.md)
- as website with demos rendered
  - [https://tideover.cc/seele/docs/](https://tideover.cc/seele/docs/)
  - [https://lucaz.srht.site/](https://lucaz.srht.site/) (backup site)

[web-comps]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
[npm-package]: https://www.npmjs.com/package/@vollowx/seele
[seele-example]: https://github.com/vollowx/seele-example/
[web-dev-server]: https://modern-web.dev/docs/dev-server/overview/
[esbuild]: https://esbuild.github.io/
[importmap]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap
[all]: https://github.com/vollowx/seele/blob/main/src/all.ts
