import { EntityQuery } from "./entity-query";
import { LifecycleParent } from "../lifecycle";
import { Collection } from "lib/collection";
export type QueryCollection = Collection<EntityQuery<any>>;
export declare class System<T extends QueryCollection = any> extends LifecycleParent<void> {
    _id: string;
    queries: T;
    constructor(_id: string, sharedQueries?: T);
    unbinders: ((...args: any[]) => any)[];
    free(): void;
}
