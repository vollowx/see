import ColorSystem from '../system/color-system.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';

function toggleTheme() {
  const theme = document.body.getAttribute('data-md-theme');
  const newTheme = theme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-md-theme', newTheme);
}
function toggleDir() {
  const dir = document.body.getAttribute('dir');
  const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
  document.body.setAttribute('dir', newDir);
}

addEventListener('DOMContentLoaded', () => {
  const themeTgl = document.querySelector('.theme-tgl');
  const dirTgl = document.querySelector('.dir-tgl');
  const demoHeader = document.querySelector('.demo-header');

  themeTgl?.addEventListener('click', toggleTheme);
  dirTgl?.addEventListener('click', toggleDir);

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
  const CSSBlock = document.createElement('style');
  CSSBlock.innerHTML = /* css */ `
    h1 { ${TypographyStylesGenerator('headline', 'L')} }
    h2 { ${TypographyStylesGenerator('headline', 'M')} }
    .demo-header span { ${TypographyStylesGenerator('headline', 'S')} }
    h3 { ${TypographyStylesGenerator('title', 'M')} }
    p { ${TypographyStylesGenerator('body', 'M')} }
    .table-of-ctt ul li a { ${TypographyStylesGenerator('body', 'M')} }
  `;
  document.head.appendChild(CSSBlock);
});
