// src/lib/parseTrace.ts
export function parseTrace(text: string): string[] {
  // Accepts formats like: "A B A C A D" or line-separated
  // Splits on any whitespace, filters empty
  return text
    .split(/\s+/g)
    .map(s => s.trim())
    .filter(Boolean);
}

