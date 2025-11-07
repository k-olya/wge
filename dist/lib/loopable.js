export function loopThrough(loopable, cb) {
    if (loopable[Symbol.iterator]) {
        for (const item of loopable) {
            cb(item);
        }
    }
    else {
        for (const key in loopable) {
            cb(loopable[key]);
        }
    }
}
