import { Entity } from "./entity";
import { EntityDataStructure } from "./entity-data-structure";
export declare class EntityOne extends EntityDataStructure {
    entities: Entity[];
    set(entity: Entity): void;
    get(id: string): Entity | undefined;
    delete(id: string): void;
    clear(): void;
    onCreate(): void;
    onUpdate(): void;
    onRun(): IterableIterator<Entity>;
    [Symbol.iterator](): IterableIterator<Entity>;
    onFree(): void;
}
