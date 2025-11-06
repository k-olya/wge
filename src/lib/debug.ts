export const debugMode = false; //process?.env?.NODE_ENV !== "production";

export function log(...args: any[]) {
  if (debugMode) {
    console.log(...args);
  }
}

export function warn(...args: any[]) {
  if (debugMode) {
    console.warn(...args);
  }
}
