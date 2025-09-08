// src/lib/policies/base.ts
export abstract class BasePolicy {
  protected capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }
  abstract access(key: string): boolean;
  reset(capacity: number) {
    this.capacity = capacity;
  }
}
