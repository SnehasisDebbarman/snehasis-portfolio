---
slug: "interview-078-app-router-rendering"
title: "78. How does rendering work in the Next.js App Router?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "The App Router composes Server and Client Components by route segments."
series: "interview"
questionNumber: "78"
---

## The answer

The App Router composes Server and Client Components by route segments. The server produces a React Server Component payload and can provide initial HTML. The browser uses the payload and JavaScript to reconcile the tree and hydrate interactive components.

Suspense boundaries allow supported slow sections to stream without making every part of the page wait. Caching configuration determines which work can be reused or prerendered.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/page.tsx
import { Suspense } from "react";
import { connection } from "next/server";
async function Latest() {
  await connection(); // Deliberately request-time for this demonstration.
  await new Promise(resolve => setTimeout(resolve, 800));
  return <p>Latest report is ready.</p>;
}
export default function Page() {
  return <main>
    <h1>Dashboard</h1>
    <Suspense fallback={<p>Loading latest report…</p>}>
      <Latest />
    </Suspense>
  </main>;
}
```

## Walk through the result

The heading can be delivered while Latest waits. The artificial delay makes the boundary observable; remove it from a real application. connection explicitly waits for a request so the example is not simply completed at build time.

## Interview pitfalls

Streaming does not turn synchronous CPU work into nonblocking work. Browser or proxy buffering can also affect when small streamed chunks appear. Cache Components changes how static, cached and dynamic regions compose, so identify the project's configuration before predicting route behavior.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/getting-started/fetching-data#streaming)

## Continue the interview series

- [Previous: 77. What is the difference between SSR, SSG, ISR, and CSR?](/blog/interview-077-ssr-ssg-isr-csr)
- [Next: 79. How do you create static routes in Next.js?](/blog/interview-079-static-routes)
- [Browse all 100 questions](/blog?series=interview)
