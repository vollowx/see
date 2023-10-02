export let focusVisible = false;

window.addEventListener('keydown', () => (focusVisible = true), {
  capture: true,
});
window.addEventListener('mousedown', () => (focusVisible = false), {
  capture: true,
});
