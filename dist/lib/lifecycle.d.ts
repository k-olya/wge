import { Collection } from "./collection";
export interface LifecycleInterface {
    onCreate(): any;
    create(): any;
    onUpdate(): any;
    update(): any;
    onRun(...args: any[]): any;
    run(...args: any[]): any;
    onFree(): any;
    free(): any;
}
export declare class Lifecycle<T, A extends any[] = any[]> implements LifecycleInterface {
    created: boolean;
    updated: boolean;
    onCreate(): any;
    onUpdate(): any;
    onRun(...args: A): any;
    onFree(): any;
    create(): any;
    update(): any;
    run(...args: A): T;
    free(): any;
}
export declare class LifecycleParent<T, A extends any[] = any[]> extends Lifecycle<T, A> {
    created: boolean;
    updated: boolean;
    childrenIterable: Iterable<LifecycleInterface>;
    children: Collection<LifecycleInterface>;
    forEachChild(cb: (item: LifecycleInterface) => void): void;
    onCreate(): any;
    onUpdate(): any;
    onRun(...args: A): any;
    onFree(): any;
    create(): any;
    update(): any;
    free(): any;
}
