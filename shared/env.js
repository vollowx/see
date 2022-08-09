export default class Env {
  static #validEnvs = ['production', 'development'];
  static #env = 'production';
  static get env() {
    return this.#env;
  }
  static set env(value) {
    if (!this.#validEnvs.includes(value)) {
      throw new Error(`Invalid environment: ${value}`);
    }
    this.#env = value;
  }
  static get isProd() {
    return this.env === 'production';
  }
  static get isDev() {
    return this.env === 'development';
  }
  static toProd() {
    this.env = 'production';
  }
  static toDev() {
    this.env = 'development';
  }
}
window.Env = Env;
