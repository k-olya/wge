// iterate over components of an entity
export function forEachComponent(entity, callback) {
    for (const [key, value] of Object.entries(entity)) {
        if (key === "_id")
            continue;
        callback(key, value);
    }
}
// get typed component
export function component(entity, component) {
    return entity[component];
}
