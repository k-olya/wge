import { Entity } from "./ecs/entity";
import { EntityWorld } from "./ecs/entity-world";
import { Lifecycle } from "./lifecycle";
export declare class DependencyQuery<T> extends Lifecycle<T> {
    world: EntityWorld;
    name: string;
    entities: Entity[];
    unbinders: (() => void)[];
    constructor(world: EntityWorld, name: string);
    onCreate(): void;
    onUpdate(): void;
    onRun(): T;
    onFree(): void;
}
