// runs systems in _id order

import { EntitySortedArray } from "lib/ecs/entity-sorted-array";
import { System } from "lib/ecs/system";
import { LifecycleInterface } from "lib/lifecycle";

export class SystemGroup extends System {
  subsystems: EntitySortedArray;
  constructor(_id: string, systems: System[] = []) {
    super(_id, {});
    this.subsystems = new EntitySortedArray(systems);
    this._id = _id;
  }
  // a recursive function that prints the system tree
  print(indent: string = "") {
    console.log(`${indent}${this._id}`);
    for (const system of this.subsystems) {
      if (system instanceof SystemGroup) {
        system.print(indent + "\t");
      } else {
        console.log(`${indent}\t${system._id}`);
      }
    }
  }
  onCreate() {}
  onUpdate() {}
  onRun(...args: any[]) {
    for (const system of this.subsystems) {
      system.run(...args);
    }
  }
  onFree() {
    for (const system of this.subsystems) {
      if (system?.created) {
        system.free();
      }
    }
  }
}
