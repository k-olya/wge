import { Lifecycle } from "lib/lifecycle";
import { bindOutput } from "./framebuffer";
export class GLContext extends Lifecycle {
    get width() {
        return this.gl.canvas.width;
    }
    set width(v) {
        this.gl.canvas.width = v;
        this._aspect = this.height / this.width;
        this.updated = false;
    }
    get height() {
        return this.gl.canvas.height;
    }
    set height(v) {
        this._height = v;
        this._aspect = this.height / this.width;
        this.updated = false;
    }
    get aspect() {
        return this._aspect;
    }
    constructor(gl) {
        super();
        this.framebuffer = null;
        this._height = 0;
        this._aspect = 1;
        this.state = {};
        this.toSet = {};
        this.gl = gl;
    }
    onCreate() {
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }
    onUpdate() {
        for (const key in this.toSet) {
            this.state[key] = this.toSet[key];
            delete this.toSet[key];
        }
    }
    set(key, value) {
        if (this.state[key] === value) {
            delete this.toSet[key];
            return;
        }
        this.toSet[key] = value;
    }
    get(key) {
        if (this.toSet[key] !== undefined) {
            return this.toSet[key];
        }
        return this.state[key];
    }
    bindOutput(output) {
        bindOutput(this, output);
    }
    // useProgram
    // bindBuffer
    // setUniforms
    onRun() {
        return this;
    }
}
