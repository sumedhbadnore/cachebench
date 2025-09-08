// src/components/Charts.tsx
"use client";

import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  RadialBarChart, RadialBar,
  AreaChart, Area, Legend
} from "recharts";

export default function Charts({ result }: { result: {
  hits: number; misses: number; hitRate: number; avgLatencyMs: number; totalOps: number;
}}) {
  if (!result) return null;

  const barData = [
    { name: "Hits", value: result.hits },
    { name: "Misses", value: result.misses }
  ];

  const radialData = [
    { name: "HitRate", value: Math.round(result.hitRate * 100), fill: "#8884d8" }
  ];

  const latencyData = [
    { name: "Average", latency: Number(result.avgLatencyMs.toFixed(3)) }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Hits vs Misses */}
      <div className="rounded-2xl border border-neutral-800 p-3">
        <h3 className="text-sm font-semibold mb-2">Hits vs Misses</h3>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hit Rate */}
      <div className="rounded-2xl border border-neutral-800 p-3">
        <h3 className="text-sm font-semibold mb-2">Hit Rate %</h3>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <RadialBarChart innerRadius="60%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
              <RadialBar dataKey="value" />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-xl font-bold">
          {(result.hitRate * 100).toFixed(2)}%
        </div>
      </div>

      {/* Average Latency */}
      <div className="rounded-2xl border border-neutral-800 p-3">
        <h3 className="text-sm font-semibold mb-2">Average Latency ms</h3>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <AreaChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="latency" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-xl font-bold">
          {result.avgLatencyMs.toFixed(3)} ms
        </div>
      </div>
    </div>
  );
}
