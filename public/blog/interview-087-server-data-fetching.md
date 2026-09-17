---
slug: "interview-087-server-data-fetching"
title: "87. How do you fetch data in a Server Component?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Make the Server Component async and await a server-side data operation."
series: "interview"
questionNumber: "87"
---

## The answer

Make the Server Component async and await a server-side data operation. It can call an external service or a database access layer directly. There is usually no need to call your own HTTP endpoint simply to reach code already available on the server.

Check HTTP status and validate the data shape at the boundary. TypeScript annotations alone do not validate JSON received over the network.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/todo/page.tsx
export default async function TodoPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Todo request failed: ${response.status}`);
  const todo: unknown = await response.json();
  if (!todo || typeof todo !== "object" || !("title" in todo) || typeof todo.title !== "string") {
    throw new Error("Invalid todo response");
  }
  return <main><h1>Todo</h1><p>{todo.title}</p></main>;
}
```

## Walk through the result

The external request happens on the server. no-store states that this fetch should not use the persistent data cache in this configuration. The shape check narrows the unknown value before rendering its title. The public example service requires network access.

## Interview pitfalls

Avoid sequential awaits for independent data when they create an unnecessary waterfall. Authorize private reads before returning results and never pass a whole database record to the client by default. Add an error boundary for unexpected failures and an appropriate loading boundary for slow work.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/getting-started/fetching-data)

## Continue the interview series

- [Previous: 86. How does not-found.tsx work?](/blog/interview-086-not-found)
- [Next: 88. How does caching work with fetch() in Next.js?](/blog/interview-088-fetch-caching)
- [Browse all 100 questions](/blog?series=interview)
