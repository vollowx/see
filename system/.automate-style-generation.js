const colors = [
  'primary',
  'on-primary',
  'primary-container',
  'on-primary-container',
  'secondary',
  'on-secondary',
  'secondary-container',
  'on-secondary-container',
  'tertiary',
  'on-tertiary',
  'tertiary-container',
  'on-tertiary-container',
  'error',
  'on-error',
  'error-container',
  'on-error-container',
  'background',
  'on-background',
  'surface',
  'on-surface',
  'surface-variant',
  'on-surface-variant',
  'outline',
  'shadow',
  'inverse-surface',
  'inverse-on-surface',
  'inverse-primary',
];
const before = '--md-sys-color-';
const after = ['-light', '-dark'];

var final = [];

// colors.forEach((color) => {
//   final.push(`${before}${color}-rgb: var(${before}${color}-rgb${after[0]});`);
// });

// colors.forEach((color) => {
//   final.push(`${before}${color}-rgb: var(${before}${color}-rgb${after[1]});`);
// });

colors.forEach((color) => {
  final.push(`${before}${color}: rgb(var(${before}${color}-rgb));`);
});

console.log(final.join('\n'));
