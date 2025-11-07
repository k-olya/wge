import { Collection } from "lib/collection";
import { VertexBuffer } from "lib/gl/vertex-buffer";
import { ShaderProgram, UniformValue } from "lib/gl/shader-program";
import { ElementsBufferGeometry, ElementsBufferGeometryOptions } from "./elements-buffer-geometry";
import { GLContext } from "lib/gl//gl-context";
export interface InstancedElementsOptions extends ElementsBufferGeometryOptions {
    instanceBuffers: Collection<VertexBuffer>;
    instanceCount: number;
}
export declare class InstancedElements extends ElementsBufferGeometry {
    instanceBuffers: Collection<VertexBuffer>;
    instanceCount: number;
    constructor(g: GLContext, options?: InstancedElementsOptions);
    onCreate(): void;
    onUpdate(): void;
    enableAttributes(locations: Collection<number>, divisors?: Collection<number>): void;
    onRun(shader: ShaderProgram, uniforms?: Collection<UniformValue>): void;
    onFree(): void;
    draw(): void;
}
export declare function elementsToInstanced(geometry: ElementsBufferGeometry, options: {
    instanceBuffers: Collection<VertexBuffer>;
    instanceCount: number;
}): InstancedElements;
