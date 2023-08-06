// @ts-check

export class Env {
  static get isDev() {
    return localStorage.getItem('env.dev') === 'true';
  }
  /**
   * @param {boolean} flag
   */
  static setDev(flag) {
    localStorage.setItem('env.dev', Boolean(flag) ? 'true' : 'false');
  }
}

// @ts-ignore
window.Env = Env;

/**
 * @param {'info'|'warn'|'error'} level
 * @param {any[]} info
 */
export function log(level, ...info) {
  if (level === 'info' && Env.isDev) {
    console.log(...info);
  } else if (level === 'warn') {
    console.warn(...info);
  } else if (level === 'error') {
    console.error(...info);
  }
}
