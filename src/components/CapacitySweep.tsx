"use client";

import { useState } from "react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

export default function CapacitySweep() {
  const [data, setData] = useState<{capacity:number; hitRate:number;}[]>([]);
  const [running, setRunning] = useState(false);

  const runSweep = async () => {
    setRunning(true);
    try {
      const capacities = [2,4,8,16,32,64,128];
      const traceText = "A B A C A D A B A C A E A F A B C A B A D E F A B";
      const policy = "lru";
      const cacheLatencyMs = 1;
      const missLatencyMs = 20;
      const warmup = 0;

      const points: {capacity:number; hitRate:number;}[] = [];
      for (const c of capacities) {
        const res = await fetch("/api/simulate", {
          method: "POST",
          headers: {"content-type":"application/json"},
          body: JSON.stringify({ policy, capacity: c, cacheLatencyMs, missLatencyMs, warmup, traceText })
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
          disabled={running}
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
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="hitRate" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
