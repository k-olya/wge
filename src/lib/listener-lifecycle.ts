import { EmitterInterface } from "./emitter";
import { Lifecycle } from "./lifecycle";

export class ListenerLifecycle<
  T extends (...args: any) => any,
> extends Lifecycle<T, Parameters<T>> {
  listener: T;
  unbinder?: () => void;
  emitter: EmitterInterface;
  event: string;
  constructor(emitter: EmitterInterface, event: string, listener: T) {
    super();
    this.listener = listener;
    this.emitter = emitter;
    this.event = event;
  }
  onCreate() {
    this.unbinder = this.emitter.on(this.event, this.listener)!;
  }
  onFree() {
    if (this.unbinder) this.unbinder();
  }
}
