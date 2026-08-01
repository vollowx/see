---
components:
  - m3/radio/radio
---

# Radio

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/radio/radio.js';
```

<!-- @show -->

```html
<form>
  <div role="radiogroup" aria-label="Fruits">
    <div>
      <md-radio name="fruit" value="apple" id="radio-apple" checked></md-radio>
      <label for="radio-apple">apple</label>
    </div>
    <div>
      <md-radio name="fruit" value="banana" id="radio-banana"></md-radio>
      <label for="radio-banana">banana</label>
    </div>
    <div>
      <md-radio name="fruit" value="pear" id="radio-pear" disabled></md-radio>
      <label for="radio-pear">pear</label>
    </div>
    <div>
      <md-radio name="fruit" value="orange" id="radio-orange"></md-radio>
      <label for="radio-orange">orange</label>
    </div>
  </div>
</form>

<style>
[role=radiogroup] > div {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
```

Radios should not be nested in labels.

Place radios inside a `[role=radiogroup]` element, which should be labelled
through `aria-label` or `aria-labelledby`

Note that the checking/unchecking animation look more like the ones from Android
instead of Material You guidelines.

## `M3Radio`

- Inherits [`Radio`](../04-Base/10-Radio.md)

[overview]: https://m3.material.io/components/radio/overview
