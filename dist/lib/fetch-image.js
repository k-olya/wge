export function fetchImage(src, crossOrigin) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        if (crossOrigin)
            img.crossOrigin = crossOrigin;
        img.onload = () => {
            resolve(img);
        };
        img.onerror = (e) => reject(e);
        img.src = src;
    });
}
