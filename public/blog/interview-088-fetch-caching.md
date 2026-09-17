---
slug: "interview-088-fetch-caching"
title: "88. How does caching work with fetch() in Next.js?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Next.js extends server fetch with cache-related options."
series: "interview"
questionNumber: "88"
---

## The answer

Next.js extends server fetch with cache-related options. In the conventional model without Cache Components, force-cache opts into the persistent data cache, no-store avoids it, and next.revalidate supplies a freshness interval.

Do not assume server fetch is always cached. Request memoization, persistent data caching, route output caching and client router caching are different layers with different lifetimes.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/catalog/page.tsx
export default async function Catalog() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    next: { revalidate: 300, tags: ["featured-post"] },
  });
  if (!response.ok) throw new Error("Unable to load featured post");
  const post: unknown = await response.json();
  if (!post || typeof post !== "object" || !("title" in post) || typeof post.title !== "string") {
    throw new Error("Invalid post response");
  }
  return <article><h1>{post.title}</h1></article>;
}
```

## Walk through the result

The fetch declares a five-minute freshness policy and a tag that can identify the cached data for invalidation. Inspect behavior in a production build; development hot-reload behavior is not a reliable cache benchmark.

## Interview pitfalls

Do not combine contradictory options such as no-store and a positive revalidate interval. With Cache Components enabled, follow its use cache and cacheLife model instead of copying route-segment cache options blindly. Never put user-specific data in a shared cache without an explicit isolation strategy.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/functions/fetch)

## Continue the interview series

- [Previous: 87. How do you fetch data in a Server Component?](/blog/interview-087-server-data-fetching)
- [Next: 89. What is revalidation?](/blog/interview-089-revalidation)
- [Browse all 100 questions](/blog?series=interview)
