import { EntityWorld } from "./entity-world";
import { globalWorld } from "./global-world";

// subscribe to entity changes
// event handler will automatically update object property
export function subscribe<T, K extends Extract<keyof T, string>>(
  obj: T,
  key: K,
  component: string = key,
  world: EntityWorld = globalWorld,
) {
  const o = world.get(key)?.[key];
  if (o) obj[key] = o[key];
  const unbinders: (() => void)[] = [
    world.emitter.on(`add-component-${component}`, (entity) => {
      obj[key] = entity[component];
    }),
    world.emitter.on(`update-component-${component}`, (entity) => {
      obj[key] = entity[component];
    }),
    world.emitter.on(`delete-component-${component}`, () => {
      obj[key] = undefined!;
    }),
  ];
  return () => {
    for (let unbind of unbinders) {
      unbind();
    }
  };
}
