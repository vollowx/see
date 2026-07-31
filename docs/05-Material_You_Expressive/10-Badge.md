---
components:
  - m3/badge/badge
  - m3/button/icon-button
---

# Badge

- [Material Design](overview)

```typescript
import '@vollow/seele/m3/badge.js';
```

<!-- @show -->

```html
<md-badge value="4" circle>
  <md-icon-button aria-label="Mail, 3 notifications">
    <iconify-icon icon="material-symbols:mail-outline"></iconify-icon>
  </md-icon-button>
</md-badge>
```

## `M3Badge`

- Inherits [`LitElement`](lit-ele)

### Slots

| name | description                 |
| ---  | ---                         |
|      | The element under the badge |

### Parts

| name    | description |
| ---     | ---         |
| `badge` |             |

### Properties

| name       | description                                    |
| ---        | ---                                            |
| `value`    | Number                                         |
| `max`      | Number                                         |
| `showZero` | Reflected boolean; `show-zero` as an attribute |
| `small`    | Reflected boolean                              |
| `left`     | Reflected boolean                              |
| `bottom`   | Reflected boolean                              |
| `$badge`   |                                                |

[overview]: https://m3.material.io/components/badges/overview
[lit-ele]: https://lit.dev/docs/api/LitElement/
