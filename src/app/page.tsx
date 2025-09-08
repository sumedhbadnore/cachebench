// src/app/page.tsx
"use client";
import { useState } from "react";
import Controls from "@/components/Controls";
import Results from "@/components/Results";
import dynamic from "next/dynamic";
const CapacitySweep = dynamic(() => import("@/components/CapacitySweep"), { ssr: false });

type RunParams = {
  policy: string;
  capacity: number;
  cacheLatencyMs: number;
  missLatencyMs: number;
  warmup: number;
  traceText: string;
};

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [lastParams, setLastParams] = useState<RunParams | null>(null);

  const onRun = async (params: RunParams) => {
    setLoading(true);
    setResult(null);
    setLastParams(params);            // keep the params used
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
      <Controls onRun={onRun} disabled={loading} />
      <Results result={result} loading={loading} />
      <CapacitySweep baseParams={lastParams} />
    </main>
  );
}
