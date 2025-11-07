import { GLContext } from "lib/gl/gl-context";
import { Collection } from "lib/collection";
import { VertexBuffer } from "lib/gl/vertex-buffer";
import { Lifecycle } from "lib/lifecycle";
import { ShaderProgram, UniformValue } from "lib/gl/shader-program";
export declare abstract class BufferGeometry extends Lifecycle<BufferGeometry, [
    ShaderProgram,
    Collection<UniformValue>?
]> {
    g: GLContext;
    vertexBuffers: Collection<VertexBuffer>;
    constructor(g: GLContext, vb?: Collection<VertexBuffer>);
    onCreate(): void;
    onUpdate(): void;
    onRun(shader: ShaderProgram, uniforms?: Collection<UniformValue>): void;
    onFree(): void;
    abstract draw(): void;
}
