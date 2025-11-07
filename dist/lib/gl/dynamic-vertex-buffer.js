import { VertexBuffer } from "./vertex-buffer";
export class DynamicVertexBuffer extends VertexBuffer {
    constructor(g, options) {
        var _a;
        super(g, options);
        this.usage = (_a = options === null || options === void 0 ? void 0 : options.usage) !== null && _a !== void 0 ? _a : g.gl.DYNAMIC_DRAW;
    }
}
