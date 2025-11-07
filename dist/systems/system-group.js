// runs systems in _id order
import { EntitySortedArray } from "lib/ecs/entity-sorted-array";
import { System } from "lib/ecs/system";
export class SystemGroup extends System {
    constructor(_id, systems = []) {
        super(_id, {});
        this.subsystems = new EntitySortedArray(systems);
        this._id = _id;
    }
    // a recursive function that prints the system tree
    print(indent = "") {
        console.log(`${indent}${this._id}`);
        for (const system of this.subsystems) {
            if (system instanceof SystemGroup) {
                system.print(indent + "\t");
            }
            else {
                console.log(`${indent}\t${system._id}`);
            }
        }
    }
    onCreate() { }
    onUpdate() { }
    onRun(...args) {
        for (const system of this.subsystems) {
            system.run(...args);
        }
    }
    onFree() {
        for (const system of this.subsystems) {
            if (system === null || system === void 0 ? void 0 : system.created) {
                system.free();
            }
        }
    }
}
