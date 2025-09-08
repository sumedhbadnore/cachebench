// src/app/api/simulate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseTrace } from "@/lib/parseTrace";
import { simulate } from "@/lib/simulate";
import { PolicyName, SimConfig } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      policy,
      capacity,
      cacheLatencyMs = 1,
      missLatencyMs = 20,
      warmup = 0,
      traceText = ""
    } = body as {
      policy: PolicyName;
      capacity: number;
      cacheLatencyMs?: number;
      missLatencyMs?: number;
      warmup?: number;
      traceText?: string;
    };

    if (!policy || !capacity || capacity < 0) {
      return NextResponse.json(
        { error: "Invalid policy or capacity" },
        { status: 400 }
      );
    }
    const trace = parseTrace(traceText);
    const cfg: SimConfig = {
      policy,
      capacity,
      cacheLatencyMs,
      missLatencyMs,
      warmup
    };
    const result = simulate(trace, cfg);
    return NextResponse.json({ ok: true, result });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Failed to simulate" },
      { status: 500 }
    );
  }
}
