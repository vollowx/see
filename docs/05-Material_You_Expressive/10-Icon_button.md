---
components:
  - m3/button/icon-button
  - m3/button/icon-button-toggle
---

# Icon button

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/button/icon-button.js';
import '@vollowx/seele/m3/button/icon-button-toggle.js';
```

<!-- @show -->

```html
<md-icon-button>
  <iconify-icon icon="material-symbols:more-vert"></iconify-icon>
</md-icon-button>
<md-icon-button-toggle size="l" variant="filled">
  <iconify-icon icon="material-symbols:settings-outline"></iconify-icon>
  <iconify-icon icon="material-symbols:settings" slot="checked"></iconify-icon>
</md-icon-button-toggle>
<md-icon-button-toggle size="l" variant="filled" checked>
  <iconify-icon icon="material-symbols:settings-outline"></iconify-icon>
  <iconify-icon icon="material-symbols:settings" slot="checked"></iconify-icon>
</md-icon-button-toggle>
<md-icon-button width="wide" size="m" variant="tonal">
  <iconify-icon icon="material-symbols:download"></iconify-icon>
</md-icon-button>
<md-icon-button width="narrow" size="m" variant="outlined">
  <iconify-icon icon="material-symbols:delete-outline"></iconify-icon>
</md-icon-button>
```


## `M3IconButton` and `M3IconButtonToggle`

- `M3IconButton` inherits [`Button`](../04-Base/10-Button.md)
- `M3IconButtonToggle` inherits [`ButtonButton`](../04-Base/10-ButtonToggle.md)

### Slots

| name      | description                                                |
| ---       | ---                                                        |
|           | The icon or unchecked icon (only for `M3IconButtonToggle`) |
| `checked` | The checked icon (only for `M3IconButtonToggle`)           |

### CSS Parts

name        | description
---         | ---
`icon`      | All icons
`checked`   | (only for `M3IconButtonToggle`)
`unchecked` | (only for `M3IconButtonToggle`)

### Properties

| name      | description                                                                  |
| ---       | ---                                                                          |
| `color`   | Reflected string; `primary`, `secondary` or `tertiary`; `primary` by default |
| `size`    | Reflected string; `xs`, `s`, `m`, `l` or `xl`; `s` by default                |
| `width`   | Reflected string; `narrow`, `standard` or `wide`; `standard` by default      |
| `variant` | Reflected string; `filled`, `tonal`, `outlined` or `text`; `text` by default |

[overview]: https://m3.material.io/components/icon-buttons/overview
