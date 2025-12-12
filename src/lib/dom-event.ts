// bind an event listener to a DOM event
// and return an unbinder function
// similar to Emitter.on
export function onDomEvent<T>(event: string, callback: EventListenerOrEventListenerObject, target: EventTarget = window, options?: AddEventListenerOptions) {
    target.addEventListener(event, callback, options);
    return () => target.removeEventListener(event, callback, options);
}