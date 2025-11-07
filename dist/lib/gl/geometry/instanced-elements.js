import { ElementsBufferGeometry, } from "./elements-buffer-geometry";
// instanced version of ElementsBufferGeometry
export class InstancedElements extends ElementsBufferGeometry {
    constructor(g, options) {
        var _a, _b;
        super(g, options);
        this.instanceBuffers = {};
        this.instanceCount = 0;
        this.instanceBuffers = (_a = options === null || options === void 0 ? void 0 : options.instanceBuffers) !== null && _a !== void 0 ? _a : {};
        this.instanceCount = (_b = options === null || options === void 0 ? void 0 : options.instanceCount) !== null && _b !== void 0 ? _b : 0;
    }
    onCreate() {
        super.onCreate();
        for (let key in this.instanceBuffers) {
            this.instanceBuffers[key].create();
        }
    }
    onUpdate() {
        super.onUpdate();
        for (let key in this.instanceBuffers) {
            this.instanceBuffers[key].update();
        }
    }
    enableAttributes(locations, divisors) {
        for (let key in locations) {
            if (this.vertexBuffers[key] !== undefined) {
                this.vertexBuffers[key].run(locations[key]);
            }
            if (this.instanceBuffers[key] !== undefined) {
                this.instanceBuffers[key].run(locations[key]);
                this.g.gl.vertexAttribDivisor(locations[key], (divisors === null || divisors === void 0 ? void 0 : divisors[key]) || 1);
            }
        }
    }
    onRun(shader, uniforms) {
        this.g.run();
        shader.run(uniforms);
        this.enableAttributes(shader.attributeLocations);
        this.draw();
    }
    onFree() {
        for (let key in this.instanceBuffers) {
            this.instanceBuffers[key].free();
        }
        super.onFree();
    }
    draw() {
        var _a;
        const gl = this.g.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, (_a = this.indexBuffer) === null || _a === void 0 ? void 0 : _a.glBuffer);
        gl.drawElementsInstanced(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0, this.instanceCount);
    }
}
// promote ElementsBufferGeometry to InstancedElements
export function elementsToInstanced(geometry, options) {
    return new InstancedElements(geometry.g, Object.assign({ vertexBuffers: geometry.vertexBuffers, indexBuffer: geometry.indexBuffer, count: geometry.count }, options));
}
