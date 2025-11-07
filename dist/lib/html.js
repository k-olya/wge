import { randomId } from "./id";
// world's most basic html template framework
// joins lists
// escapes html
// and binds event listeners
// @ts-expect-error
window.htmlEventHandlers = window.htmlEventHandlers || {};
// Escape HTML to prevent basic XSS
const sanitizeHTML = (str) => str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
export function h(strings, ...values) {
    const result = [];
    values.forEach((value, i) => {
        if (typeof value === "function") {
            // Replace function with a call to window.handlers
            const id = randomId();
            // @ts-expect-error
            window.htmlEventHandlers[id] = value;
            result.push(`window.htmlEventHandlers['${id}'](event)`);
        }
        else if (Array.isArray(value)) {
            // Join arrays automatically with no separator
            result.push(sanitizeHTML(value.join("")));
        }
        else {
            result.push(sanitizeHTML(String(value)));
        }
        // Add the literal string after the value
        result.push(strings[i + 1]);
    });
    return strings[0] + result.join("");
}
