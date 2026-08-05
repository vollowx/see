# `Attachable`

- Accepts classes based on [`LitElement`](lit-ele)

```typescript
import { LitElement } from 'lit';
import {
  Attachable,
  autoAttachToParent,
  handleControlChange,
} from '@vollowx/seele/base/mixins/attachable.js';

class Some extends Attachable(LitElement) {
  // [autoAttachToParent] = false;
  [handleControlChange](
    prev: HTMLElement | null = null,
    next: HTMLElement | null = null
  ) {
    prev?.undoSth();
    next?.doSth();
  }
}
```

## Properties

name                    | description
---                     | ---
`htmlFor`               | String, `for` as an attribute
`$control`              | The currently attached control element
`[autoAttachToParent]`  | Boolean

## Methods

| signature                                                                             | description                                                                         |
| ---                                                                                   | ---                                                                                 |
| `attach(control: HTMLElement, force: boolean?) -> void`                               | Without `force`, the component will do nothing if the control is the same as before |
| `detach() -> void`                                                                    |                                                                                     |
| `[handleControlChange](prev: HTMLElement \| null, next: HTMLElement \| null) -> void` |                                                                                     |

[lit-ele]: https://lit.dev/docs/api/LitElement/
