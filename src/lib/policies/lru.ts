// src/lib/policies/lru.ts
import { BasePolicy } from "./base";

/*
  LRU with Map:
  - Map preserves insertion order
  - On hit, re-insert the key to mark it most recently used
  - On miss and full, evict oldest (first key in Map)
*/
export class LRU extends BasePolicy {
  private map = new Map<string, true>();

  override reset(capacity: number) {
    super.reset(capacity);
    this.map.clear();
  }

  access(key: string): boolean {
    const hit = this.map.has(key);
    if (hit) {
      // refresh recency
      this.map.delete(key);
      this.map.set(key, true);
      return true;
    }

    // miss
    if (this.map.size >= this.capacity) {
      // evict LRU = first inserted key
      const oldest = this.map.keys().next().value;
      if (oldest !== undefined) this.map.delete(oldest);
    }
    this.map.set(key, true);
    return false;
  }
}
