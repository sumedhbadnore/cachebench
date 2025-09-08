# CacheBench

**CacheBench** is a web app to simulate cache replacement policies on request traces.  
It reports hit/miss counts, hit rate, and average latency, with interactive visualizations.  
Built with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com/).

---

## 🚀 Quick Start

```bash
pnpm install
pnpm dev
# open http://localhost:3000
```

---

### How It Works

Paste a trace like A B A C A D, choose a policy (LRU, FIFO, LFU), and set a cache capacity.
The app simulates cache behavior and reports:

- Hits & Misses

- Hit rate (%)

- Average latency (default: hit = 1 ms, miss = 20 ms)

---

### Features

Paste a trace like A B A C A D, choose a policy (LRU, FIFO, LFU), and set a cache capacity.
The app simulates cache behavior and reports:

- Controls: Enter parameters and traces, then run simulations.

- Results: View metrics, charts, and export CSV.

- Capacity Sweep: Run multiple capacities to visualize hit rate vs cache size.

---

### Parameters

- Policy

- LRU: Evicts least recently used items.

- FIFO: Evicts items in insertion order.

- LFU: Evicts least frequently used items.

- Capacity: Number of entries the cache can hold.

- Cache Latency (ms): Time cost for a hit (default = 1).

- Miss Latency (ms): Time cost for a miss (default = 20).

- Warmup Accesses: Initial requests used to fill the cache but excluded from metrics (reduces cold start noise).

---

### Example Traces

These examples highlight policy differences (set warmup=0):

- Recency wins → LRU outperforms FIFO (capacity = 3)

```
A B C A D A B C A D A B C A D
```

- Scan after hot set → LFU excels (capacity = 3)

```
A B C repeated, then D–M, then back to A B C
```

- Phase shift → LRU adapts better, LFU struggles (capacity = 3)

```
A B C repeated, then D E F repeated
```

---

### API

- Endpoint

```
POST /api/simulate
```

- Request Body

```
{
  "policy": "lru" | "fifo" | "lfu",
  "capacity": 1000,
  "cacheLatencyMs": 1,
  "missLatencyMs": 20,
  "warmup": 0,
  "traceText": "A B A C A D ..."
}
```

- Response

```
{
  "ok": true,
  "result": {
    "hits": 11,
    "misses": 5,
    "hitRate": 0.6875,
    "avgLatencyMs": 6.9375,
    "totalOps": 16
  }
}
```

---

### Project Structure

```
src/
  app/
    page.tsx               # UI
    layout.tsx             # Layout & Vercel Analytics
    api/simulate/route.ts  # Serverless simulation endpoint
  components/
    Controls.tsx           # Input form + Run button
    Results.tsx            # Metrics + Charts + CSV export
    Charts.tsx             # Bar, Radial, Area charts
    CapacitySweep.tsx      # Hit rate vs capacity line chart
  lib/
    types.ts               # Shared types
    parseTrace.ts          # Parse text into tokens
    simulate.ts            # Run selected policy across trace
    metrics.ts             # Compute hit rate & average latency
    policies/              # LRU, FIFO, LFU implementations

```

Made with ☕ caffeine and curiosity by Sumedh.
