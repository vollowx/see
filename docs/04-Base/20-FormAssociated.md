# `FormAssociated`

- Accepts [`InternalsAttached`](./20-InternalsAttached.md) classes that are 
  based on [`LitElement`](lit-ele)

```typescript
import { LitElement } from 'lit';
import {
  InternalsAttached,
  internals
} from '@vollowx/seele/base/mixins/internals-attached.js';
import {
  FormAssociated
} from '@vollowx/seele/base/mixins/internals-attached.js';

class Some extends FormAssociated(InternalsAttached(LitElement)) {}
```

## Properties

They all appear on native form associated elements, better check one of those,
like [`<input>`](input-element).

name                | description
---                 | ---
`form`              |
`labels`            |
`name`              |
`disabled`          |
`validity`          |
`validationMessage` |
`willValidate`      |

## Methods

signature                                         | description
---                                               | ---
`formDisabledCallback(disabled: boolean) -> void` |
`checkValidity() -> void`                         |
`reportValidity() -> void`                        |

For elements mixing this in, they should also call
`this[internals].setFormValue(value: any)` when they are in forms, and provide
`formResetCallback()` and `formStateRestoreCallback(state: any, reason: string)`
to handle form reset and restoration/auto-fills.

[lit-ele]: https://lit.dev/docs/api/LitElement/
[input-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input
