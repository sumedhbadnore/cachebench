// src/lib/policies/fifo.ts
import { BasePolicy } from "./base";

/*
  FIFO with Map
  - On miss and full, evict the earliest inserted key
  - No refresh on hit
*/
export class FIFO extends BasePolicy {
  private map = new Map<string, true>();

  override reset(capacity: number) {
    super.reset(capacity);
    this.map.clear();
  }

  access(key: string): boolean {
    const hit = this.map.has(key);
    if (hit) return true;

    if (this.map.size >= this.capacity) {
      const oldest = this.map.keys().next().value;
      if (oldest !== undefined) this.map.delete(oldest);
    }
    this.map.set(key, true);
    return false;
  }
}
