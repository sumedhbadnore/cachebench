// src/lib/csv.ts
import { SimResult } from "./types";

export function resultToCSV(r: SimResult): string {
  const header = "hits,misses,hitRate,avgLatencyMs,totalOps\n";
  const row = `${r.hits},${r.misses},${r.hitRate.toFixed(6)},${r.avgLatencyMs.toFixed(3)},${r.totalOps}\n`;
  return header + row;
}
