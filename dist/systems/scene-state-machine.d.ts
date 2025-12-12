import { Collection } from "lib/collection";
import { System } from "lib/ecs/system";
import { SystemGroup } from "./system-group";
import { EntityWorld } from "lib/ecs/entity-world";
export type SystemInitializerCollection = Collection<() => System>;
export declare class SceneStateMachine extends SystemGroup {
    scenes: SystemInitializerCollection;
    initialState: string;
    world: EntityWorld;
    constructor(id: string, scenes: SystemInitializerCollection, initialState?: string, world?: EntityWorld);
    unbinder: (() => void) | undefined;
    onCreate(): void;
    onFree(): void;
}
