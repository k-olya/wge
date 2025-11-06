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

export class VertexBuffer extends Lifecycle<WebGLBuffer, [number]> {
  g: GLContext;
  glBuffer: WebGLBuffer | null = null;
  data: ArrayBufferView | null = null;
  size: number = 1;
  type: number = 0;
  normalized: boolean = false;
  stride: number = 0;
  offset: number = 0;
  target: number = 0;
  usage: number = 0;

  constructor(g: GLContext, options?: VertexBufferOptions) {
    super();
    this.g = g;
    const gl = g.gl;
    if (options) {
      Object.assign(this, options);
    }
    this.type = options?.type ?? gl.FLOAT;
    this.target = options?.target ?? gl.ARRAY_BUFFER;
    this.usage = options?.usage ?? gl.STATIC_DRAW;
  }

  onCreate() {
    const gl = this.g.gl;
    this.glBuffer = gl.createBuffer()!;
    gl.bindBuffer(this.target, this.glBuffer);
    gl.bufferData(this.target, this.data, this.usage);
    this.updated = true;
  }

  onUpdate() {
    const buf = this.glBuffer;
    const gl = this.g.gl;
    gl.bindBuffer(this.target, buf);
    gl.bufferSubData(this.target, 0, this.data!);
  }

  // run enables this buffer as an attribute
  onRun(attributeLocation: number) {
    const gl = this.g.gl;
    gl.bindBuffer(this.target, this.glBuffer);
    gl.enableVertexAttribArray(attributeLocation);
    gl.vertexAttribPointer(
      attributeLocation,
      this.size,
      this.type,
      this.normalized,
      this.stride,
      this.offset,
    );
    return this.glBuffer;
  }

  onFree() {
    this.g.gl.deleteBuffer(this.glBuffer);
    this.glBuffer = null;
  }
}
