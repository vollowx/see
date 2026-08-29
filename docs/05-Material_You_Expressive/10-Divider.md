---
components:
  - m3/divider/divider
---

# Divider

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/divider/divider.js';
```

<!-- @show -->

```html
<md-list style="max-width: 300px">
  <md-list-item>List item 1</md-list-item>
  <md-list-item>List item 2</md-list-item>
  <md-divider inset></md-divider>
  <md-list-item>List item 3</md-list-item>
  <md-list-item disabled>List item 4</md-list-item>
</md-list>
```

## `M3Divider`

- Inherits [`LitElement`](lit-ele)

### Properties

| name         | description                                                          |
| ---          | ---                                                                  |
| `vertical`   | Reflected boolean; `false` by default                                |
| `inset`      | Reflected boolean; `false` by default                                |
| `insetStart` | Reflected boolean; `inset-start` as an attribute; `false` by default |
| `insetEnd`   | Reflected boolean; `inset-end` as an attribute; `false` by default   |

[overview]: https://m3.material.io/components/divider/overview
[lit-ele]: https://lit.dev/docs/api/LitElement/
