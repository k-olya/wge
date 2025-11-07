export class RandomId {
    generate(len = 12, fillString = "0") {
        return Math.random().toString(36).substring(2).padStart(len, fillString);
    }
}
export const randomId = new RandomId().generate;
//@ts-ignore
window.randomId = randomId;
export class AutoincrementId {
    constructor() {
        this.id = 0;
    }
    generate(len, fillString = "0") {
        const r = String(this.id++);
        if (len)
            return r.padStart(len, fillString);
        return r;
    }
}
export class DateNowId {
    generate(len = 12, fillString = "0") {
        let r = Date.now().toString(36);
        if (r === DateNowId.last) {
            DateNowId.count++;
        }
        else {
            DateNowId.count = 0;
            DateNowId.last = r;
        }
        r += DateNowId.count.toString(36).padStart(4, "0");
        r = r.padStart(len, fillString);
        return r;
    }
}
DateNowId.last = "";
DateNowId.count = 0;
export const dateNowId = new DateNowId().generate;
