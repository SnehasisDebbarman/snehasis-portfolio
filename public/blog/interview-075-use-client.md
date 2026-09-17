---
slug: "interview-075-use-client"
title: "75. What does the \"use client\" directive do?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "The directive marks a module as an entry point into the client component graph."
series: "interview"
questionNumber: "75"
---

## The answer

The directive marks a module as an entry point into the client component graph. Its imports become part of that client dependency graph, so placing the boundary too high can send unnecessary JavaScript to the browser.

It belongs before imports. You need it at the boundary, not in every file already imported exclusively through that boundary.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/disclosure.tsx
"use client";
import { useState, type ReactNode } from "react";
export default function Disclosure({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <section>
    <button aria-expanded={open} onClick={() => setOpen(value => !value)}>Details</button>
    {open && children}
  </section>;
}
```

```tsx
// app/page.tsx — separate file
import Disclosure from "./disclosure";
export default function Page() {
  return <Disclosure><p>This content is composed by the server page.</p></Disclosure>;
}
```

## Walk through the result

The server composes content and passes it as a child into the interactive disclosure. This supported composition pattern does not require the client module to import a Server Component directly.

## Interview pitfalls

Ordinary function props cannot cross the server-to-client boundary as arbitrary executable closures. Supported Server Function references are a separate mechanism. A use client file is not a place for database credentials, and marking a module client-side does not bypass CORS.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/directives/use-client)

## Continue the interview series

- [Previous: 74. What are Client Components?](/blog/interview-074-client-components)
- [Next: 76. What does the "use server" directive do?](/blog/interview-076-use-server)
- [Browse all 100 questions](/blog?series=interview)
