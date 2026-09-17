---
slug: "interview-080-dynamic-routes"
title: "80. How do you create dynamic routes?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Wrap a folder name in square brackets to capture a URL segment: app/articles/[slug]/page.tsx matches paths such as /articles/closures."
series: "interview"
questionNumber: "80"
---

## The answer

Wrap a folder name in square brackets to capture a URL segment: app/articles/[slug]/page.tsx matches paths such as /articles/closures. Current Next.js exposes params asynchronously, so await it in a Server Component.

Dynamic URL segments are input. Validate them before selecting data, and return a deliberate not-found result for unknown records.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/articles/[slug]/page.tsx
import { notFound } from "next/navigation";
const articles = new Map([
  ["closures", { title: "Understanding closures" }],
  ["promises", { title: "Working with promises" }],
]);
export default async function Article({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.get(slug);
  if (!article) notFound();
  return <article><h1>{article.title}</h1></article>;
}
```

## Walk through the result

/articles/closures displays its title; an unknown slug takes the not-found path. The Map avoids using arbitrary URL input as a filesystem path or blindly indexing inherited object properties.

## Interview pitfalls

A catch-all segment such as [...parts] produces an array of segments. Optional catch-all syntax [[...parts]] also matches the base path. Neither a dynamic path nor an async function alone proves a page must be rendered afresh for every request.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)

## Continue the interview series

- [Previous: 79. How do you create static routes in Next.js?](/blog/interview-079-static-routes)
- [Next: 81. What is generateStaticParams()?](/blog/interview-081-generate-static-params)
- [Browse all 100 questions](/blog?series=interview)
