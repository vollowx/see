# `ButtonToggleMixin`

- Accepts classes that are based on [`Button`](./10-Button.md)

```typescript
import { Button } from '@vollowx/seele/base/button.js';
import {
  ButtonToggleMixin
} from '@vollowx/seele/base/mixins/button-toggle-mixin.js';

class Some extends ButtonToggleMixin(Button) {}
```

It is useful when the button and toggle button look identical in your design
system.

## Events

| name     | description                       |
| ---      | ---                               |
| `change` | `detail` is the new boolean value |

## Properties

name      | description
---       | ---
`checked` |

## Methods

| signature           | description                                                |
| ---                 | ---                                                        |
| `_toggle() -> void` | Toggles `checked` and dispatches `change`; override to customise |
