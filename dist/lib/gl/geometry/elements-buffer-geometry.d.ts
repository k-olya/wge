import { Collection } from "lib/collection";
import { VertexBuffer } from "lib/gl/vertex-buffer";
import { BufferGeometry } from "./buffer-geometry";
import { GLContext } from "lib/gl/gl-context";
export interface ElementsBufferGeometryOptions {
    vertexBuffers: Collection<VertexBuffer>;
    indexBuffer: VertexBuffer;
    count?: number;
}
export declare class ElementsBufferGeometry extends BufferGeometry {
    indexBuffer: VertexBuffer | null;
    count: number;
    constructor(g: GLContext, options?: ElementsBufferGeometryOptions);
    onCreate(): void;
    onUpdate(): void;
    onFree(): void;
    draw(): void;
}
