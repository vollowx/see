# `InternalsAttached`

- Accepts classes based on [`LitElement`](lit-ele)

```typescript
import { LitElement } from 'lit';
import {
  InternalsAttached,
  internals
} from '@vollowx/seele/base/mixins/internals-attached.js';

class Some extends InternalsAttached(LitElement) {}
```

## Properties

name          | description
---           | ---
`[internals]` | [`ElementInternals`](ele-internals)

`internals` is a symbol that can be imported from the same file.

[lit-ele]: https://lit.dev/docs/api/LitElement/
[ele-internals]: https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals
[symbol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
