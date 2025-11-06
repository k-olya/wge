import { Collection } from "./collection";

// either a collection or an iterable
// the important thing is that we can loop through it
export type Loopable<T> = Collection<T> | Iterable<T>;
export function loopThrough<T>(loopable: Loopable<T>, cb: (item: T) => void) {
  if ((loopable as Iterable<T>)[Symbol.iterator]) {
    for (const item of loopable as Iterable<T>) {
      cb(item);
    }
  } else {
    for (const key in loopable) {
      cb((loopable as Collection<T>)[key]);
    }
  }
}
