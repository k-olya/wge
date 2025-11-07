import { EmitterInterface } from "./emitter";
import { Lifecycle } from "./lifecycle";
export declare class ListenerLifecycle<T extends (...args: any) => any> extends Lifecycle<T, Parameters<T>> {
    listener: T;
    unbinder?: () => void;
    emitter: EmitterInterface;
    event: string;
    constructor(emitter: EmitterInterface, event: string, listener: T);
    onCreate(): void;
    onFree(): void;
}
