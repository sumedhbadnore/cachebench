// src/lib/metrics.ts
import { SimResult } from "./types";

export function computeResult(
  hits: number,
  misses: number,
  cacheLatencyMs: number,
  missLatencyMs: number
): SimResult {
  const totalOps = hits + misses;
  const totalLatency =
    hits * cacheLatencyMs + misses * missLatencyMs;
  const hitRate = totalOps > 0 ? hits / totalOps : 0;
  const avgLatencyMs = totalOps > 0 ? totalLatency / totalOps : 0;

  return { hits, misses, hitRate, avgLatencyMs, totalOps };
}

