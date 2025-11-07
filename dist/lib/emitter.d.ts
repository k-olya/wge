import { Constructor } from "./mixin";
import { Collection } from "./collection";
export type EventCallback = (...args: any[]) => void;
export type Events = Collection<EventCallback>;
export interface EmitterInterface {
    on(event: string, callback: EventCallback): void;
    emit(event: string, ...args: any[]): void;
}
export declare function Emitter<T extends Constructor>(Base: T): {
    new (...args: any[]): {
        emitter: import("nanoevents").Emitter<import("nanoevents").DefaultEvents>;
        on(event: string, callback: EventCallback): import("nanoevents").Unsubscribe;
        emit(event: string, ...args: any[]): void;
    };
} & T;
declare const EmitterObject_base: {
    new (...args: any[]): {
        emitter: import("nanoevents").Emitter<import("nanoevents").DefaultEvents>;
        on(event: string, callback: EventCallback): import("nanoevents").Unsubscribe;
        emit(event: string, ...args: any[]): void;
    };
} & {
    new (): {};
};
export declare class EmitterObject extends EmitterObject_base implements EmitterInterface {
}
export {};
