import { System } from "lib/ecs/system";
export interface InputMap {
    [key: string]: string;
}
export interface InputState {
    [key: string]: boolean;
}
declare const KbMInputSystem_base: {
    new (...args: any[]): {
        emitter: import("nanoevents").Emitter<import("nanoevents").DefaultEvents>;
        on(event: string, callback: import("lib/emitter").EventCallback): import("nanoevents").Unsubscribe;
        emit(event: string, ...args: any[]): void;
    };
} & typeof System;
export declare class KbMInputSystem extends KbMInputSystem_base {
    kbDownListener?: (e: KeyboardEvent) => void;
    kbUpListener?: (e: KeyboardEvent) => void;
    mouseDownListener?: (e: MouseEvent) => void;
    mouseUpListener?: (e: MouseEvent) => void;
    contextMenuListener?: (e: MouseEvent) => void;
    state: InputState;
    map: InputMap;
    onCreate(): void;
    onKeydown(e: KeyboardEvent): void;
    onKeyup(e: KeyboardEvent): void;
    onMousedown(e: MouseEvent): void;
    onMouseup(e: MouseEvent): void;
    set(k: string, v?: boolean): void;
    onContextmenu(e: MouseEvent): void;
    onUpdate(): void;
    onRun(...args: any[]): this;
    onFree(): void;
}
export {};
