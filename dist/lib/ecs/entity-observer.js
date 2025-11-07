import { Lifecycle } from "lib/lifecycle";
import { globalWorld } from "lib/ecs/global-world";
// observer unique components bound to entities
export class UniqueEntityObserver extends Lifecycle {
    constructor(_id, options) {
        var _a, _b, _c;
        super();
        // event unbinders
        this.unbinders = [];
        this._id = _id;
        this.component = (_a = options === null || options === void 0 ? void 0 : options.component) !== null && _a !== void 0 ? _a : _id;
        this.world = (_b = options === null || options === void 0 ? void 0 : options.world) !== null && _b !== void 0 ? _b : globalWorld;
        //this.onEntityAdd = options?.onAdd;
        //this.onEntityUpdate = options?.onUpdate;
        //this.onEntityDelete = options?.onDelete;
        this.entity = this.world.get(_id);
        this._ = (_c = this.entity) === null || _c === void 0 ? void 0 : _c[this.component];
        this.update();
    }
    onCreate() {
        const component = this.component;
        this.unbinders.push(this.world.emitter.on(`add-component-${component}`, (entity) => {
            this._ = entity[component];
            this.entity = entity;
            //if (this.onEntityAdd) this.onEntityAdd(this._!);
        }));
        this.unbinders.push(this.world.emitter.on(`update-component-${component}`, (entity) => {
            this._ = entity[component];
            this.entity = entity;
            //if (this.onEntityUpdate) this.onEntityUpdate(this._!);
        }));
        this.unbinders.push(this.world.emitter.on(`delete-component-${component}`, () => {
            this._ = undefined;
            this.entity = undefined;
            //if (this.onEntityDelete) this.onEntityDelete();
        }));
    }
    onRun() {
        return this._;
    }
    onFree() {
        // unbind events
        for (const unbind of this.unbinders) {
            unbind();
        }
    }
}
