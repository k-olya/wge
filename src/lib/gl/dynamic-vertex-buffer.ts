import { GLContext } from "./gl-context";
import { VertexBuffer, VertexBufferOptions } from "./vertex-buffer";

export class DynamicVertexBuffer extends VertexBuffer {
  constructor(g: GLContext, options?: VertexBufferOptions) {
    super(g, options);
    this.usage = options?.usage ?? g.gl.DYNAMIC_DRAW;
  }
}
