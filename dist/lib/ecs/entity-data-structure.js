import { Lifecycle } from "../lifecycle";
// abstracts entity lookup and iteration
export class EntityDataStructure extends Lifecycle {
    create() {
        if (this.initial.length) {
            for (const entity of this.initial) {
                this.set(entity);
            }
            this.initial = [];
        }
        super.create();
    }
    constructor(entities = []) {
        super();
        // TODO: find a better way to handle initial entities
        this.initial = [];
        this.initial = entities;
    }
}
