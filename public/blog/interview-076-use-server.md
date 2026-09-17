---
slug: "interview-076-use-server"
title: "76. What does the \"use server\" directive do?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "use server marks async functions as Server Functions that can be invoked through framework-managed calls."
series: "interview"
questionNumber: "76"
---

## The answer

use server marks async functions as Server Functions that can be invoked through framework-managed calls. A file-level directive applies to its exported functions; an inline directive can mark a function inside a Server Component.

It does not mean “make this component a Server Component.” App Router components are server-side by default unless a client boundary changes the module graph.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/actions.ts
"use server";
export async function normalizeName(formData: FormData): Promise<void> {
  const raw = formData.get("name");
  if (typeof raw !== "string" || raw.trim().length < 1 || raw.length > 80) {
    throw new Error("Name must contain 1–80 characters");
  }
  // Demonstration only: no persistence or privileged operation.
  console.log("Validated name length:", raw.trim().length);
}
```

```tsx
// app/page.tsx — separate file
import { normalizeName } from "./actions";
export default function Page() {
  return <form action={normalizeName}>
    <label>Name<input name="name" required maxLength={80} /></label>
    <button type="submit">Validate on server</button>
  </form>;
}
```

## Walk through the result

Submitting the form invokes server-side validation. The demonstration logs only length and does not save a profile. In a real mutation, authenticate the caller and check permission for the affected record before changing data.

## Interview pitfalls

Treat Server Functions as remotely invocable endpoints. Client validation and hidden form fields are not authorization. Return expected validation errors in a suitable form state for production UX, and never return secrets merely because the function executes on the server.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/directives/use-server)

## Continue the interview series

- [Previous: 75. What does the "use client" directive do?](/blog/interview-075-use-client)
- [Next: 77. What is the difference between SSR, SSG, ISR, and CSR?](/blog/interview-077-ssr-ssg-isr-csr)
- [Browse all 100 questions](/blog?series=interview)
