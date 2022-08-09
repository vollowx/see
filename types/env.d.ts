import Env from '../shared/env.js';

declare global {
  interface Window {
    Env: Env;
  }
}

export {}
