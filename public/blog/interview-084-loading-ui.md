---
slug: "interview-084-loading-ui"
title: "84. How do loading UI and loading.tsx work?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "loading.tsx defines an immediate fallback for a route segment while its page and descendants perform supported asynchronous rendering work."
series: "interview"
questionNumber: "84"
---

## The answer

loading.tsx defines an immediate fallback for a route segment while its page and descendants perform supported asynchronous rendering work. Next.js places it behind a Suspense boundary, allowing surrounding layouts to remain available.

Use a loading state that preserves context and avoids large layout changes. A skeleton should represent what is loading rather than simply filling the screen with animation.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/reports/loading.tsx
export default function Loading() {
  return <p role="status">Preparing your report…</p>;
}
```

```tsx
// app/reports/page.tsx — separate file
import { connection } from "next/server";
export default async function Reports() {
  await connection();
  await new Promise(resolve => setTimeout(resolve, 1000));
  return <main><h1>Report ready</h1><p>12 tasks completed</p></main>;
}
```

## Walk through the result

The artificial request-time delay makes the segment fallback observable. Navigate to /reports from another route to inspect the transition, then remove the delay from real code. A cached or prefetched result may make the fallback very brief.

## Interview pitfalls

loading.tsx is not a catch-all for fetch calls started in client effects. Those need explicit state or a Suspense-aware data integration. If a shared layout itself waits before reaching this boundary, consider moving slow work into a child boundary.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/file-conventions/loading)

## Continue the interview series

- [Previous: 83. What is the difference between layout.tsx and template.tsx?](/blog/interview-083-layout-template)
- [Next: 85. How do error boundaries and error.tsx work?](/blog/interview-085-error-tsx)
- [Browse all 100 questions](/blog?series=interview)
