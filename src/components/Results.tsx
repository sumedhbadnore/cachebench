// src/components/Results.tsx
"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
const Charts = dynamic(() => import("./Charts"), { ssr: false });

export default function Results({
  result,
  loading
}: {
  result: any;
  loading?: boolean;
}) {
  const csv = useMemo(() => {
    if (!result) return "";
    const header = "hits,misses,hitRate,avgLatencyMs,totalOps\n";
    const row = [
      result.hits,
      result.misses,
      result.hitRate.toFixed(6),
      result.avgLatencyMs.toFixed(3),
      result.totalOps
    ].join(",") + "\n";
    return header + row;
  }, [result]);

  const downloadCSV = () => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cachebench_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="opacity-80">Crunching numbers...</div>;
  if (!result) return null;

  return (
    <div className="rounded-2xl border border-neutral-800 p-4 space-y-4">
      <h2 className="text-xl font-semibold">Results</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
        <Metric label="Hits" value={result.hits} />
        <Metric label="Misses" value={result.misses} />
        <Metric label="Hit rate" value={(result.hitRate * 100).toFixed(2) + "%"} />
        <Metric label="Avg latency" value={result.avgLatencyMs.toFixed(3) + " ms"} />
        <Metric label="Ops" value={result.totalOps} />
      </div>

      <button
        onClick={downloadCSV}
        className="rounded-xl border border-neutral-700 px-3 py-2 text-sm"
      >
        Download CSV
      </button>

      {/* Charts */}
      <Charts result={result} />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-neutral-900 p-3">
      <div className="text-xs opacity-70">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}
