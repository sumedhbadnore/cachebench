// src/app/page.tsx
"use client";

import { useState } from "react";
import Controls from "@/components/Controls";
import Results from "@/components/Results";
import dynamic from "next/dynamic";
const CapacitySweep = dynamic(() => import("@/components/CapacitySweep"), { ssr: false });

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const onRun = async (params: {
    policy: string;
    capacity: number;
    cacheLatencyMs: number;
    missLatencyMs: number;
    warmup: number;
    traceText: string;
  }) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(params)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data.result);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">CacheBench</h1>
      <p className="text-sm opacity-80">
        Paste a trace, choose a policy, press Run. Easy as A B A C A.
      </p>
      <Controls onRun={onRun} disabled={loading} />
      <Results result={result} loading={loading} />
      <CapacitySweep/>
    </main>
  );
}
