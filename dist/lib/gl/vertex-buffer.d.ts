import { GLContext } from "./gl-context";
import { Lifecycle } from "lib/lifecycle";
export interface VertexBufferOptions {
    data: ArrayBufferView | null;
    size?: number;
    type?: number;
    normalized?: boolean;
    stride?: number;
    offset?: number;
    usage?: number;
    target?: number;
}
export declare class VertexBuffer extends Lifecycle<WebGLBuffer, [number]> {
    g: GLContext;
    glBuffer: WebGLBuffer | null;
    data: ArrayBufferView | null;
    size: number;
    type: number;
    normalized: boolean;
    stride: number;
    offset: number;
    target: number;
    usage: number;
    constructor(g: GLContext, options?: VertexBufferOptions);
    onCreate(): void;
    onUpdate(): void;
    onRun(attributeLocation: number): WebGLBuffer | null;
    onFree(): void;
}
