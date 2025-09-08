# README.md
# CacheBench

Run LRU, FIFO, LFU simulations on request traces. Deployed on Vercel.

## Quick start
pnpm i
pnpm dev

Open http://localhost:3000

## API
POST /api/simulate
{
  "policy": "lru" | "fifo" | "lfu",
  "capacity": 1000,
  "cacheLatencyMs": 1,
  "missLatencyMs": 20,
  "warmup": 0,
  "traceText": "A B A C A D ..."
}
