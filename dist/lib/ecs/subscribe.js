import { globalWorld } from "./global-world";
// subscribe to entity changes
// event handler will automatically update object property
export function subscribe(obj, key, component = key, world = globalWorld) {
    var _a;
    const o = (_a = world.get(key)) === null || _a === void 0 ? void 0 : _a[key];
    if (o)
        obj[key] = o[key];
    const unbinders = [
        world.emitter.on(`add-component-${component}`, (entity) => {
            obj[key] = entity[component];
        }),
        world.emitter.on(`update-component-${component}`, (entity) => {
            obj[key] = entity[component];
        }),
        world.emitter.on(`delete-component-${component}`, () => {
            obj[key] = undefined;
        }),
    ];
    return () => {
        for (let unbind of unbinders) {
            unbind();
        }
    };
}
