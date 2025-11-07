import { LifecycleParent } from "../lifecycle";
import { randomId } from "lib/id";
export class System extends LifecycleParent {
    constructor(_id, sharedQueries = {}) {
        super();
        this.unbinders = []; // field for storing event listener unbinders
        this._id = _id || `<unnamed system ${randomId()}>`;
        this.queries = sharedQueries;
    }
    free() {
        // override free to keep onFree independent
        for (const cb of this.unbinders)
            cb();
        this.unbinders = [];
        super.free();
    }
}
