---
title: Loading indicator component - seele/m3
components:
  - m3/loading/loading
---

# Loading indicator

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/loading/loading.js';
```

<!-- @show -->

```html
<md-loading aria-label="Loading pictures"></md-loading>
<md-loading aria-label="Loading pictures" contained style="width: 64px;"></md-loading>
```

Loading indicators have their roles set to `progressbar` by default, you should
write a `aria-label` to add semantic meaning to them.

## `M3LoadingIndicator`

- Inherits [`LitElement`](lit-ele)

### Properties

| name        | description                  |
| ---         | ---                          |
| `contained` | Reflected boolean; `false` by default |
| `$canvas`   | HTMLCanvasElement            |

[overview]: https://m3.material.io/components/loading-indicator/overview
[lit-ele]: https://lit.dev/docs/api/LitElement/
