// usage:
function Mixin(Base) {
    return class extends Base {
        log() {
            console.log("hello world! all your base are belong to us");
        }
    };
}
export {};
