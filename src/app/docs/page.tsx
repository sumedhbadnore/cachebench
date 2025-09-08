
// src/app/docs/page.tsx
export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">CacheBench Docs</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Quick start</h2>
        <ol className="list-decimal pl-5 space-y-1 text-sm opacity-90">
          <li>Paste a trace like <code className="bg-neutral-900 px-1">A B A C A D</code>.</li>
          <li>Pick a policy and capacity , click Run.</li>
          <li>Read metrics and charts , download CSV if needed.</li>
        </ol>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Parameters</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm opacity-90">
          <li><b>Policy</b> , LRU, FIFO, LFU.</li>
          <li><b>Capacity</b> , number of entries the cache can hold.</li>
          <li><b>Cache latency</b> , time for a hit , default 1 ms.</li>
          <li><b>Miss latency</b> , time for a miss , default 20 ms.</li>
          <li><b>Warmup</b> , first N requests are not counted in metrics , but still fill the cache.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Examples</h2>
        <p className="text-sm opacity-90">Copy a trace below, set warmup 0.</p>
        <div className="rounded-xl border border-neutral-800 p-3 text-sm">
          <p className="font-semibold">Recency wins , capacity 3</p>
          <code className="block bg-neutral-900 p-2 mt-1">A B C A D A B C A D A B C A D</code>
        </div>
        <div className="rounded-xl border border-neutral-800 p-3 text-sm">
          <p className="font-semibold">Scan after hot set , capacity 3</p>
          <code className="block bg-neutral-900 p-2 mt-1">
            A B C A B C A B C A B C A B C A B C D E F G H I J K L M A B C A B C
          </code>
        </div>
        <div className="rounded-xl border border-neutral-800 p-3 text-sm">
          <p className="font-semibold">Phase shift , capacity 3</p>
          <code className="block bg-neutral-900 p-2 mt-1">
            A B C A B C A B C A B C A B C A B C D E F D E F D E F D E F D E F
          </code>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm opacity-90">
          <li>Getting same hit rate across policies , increase distinct keys or reduce capacity.</li>
          <li>Want steady state numbers , set a warmup close to capacity.</li>
          <li>Prefer JSON , use the <code>/api/simulate</code> endpoint directly.</li>
        </ul>
      </section>
      <a
          href="/"
          className="text-sm rounded-xl border border-neutral-700 px-3 py-1 hover:bg-neutral-900"
        > Back </a>
    </main>
  );
}
