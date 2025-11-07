import { Lifecycle } from "./lifecycle";
export class ListenerLifecycle extends Lifecycle {
    constructor(emitter, event, listener) {
        super();
        this.listener = listener;
        this.emitter = emitter;
        this.event = event;
    }
    onCreate() {
        this.unbinder = this.emitter.on(this.event, this.listener);
    }
    onFree() {
        if (this.unbinder)
            this.unbinder();
    }
}
