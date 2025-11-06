import { GLContext } from "lib/gl/gl-context";
import { Collection } from "lib/collection";
import { VertexBuffer } from "lib/gl/vertex-buffer";
import { Lifecycle } from "lib/lifecycle";
import { assume } from "lib/assume";
import { ShaderProgram, UniformValue } from "lib/gl/shader-program";

export abstract class BufferGeometry extends Lifecycle<
  BufferGeometry,
  [ShaderProgram, Collection<UniformValue>?]
> {
  g: GLContext;
  vertexBuffers: Collection<VertexBuffer>;

  constructor(g: GLContext, vb?: Collection<VertexBuffer>) {
    super();
    this.g = g;
    this.vertexBuffers = vb ?? {};
  }

  onCreate() {
    for (let key in this.vertexBuffers) {
      this.vertexBuffers[key].create();
    }
  }

  onUpdate() {
    for (let key in this.vertexBuffers) {
      this.vertexBuffers[key].update();
    }
  }

  // run enables this geometry's attributes and draws it on the screen
  onRun(shader: ShaderProgram, uniforms?: Collection<UniformValue>) {
    this.g.run();
    shader.run(uniforms);
    for (let key in shader.attributeLocations) {
      if (
        assume(
          this.vertexBuffers[key] !== undefined,
          `shader and geometry mismatch: buffer ${key} not found`,
        )
      ) {
        this.vertexBuffers[key].run(shader.attributeLocations[key]);
      }
    }
    this.draw();
  }

  onFree() {
    for (let key in this.vertexBuffers) {
      this.vertexBuffers[key].free();
    }
  }

  // implement draw() in subclasses
  abstract draw(): void;
}
