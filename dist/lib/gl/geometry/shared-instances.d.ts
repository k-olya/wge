import { Collection } from "lib/collection";
import { VertexBuffer } from "lib/gl/vertex-buffer";
import { ShaderProgram, UniformValue } from "lib/gl/shader-program";
import { Lifecycle } from "lib/lifecycle";
import { ElementsBufferGeometry } from "./elements-buffer-geometry";
import { GLContext } from "lib/gl//gl-context";
export interface InstancesOptions {
    instanceBuffers: Collection<VertexBuffer>;
    instanceCount: number;
}
export declare class SharedInstances extends Lifecycle<SharedInstances, [
    ElementsBufferGeometry,
    ShaderProgram,
    Collection<UniformValue> | undefined
]> {
    g: GLContext;
    instanceBuffers: Collection<VertexBuffer>;
    instanceCount: number;
    constructor(g: GLContext, options?: InstancesOptions);
    onCreate(): void;
    onUpdate(): void;
    enableAttributes(geometry: ElementsBufferGeometry, locations: Collection<number>, divisors?: Collection<number>): void;
    onRun(geometry: ElementsBufferGeometry, shader: ShaderProgram, uniforms?: Collection<UniformValue>): void;
    draw(geometry: ElementsBufferGeometry): void;
    onFree(): void;
}
