import { EntityDataStructure } from "./entity-data-structure";
import { EntityWorld } from "./entity-world";
import { Entity } from "./entity";
import { Lifecycle } from "../lifecycle";
import { globalWorld } from "./global-world";

export interface EntityQueryOptions {
  include: string[];
  exclude?: string[];
  filter?: (entity: Entity) => boolean;
  cleanup?: (entity: Entity, component: string) => void;
}

export class EntityQuery<T extends EntityDataStructure> extends Lifecycle<
  IterableIterator<Entity>
> {
  // components to include
  include: string[];
  // components must pass a filter function
  filter?: (entity: Entity) => boolean;
  // cleanup function to call when a component is removed
  cleanup?: (entity: Entity, component: string) => void;
  // world to operate on
  world: EntityWorld;
  // entities that match the query
  entities: T;

  //event unbinders
  unbinders: (() => void)[] = [];

  constructor(
    dataStructure: new () => T, // data structure to use
    options: EntityQueryOptions | string[],
    world: EntityWorld = globalWorld,
  ) {
    super();
    const opts: EntityQueryOptions = Array.isArray(options)
      ? { include: options }
      : options;
    this.include = opts.include;
    this.filter = opts.filter;
    this.cleanup = opts.cleanup;
    this.world = world;
    this.entities = new dataStructure();
  }
  onCreate(): void {
    // create data structure
    this.entities.create();
    // bind to events
    for (const component of this.include) {
      this.unbinders.push(
        this.world.emitter.on(`add-component-${component}`, (entity) => {
          if (this.filter && !this.filter(entity)) return;
          this.entities.set(entity);
        }),
      );
      this.unbinders.push(
        this.world.emitter.on(`delete-component-${component}`, (entity) => {
          if (this.cleanup) {
            this.cleanup(entity, component);
          }
          this.entities.delete(entity._id);
        }),
      );
    }
    // add existing entities
    for (const entity of this.world.entities.values()) {
      // if the entity includes any of the components
      if (!this.include.some((component) => entity[component] !== undefined)) {
        continue;
      }
      if (this.filter && !this.filter(entity)) continue;
      this.entities.set(entity);
    }
  }
  onUpdate(): void {
    // update entities
    this.entities.update();
  }
  // iterate over entities
  onRun(): IterableIterator<Entity> {
    return this.entities.run();
  }
  [Symbol.iterator](): IterableIterator<Entity> {
    return this.run();
  }
  onFree(): void {
    // unbind from events
    for (const unbind of this.unbinders) {
      unbind();
    }
    // free entities
    this.entities.free();
  }
}
