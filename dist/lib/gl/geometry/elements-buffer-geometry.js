import { assume } from "lib/assume";
import { BufferGeometry } from "./buffer-geometry";
export class ElementsBufferGeometry extends BufferGeometry {
    constructor(g, options) {
        var _a, _b, _c, _d, _e, _f;
        super(g, options === null || options === void 0 ? void 0 : options.vertexBuffers);
        this.indexBuffer = null;
        this.count = 0;
        this.indexBuffer = (_a = options === null || options === void 0 ? void 0 : options.indexBuffer) !== null && _a !== void 0 ? _a : null;
        // set count to options.count or attempt to derive it from index buffer length if not set
        const t = (_c = (_b = this.indexBuffer) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : 0;
        const elSizeByType = t & 4 || t & 2 || 1; // 4 for int and float, 2 for short, 1 for byte
        this.count =
            (_d = options === null || options === void 0 ? void 0 : options.count) !== null && _d !== void 0 ? _d : (this.indexBuffer
                ? ((_f = (_e = this.indexBuffer.data) === null || _e === void 0 ? void 0 : _e.byteLength) !== null && _f !== void 0 ? _f : 0) / elSizeByType
                : 0);
    }
    onCreate() {
        var _a;
        super.onCreate();
        (_a = this.indexBuffer) === null || _a === void 0 ? void 0 : _a.create();
    }
    onUpdate() {
        var _a, _b, _c, _d, _e;
        super.onUpdate();
        assume(this.indexBuffer, "Index buffer not set");
        (_a = this.indexBuffer) === null || _a === void 0 ? void 0 : _a.update();
        const t = (_c = (_b = this.indexBuffer) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : 0;
        const elSizeByType = t & 4 || t & 2 || 1;
        this.count =
            this.count ||
                (this.indexBuffer
                    ? ((_e = (_d = this.indexBuffer.data) === null || _d === void 0 ? void 0 : _d.byteLength) !== null && _e !== void 0 ? _e : 0) / elSizeByType
                    : 0);
    }
    onFree() {
        var _a;
        (_a = this.indexBuffer) === null || _a === void 0 ? void 0 : _a.free();
        super.onFree();
        this.count = 0;
    }
    draw() {
        var _a;
        const gl = this.g.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, (_a = this.indexBuffer) === null || _a === void 0 ? void 0 : _a.glBuffer);
        gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0);
    }
}
