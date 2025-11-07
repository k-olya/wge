import { EntityDataStructure } from "./entity-data-structure";
export class EntityMap extends EntityDataStructure {
    constructor() {
        super(...arguments);
        this.entities = new Map();
    }
    set(entity) {
        this.entities.set(entity._id, entity);
    }
    get(_id) {
        return this.entities.get(_id);
    }
    onRun() {
        return this.entities.values();
    }
    [Symbol.iterator]() {
        return this.run();
    }
    delete(_id) {
        this.entities.delete(_id);
    }
    clear() {
        this.entities.clear();
    }
    onCreate() {
        // do nothing
    }
    onUpdate() {
        // do nothing since the map is always up to date
    }
    onFree() {
        // do nothing
    }
}
