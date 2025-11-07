import { Entity } from "./entity";
import { EntityDataStructure } from "./entity-data-structure";
export declare class EntityMap extends EntityDataStructure {
    entities: Map<string, Entity>;
    set(entity: Entity): void;
    get(_id: string): Entity | undefined;
    onRun(): IterableIterator<Entity>;
    [Symbol.iterator](): IterableIterator<Entity>;
    delete(_id: string): void;
    clear(): void;
    onCreate(): void;
    onUpdate(): void;
    onFree(): void;
}
