# Style Systems

seele Material You Expressive components use CSS variables for styling. To
include the systems for them, add this to your style files.

```css
@import '@vollowx/seele/m3/system/base.css';
/* Elevation system and typography system */
@import '@vollowx/seele/m3/system/defaults.css';
/* (Optional) Basic styling for body, selections and links */
```

If your CSS bundler does not support resolving Node packages or you are not
using one, importing like this is also fine.

```css
@import 'path/to/node_modules/@vollowx/seele/src/m3/system/base.css';
@import 'path/to/node_modules/@vollowx/seele/src/m3/system/defaults.css';
```

Note that there is **no** default color system and motion physics system to
have more flexibility and reduce redundant code. Below is how you can add them.

You can also find some references in [seele-example](seele-example-css).

## Color

You can use the official [Material Theme Builder](mat-theme-builder).
Export with "Web (CSS)" option, the CSS files contains the desired CSS
variables.

## Motion Physics

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

[mat-theme-builder]: https://material-foundation.github.io/material-theme-builder/
[seele-example-css]: https://github.com/vollowx/seele-example/blob/main/main.css
