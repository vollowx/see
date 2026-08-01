# `Attachable`

- Accepts classes based on [`LitElement`](lit-ele)

```typescript
import { LitElement } from 'lit';
import {
  Attachable
} from '@vollowx/seele/base/mixins/attachable.js';

class Some extends Attachable(LitElement) {}
```

## Properties

name       | description
---        | ---
`htmlFor`  | String, `for` as an attribute
`$control` | The currently attached control element

## Methods

| signature                                               | description                                                                         |
| ---                                                     | ---                                                                                 |
| `attach(control: HTMLElement, force: boolean?) -> void` | Without `force`, the component will do nothing if the control is the same as before |
| `detach() -> void`                                      |                                                                                     |

[lit-ele]: https://lit.dev/docs/api/LitElement/
