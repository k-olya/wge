// throttle function
export function throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = performance.now();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        fn(...args);
    };
}
