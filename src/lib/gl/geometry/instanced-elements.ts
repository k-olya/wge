import { Collection } from "lib/collection";
import { VertexBuffer } from "lib/gl/vertex-buffer";
import { ShaderProgram, UniformValue } from "lib/gl/shader-program";
import {
  ElementsBufferGeometry,
  ElementsBufferGeometryOptions,
} from "./elements-buffer-geometry";
import { GLContext } from "lib/gl//gl-context";

export interface InstancedElementsOptions
  extends ElementsBufferGeometryOptions {
  instanceBuffers: Collection<VertexBuffer>;
  instanceCount: number;
}

// instanced version of ElementsBufferGeometry
export class InstancedElements extends ElementsBufferGeometry {
  instanceBuffers: Collection<VertexBuffer> = {};
  instanceCount: number = 0;
  constructor(g: GLContext, options?: InstancedElementsOptions) {
    super(g, options);
    this.instanceBuffers = options?.instanceBuffers ?? {};
    this.instanceCount = options?.instanceCount ?? 0;
  }

  onCreate(): void {
    super.onCreate();
    for (let key in this.instanceBuffers) {
      this.instanceBuffers[key].create();
    }
  }

  onUpdate(): void {
    super.onUpdate();
    for (let key in this.instanceBuffers) {
      this.instanceBuffers[key].update();
    }
  }

  enableAttributes(
    locations: Collection<number>,
    divisors?: Collection<number>,
  ) {
    for (let key in locations) {
      if (this.vertexBuffers[key] !== undefined) {
        this.vertexBuffers[key].run(locations[key]);
      }
      if (this.instanceBuffers[key] !== undefined) {
        this.instanceBuffers[key].run(locations[key]);
        this.g.gl.vertexAttribDivisor(locations[key], divisors?.[key] || 1);
      }
    }
  }

  onRun(shader: ShaderProgram, uniforms?: Collection<UniformValue>) {
    this.g.run();
    shader.run(uniforms);
    this.enableAttributes(shader.attributeLocations);
    this.draw();
  }

  onFree(): void {
    for (let key in this.instanceBuffers) {
      this.instanceBuffers[key].free();
    }
    super.onFree();
  }

  draw(): void {
    const gl = this.g.gl;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer?.glBuffer!);
    gl.drawElementsInstanced(
      gl.TRIANGLES,
      this.count,
      gl.UNSIGNED_SHORT,
      0,
      this.instanceCount,
    );
  }
}

// promote ElementsBufferGeometry to InstancedElements
export function elementsToInstanced(
  geometry: ElementsBufferGeometry,
  options: { instanceBuffers: Collection<VertexBuffer>; instanceCount: number },
): InstancedElements {
  return new InstancedElements(geometry.g, {
    vertexBuffers: geometry.vertexBuffers,
    indexBuffer: geometry.indexBuffer!,
    count: geometry.count,
    ...options,
  });
}
