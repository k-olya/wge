import { Entity } from "./ecs/entity";
export declare function setLS(key: string, value: string): void;
export declare function getLS(key: string, def: string): string;
export declare function setLSEntities(key: string, valules: Entity[]): void;
export declare function getLSEntities(key: string, def?: Entity[]): Entity[];
