---
components:
  - m3/checkbox/checkbox
---

# Checkbox

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/checkbox/checkbox.js';
```

<!-- @show -->

```html
<md-checkbox aria-label="View all"></md-checkbox>

<label>
  <md-checkbox
    checked
    aria-label="Pop">
  </md-checkbox>
  Recommended usage
</label>

<md-checkbox
  indeterminate
  aria-label="Agree to terms and conditions"
  id="checkbox">
</md-checkbox>
<label for="checkbox">Not recommended like this</label>
```

Note that checkboxes are not automatically labelled by `<label>` elements and
always need an `aria-label`.

## `M3Checkbox`

- Inherits [`Checkbox`](../04-Base/10-Checkbox.md)

### CSS Parts

name         | description
---          | ---
`icon`       |
`mark`       |
`mark-short` |
`mark-long`  |

### Properties

name      | description
---       | ---
`error`   | Reflected boolean; Change its color to error only
`$ripple` |

[overview]: https://m3.material.io/components/checkbox/overview
