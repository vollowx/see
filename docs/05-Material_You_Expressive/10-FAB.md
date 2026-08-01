---
components:
  - m3/fab/fab
---

# Floating action button

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/fab/fab.js';
```

<!-- @show -->

```html
<md-fab aria-label="Edit">
  <iconify-icon icon="material-symbols:edit"></iconify-icon>
</md-fab>
<md-fab size="m" color="secondary" aria-label="Accessibility">
  <iconify-icon icon="material-symbols:accessible-forward"></iconify-icon>
</md-fab>
<md-fab size="l" color="tertiary-container" aria-label="Mail">
  <iconify-icon icon="material-symbols:mail"></iconify-icon>
</md-fab>
```

## `M3Fab`

- Inherits [`Button`](../04-Base/10-Button.md)

### Slots

| name    | description |
| ---     | ---         |
|         | The icon    |
| `label` |             |

### CSS Parts

| name        | description |
| ---         | ---         |
| `label`     |             |
| `icon`      |             |

### Properties

|  name   | description                                                                                                                                               |
| ---     | ---                                                                                                                                                       |
| `size`  | Reflected string; `s`, `m` or `l`; `s` by default                                                                                                         |
| `color` | Reflected string; `surface`, `primary`, `secondary`, `tertiary`, `primary-container`, `secondary-container` or `tertiary-container`; `primary` by default |

[overview]: https://m3.material.io/components/floating-action-button/overview
