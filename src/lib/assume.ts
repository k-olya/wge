// throws an error if the expression is falsey
// returns true otherwise
export function assert(expr: any, message: string) {
  if (!expr) {
    console.error(message, expr);
    throw new Error(message);
  }
  return true;
}

// softer version of assert, logs an error instead of throwing
// returns bool so that it can be used in ifs for early returns
export function assume(expr: any, message: string) {
  if (!expr) {
    console.error(message, expr);
    return false;
  }
  return true;
}
