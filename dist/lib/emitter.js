import { createNanoEvents } from "nanoevents";
// event emitter mixin
export function Emitter(Base) {
    return class extends Base {
        constructor(...args) {
            super(...args);
            this.emitter = createNanoEvents();
        }
        on(event, callback) {
            return this.emitter.on(event, callback);
        }
        emit(event, ...args) {
            // warn the user if debug mode is on and the event doesn't exist
            //if (debugMode && !(event in this.emitter.events))
            //  console.warn(`Trying to trigger a non-existent event "${event}"`);
            // if (debugMode) {
            // console.log("emitting", event, args);
            // }
            return this.emitter.emit(event, ...args);
        }
    };
}
// base Emitter class
export class EmitterObject extends Emitter(class {
}) {
}
