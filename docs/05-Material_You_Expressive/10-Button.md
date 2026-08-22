---
title: Button component - seele/m3
components:
  - m3/button/common-button
  - m3/button/common-button-toggle
---

# Button

- [Material Design](overview)
- [WAI-ARIA](wai-aria)

```typescript
import '@vollowx/seele/m3/button/common-button.js';
import '@vollowx/seele/m3/button/common-button-toggle.js';
```

<!-- @show -->

```html
<md-button trailing-icon size="xs" variant="tonal">
  <iconify-icon icon="material-symbols:more-vert" slot="icon"></iconify-icon>
  Extra small
</md-button>

<md-button-toggle size="m" variant="filled">
  <span>Unselected</span>
  <span slot="checked">Selected</span>
</md-button-toggle>
<md-button-toggle size="m" variant="filled" checked>
  <span>Unselected</span>
  <span slot="checked">Selected</span>
</md-button-toggle>

<md-button size="m" variant="outlined">Round</md-button>
<md-button square size="m" variant="outlined">Square</md-button>
```

## `M3Button` and `M3ButtonToggle`

- `M3Button` inherits [`Button`](../04-Base/10-Button.md)
- `M3ButtonToggle` inherits `M3Button`
- `M3ButtonToggle` mixes [`ButtonToggleMixin`](../04-Base/20-ButtonToggleMixin.md)

### Slots

| name           | description                                              |
| ---            | ---                                                      |
|                | The label or unchecked label (only for `M3ButtonToggle`) |
| `checked`      | The checked label (only for `M3ButtonToggle`)            |
| `icon`         | The icon or unchecked icon (only for `M3ButtonToggle`)   |
| `icon-checked` | The checked icon (only for `M3ButtonToggle`)             |

### CSS Parts

name        | description
---         | ---
`label`     | All labels
`icon`      | All icons
`checked`   | (only for `M3ButtonToggle`)
`unchecked` | (only for `M3ButtonToggle`)

### Properties

|  name          | description                                                                                |
| ---            | ---                                                                                        |
| `color`        | Reflected string; `primary`, `secondary` or `tertiary`; `primary` by default               |
| `square`       | Reflected boolean; `false` by default                                                      |
| `size`         | Reflected string; `xs`, `s`, `m`, `l` or `xl`; `s` by default                              |
| `trailingIcon` | Reflected boolean; `false` by default; `trailing-icon` as an attribute                     |
| `variant`      | Reflected string; `filled`, `tonal`, `elevated`, `outlined` or `text`; `filled` by default |

[overview]: https://m3.material.io/components/buttons/overview
[wai-aria]: https://www.w3.org/WAI/ARIA/apg/patterns/button/
