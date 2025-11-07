import { Entity } from "./entity";
import { EntityDataStructure } from "./entity-data-structure";
export declare class EntitySortedArray extends EntityDataStructure {
    entities: Entity[];
    markedForRemoval?: boolean[];
    binSearch(_id: string): number;
    markForRemoval(_id: string): void;
    removeMarked(): void;
    unique(): void;
    set(entity: Entity): void;
    get(_id: string): Entity | undefined;
    delete(_id: string): void;
    clear(): void;
    onCreate(): void;
    onUpdate(): void;
    onRun(): IterableIterator<Entity>;
    [Symbol.iterator](): IterableIterator<Entity>;
    onFree(): void;
}
