import { System } from "./ecs/system";
import { EmitterInterface, EmitterObject } from "./emitter";
export interface GameLoop extends EmitterInterface {
    time: number;
    delta: number;
    frame: number;
    start(): void;
    pause(): void;
}
export interface GameLoopEvents {
    start: (loop: GameLoop) => void;
    loop: (loop: GameLoop) => void;
    pause: (loop: GameLoop) => void;
}
export declare class RenderLoop extends EmitterObject implements GameLoop {
    time: number;
    delta: number;
    frame: number;
    start(): void;
    private raf;
    private boundLoop;
    private loop;
    pause(): void;
}
export declare class TimeoutLoop extends EmitterObject implements GameLoop {
    time: number;
    delta: number;
    frame: number;
    fps: number;
    start(): void;
    private timeout;
    private boundLoop;
    private loop;
    pause(): void;
}
export declare function loopSystem<T extends GameLoop>(loopConstructor: new () => T, system: System): T;
