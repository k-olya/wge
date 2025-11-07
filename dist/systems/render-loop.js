import { RenderLoop, TimeoutLoop, loopSystem } from "lib/game-loop";
import { SystemGroup } from "./system-group";
// a system group that runs a game loop
export class GameLoopSystem extends SystemGroup {
    constructor(c, id, scenes) {
        super(id, scenes);
        this.loop = loopSystem(c, this);
        this.print();
    }
}
// a system group that runs a render loop
export class RenderLoopSystem extends GameLoopSystem {
    constructor(id, scenes) {
        super(RenderLoop, id, scenes);
    }
}
// a system group that runs a timeout loop
export class TimeoutLoopSystem extends GameLoopSystem {
    constructor(id, scenes) {
        super(TimeoutLoop, id, scenes);
    }
}
