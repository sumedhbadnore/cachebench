// src/components/CapacitySweep.tsx
"use client";
import { useState } from "react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

type Params = {
  policy: string;
  capacity: number;
  cacheLatencyMs: number;
  missLatencyMs: number;
  warmup: number;
  traceText: string;
};

export default function CapacitySweep({ baseParams }: { baseParams: Params | null }) {
  const [data, setData] = useState<{capacity:number; hitRate:number;}[]>([]);
  const [running, setRunning] = useState(false);

  const runSweep = async () => {
    if (!baseParams) return;
    setRunning(true);
    try {
      const capacities = [2,4,8,16,32,64,128];
      const points: {capacity:number; hitRate:number;}[] = [];
      for (const c of capacities) {
        const res = await fetch("/api/simulate", {
          method: "POST",
          headers: {"content-type":"application/json"},
          body: JSON.stringify({ ...baseParams, capacity: c })
        });
        const json = await res.json();
        points.push({ capacity: c, hitRate: json.result.hitRate * 100 });
      }
      setData(points);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-800 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Capacity Sweep</h3>
        <button
          onClick={runSweep}
          disabled={running || !baseParams}
          className="rounded-xl bg-white text-black px-3 py-2 text-sm disabled:opacity-50"
        >
          {running ? "Running..." : "Run sweep"}
        </button>
      </div>

      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="capacity" />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip formatter={(v:number) => `${v.toFixed(2)}%`} />
            <Line type="monotone" dataKey="hitRate" dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
