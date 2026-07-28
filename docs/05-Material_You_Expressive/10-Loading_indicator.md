# Loading indicator

- [Material Design](overview)

```typescript
import '@vollow/seele/m3/loading-indicator/loading-indicator.js';
```

<!-- @show -->

```html
<md-loading aria-label="Loading pictures"></md-loading>
<md-loading aria-label="Loading pictures" contained style="width: 64px;"></md-loading>
```

Loading indicators have their roles set to `progressbar` by default, you should
write a `aria-label` to add semantic meaning to them.

## `M3LoadingIndicator`

### Properties

| name        | description        |
| ---         | ---                |
| `contained` | Reflected boolean  |
| `$canvas`   | `<canvas>` element |

[overview]: https://m3.material.io/components/loading-indicator/overview
