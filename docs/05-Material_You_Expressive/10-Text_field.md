---
components:
  - m3/text-field/filled-text-field
  - m3/text-field/outlined-text-field
---

# Text field

- [Material Design](overview)

## `M3FilledTextField` and `M3OutlinedTextField`

- Inherits [`Input`](../04-Base/10-Input.md)

```typescript
import '@vollowx/seele/m3/text-field/filled-text-field.js';
import '@vollowx/seele/m3/text-field/outlined-text-field.js';
```

<!-- @show -->

```html
<md-filled-text-field
  label="Label"
  placeholder="Placeholder">
</md-filled-text-field>
<md-outlined-text-field
  label="Label"
  placeholder="Placeholder"
  required
  supportingtext="You have to say something">
</md-outlined-text-field>
```

### Properties

| name             | description |
| ---              | ---         |
| `label`          |             |
| `supportingText` |             |

[overview]: https://m3.material.io/components/text-fields/overview
