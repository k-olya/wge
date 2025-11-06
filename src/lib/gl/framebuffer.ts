import { GLContext } from "./gl-context";
import { Texture, TextureOptions } from "./texture";

export interface OutputFramebuffer {
  framebuffer: WebGLFramebuffer | null;
  width: number;
  height: number;
}

export function bindOutput(g: GLContext, output: OutputFramebuffer) {
  const gl = g.gl;
  gl.bindFramebuffer(gl.FRAMEBUFFER, output.framebuffer);
  gl.viewport(0, 0, output.width, output.height);
}

export class FramebufferTexture extends Texture implements OutputFramebuffer {
  framebuffer: WebGLFramebuffer | null = null;

  onCreate(): void {
    super.onCreate();
    const gl = this.g.gl;
    this.framebuffer = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      this.glTexture,
      0,
    );
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  onFree(): void {
    super.onFree();
    this.g.gl.deleteFramebuffer(this.framebuffer);
  }
}
