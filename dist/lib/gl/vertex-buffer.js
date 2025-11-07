import { Lifecycle } from "lib/lifecycle";
export class VertexBuffer extends Lifecycle {
    constructor(g, options) {
        var _a, _b, _c;
        super();
        this.glBuffer = null;
        this.data = null;
        this.size = 1;
        this.type = 0;
        this.normalized = false;
        this.stride = 0;
        this.offset = 0;
        this.target = 0;
        this.usage = 0;
        this.g = g;
        const gl = g.gl;
        if (options) {
            Object.assign(this, options);
        }
        this.type = (_a = options === null || options === void 0 ? void 0 : options.type) !== null && _a !== void 0 ? _a : gl.FLOAT;
        this.target = (_b = options === null || options === void 0 ? void 0 : options.target) !== null && _b !== void 0 ? _b : gl.ARRAY_BUFFER;
        this.usage = (_c = options === null || options === void 0 ? void 0 : options.usage) !== null && _c !== void 0 ? _c : gl.STATIC_DRAW;
    }
    onCreate() {
        const gl = this.g.gl;
        this.glBuffer = gl.createBuffer();
        gl.bindBuffer(this.target, this.glBuffer);
        gl.bufferData(this.target, this.data, this.usage);
        this.updated = true;
    }
    onUpdate() {
        const buf = this.glBuffer;
        const gl = this.g.gl;
        gl.bindBuffer(this.target, buf);
        gl.bufferSubData(this.target, 0, this.data);
    }
    // run enables this buffer as an attribute
    onRun(attributeLocation) {
        const gl = this.g.gl;
        gl.bindBuffer(this.target, this.glBuffer);
        gl.enableVertexAttribArray(attributeLocation);
        gl.vertexAttribPointer(attributeLocation, this.size, this.type, this.normalized, this.stride, this.offset);
        return this.glBuffer;
    }
    onFree() {
        this.g.gl.deleteBuffer(this.glBuffer);
        this.glBuffer = null;
    }
}
