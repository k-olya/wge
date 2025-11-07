import { EntityWorld } from "./entity-world";
export declare function subscribe<T, K extends Extract<keyof T, string>>(obj: T, key: K, component?: string, world?: EntityWorld): () => void;
