import ColorSystem from '../system/color-system.js';

addEventListener('DOMContentLoaded', () => {
  const demoHeader = document.querySelector('.demo-header');

  document.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      // @ts-ignore
      demoHeader.classList.add('demo-header--scrolled');
    } else {
      // @ts-ignore
      demoHeader.classList.remove('demo-header--scrolled');
    }
  });

  ColorSystem.changeTheme(document.body, '#114514');
});
