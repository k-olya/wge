import { GLContext } from "./gl-context";
import { Texture } from "./texture";
export interface OutputFramebuffer {
    framebuffer: WebGLFramebuffer | null;
    width: number;
    height: number;
}
export declare function bindOutput(g: GLContext, output: OutputFramebuffer): void;
export declare class FramebufferTexture extends Texture implements OutputFramebuffer {
    framebuffer: WebGLFramebuffer | null;
    onCreate(): void;
    onFree(): void;
}
