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
// set propery on a property path, e.g. ["uniforms", "u_texture"] -> obj.uniforms.u_texture = value
function setNestedProperty(obj, path, value) {
    let current = obj;
    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
            current[key] = {};
        }
        current = current[key];
    }
    current[path[path.length - 1]] = value;
}
// observe an entity component and set it on a property path in an object
export function observe(obj, property, id, options) {
    var _a, _b;
    const world = (_a = options === null || options === void 0 ? void 0 : options.world) !== null && _a !== void 0 ? _a : globalWorld;
    const component = (_b = options === null || options === void 0 ? void 0 : options.component) !== null && _b !== void 0 ? _b : id;
    const e = world.get(id);
    if (!e) {
        throw new Error(`Entity ${id} not found when creating an observer`);
    }
    const c = e[component];
    // inject event handlers into onCreate
    const onCreate = obj.onCreate.bind(obj);
    obj.onCreate = function () {
        onCreate();
        // invoke propery path function if needed
        if (Array.isArray(property)) {
            obj.unbinders.push(world.on(`update-component-${component}`, () => {
                setNestedProperty(obj, property, e[component]);
            }));
            setNestedProperty(obj, property, e[component]);
        }
        else {
            // otherwise set property directly
            obj.unbinders.push(world.on(`update-component-${component}`, () => {
                // @ts-ignore
                obj[property] = e[component];
            }));
            // @ts-ignore
            obj[property] = c;
        }
    };
    return c;
}
