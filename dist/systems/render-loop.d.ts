import { System } from "lib/ecs/system";
import { GameLoop } from "lib/game-loop";
import { SystemGroup } from "./system-group";
export declare class GameLoopSystem extends SystemGroup {
    loop: GameLoop;
    constructor(c: new () => GameLoop, id: string, scenes: System[]);
}
export declare class RenderLoopSystem extends GameLoopSystem {
    constructor(id: string, scenes: System[]);
}
export declare class TimeoutLoopSystem extends GameLoopSystem {
    constructor(id: string, scenes: System[]);
}
