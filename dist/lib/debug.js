export const debugMode = false; //process?.env?.NODE_ENV !== "production";
export function log(...args) {
    if (debugMode) {
        console.log(...args);
    }
}
export function warn(...args) {
    if (debugMode) {
        console.warn(...args);
    }
}
