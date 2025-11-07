import { System } from "lib/ecs/system";
import { Emitter } from "lib/emitter";
export class KbMInputSystem extends Emitter(System) {
    constructor() {
        super(...arguments);
        this.state = {};
        this.map = {};
    }
    onCreate() {
        this.kbDownListener = this.onKeydown.bind(this);
        window.addEventListener("keydown", this.kbDownListener);
        this.kbUpListener = this.onKeyup.bind(this);
        window.addEventListener("keyup", this.kbUpListener);
        this.mouseDownListener = this.onMousedown.bind(this);
        window.addEventListener("mousedown", this.mouseDownListener);
        this.mouseUpListener = this.onMouseup.bind(this);
        window.addEventListener("mouseup", this.mouseUpListener);
        this.contextMenuListener = this.onContextmenu.bind(this);
        window.addEventListener("contextmenu", this.contextMenuListener);
    }
    onKeydown(e) {
        this.set(e.key);
    }
    onKeyup(e) {
        this.set(e.key, false);
    }
    onMousedown(e) {
        this.set(`MB${e.button}`);
    }
    onMouseup(e) {
        this.set(`MB${e.button}`, false);
    }
    set(k, v = false) {
        const key = this.map[k];
        if (key) {
            this.state[key] = v;
            this.emit(key, v);
        }
    }
    // prevent context menu
    onContextmenu(e) {
        e.preventDefault();
    }
    onUpdate() { }
    onRun(...args) {
        return this;
    }
    onFree() {
        if (this.kbDownListener) {
            window.removeEventListener("keydown", this.kbDownListener);
            this.kbDownListener = undefined;
        }
        if (this.kbUpListener) {
            window.removeEventListener("keyup", this.kbUpListener);
            this.kbUpListener = undefined;
        }
        if (this.mouseDownListener) {
            window.removeEventListener("mousedown", this.mouseDownListener);
            this.mouseDownListener = undefined;
        }
        if (this.mouseUpListener) {
            window.removeEventListener("mouseup", this.mouseUpListener);
            this.mouseUpListener = undefined;
        }
    }
}
