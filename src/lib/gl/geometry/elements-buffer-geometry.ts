import { Collection } from "lib/collection";
import { assume } from "lib/assume";
import { VertexBuffer } from "lib/gl/vertex-buffer";
import { BufferGeometry } from "./buffer-geometry";
import { GLContext } from "lib/gl/gl-context";

export interface ElementsBufferGeometryOptions {
  vertexBuffers: Collection<VertexBuffer>;
  indexBuffer: VertexBuffer;
  count?: number;
}

export class ElementsBufferGeometry extends BufferGeometry {
  indexBuffer: VertexBuffer | null = null;
  count: number = 0;

  constructor(g: GLContext, options?: ElementsBufferGeometryOptions) {
    super(g, options?.vertexBuffers);
    this.indexBuffer = options?.indexBuffer ?? null;
    // set count to options.count or attempt to derive it from index buffer length if not set
    const t = this.indexBuffer?.type ?? 0;
    const elSizeByType = t & 4 || t & 2 || 1; // 4 for int and float, 2 for short, 1 for byte
    this.count =
      options?.count ??
      (this.indexBuffer
        ? (this.indexBuffer.data?.byteLength ?? 0) / elSizeByType
        : 0);
  }

  onCreate(): void {
    super.onCreate();
    this.indexBuffer?.create();
  }

  onUpdate(): void {
    super.onUpdate();
    assume(this.indexBuffer, "Index buffer not set");
    this.indexBuffer?.update();
    const t = this.indexBuffer?.type ?? 0;
    const elSizeByType = t & 4 || t & 2 || 1;
    this.count =
      this.count ||
      (this.indexBuffer
        ? (this.indexBuffer.data?.byteLength ?? 0) / elSizeByType
        : 0);
  }

  onFree(): void {
    this.indexBuffer?.free();
    super.free();
    this.count = 0;
  }

  draw() {
    const gl = this.g.gl;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer?.glBuffer!);
    gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0);
  }
}
