import { EntitySortedArray } from "lib/ecs/entity-sorted-array";
import { System } from "lib/ecs/system";
export declare class SystemGroup extends System {
    subsystems: EntitySortedArray;
    constructor(_id: string, systems?: System[]);
    print(indent?: string): void;
    onCreate(): void;
    onUpdate(): void;
    onRun(...args: any[]): void;
    onFree(): void;
}
