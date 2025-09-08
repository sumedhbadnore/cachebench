// src/components/Charts.tsx
"use client";

import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  RadialBarChart, RadialBar, PolarAngleAxis,
  AreaChart, Area, Legend
} from "recharts";

const COLORS = {
  text: "#e5e7eb",   // light gray for labels
  axis: "#525252",   // axis lines
  grid: "#333333",   // grid lines
  bar: "#ffffff",    // bright bars and strokes
  area: "#ffffff"    // area line and fill
};

export default function Charts({ result }: { result: {
  hits: number; misses: number; hitRate: number; avgLatencyMs: number; totalOps: number;
}}) {
  if (!result) return null;

  const barData = [
    { name: "Hits", value: result.hits },
    { name: "Misses", value: result.misses }
  ];

  // Clamp tiny values so the arc is visible
  const pct = Math.max(1, Math.round(result.hitRate * 100));
  const radialData = [{ name: "HitRate", value: pct }];

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
              <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fill: COLORS.text }}
                axisLine={{ stroke: COLORS.axis }}
                tickLine={{ stroke: COLORS.axis }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: COLORS.text }}
                axisLine={{ stroke: COLORS.axis }}
                tickLine={{ stroke: COLORS.axis }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#0b0b0b", border: "1px solid #333", color: COLORS.text }}
                labelStyle={{ color: COLORS.text }}
                itemStyle={{ color: COLORS.text }}
                wrapperStyle={{ outline: "none" }}
              />
              <Bar dataKey="value" fill={COLORS.bar} fillOpacity={0.95} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hit Rate */}
      <div className="rounded-2xl border border-neutral-800 p-3">
        <h3 className="text-sm font-semibold mb-2">Hit Rate %</h3>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <RadialBarChart
              innerRadius="60%"
              outerRadius="100%"
              data={radialData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                dataKey="value"
                angleAxisId={0}
                barSize={14}
                cornerRadius={10}
                fill={COLORS.bar}
                background
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#0b0b0b", border: "1px solid #333", color: COLORS.text }}
                labelStyle={{ color: COLORS.text }}
                itemStyle={{ color: COLORS.text }}
                wrapperStyle={{ outline: "none" }}
              />
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
              <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fill: COLORS.text }}
                axisLine={{ stroke: COLORS.axis }}
                tickLine={{ stroke: COLORS.axis }}
              />
              <YAxis
                tick={{ fill: COLORS.text }}
                axisLine={{ stroke: COLORS.axis }}
                tickLine={{ stroke: COLORS.axis }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#0b0b0b", border: "1px solid #333", color: COLORS.text }}
                labelStyle={{ color: COLORS.text }}
                itemStyle={{ color: COLORS.text }}
                wrapperStyle={{ outline: "none" }}
              />
              <Legend wrapperStyle={{ color: COLORS.text }} />
              <Area
                type="monotone"
                dataKey="latency"
                stroke={COLORS.area}
                fill={COLORS.area}
                fillOpacity={0.18}
              />
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