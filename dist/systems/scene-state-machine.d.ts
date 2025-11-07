import { Collection } from "lib/collection";
import { System } from "lib/ecs/system";
import { SystemGroup } from "./system-group";
export type SystemInitializerCollection = Collection<() => System>;
export declare class SceneStateMachine extends SystemGroup {
    scenes: SystemInitializerCollection;
    initialState: string;
    constructor(id: string, scenes: SystemInitializerCollection, initialState?: string);
    unbinder: (() => void) | undefined;
    onCreate(): void;
    onFree(): void;
}
