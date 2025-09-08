// src/lib/types.ts
export type PolicyName = "lru" | "fifo" | "lfu";

export interface SimConfig {
  policy: PolicyName;
  capacity: number;               // entry count capacity
  cacheLatencyMs: number;         // e.g., 1
  missLatencyMs: number;          // e.g., 20
  warmup?: number;                // optional, number of initial accesses not counted
}

export interface SimResult {
  hits: number;
  misses: number;
  hitRate: number;
  avgLatencyMs: number;
  totalOps: number;
}

export interface CachePolicy {
  // returns true if it was a hit
  access(key: string): boolean;
  // reset to clean state
  reset(capacity: number): void;
}
