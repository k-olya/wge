// bind an event listener to a DOM event
// and return an unbinder function
// similar to Emitter.on
export function onDomEvent(event, callback, target = window, options) {
    target.addEventListener(event, callback, options);
    return () => target.removeEventListener(event, callback, options);
}
