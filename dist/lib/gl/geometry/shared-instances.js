import { Lifecycle } from "lib/lifecycle";
export class SharedInstances extends Lifecycle {
    constructor(g, options) {
        var _a, _b;
        super();
        this.instanceBuffers = {};
        this.instanceCount = 0;
        this.g = g;
        this.instanceBuffers = (_a = options === null || options === void 0 ? void 0 : options.instanceBuffers) !== null && _a !== void 0 ? _a : {};
        this.instanceCount = (_b = options === null || options === void 0 ? void 0 : options.instanceCount) !== null && _b !== void 0 ? _b : 0;
    }
    onCreate() {
        for (let key in this.instanceBuffers) {
            this.instanceBuffers[key].create();
        }
    }
    onUpdate() {
        for (let key in this.instanceBuffers) {
            this.instanceBuffers[key].update();
        }
    }
    enableAttributes(geometry, locations, divisors) {
        for (let key in locations) {
            if (geometry.vertexBuffers[key] !== undefined) {
                geometry.vertexBuffers[key].run(locations[key]);
            }
            if (this.instanceBuffers[key] !== undefined) {
                this.instanceBuffers[key].run(locations[key]);
                this.g.gl.vertexAttribDivisor(locations[key], (divisors === null || divisors === void 0 ? void 0 : divisors[key]) || 1);
            }
        }
    }
    onRun(geometry, shader, uniforms) {
        this.g.run();
        shader.run(uniforms);
        geometry.update();
        this.enableAttributes(geometry, shader.attributeLocations);
        this.draw(geometry);
    }
    draw(geometry) {
        var _a;
        const gl = this.g.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, (_a = geometry.indexBuffer) === null || _a === void 0 ? void 0 : _a.glBuffer);
        gl.drawElementsInstanced(gl.TRIANGLES, geometry.count, gl.UNSIGNED_SHORT, 0, this.instanceCount);
    }
    onFree() {
        for (let key in this.instanceBuffers) {
            this.instanceBuffers[key].free();
        }
        super.onFree();
    }
}
