import { Collection } from "lib/collection";
import { globalWorld } from "lib/ecs/global-world";
import { System } from "lib/ecs/system";
import { SystemGroup } from "./system-group";
import { EntitySortedArray } from "lib/ecs/entity-sorted-array";
import { EntityWorld } from "lib/ecs/entity-world";

export type SystemInitializerCollection = Collection<() => System>;

// a state machine system that switches between scenes
export class SceneStateMachine extends SystemGroup {
  scenes: SystemInitializerCollection;
  initialState: string;
  world: EntityWorld;

  constructor(
    id: string,
    scenes: SystemInitializerCollection,
    initialState: string = "initial",
    world: EntityWorld = globalWorld,
  ) {
    super(id, [scenes[initialState]()]);
    this.scenes = scenes;
    this.initialState = initialState;
    this.world = world;
  }
  unbinder: (() => void) | undefined;
  onCreate(): void {
    this.world.setUnique(this._id, this.initialState);
    this.unbinder = this.world.on(
      "update-component-" + this._id,
      (_, state) => {
        console.warn("Switching to state", state);
        for (const scene of this.subsystems) {
          scene.free();
        }
        this.subsystems.free();
        this.subsystems = new EntitySortedArray([this.scenes[state]()]);
        this.print();
      },
    );
  }
  onFree(): void {
    this.unbinder?.();
    this.world.deleteEntity(this._id);
    super.onFree();
  }
}
