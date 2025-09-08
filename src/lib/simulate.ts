// src/lib/simulate.ts
import { CachePolicy, PolicyName, SimConfig, SimResult } from "./types";
import { computeResult } from "./metrics";
import { LRU } from "./policies/lru";
import { FIFO } from "./policies/fifo";
import { LFU } from "./policies/lfu";

function makePolicy(name: PolicyName, capacity: number): CachePolicy {
  if (name === "lru") return new LRU(capacity);
  if (name === "fifo") return new FIFO(capacity);
  if (name === "lfu") return new LFU(capacity);
  throw new Error(`Unknown policy ${name}`);
}

export function simulate(trace: string[], cfg: SimConfig): SimResult {
  const warm = cfg.warmup ?? 0;
  const policy = makePolicy(cfg.policy, cfg.capacity);
  let hits = 0, misses = 0;

  for (let i = 0; i < trace.length; i++) {
    const key = trace[i];
    const isHit = policy.access(key);
    // during warmup we populate but do not count stats
    if (i >= warm) {
      if (isHit) hits++;
      else misses++;
    }
  }

  return computeResult(
    hits,
    misses,
    cfg.cacheLatencyMs,
    cfg.missLatencyMs
  );
}
