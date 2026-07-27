# seele

seele (**S**tandard **E**xtensible **Ele**ments) is a extensible
[Web Components][web-comps] library with a focus on accessibility and
keyboard-control.

## Installation

seele is published on npm at [`@vollowx/seele`](npm-package), therefore:

```sh
npm install @vollowx/seele

yarn add @vollowx/seele

bun add @vollowx/seele
```

To start using seele, you will need a bundlers and dev servers that resolves
paths to Node packages, for example [web-dev-server] and [rollup]. Another
option is to use [import maps], which is not suitable for actual deployment for
its size and inconvenience.

You can take a look at [seele-example](seele-example), which contains a minimal
setup for using seele (or actually any other Web Components library).

## Usage

```typescript
// Import all components
import '@vollowx/seele';

// Or import specific components (recommended)
// They all follow such path: @/catagory/group/component.js
import '@vollowx/seele/m3/button/common-button.js';
import '@vollowx/seele/m3/checkbox/checkbox.js';

import '@vollowx/seele/win98/button/button.js';
```

The `<catagory>` can be `core`, `base` and design systems (see the next
section),

Each design system contains not only conponents, but also assets like styles.
To check them out, see `00_Overview` for each design system.

## Design systems

The following design systems or styles are implemented:

- [Material You Expressive](./05-Material_You_Expressive/00_Overview.md) as `m3`
- [Windows 98](./06-Windows_98/00_Overview.md) as `win98`

[web-comps]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
[npm-package]: https://www.npmjs.com/package/@vollowx/seele
[seele-example]: https://github.com/vollowx/seele-example/
