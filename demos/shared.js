import ColorSystem from '../system/color-system.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';
import FocusRingStyle from '../shared/focus-ring-style.js';

let FocusRingStyleText = [];
for (let i = 0; i < FocusRingStyle.cssRules.length; i++) {
  FocusRingStyleText.push(FocusRingStyle.cssRules[i].cssText);
}

function toggleTheme() {
  const theme = document.documentElement.getAttribute('data-md-theme');
  const newTheme = theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('md-theme', newTheme);
  document.documentElement.setAttribute('data-md-theme', newTheme);
}
function toggleDir() {
  const dir = document.documentElement.getAttribute('dir');
  const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
  localStorage.setItem('md-dir', newDir);
  document.documentElement.setAttribute('dir', newDir);
}

addEventListener('DOMContentLoaded', () => {
  const themeTgl = document.querySelector('.theme-tgl');
  const dirTgl = document.querySelector('.dir-tgl');

  document.documentElement.setAttribute('data-md-theme', localStorage.getItem('md-theme') || 'dark');
  document.documentElement.setAttribute('dir', localStorage.getItem('md-dir') || 'ltr');

  themeTgl?.addEventListener('click', toggleTheme);
  dirTgl?.addEventListener('click', toggleDir);

  ColorSystem.changeTheme(document.documentElement, '#114514');
  const CSSBlock = document.createElement('style');
  CSSBlock.innerHTML = /* css */ `
    h1 { ${TypographyStylesGenerator('headline', 'L')} }
    h2 { ${TypographyStylesGenerator('headline', 'M')} }
    .index h2 { ${TypographyStylesGenerator('label', 'L')} }
    .index li { ${TypographyStylesGenerator('label', 'M')} }
    .demo-header span { ${TypographyStylesGenerator('headline', 'S')} }
    h3 { ${TypographyStylesGenerator('title', 'M')} }
    p { ${TypographyStylesGenerator('body', 'M')} }
    .table-of-ctt ul li a { ${TypographyStylesGenerator('body', 'M')} }
    ${FocusRingStyleText.join('')}
  `;
  document.head.appendChild(CSSBlock);
});
