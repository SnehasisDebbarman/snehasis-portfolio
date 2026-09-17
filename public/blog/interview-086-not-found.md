---
slug: "interview-086-not-found"
title: "86. How does not-found.tsx work?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "not-found.tsx defines UI for a missing resource in a route segment."
series: "interview"
questionNumber: "86"
---

## The answer

not-found.tsx defines UI for a missing resource in a route segment. Calling notFound from next/navigation stops rendering that path and selects the nearest relevant not-found boundary.

A missing record is different from an unexpected server failure. Use not-found handling when the requested resource does not exist rather than throwing a generic operational error.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/products/[id]/page.tsx
import { notFound } from "next/navigation";
export default async function Product({ params }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id !== "keyboard") notFound();
  return <h1>Mechanical keyboard</h1>;
}
```

```tsx
// app/products/[id]/not-found.tsx — separate file
import Link from "next/link";
export default function MissingProduct() {
  return <main><h1>Product not found</h1><Link href="/">Return home</Link></main>;
}
```

## Walk through the result

/products/keyboard renders a product; /products/unknown renders the missing-product UI. notFound is a control-flow operation, so the page does not continue to render a product after calling it.

## Interview pitfalls

Do not catch and swallow framework control-flow exceptions in a broad try/catch. For streamed responses, the HTTP status may already be committed; not-found UI does not always imply a transport-level 404 after streaming begins. Verify status behavior when SEO or API clients depend on it.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)

## Continue the interview series

- [Previous: 85. How do error boundaries and error.tsx work?](/blog/interview-085-error-tsx)
- [Next: 87. How do you fetch data in a Server Component?](/blog/interview-087-server-data-fetching)
- [Browse all 100 questions](/blog?series=interview)
