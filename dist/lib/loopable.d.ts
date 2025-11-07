import { Collection } from "./collection";
export type Loopable<T> = Collection<T> | Iterable<T>;
export declare function loopThrough<T>(loopable: Loopable<T>, cb: (item: T) => void): void;
