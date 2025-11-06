import { EntityWorld } from "./entity-world";

export const globalWorld = new EntityWorld();

// @ts-expect-error
window.entities = globalWorld.entities;
