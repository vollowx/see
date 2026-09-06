---
title: Linear, circular progress indicator component - seele/m3
components:
  - m3/progress/linear-progress
---

# Progress indicators

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/progress/linear-progress.js';
```

<!-- @uncomment
<div class="demo">
  <md-linear-progress aria-label="Loading pictures" value="25"></md-linear-progress>
  <md-linear-progress aria-label="Loading pictures" value="75" style="--md-linear-progress-thickness: 8px"></md-linear-progress>
  <md-linear-progress aria-label="Loading pictures" indeterminate></md-linear-progress>
</div>

<style>
  .demo {
    max-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
-->

```html
<md-linear-progress aria-label="Loading pictures" value="25"></md-linear-progress>
<md-linear-progress aria-label="Loading pictures" value="75" style="--md-linear-progress-thickness: 8px"></md-linear-progress>
<md-linear-progress aria-label="Loading pictures" indeterminate></md-linear-progress>
```

## `M3LinearProgress`

- Inherits [`ProgressBar`](../04-Base/10-ProgressBar.md)

[overview]: https://m3.material.io/components/progress-indicators/overview
