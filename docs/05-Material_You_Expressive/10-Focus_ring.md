---
components:
  - m3/focus-ring/focus-ring
---

# Focus ring

```typescript
import '@vollowx/seele/m3/focus-ring/focus-ring.js';
```

<!-- @show -->

```html
<button style="position: relative">
  <md-focus-ring></md-focus-ring>
  Le Button
</button>
```

Focus ring is an `Attachable` element as well, checkout [Ripple](./10-Ripple.md)
to see its usage.

## `M3FocusRing`

- Inherits [`LitElement`](lit-ele)
- Mixes [`InternalsAttached`](../04-Base/20-InternalsAttached.md)
- Mixes [`Attachable`](../04-Base/20-Attachable.md)

### Properties

| name     | description                                        |
| ---      | ---                                                |
| `inward` | Reflected boolean; ring appears inside the element |

### CSS Custom Properties

| name                                | description        |
| ---                                 | ---                |
| `--md-focus-ring-width`             |                    |
| `--md-focus-ring-active-width`      |                    |
| `--md-focus-ring-color`             |                    |
| `--md-focus-ring-duration`          | Animation duration |
| `--md-focus-ring-shape`             |                    |
| `--md-focus-ring-shape-start-start` |                    |
| `--md-focus-ring-shape-start-end`   |                    |
| `--md-focus-ring-shape-end-start`   |                    |
| `--md-focus-ring-shape-end-end`     |                    |
| `--md-focus-ring-inward-offset`     |                    |
| `--md-focus-ring-outward-offset`    |                    |

[lit-ele]: https://lit.dev/docs/api/LitElement/
