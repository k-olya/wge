import { Lifecycle } from "lib/lifecycle";
import { assume } from "lib/assume";
export class BufferGeometry extends Lifecycle {
    constructor(g, vb) {
        super();
        this.g = g;
        this.vertexBuffers = vb !== null && vb !== void 0 ? vb : {};
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
    onRun(shader, uniforms) {
        this.g.run();
        shader.run(uniforms);
        for (let key in shader.attributeLocations) {
            if (assume(this.vertexBuffers[key] !== undefined, `shader and geometry mismatch: buffer ${key} not found`)) {
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
}
