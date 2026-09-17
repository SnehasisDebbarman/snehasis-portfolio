---
slug: "interview-073-server-components"
title: "73. What are Server Components?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Server Components execute on the server as part of producing the React Server Component payload."
series: "interview"
questionNumber: "73"
---

## The answer

Server Components execute on the server as part of producing the React Server Component payload. They can read server-side data without sending their component implementation and server-only dependencies to the browser.

They cannot use client state or browser event handlers. A Server Component can still render interactive Client Components and pass supported serializable data to them.

## Code example

Install the server-only marker package with `npm install server-only` if it is not already present.

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/books/page.tsx
import "server-only";
const books = [
  { id: 1, title: "Understanding JavaScript" },
  { id: 2, title: "Thinking in Components" },
];
export default async function Books() {
  // A real application could query its database directly here.
  return <main>
    <h1>Books</h1>
    <ul>{books.map(book => <li key={book.id}>{book.title}</li>)}</ul>
  </main>;
}
```

## Walk through the result

The file has no use client directive, so it remains a Server Component in the App Router. The local dataset keeps this example runnable without a database. In a real implementation, a server-side data access function could replace it without making an HTTP call to your own Route Handler.

## Interview pitfalls

Server Components are not synonymous with per-request SSR: they may participate in prerendered or cached output too. Server execution does not make returned data secret. Anything rendered or passed to a client can be exposed to the user, so authorize and minimize data before returning it.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/getting-started/server-and-client-components)

## Continue the interview series

- [Previous: 72. What is the difference between the App Router and Pages Router?](/blog/interview-072-app-pages-router)
- [Next: 74. What are Client Components?](/blog/interview-074-client-components)
- [Browse all 100 questions](/blog?series=interview)
