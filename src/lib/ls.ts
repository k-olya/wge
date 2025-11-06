// local strorage helpers

import { Entity } from "./ecs/entity";

// set ls value
export function setLS(key: string, value: string): void {
  localStorage.setItem(key, value);
}

// get ls value or set it to default if it does not exist
export function getLS(key: string, def: string): string {
  const value = localStorage.getItem(key);
  if (value == null) {
    setLS(key, def);
    return def;
  }
  return value;
}

// export entities to ls
export function setLSEntities(key: string, valules: Entity[]) {
  setLS(key, JSON.stringify(valules));
}

// get entitity array from ls
export function getLSEntities(key: string, def?: Entity[]): Entity[] {
  let value = getLS(key, "");
  if (!value) {
    return def || [];
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return def || [];
  }
}
