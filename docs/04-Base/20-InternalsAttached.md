# `InternalsAttached`

- Accepts classes based on [`LitElement`](lit-ele)

```typescript
import { LitElement } from 'lit';
import {
  InternalsAttached,
  internals,
  updateInternals,
  replaceStates
} from '@vollowx/seele/base/mixins/internals-attached.js';

class Some extends InternalsAttached(LitElement) {}
```

## Properties

name          | description
---           | ---
`[internals]` | [`ElementInternals`](ele-internals)

## Methods

signature                                                         | description
---                                                               | ---
`[updateInternals]() -> void`                                     | Helper function, implemented by subclasses
`[replaceStates](del: Array<string>, add: Array<string>) -> void` | Helper function, replace `del` with `add`

[lit-ele]: https://lit.dev/docs/api/LitElement/
[ele-internals]: https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals
[symbol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
