import { Texture } from "./texture";
export function bindOutput(g, output) {
    const gl = g.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, output.framebuffer);
    gl.viewport(0, 0, output.width, output.height);
}
export class FramebufferTexture extends Texture {
    constructor() {
        super(...arguments);
        this.framebuffer = null;
    }
    onCreate() {
        super.onCreate();
        const gl = this.g.gl;
        this.framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.glTexture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    onFree() {
        super.onFree();
        this.g.gl.deleteFramebuffer(this.framebuffer);
    }
}
