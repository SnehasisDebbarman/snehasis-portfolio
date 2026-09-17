---
slug: "interview-079-static-routes"
title: "79. How do you create static routes in Next.js?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "A static route path uses fixed folder names, such as app/about/page.tsx for /about."
series: "interview"
questionNumber: "79"
---

## The answer

A static route path uses fixed folder names, such as app/about/page.tsx for /about. That describes the URL shape, not necessarily its rendering strategy. A fixed route can still read request-dependent data and render dynamically.

A page becomes publicly reachable through a page file. Other files can be colocated in the directory without automatically becoming routes.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/about/page.tsx
import Link from "next/link";
export const metadata = {
  title: "About the interview notebook",
  description: "Practical frontend interview preparation",
};
export default function About() {
  return <main>
    <h1>About the notebook</h1>
    <p>Learn one concept, run its example, then explain the result.</p>
    <Link href="/">Back home</Link>
  </main>;
}
```

## Walk through the result

Open /about in a project with its root layout. The URL has no parameter segment. Because the example uses only fixed content, it is also eligible for static generation under the normal configuration.

## Interview pitfalls

Do not confuse “static route” with “static export.” Exporting the whole application requires all used features to support that deployment model. Likewise, adding cookies or an uncached request can change rendering behavior without changing the route's folder name.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/getting-started/layouts-and-pages)

## Continue the interview series

- [Previous: 78. How does rendering work in the Next.js App Router?](/blog/interview-078-app-router-rendering)
- [Next: 80. How do you create dynamic routes?](/blog/interview-080-dynamic-routes)
- [Browse all 100 questions](/blog?series=interview)
