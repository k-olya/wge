import { GLContext } from "./gl-context";
import { Lifecycle } from "lib/lifecycle";
export type TexturePixels = ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap | ArrayBufferView;
export interface CreateTextureOptions {
    framebuffer?: WebGLFramebuffer;
    pixels?: TexturePixels | null;
    minFilter?: number;
    magFilter?: number;
    wrapS?: number;
    wrapT?: number;
    flip?: boolean;
    premultiply?: boolean;
    glTexture?: number;
    format?: number;
    internalFormat?: number;
    type?: number;
}
export declare function createTexture(gl: WebGL2RenderingContext, width: number, height: number, options: CreateTextureOptions): WebGLTexture;
export interface TextureOptions {
    pixels?: TexturePixels | null;
    width?: number;
    height?: number;
    minFilter?: number;
    magFilter?: number;
    wrapS?: number;
    wrapT?: number;
    flip?: boolean;
    premultiply?: boolean;
    mipMap?: boolean;
    texture?: WebGLTexture;
}
export declare class Texture extends Lifecycle<WebGLTexture> {
    width: number;
    height: number;
    glTexture: WebGLTexture | null;
    g: GLContext;
    minFilter: number;
    magFilter: number;
    wrapS: number;
    wrapT: number;
    flip: boolean;
    premultiply: boolean;
    pixels: TexturePixels | null;
    mipMap?: boolean;
    constructor(g: GLContext, options?: TextureOptions);
    onCreate(): void;
    generateMipmap(): void;
    onUpdate(): void;
    onRun(): WebGLTexture | null;
    onFree(): void;
}
