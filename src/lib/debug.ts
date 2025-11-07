export let DEBUG_MODE = false; //process?.env?.NODE_ENV !== "production";

export function setDebugMode(mode: boolean = true) {
  DEBUG_MODE = mode;
}

export function log(...args: any[]) {
  if (DEBUG_MODE) {
    console.log(...args);
  }
}

export function warn(...args: any[]) {
  if (DEBUG_MODE) {
    console.warn(...args);
  }
}
