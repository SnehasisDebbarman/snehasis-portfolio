---
slug: "interview-092-use-cache"
title: "92. What is the use cache directive?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "use cache marks eligible functions, components or files for caching in Next.js Cache Components."
series: "interview"
questionNumber: "92"
---

## The answer

use cache marks eligible functions, components or files for caching in Next.js Cache Components. Cache keys incorporate relevant arguments and captured inputs, while cacheLife and cacheTag can express lifetime and invalidation policy.

This is a Next.js directive, not the same API as React cache. Enable the required configuration before using it.

## Code example

Use Next.js 16 with Cache Components explicitly enabled as shown. Save the config and page as separate files; this article intentionally differs from the conventional caching examples.

```tsx
// next.config.ts
import type { NextConfig } from "next";
const config: NextConfig = { cacheComponents: true };
export default config;
```

```tsx
// app/page.tsx — separate file
import { cacheLife, cacheTag } from "next/cache";
async function Featured() {
  "use cache";
  cacheLife("hours");
  cacheTag("featured-lessons");
  return <ul><li>Closures</li><li>React state</li></ul>;
}
export default function Page() {
  return <main><h1>Featured lessons</h1><Featured /></main>;
}
```

## Walk through the result

The component declares a cacheable region with an hours profile and a tag. The fixed list keeps the setup runnable; a real implementation could read public content inside this region. Restart the server after changing configuration.

## Interview pitfalls

Do not directly read request-bound cookies or headers inside an ordinary use cache scope. Read request data outside and design carefully which explicit inputs are safe to cache. Cache Components changes other route caching conventions, so do not mix examples from incompatible models without adapting them.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/directives/use-cache)

## Continue the interview series

- [Previous: 91. What are revalidatePath() and revalidateTag()?](/blog/interview-091-revalidate-path-tag)
- [Next: 93. What are Route Handlers?](/blog/interview-093-route-handlers)
- [Browse all 100 questions](/blog?series=interview)
