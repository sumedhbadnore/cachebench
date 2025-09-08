// src/components/Controls.tsx
"use client";

import { useState } from "react";

export default function Controls({
  onRun,
  disabled
}: {
  onRun: (p: any) => void;
  disabled?: boolean;
}) {
  const [policy, setPolicy] = useState("lru");
  const [capacity, setCapacity] = useState(3);
  const [cacheLatencyMs, setCacheLatencyMs] = useState(1);
  const [missLatencyMs, setMissLatencyMs] = useState(20);
  const [warmup, setWarmup] = useState(0);
  const [traceText, setTraceText] = useState("A B A C A D A B A C");

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-800 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Policy
          <select
            className="bg-neutral-900 rounded px-2 py-1"
            value={policy}
            onChange={e => setPolicy(e.target.value)}
          >
            <option value="lru">LRU</option>
            <option value="fifo">FIFO</option>
            <option value="lfu">LFU</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Capacity
          <input
            type="number"
            className="bg-neutral-900 rounded px-2 py-1"
            value={capacity}
            onChange={e => setCapacity(parseInt(e.target.value || "0", 10))}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Cache latency ms
          <input
            type="number"
            className="bg-neutral-900 rounded px-2 py-1"
            value={cacheLatencyMs}
            onChange={e => setCacheLatencyMs(parseInt(e.target.value || "0", 10))}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Miss latency ms
          <input
            type="number"
            className="bg-neutral-900 rounded px-2 py-1"
            value={missLatencyMs}
            onChange={e => setMissLatencyMs(parseInt(e.target.value || "0", 10))}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Warmup accesses
          <input
            type="number"
            className="bg-neutral-900 rounded px-2 py-1"
            value={warmup}
            onChange={e => setWarmup(parseInt(e.target.value || "0", 10))}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        Trace
        <textarea
          rows={6}
          className="bg-neutral-900 rounded p-2 font-mono"
          value={traceText}
          onChange={e => setTraceText(e.target.value)}
        />
      </label>

      <div className="flex gap-3">
        <button
          disabled={disabled}
          onClick={() =>
            onRun({ policy, capacity, cacheLatencyMs, missLatencyMs, warmup, traceText })
          }
          className="rounded-xl bg-white text-black px-4 py-2 font-semibold disabled:opacity-50"
        >
          {disabled ? "Running..." : "Run"}
        </button>
      </div>
    </div>
  );
}
