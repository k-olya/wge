import { Entity } from "./entity";
import { EmitterObject } from "lib/emitter";
export interface EntityWorldEvents {
    "add-entity": (entity: Entity) => void;
    "delete-entity": (entity: Entity) => void;
    "update-entity": (entity: Entity) => void;
    "add-component-*": (entity: Entity, value: any) => void;
    "update-component-*": (entity: Entity, value: any) => void;
    "delete-component-*": (entity: Entity) => void;
}
export declare class EntityWorld extends EmitterObject {
    entities: Map<string, Entity>;
    emitter: import("nanoevents").Emitter<import("nanoevents").DefaultEvents>;
    constructor(entities?: Entity[]);
    set(entity: Entity): void;
    setUnique(_id: string, obj: any): void;
    getUnique(_id: string): any;
    setComponents(entity: Entity, components: Record<string, any>): void;
    setComponent(entity: Entity, key: string, value: any): void;
    setComponentById(_id: string, key: string, value: any): void;
    setComponentsById(_id: string, components: Record<string, any>): void;
    _setComponent(entity: Entity, key: string, value: any): void;
    addComponent(entity: Entity, key: string, value: any): void;
    updateComponent(entity: Entity, key: string, value: any): void;
    deleteComponent(entity: Entity, key: string): void;
    get(id: string): Entity | undefined;
    deleteEntity(id: string): void;
}
