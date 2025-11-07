// local strorage helpers
// set ls value
export function setLS(key, value) {
    localStorage.setItem(key, value);
}
// get ls value or set it to default if it does not exist
export function getLS(key, def) {
    const value = localStorage.getItem(key);
    if (value == null) {
        setLS(key, def);
        return def;
    }
    return value;
}
// export entities to ls
export function setLSEntities(key, valules) {
    setLS(key, JSON.stringify(valules));
}
// get entitity array from ls
export function getLSEntities(key, def) {
    let value = getLS(key, "");
    if (!value) {
        return def || [];
    }
    try {
        return JSON.parse(value);
    }
    catch (e) {
        return def || [];
    }
}
