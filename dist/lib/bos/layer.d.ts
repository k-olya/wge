import { Collection } from "lib/collection";
import { InstancedElements } from "lib/gl/geometry/instanced-elements";
import { VertexBuffer } from "lib/gl/vertex-buffer";
export declare const SPRITE_POSITION: Float32Array<ArrayBuffer>;
export declare const SPRITE_UV: Float32Array<ArrayBuffer>;
export declare const SPRITE_INDEX: Uint16Array<ArrayBuffer>;
export declare const SPRITE_VERTEX_COUNT = 4;
export declare const SPRITE_INDEX_COUNT = 6;
export declare class BosLayer extends InstancedElements {
    vertexBuffers: Collection<VertexBuffer>;
}
