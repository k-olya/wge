import { EntityDataStructure } from "./entity-data-structure";
// sorted array of entities
// TODO: test and decide which removal method to keep: markForRemoval or delete
export class EntitySortedArray extends EntityDataStructure {
    constructor() {
        super(...arguments);
        this.entities = [];
    }
    // binary search
    // if not found, return the index where it should be inserted
    binSearch(_id) {
        // binary search requires an updated (sorted&unique) array
        this.update();
        let left = 0;
        let right = this.entities.length - 1;
        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            if (this.entities[mid]._id === _id)
                return mid;
            if (this.entities[mid]._id < _id)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return left;
    }
    // mark entity index for removal
    markForRemoval(_id) {
        const spot = this.binSearch(_id);
        if (this.entities[spot]._id !== _id)
            return;
        if (!this.markedForRemoval)
            this.markedForRemoval = new Array(this.entities.length).fill(false);
        this.markedForRemoval[spot] = true;
        this.updated = false;
    }
    // remove marked entities
    removeMarked() {
        if (!this.markedForRemoval)
            return;
        this.entities = this.entities.filter((_, index) => !this.markedForRemoval[index], this);
        this.markedForRemoval = undefined;
    }
    // remove duplicate entities
    // must be called on a sorted array
    unique() {
        this.entities = this.entities.filter((entity, index) => { var _a; return index === 0 || (entity === null || entity === void 0 ? void 0 : entity._id) !== ((_a = this.entities[index - 1]) === null || _a === void 0 ? void 0 : _a._id); });
    }
    // set one entity
    set(entity) {
        this.entities.push(entity);
        // update marked for removal
        if (this.markedForRemoval) {
            this.markedForRemoval.push(false);
        }
        // force update cycle which will sort the array and remove duplicates
        this.updated = false;
    }
    // get entity by id
    get(_id) {
        var _a;
        const spot = this.binSearch(_id);
        if (this.entities[spot]._id !== _id)
            return undefined;
        if ((_a = this.markedForRemoval) === null || _a === void 0 ? void 0 : _a[spot])
            return undefined;
        return this.entities[spot];
    }
    // delete entity by id
    delete(_id) {
        this.markForRemoval(_id);
        const spot = this.binSearch(_id);
        if (this.entities[spot]._id !== _id)
            return;
        // force update cycle which will sort the array and remove duplicates
        this.updated = false;
    }
    // clear the array
    clear() {
        this.entities = [];
        this.markedForRemoval = undefined;
    }
    // do nothing on create
    onCreate() { }
    // make the array null-free, sorted and unique
    onUpdate() {
        this.removeMarked();
        this.entities.sort((a, b) => a._id.localeCompare(b._id));
        this.unique();
    }
    // iterate over entities
    onRun() {
        // {
        /*for (const entity of this.entities) {
          if (entity !== null) {
            yield entity;
          }
        }*/
        // }
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
