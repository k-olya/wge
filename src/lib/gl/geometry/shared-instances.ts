import { Collection } from "lib/collection";
import { VertexBuffer } from "lib/gl/vertex-buffer";
import { ShaderProgram, UniformValue } from "lib/gl/shader-program";
import { Lifecycle } from "lib/lifecycle";
import { ElementsBufferGeometry } from "./elements-buffer-geometry";
import { GLContext } from "lib/gl//gl-context";

// instance buffer collection that can share an ElementsBufferGeometry
// or be shared by multiple elements buffer geometries
export interface InstancesOptions {
  instanceBuffers: Collection<VertexBuffer>;
  instanceCount: number;
}

export class SharedInstances extends Lifecycle<
  SharedInstances,
  [ElementsBufferGeometry, ShaderProgram, Collection<UniformValue> | undefined]
> {
  g: GLContext;
  instanceBuffers: Collection<VertexBuffer> = {};
  instanceCount: number = 0;
  constructor(g: GLContext, options?: InstancesOptions) {
    super();
    this.g = g;
    this.instanceBuffers = options?.instanceBuffers ?? {};
    this.instanceCount = options?.instanceCount ?? 0;
  }

  onCreate(): void {
    for (let key in this.instanceBuffers) {
      this.instanceBuffers[key].create();
    }
  }

  onUpdate(): void {
    for (let key in this.instanceBuffers) {
      this.instanceBuffers[key].update();
    }
  }

  enableAttributes(
    geometry: ElementsBufferGeometry,
    locations: Collection<number>,
    divisors?: Collection<number>,
  ) {
    for (let key in locations) {
      if (geometry.vertexBuffers[key] !== undefined) {
        geometry.vertexBuffers[key].run(locations[key]);
      }
      if (this.instanceBuffers[key] !== undefined) {
        this.instanceBuffers[key].run(locations[key]);
        this.g.gl.vertexAttribDivisor(locations[key], divisors?.[key] || 1);
      }
    }
  }

  onRun(
    geometry: ElementsBufferGeometry,
    shader: ShaderProgram,
    uniforms?: Collection<UniformValue>,
  ) {
    this.g.run();
    shader.run(uniforms);
    geometry.update();
    this.enableAttributes(geometry, shader.attributeLocations);
    this.draw(geometry);
  }

  draw(geometry: ElementsBufferGeometry): void {
    const gl = this.g.gl;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer?.glBuffer!);
    gl.drawElementsInstanced(
      gl.TRIANGLES,
      geometry.count,
      gl.UNSIGNED_SHORT,
      0,
      this.instanceCount,
    );
  }

  onFree(): void {
    for (let key in this.instanceBuffers) {
      this.instanceBuffers[key].free();
    }
    super.onFree();
  }
}
