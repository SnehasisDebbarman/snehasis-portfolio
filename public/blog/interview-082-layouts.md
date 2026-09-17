---
slug: "interview-082-layouts"
title: "82. What are layouts in Next.js?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "A layout wraps a route segment and its descendants with shared UI."
series: "interview"
questionNumber: "82"
---

## The answer

A layout wraps a route segment and its descendants with shared UI. Nested layouts compose section shells, and the root layout supplies html and body. Shared layouts preserve their identity across navigation within the relevant subtree.

This makes them suitable for persistent navigation, sidebars and providers, while pages supply the route-specific content.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/layout.tsx
import type { ReactNode } from "react";
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
```

```tsx
// app/dashboard/layout.tsx — separate file
import Link from "next/link";
import type { ReactNode } from "react";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <main>
    <nav><Link href="/dashboard">Overview</Link></nav>
    <section>{children}</section>
  </main>;
}
```

```tsx
// app/dashboard/page.tsx — separate file
export default function Dashboard() { return <h1>Overview</h1>; }
```

## Walk through the result

Visiting /dashboard combines the root document, the dashboard shell and the page. A child route under dashboard can reuse the same shell without duplicating its markup.

## Interview pitfalls

Do not rely solely on a layout check to protect data: authorize where sensitive data is read and mutations occur. Layout persistence also means client-side navigation should not be assumed to rerun every layout calculation. Place request- or navigation-sensitive behavior at the appropriate boundary.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/file-conventions/layout)

## Continue the interview series

- [Previous: 81. What is generateStaticParams()?](/blog/interview-081-generate-static-params)
- [Next: 83. What is the difference between layout.tsx and template.tsx?](/blog/interview-083-layout-template)
- [Browse all 100 questions](/blog?series=interview)
