import { ReactiveController, ReactiveControllerHost } from 'lit';

import {
  internals,
  InternalsAttachedInterface,
} from '../mixins/internals-attached.js';

import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  Placement,
  Strategy,
} from '@floating-ui/dom';

export interface PopoverControllerConfig {
  popover: () => HTMLElement | null;
  trigger: () => HTMLElement | null;
  positioning: {
    placement: () => Placement;
    strategy: () => Strategy;
    offset: () => number;
    windowPadding: () => number;
  };
  animation: {
    durations: {
      open: () => number;
      close: () => number;
    };
    delays?: {
      open?: () => number;
      close?: () => number;
    };
  };
}

export class PopoverController implements ReactiveController {
  host: ReactiveControllerHost & InternalsAttachedInterface;

  private _open = false;
  get open() {
    return this._open;
  }

  private config: PopoverControllerConfig;
  private cleanupAutoUpdate?: () => void;

  constructor(
    host: ReactiveControllerHost & InternalsAttachedInterface,
    config: PopoverControllerConfig
  ) {
    this.host = host;
    this.config = config;
    this.host.addController(this);
  }

  hostConnected() {
    // Initial state
    if (!this._open) {
      this.host[internals].states.add('closed');
    }
  }

  hostDisconnected() {
    this.cleanupAutoUpdate?.();
  }

  // Different from those in the Tooltip, these timers are used to manage the
  // animation timing.
  #openTimer: NodeJS.Timeout = null;
  #closeTimer: NodeJS.Timeout = null;

  async animateOpen() {
    if (this._open) return;
    this._open = true;

    clearTimeout(this.#openTimer);
    clearTimeout(this.#closeTimer);

    const openDuration = this.config.animation.durations.open();

    this.host[internals].states.delete('closed');
    this.host[internals].states.delete('closing');

    const trigger = this.config.trigger();
    const popover = this.config.popover();

    if (trigger && popover) {
      this.cleanupAutoUpdate?.();
      this.cleanupAutoUpdate = autoUpdate(trigger, popover, () =>
        this.reposition()
      );
      // Initial position
      await this.reposition();
    }

    if (openDuration === 0) {
      this.host[internals].states.add('opened');
    } else {
      // Wait for a frame to ensure the element is rendered with base styles
      // e.g. (opacity 0) before adding the opening state e.g. (opacity 1) to
      // trigger transition.
      requestAnimationFrame(() => {
        if (this._open) {
          this.host[internals].states.add('opening');
        }
      });

      this.#openTimer = setTimeout(() => {
        this.host[internals].states.delete('opening');
        this.host[internals].states.add('opened');
      }, openDuration);
    }
  }

  async animateClose() {
    if (!this._open) return;
    this._open = false;

    clearTimeout(this.#openTimer);
    clearTimeout(this.#closeTimer);

    const closeDuration = this.config.animation.durations.close();
    const wasOpened = this.host[internals].states.has('opened');

    this.host[internals].states.delete('opened');
    this.host[internals].states.delete('opening');

    if (closeDuration === 0 || !wasOpened) {
      this.cleanup();
      this.host[internals].states.delete('closing');
      this.host[internals].states.add('closed');
    } else {
      this.host[internals].states.add('closing');

      this.#closeTimer = setTimeout(() => {
        this.cleanup();
        this.host[internals].states.delete('closing');
        this.host[internals].states.add('closed');
      }, closeDuration);
    }
  }

  private cleanup() {
    this.cleanupAutoUpdate?.();
    this.cleanupAutoUpdate = undefined;
  }

  reposition() {
    const trigger = this.config.trigger();
    const popover = this.config.popover();

    if (!trigger || !popover) return Promise.resolve();

    const placement = this.config.positioning.placement();
    const strategy = this.config.positioning.strategy();
    const offsetVal = this.config.positioning.offset();
    const windowPadding = this.config.positioning.windowPadding();

    return computePosition(trigger, popover, {
      placement,
      strategy,
      middleware: [
        offset(offsetVal),
        flip({ padding: windowPadding }),
        shift({ padding: windowPadding, crossAxis: true }),
      ],
    }).then(({ x, y }) => {
      Object.assign(popover.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: strategy,
      });
    });
  }
}
