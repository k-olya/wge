import { Lifecycle } from "lib/lifecycle";
import { EntityWorld } from "lib/ecs/entity-world";
import { Entity } from "./entity";
import { System } from "./system";
export interface EntityObserverOptions<T> {
    component?: string;
    world?: EntityWorld;
}
export declare class UniqueEntityObserver<T> extends Lifecycle<T> {
    world: EntityWorld;
    _id: string;
    component: string;
    _?: T;
    entity?: Entity;
    unbinders: (() => void)[];
    constructor(_id: string, options?: EntityObserverOptions<T>);
    onCreate(): void;
    onRun(): T | undefined;
    onFree(): void;
}
export declare function observe<T>(obj: System, property: string | string[], id: string, options?: EntityObserverOptions<T>): T;
