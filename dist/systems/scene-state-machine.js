import { globalWorld } from "lib/ecs/global-world";
import { SystemGroup } from "./system-group";
import { EntitySortedArray } from "lib/ecs/entity-sorted-array";
// a state machine system that switches between scenes
export class SceneStateMachine extends SystemGroup {
    constructor(id, scenes, initialState = "initial", world = globalWorld) {
        super(id, [scenes[initialState]()]);
        this.scenes = scenes;
        this.initialState = initialState;
        this.world = world;
    }
    onCreate() {
        this.world.setUnique(this._id, this.initialState);
        this.unbinder = this.world.on("update-component-" + this._id, (_, state) => {
            console.warn("Switching to state", state);
            for (const scene of this.subsystems) {
                scene.free();
            }
            this.subsystems.free();
            this.subsystems = new EntitySortedArray([this.scenes[state]()]);
            this.print();
        });
    }
    onFree() {
        var _a;
        (_a = this.unbinder) === null || _a === void 0 ? void 0 : _a.call(this);
        this.world.deleteEntity(this._id);
        super.onFree();
    }
}
