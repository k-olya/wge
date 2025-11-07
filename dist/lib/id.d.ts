export interface IdGenerator {
    generate(len?: number, fillString?: string): string;
}
export declare class RandomId implements IdGenerator {
    generate(len?: number, fillString?: string): string;
}
export declare const randomId: (len?: number, fillString?: string) => string;
export declare class AutoincrementId implements IdGenerator {
    private id;
    generate(len?: number, fillString?: string): string;
}
export declare class DateNowId implements IdGenerator {
    private static last;
    private static count;
    generate(len?: number, fillString?: string): string;
}
export declare const dateNowId: (len?: number, fillString?: string) => string;
