import { EntityQuery } from "./entity-query";
import { Lifecycle, LifecycleParent } from "../lifecycle";
import { Collection } from "lib/collection";
import { randomId } from "lib/id";
import { DependencyQuery } from "lib/dependency-query";
import { debugMode } from "lib/debug";

export type QueryCollection = Collection<
  EntityQuery<any> | DependencyQuery<any>
>;

export class System<
  T extends QueryCollection = any,
> extends LifecycleParent<void> {
  _id: string; // systems added to the same game loop will be ordered by ids
  queries: T;
  constructor(_id: string, sharedQueries: T = {} as T) {
    super();
    this._id = _id || `<unnamed system ${randomId()}>`;
    this.queries = sharedQueries;
  }
  unbinders: ((...args: any[]) => any)[] = []; // field for storing event listener unbinders

  free() {
    // override free to keep onFree independent
    for (const cb of this.unbinders) cb();
    this.unbinders = [];
    super.free();
  }
}
