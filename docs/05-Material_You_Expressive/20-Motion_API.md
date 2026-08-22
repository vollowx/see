---
title: Motion API - seele/m3
---

# APIs for motion styles

## `getSpring`

This is used for getting the duration and cubic Bezier curve on a specific
element in JS, for example when doing animations with WAAPI.

Signature:

```
getSpring(
  HTMLElement,
  'spatial' | 'effects',
  'fast' | 'default' | 'slow'
) -> {
  easing: string,
  duration: number
}
```

```ts
import { getSpring } from '@vollowx/seele/m3/styles/motion.js';

const element = document.documentElement;
const spatialSlow = getSpring(element, 'spatial', 'slow');

element.animate(
  keyframes,
  { ...getSpring(this, 'spatial', 'default') }
);
```
