import { EntityDataStructure } from "./entity-data-structure";
// one entity
export class EntityOne extends EntityDataStructure {
    constructor() {
        super(...arguments);
        this.entities = [];
    }
    // set one entity
    set(entity) {
        this.entities = [entity];
        // force update cycle which will sort the array and remove duplicates
        this.updated = false;
    }
    // get entity
    get(id) {
        return this.entities[0];
    }
    // delete entity
    delete(id) {
        this.entities = [];
        // force update cycle which will sort the array and remove duplicates
        this.updated = false;
    }
    clear() {
        this.entities = [];
    }
    // do nothing on create
    onCreate() { }
    onUpdate() { }
    // iterate over entities
    onRun() {
        return this.entities.values();
    }
    [Symbol.iterator]() {
        return this.run();
    }
    // clear on free
    onFree() {
        this.clear();
    }
}
