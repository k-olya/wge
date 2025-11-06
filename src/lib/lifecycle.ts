import { Collection } from "./collection";
import { Loopable, loopThrough } from "./loopable";

export interface LifecycleInterface {
  onCreate(): any;
  create(): any;
  onUpdate(): any;
  update(): any;
  onRun(...args: any[]): any;
  run(...args: any[]): any;
  onFree(): any;
  free(): any;
}

export class Lifecycle<T, A extends any[] = any[]>
  implements LifecycleInterface
{
  // state vars
  created: boolean = false;
  updated: boolean = false;

  onCreate(): any {}
  onUpdate(): any {}
  onRun(...args: A): any {}
  onFree(): any {}

  // lifecycle methods
  create() {
    if (this.created) return;
    const r = this.onCreate();
    this.created = true;
    return r;
  }
  update() {
    if (this.updated) return;
    this.create(); // ensure object is created
    const r = this.onUpdate();
    this.updated = true;
    return r;
  }
  run(...args: A): T {
    this.update(); // ensure object is updated
    return this.onRun(...args);
  }
  free() {
    if (!this.created) return;
    const r = this.onFree();
    this.created = false;
    this.updated = false;
    return r;
  }
}

export class LifecycleParent<T, A extends any[] = any[]> extends Lifecycle<
  T,
  A
> {
  // state vars
  created: boolean = false;
  updated: boolean = false;

  // children
  childrenIterable: Iterable<LifecycleInterface> = [];
  children: Collection<LifecycleInterface> = {};
  forEachChild(cb: (item: LifecycleInterface) => void) {
    for (const c in this.children) {
      cb(this.children[c]);
    }
    for (const c of this.childrenIterable) {
      cb(c);
    }
  }

  onCreate(): any {}
  onUpdate(): any {}
  onRun(...args: A): any {}
  onFree(): any {}

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
