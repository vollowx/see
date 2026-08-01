---
components:
  - m3/ripple/ripple
---

# Ripple

```typescript
import '@vollowx/seele/m3/ripple/ripple.js';
```

<!-- @show -->
```html
<style>
  .row {
    align-items: center;
    display: flex;
    gap: 16px;
  }
  .container {
    align-items: center;
    border-radius: 24px;
    display: flex;
    height: 64px;
    justify-content: center;
    outline: 1px solid var(--md-sys-color-outline);
    padding: 16px;
    position: relative;
    width: 64px;
  }
  .container:has(.unbounded) {
    border-radius: 50%;
    outline-style: dashed;
  }
  .anchor {
    background: var(--md-sys-color-primary-container);
    border: 1px solid var(--md-sys-color-outline);
    border-radius: 50%;
    height: 24px;
    width: 24px;
    /* Recommended styles for an unbounded ripple's anchor. */
    display: grid;
    place-items: center;
    position: relative;
  }

  md-ripple.unbounded {
    height: 64px;
    width: 64px;
    /* Recommended styles for an unbounded ripple. */
    border-radius: 50%;
    inset: unset;
  }
</style>

<div class="row">
  <div class="container">
    <md-ripple></md-ripple>
  </div>
  <div class="container" id="touch">
    <div class="anchor">
      <md-ripple for="touch" class="unbounded"></md-ripple>
    </div>
  </div>
</div>
```

Ripples are attached to their parent nodes by default:

<!-- @show -->

```html
<button style="position: relative">
  <md-ripple></md-ripple>
  Native Button
</button>
```

They can also attach by reference:

<!-- @show -->

```html
<div style="position: relative; width: min-content">
  <md-ripple
    for="ripple-control-input"
    enterbehavior="none"
    spacebehavior="none">
  </md-ripple>
  <input id="ripple-control-input" />
</div>
```

Or manually:

<!-- @show -->

```html
<div style="position: relative; width: min-content">
  <md-ripple id="ripple"></md-ripple>
  <br />
  <button id="ripple-control">Button</button>
  <br />
  <br />
</div>

<script>
  const ripple = document.querySelector('#ripple');
  const control = document.querySelector('#ripple-control');
  onload = () => ripple.attach(control);
</script>
```

## `M3Ripple`

- Inherits [`LitElement`](lit-ele)
- Mixes [`InternalsAttached`](../04-Base/20-InternalsAttached.md)
- Mixes [`Attachable`](../04-Base/20-Attachable.md)

[lit-ele]: https://lit.dev/docs/api/LitElement/
