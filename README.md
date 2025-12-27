# SEE

SEE stands for _Standard Extensible Elements_, which is a
[web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
library that can be styled and extended freely, while pre-providing components
in [Material You](https://m3.material.io/) design guideline.

SEE has its package published on
[npm](https://www.npmjs.com/package/@vollowx/see), it is now the only way for
you to use SEE. Visit [the website of SEE](https://stdee.vercel.app/) for docs
and demos. Below is a [quick start](#quick-start) guide.

## Resources

- [Roadmap](./ROADMAP.md)
- [Todos](./TODO.md)
- [Contributing specification](./CONTRIBUTING.md)

## Compatibility

- Chromium `>= 125.0.6415.0`
- Firefox `>= 126.0a1`

## Quick Start

```sh
npm install @vollowx/see
```

```javascript
// import all components
import '@vollowx/see';
// or import a specific component
import '@vollowx/see/m3/button';
// or import component class
import { M3Button } from '@vollowx/see/m3/button';
```

```html
<md-button variant="outlined">Outlined Button</md-button>
```

Note that CSS variables for Material You systems are not included in the npm package nor the source code yet. You may copy them from the `docs` or `dev` folders for now.
