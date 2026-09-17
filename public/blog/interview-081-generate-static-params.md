---
slug: "interview-081-generate-static-params"
title: "81. What is generateStaticParams()?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "generateStaticParams lists parameter combinations that Next.js can use to prerender a dynamic route."
series: "interview"
questionNumber: "81"
---

## The answer

generateStaticParams lists parameter combinations that Next.js can use to prerender a dynamic route. It connects known content IDs or slugs to build-time route generation.

It returns parameter objects, not rendered pages. The page still uses its params to select and render the corresponding content.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/lessons/[slug]/page.tsx
import { notFound } from "next/navigation";
const lessons = new Map([
  ["scope", "Lexical scope"],
  ["state", "React state"],
]);
export const dynamicParams = false;
export function generateStaticParams() {
  return [...lessons.keys()].map(slug => ({ slug }));
}
export default async function Lesson({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = lessons.get(slug);
  if (!title) notFound();
  return <h1>{title}</h1>;
}
```

## Walk through the result

The build can generate /lessons/scope and /lessons/state. With dynamicParams false in this configuration, unlisted paths are not generated on demand. This works well for a small fixed documentation collection.

## Interview pitfalls

This example uses the model without Cache Components; route-segment options differ when it is enabled. generateStaticParams is not rerun during ordinary ISR regeneration. New content may require a rebuild or an explicitly supported on-demand route strategy.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

## Continue the interview series

- [Previous: 80. How do you create dynamic routes?](/blog/interview-080-dynamic-routes)
- [Next: 82. What are layouts in Next.js?](/blog/interview-082-layouts)
- [Browse all 100 questions](/blog?series=interview)
