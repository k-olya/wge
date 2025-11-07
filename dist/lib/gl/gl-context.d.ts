import { Lifecycle } from "lib/lifecycle";
import { OutputFramebuffer } from "./framebuffer";
export interface GLContextState {
    [key: string]: any;
}
export declare class GLContext extends Lifecycle<GLContext> implements OutputFramebuffer {
    gl: WebGL2RenderingContext;
    framebuffer: null;
    get width(): number;
    set width(v: number);
    _height: number;
    get height(): number;
    set height(v: number);
    _aspect: number;
    get aspect(): number;
    state: GLContextState;
    toSet: GLContextState;
    constructor(gl: WebGL2RenderingContext);
    onCreate(): void;
    onUpdate(): void;
    set(key: string, value: any): void;
    get(key: string): any;
    bindOutput(output: OutputFramebuffer): void;
    onRun(): this;
}
