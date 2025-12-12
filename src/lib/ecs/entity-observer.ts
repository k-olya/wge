import { Lifecycle, LifecycleInterface } from "lib/lifecycle";
import { EntityWorld } from "lib/ecs/entity-world";
import { globalWorld } from "lib/ecs/global-world";
import { Entity } from "./entity";
import { System } from "./system";

export interface EntityObserverOptions<T> {
  component?: string;
  world?: EntityWorld;
  //onAdd?: (o: T) => void;
  //onUpdate?: (o: T) => void;
  //onDelete?: () => void;
}

// observer unique components bound to entities
export class UniqueEntityObserver<T> extends Lifecycle<T> {
  world: EntityWorld;
  _id: string;
  component: string;

  //onEntityAdd?: (o: T) => void;
  //onEntityUpdate?: (o: T) => void;
  //onEntityDelete?: () => void;

  // observed object
  _?: T;

  // observed entity
  entity?: Entity;

  // event unbinders
  unbinders: (() => void)[] = [];

  constructor(_id: string, options?: EntityObserverOptions<T>) {
    super();
    this._id = _id;
    this.component = options?.component ?? _id;
    this.world = options?.world ?? globalWorld;
    //this.onEntityAdd = options?.onAdd;
    //this.onEntityUpdate = options?.onUpdate;
    //this.onEntityDelete = options?.onDelete;
    this.entity = this.world.get(_id);
    this._ = this.entity?.[this.component] as T;
    this.update();
  }

  onCreate() {
    const component = this.component;
    this.unbinders.push(
      this.world.emitter.on(`add-component-${component}`, (entity) => {
        this._ = entity[component];
        this.entity = entity;
        //if (this.onEntityAdd) this.onEntityAdd(this._!);
      }),
    );
    this.unbinders.push(
      this.world.emitter.on(`update-component-${component}`, (entity) => {
        this._ = entity[component];
        this.entity = entity;
        //if (this.onEntityUpdate) this.onEntityUpdate(this._!);
      }),
    );
    this.unbinders.push(
      this.world.emitter.on(`delete-component-${component}`, () => {
        this._ = undefined;
        this.entity = undefined;
        //if (this.onEntityDelete) this.onEntityDelete();
      }),
    );
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
function setNestedProperty(obj: any, path: string[], value: any) {
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
export function observe<T>(obj: System, property: string | string[], id: string, options?: EntityObserverOptions<T>) {
  const world = options?.world ?? globalWorld;
  const component = options?.component ?? id;
  const e = world.get(id);
  if (!e) {
    throw new Error(`Entity ${id} not found when creating an observer`);
  }
  const c = e[component] as T;
  // inject event handlers into onCreate
  const onCreate = obj.onCreate.bind(obj);
  obj.onCreate = function () {
    onCreate();
    // invoke propery path function if needed
    if (Array.isArray(property)) {
      obj.unbinders.push(
        world.on(`update-component-${component}`, () => {
          setNestedProperty(obj, property, e[component] as T);
        })
      )
      setNestedProperty(obj, property, e[component] as T);
    } else {
      // otherwise set property directly
      obj.unbinders.push(
        world.on(`update-component-${component}`, () => {
          // @ts-ignore
          obj[property] = e[component] as T;
        })
      )
      // @ts-ignore
      obj[property] = c;
    }
  }

  return c;
}