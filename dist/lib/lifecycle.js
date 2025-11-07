export class Lifecycle {
    constructor() {
        // state vars
        this.created = false;
        this.updated = false;
    }
    onCreate() { }
    onUpdate() { }
    onRun(...args) { }
    onFree() { }
    // lifecycle methods
    create() {
        if (this.created)
            return;
        const r = this.onCreate();
        this.created = true;
        return r;
    }
    update() {
        if (this.updated)
            return;
        this.create(); // ensure object is created
        const r = this.onUpdate();
        this.updated = true;
        return r;
    }
    run(...args) {
        this.update(); // ensure object is updated
        return this.onRun(...args);
    }
    free() {
        if (!this.created)
            return;
        const r = this.onFree();
        this.created = false;
        this.updated = false;
        return r;
    }
}
export class LifecycleParent extends Lifecycle {
    constructor() {
        super(...arguments);
        // state vars
        this.created = false;
        this.updated = false;
        // children
        this.childrenIterable = [];
        this.children = {};
    }
    forEachChild(cb) {
        for (const c in this.children) {
            cb(this.children[c]);
        }
        for (const c of this.childrenIterable) {
            cb(c);
        }
    }
    onCreate() { }
    onUpdate() { }
    onRun(...args) { }
    onFree() { }
    // lifecycle methods
    create() {
        this.forEachChild((item) => item.create());
        return super.create();
    }
    update() {
        this.forEachChild((item) => item.update());
        return super.update();
    }
    free() {
        this.forEachChild((item) => item.free());
        return super.free();
    }
}
