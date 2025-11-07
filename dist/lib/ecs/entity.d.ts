export interface Entity {
    _id: string;
    [key: string]: any;
}
export declare function forEachComponent(entity: Entity, callback: (key: string, value: any) => void): void;
export declare function component<T>(entity: Entity, component: string): T;
