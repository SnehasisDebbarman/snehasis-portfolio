---
slug: "interview-089-revalidation"
title: "89. What is revalidation?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Revalidation updates cached information so reusable output can eventually reflect changed source data."
series: "interview"
questionNumber: "89"
---

## The answer

Revalidation updates cached information so reusable output can eventually reflect changed source data. It balances freshness against repeated work. A time interval or an explicit invalidation event can make an entry eligible for refresh.

It is not a database write, a background cron job or proof that every browser immediately displays the newest value.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/status/page.tsx
// Conventional caching model: Cache Components is not enabled.
export const revalidate = 30;
export default function Status() {
  return <main>
    <h1>Cached status page</h1>
    <p>Generated at: {new Date().toISOString()}</p>
  </main>;
}
```

## Walk through the result

Build and start production, then request /status repeatedly. The timestamp remains tied to the cached generation. After the freshness interval, a request may receive stale output while regeneration occurs; a later request sees the successfully regenerated version.

The timestamp is a diagnostic aid here, not a live clock.

## Interview pitfalls

This route option is for the configuration without Cache Components. Do not expect a static export to run server regeneration. Test failure behavior too: a failed refresh should not be confused with a successful update, and the underlying data source must actually change before new content can appear.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/guides/incremental-static-regeneration)

## Continue the interview series

- [Previous: 88. How does caching work with fetch() in Next.js?](/blog/interview-088-fetch-caching)
- [Next: 90. What is the difference between time-based and on-demand revalidation?](/blog/interview-090-time-on-demand-revalidation)
- [Browse all 100 questions](/blog?series=interview)
