// src/lib/policies/lfu.ts
import { BasePolicy } from "./base";

/*
  LFU:
  - key -> freq
  - freq -> ordered set of keys
  - track minFreq for O(1) eviction on ties
*/
export class LFU extends BasePolicy {
  private freq = new Map<string, number>();
  private buckets = new Map<number, Set<string>>();
  private minFreq = 0;

  override reset(capacity: number) {
    super.reset(capacity);
    this.freq.clear();
    this.buckets.clear();
    this.minFreq = 0;
  }

  private bump(key: string) {
    const f = this.freq.get(key) ?? 0;
    const next = f + 1;
    this.freq.set(key, next);

    // remove from current bucket
    if (f > 0) {
      const set = this.buckets.get(f);
      if (set) {
        set.delete(key);
        if (set.size === 0) {
          this.buckets.delete(f);
          if (this.minFreq === f) this.minFreq = next;
        }
      }
    }

    // add to next bucket
    if (!this.buckets.has(next)) this.buckets.set(next, new Set());
    this.buckets.get(next)!.add(key);
  }

  private evictOne() {
    // evict from minFreq bucket, FIFO among equals
    const set = this.buckets.get(this.minFreq);
    if (!set || set.size === 0) return;
    const victim = set.values().next().value as string;
    set.delete(victim);
    if (set.size === 0) this.buckets.delete(this.minFreq);
    this.freq.delete(victim);
  }

  access(key: string): boolean {
    const exists = this.freq.has(key);
    if (exists) {
      this.bump(key);
      return true;
    }

    // miss
    if (this.capacity === 0) return false;
    if (this.freq.size >= this.capacity) {
      this.evictOne();
    }
    // new key at freq 1
    this.freq.set(key, 0); // will become 1 in bump
    this.minFreq = 1;
    this.bump(key);
    return false;
  }
}
