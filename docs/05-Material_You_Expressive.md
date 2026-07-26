# Material You Expressive

Components and other assets live in `@/src/m3/`.

## Systems

### Motion Physics System

There are no CSS files provided for this system, since you choose either
standard or expressive "motion scheme", and the way you apply/switch between
them varies.

Add either of them to where you want them to take effect, for example `:root`.

**Expressive** motion scheme:

```css
.selector {
  --md-sys-motion-spatial-fast: cubic-bezier(0.42, 1.67, 0.21, 0.9);
  --md-sys-motion-spatial-fast-duration: 350ms;
  --md-sys-motion-spatial-default: cubic-bezier(0.38, 1.21, 0.22, 1);
  --md-sys-motion-spatial-default-duration: 500ms;
  --md-sys-motion-spatial-slow: cubic-bezier(0.39, 1.29, 0.35, 0.98);
  --md-sys-motion-spatial-slow-duration: 650ms;

  --md-sys-motion-effects-fast: cubic-bezier(0.31, 0.94, 0.34, 1);
  --md-sys-motion-effects-fast-duration: 150ms;
  --md-sys-motion-effects-default: cubic-bezier(0.34, 0.8, 0.34, 1);
  --md-sys-motion-effects-default-duration: 200ms;
  --md-sys-motion-effects-slow: cubic-bezier(0.34, 0.88, 0.34, 1);
  --md-sys-motion-effects-slow-duration: 300ms;
}
```

**Standard** motion scheme:

```css
.selector {
  --md-sys-motion-spatial-fast: cubic-bezier(0.27, 1.06, 0.18, 1);
  --md-sys-motion-spatial-fast-duration: 350ms;
  --md-sys-motion-spatial-default: cubic-bezier(0.27, 1.06, 0.18, 1);
  --md-sys-motion-spatial-default-duration: 500ms;
  --md-sys-motion-spatial-slow: cubic-bezier(0.27, 1.06, 0.18, 1);
  --md-sys-motion-spatial-slow-duration: 750ms;

  --md-sys-motion-effects-fast: cubic-bezier(0.31, 0.94, 0.34, 1);
  --md-sys-motion-effects-fast-duration: 150ms;
  --md-sys-motion-effects-default: cubic-bezier(0.34, 0.8, 0.34, 1);
  --md-sys-motion-effects-default-duration: 200ms;
  --md-sys-motion-effects-slow: cubic-bezier(0.34, 0.88, 0.34, 1);
  --md-sys-motion-effects-slow-duration: 300ms;
}
```

## Components

### Loading Indicator

```typescript
import '@vollow/seele/m3/loading-indicator/loading-indicator.js';
```

```html
<md-loading aria-label="Loading pictures"></md-loading>
<md-loading aria-label="Loading pictures" contained style="width: 64px;"></md-loading>
```

Loading indicators have their roles set to `progressbar` by default, you should
write a `aria-label` to add semantic meaning to them.
