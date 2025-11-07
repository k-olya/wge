import { EmitterObject } from "./emitter";
// a game loop bound to requestAnimationFrame
export class RenderLoop extends EmitterObject {
    constructor() {
        super(...arguments);
        this.time = 0;
        this.delta = 0;
        this.frame = 0;
        this.raf = null;
        this.boundLoop = this.loop.bind(this);
    }
    start() {
        this.time = performance.now();
        this.emit("start", this);
        this.loop(this.time);
    }
    loop(time) {
        this.raf = window.requestAnimationFrame(this.boundLoop);
        this.delta = time - this.time;
        this.time = time;
        this.emit("loop", this);
        this.frame++;
    }
    pause() {
        if (this.raf !== null) {
            window.cancelAnimationFrame(this.raf);
        }
        this.emit("pause", this);
    }
}
// a game loop bound to setTimeout
export class TimeoutLoop extends EmitterObject {
    constructor() {
        super(...arguments);
        this.time = 0;
        this.delta = 0;
        this.frame = 0;
        this.fps = 0;
        this.timeout = null;
        this.boundLoop = this.loop.bind(this);
    }
    start() {
        this.time = performance.now();
        this.emit("start", this);
        this.loop();
    }
    loop() {
        const time = performance.now();
        this.delta = time - this.time;
        this.time = time;
        this.emit("loop", this);
        this.frame++;
        this.timeout = window.setTimeout(this.boundLoop, this.fps ? 1000 / this.fps : 0);
    }
    pause() {
        if (this.timeout !== null) {
            window.clearTimeout(this.timeout);
        }
        this.emit("pause", this);
    }
}
export function loopSystem(loopConstructor, system) {
    const loop = new loopConstructor();
    loop.on("loop", rl => {
        system.run(rl);
    });
    loop.start();
    return loop;
}
