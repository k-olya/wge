import { Collection } from "lib/collection";
import { InstancedElements } from "lib/gl/geometry/instanced-elements";
import { VertexBuffer } from "lib/gl/vertex-buffer";

export const SPRITE_POSITION = new Float32Array([
  -0.5, -0.5, 0, 0.5, -0.5, 0, -0.5, 0.5, 0, 0.5, 0.5, 0,
]);

export const SPRITE_UV = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);
export const SPRITE_INDEX = new Uint16Array([0, 1, 3, 0, 3, 2]);
export const SPRITE_VERTEX_COUNT = 4;
export const SPRITE_INDEX_COUNT = 6;

export class BosLayer extends InstancedElements {
  vertexBuffers: Collection<VertexBuffer> = {};
}
