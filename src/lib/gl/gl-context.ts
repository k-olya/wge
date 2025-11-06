import { Lifecycle } from "lib/lifecycle";
import { bindOutput, OutputFramebuffer } from "./framebuffer";

export interface GLContextState {
  [key: string]: any;
}

export class GLContext
  extends Lifecycle<GLContext>
  implements OutputFramebuffer
{
  gl: WebGL2RenderingContext;

  framebuffer: null = null;
  get width() {
    return this.gl.canvas.width;
  }
  set width(v: number) {
    this.gl.canvas.width = v;
    this._aspect = this.height / this.width;
    this.updated = false;
  }
  _height: number = 0;
  get height() {
    return this.gl.canvas.height;
  }
  set height(v: number) {
    this._height = v;
    this._aspect = this.height / this.width;
    this.updated = false;
  }
  _aspect: number = 1;
  get aspect() {
    return this._aspect;
  }

  state: GLContextState = {};
  toSet: GLContextState = {};
  constructor(gl: WebGL2RenderingContext) {
    super();
    this.gl = gl;
  }

  onCreate() {
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
  }

  onUpdate() {
    for (const key in this.toSet) {
      this.state[key] = this.toSet[key];
      delete this.toSet[key];
    }
  }

  set(key: string, value: any) {
    if (this.state[key] === value) {
      delete this.toSet[key];
      return;
    }
    this.toSet[key] = value;
  }

  get(key: string) {
    if (this.toSet[key] !== undefined) {
      return this.toSet[key];
    }
    return this.state[key];
  }

  bindOutput(output: OutputFramebuffer) {
    bindOutput(this, output);
  }

  // useProgram

  // bindBuffer

  // setUniforms

  onRun() {
    return this;
  }
}
