import { EntityDataStructure } from "./entity-data-structure";
import { EntityWorld } from "./entity-world";
import { Entity } from "./entity";
import { Lifecycle } from "../lifecycle";
export interface EntityQueryOptions {
    include: string[];
    exclude?: string[];
    filter?: (entity: Entity) => boolean;
    cleanup?: (entity: Entity, component: string) => void;
}
export declare class EntityQuery<T extends EntityDataStructure> extends Lifecycle<IterableIterator<Entity>> {
    include: string[];
    filter?: (entity: Entity) => boolean;
    cleanup?: (entity: Entity, component: string) => void;
    world: EntityWorld;
    entities: T;
    unbinders: (() => void)[];
    constructor(dataStructure: new () => T, // data structure to use
    options: EntityQueryOptions | string[], world?: EntityWorld);
    onCreate(): void;
    onUpdate(): void;
    onRun(): IterableIterator<Entity>;
    [Symbol.iterator](): IterableIterator<Entity>;
    onFree(): void;
}
