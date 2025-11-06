import { Lifecycle } from "lib/lifecycle";
import { EntityWorld } from "lib/ecs/entity-world";
import { globalWorld } from "lib/ecs/global-world";
import { Entity } from "./entity";

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
