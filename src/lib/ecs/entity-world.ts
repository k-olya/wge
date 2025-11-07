import { createNanoEvents } from "nanoevents";
import { Entity, forEachComponent } from "./entity";
import { EmitterObject } from "lib/emitter";
import { DEBUG_MODE } from "lib/debug";
import { assume } from "lib/assume";

export interface EntityWorldEvents {
  "add-entity": (entity: Entity) => void;
  "delete-entity": (entity: Entity) => void;
  "update-entity": (entity: Entity) => void;
  "add-component-*": (entity: Entity, value: any) => void;
  "update-component-*": (entity: Entity, value: any) => void;
  "delete-component-*": (entity: Entity) => void;
}

// EntityWorld is a class that manages entities
// and emits events when entities are modified
export class EntityWorld extends EmitterObject {
  entities: Map<string, Entity>;
  emitter = createNanoEvents();
  constructor(entities?: Entity[]) {
    super();
    this.entities = new Map();
    entities?.forEach((entity) => this.set(entity));
  }
  set(entity: Entity) {
    const prev = this.entities.get(entity._id);
    if (prev) {
      // if debug mode is on, warn about overwriting entities
      // i don't throw an error here because otherwise games would crash
      // but the library is designed to manage only one entity object with a given id
      if (DEBUG_MODE) {
        console.warn(
          `Overwriting entity with id "${entity._id}". If you didn't expect this, you might be unintentionally creating this entity twice. For updating existing entities please use setComponents or setComponent instead.`,
        );
      }

      this.setComponents(prev, entity);
    } else {
      this.entities.set(entity._id, entity);
      forEachComponent(entity, (key, value) => {
        this.emit("add-component-" + key, entity, value);
      });
      this.emitter.emit("add-entity", entity);
    }
  }
  // set unique entity
  setUnique(_id: string, obj: any) {
    const e = this.get(_id);
    if (e) {
      this.setComponent(e, _id, obj);
    } else {
      this.set({ _id, [_id]: obj });
    }
  }
  // get unique
  getUnique(_id: string) {
    return this.get(_id)?.[_id];
  }
  // set multiple components and trigger entity events
  setComponents(entity: Entity, components: Record<string, any>) {
    forEachComponent(entity, (key) => {
      this._setComponent(entity, key, components[key]);
    });
    this.emitter.emit("update-entity", entity);
  }
  // set one component and trigger entity events
  setComponent(entity: Entity, key: string, value: any) {
    this._setComponent(entity, key, value);
    this.emit("update-entity", entity);
  }
  // set component by entity id
  setComponentById(_id: string, key: string, value: any) {
    const e = this.get(_id);
    assume(e, `Entity ${_id} not found`);
    this.setComponent(e!, key, value);
  }
  // set components by entity id
  setComponentsById(_id: string, components: Record<string, any>) {
    const e = this.get(_id);
    assume(e, `Entity ${_id} not found`);
    this.setComponents(e!, components);
  }
  // set one component without triggering entity event
  _setComponent(entity: Entity, key: string, value: any) {
    const prevHas = typeof entity[key] !== "undefined";
    const nextHas = typeof value !== "undefined";
    if (prevHas && nextHas && value !== entity[key]) {
      entity[key] = value;
      this.emit("update-component-" + key, entity, value);
    } else if (prevHas && !nextHas) {
      delete entity[key];
      this.emit("delete-component-" + key, entity);
    } else if (!prevHas && nextHas) {
      entity[key] = value;
      this.emit("add-component-" + key, entity, value);
    }
  }
  addComponent(entity: Entity, key: string, value: any) {
    // if (typeof entity[key] !== "undefined") {
    // throw new Error(`Component "${key}" already exists in entity`);
    // }

    entity[key] = value;
    this.emit("add-component-" + key, entity, value);
    this.emit("update-entity", entity);
  }
  updateComponent(entity: Entity, key: string, value: any) {
    // if (typeof entity[key] === "undefined") {
    // throw new Error(`Component "${key}" does not exist in entity`);
    // }
    entity[key] = value;
    this.emit("update-component-" + key, entity, value);
    this.emit("update-entity", entity);
  }
  deleteComponent(entity: Entity, key: string) {
    // if (typeof entity[key] === "undefined") {
    // throw new Error(`Component "${key}" does not exist in entity`);
    // }
    delete entity[key];
    this.emit("delete-component-" + key, entity);
    this.emit("update-entity, entity");
  }
  get(id: string) {
    return this.entities.get(id);
  }
  deleteEntity(id: string) {
    const entity = this.entities.get(id);
    if (entity) {
      forEachComponent(entity, (key) => {
        this.emit("delete-component-" + key, entity);
      });
      this.entities.delete(id);
      this.emit("delete-entity", entity);
    }
  }
}
