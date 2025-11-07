import { Lifecycle } from "../lifecycle";
import { globalWorld } from "./global-world";
export class EntityQuery extends Lifecycle {
    constructor(dataStructure, // data structure to use
    options, world = globalWorld) {
        super();
        //event unbinders
        this.unbinders = [];
        const opts = Array.isArray(options)
            ? { include: options }
            : options;
        this.include = opts.include;
        this.filter = opts.filter;
        this.cleanup = opts.cleanup;
        this.world = world;
        this.entities = new dataStructure();
    }
    onCreate() {
        // create data structure
        this.entities.create();
        // bind to events
        for (const component of this.include) {
            this.unbinders.push(this.world.emitter.on(`add-component-${component}`, (entity) => {
                if (this.filter && !this.filter(entity))
                    return;
                this.entities.set(entity);
            }));
            this.unbinders.push(this.world.emitter.on(`delete-component-${component}`, (entity) => {
                if (this.cleanup) {
                    this.cleanup(entity, component);
                }
                this.entities.delete(entity._id);
            }));
        }
        // add existing entities
        for (const entity of this.world.entities.values()) {
            // if the entity includes any of the components
            if (!this.include.some((component) => entity[component] !== undefined)) {
                continue;
            }
            if (this.filter && !this.filter(entity))
                continue;
            this.entities.set(entity);
        }
    }
    onUpdate() {
        // update entities
        this.entities.update();
    }
    // iterate over entities
    onRun() {
        return this.entities.run();
    }
    [Symbol.iterator]() {
        return this.run();
    }
    onFree() {
        // unbind from events
        for (const unbind of this.unbinders) {
            unbind();
        }
        // free entities
        this.entities.free();
    }
}
