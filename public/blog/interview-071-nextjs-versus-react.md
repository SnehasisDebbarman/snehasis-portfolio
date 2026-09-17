---
slug: "interview-071-nextjs-versus-react"
title: "71. What is Next.js, and how is it different from React?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "React provides the component model for building UI."
series: "interview"
questionNumber: "71"
---

## The answer

React provides the component model for building UI. Next.js is a framework that combines React with routing, server rendering, data integration, build tooling and deployment conventions.

You still write React components, but the framework decides how routes are discovered and how server and client work fit together. Features such as Route Handlers and image optimization are framework capabilities, not features of React alone.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/page.tsx
import Link from "next/link";
export default function Home() {
  return <main>
    <h1>Interview notebook</h1>
    <Link href="/about">About this notebook</Link>
  </main>;
}
```

```tsx
// app/about/page.tsx — separate file
export default function About() {
  return <main><h1>About</h1><p>A place to practice frontend concepts.</p></main>;
}
```

## Walk through the result

In an existing App Router project with its root layout, these files create two URLs automatically. Link provides framework-aware navigation. A React-only app would need its own routing arrangement to provide the same behavior.

## Interview pitfalls

Next.js does not eliminate deployment costs, authorization requirements or browser limitations. Static export can suit content sites, while request-time rendering and mutations require a compatible runtime. Choose features based on the product rather than assuming every route needs server execution.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/getting-started)

## Continue the interview series

- [Previous: 70. What are Suspense, lazy loading, and code splitting in React?](/blog/interview-070-suspense-lazy-splitting)
- [Next: 72. What is the difference between the App Router and Pages Router?](/blog/interview-072-app-pages-router)
- [Browse all 100 questions](/blog?series=interview)
