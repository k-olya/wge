import { Entity } from "./entity";
import { Lifecycle } from "../lifecycle";
export declare abstract class EntityDataStructure extends Lifecycle<IterableIterator<Entity>> {
    private initial;
    create(): void;
    constructor(entities?: Entity[]);
    abstract set(entity: Entity): void;
    abstract get(_id: string): Entity | undefined;
    abstract onRun(): IterableIterator<Entity>;
    abstract [Symbol.iterator](): IterableIterator<Entity>;
    abstract delete(_id: string): void;
    abstract clear(): void;
}
