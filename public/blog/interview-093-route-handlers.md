---
slug: "interview-093-route-handlers"
title: "93. What are Route Handlers?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Route Handlers define HTTP endpoints in app using route.ts or route.js."
series: "interview"
questionNumber: "93"
---

## The answer

Route Handlers define HTTP endpoints in app using route.ts or route.js. Export a function named for an HTTP method, such as GET or POST, and return a standard Response.

They are useful for webhooks, external API clients and browser requests. They do not render React UI or participate in layouts like page components do.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```ts
// app/api/greeting/route.ts
export async function GET(request: Request) {
  const name = new URL(request.url).searchParams.get("name") ?? "reader";
  if (name.trim().length === 0 || name.length > 80) {
    return Response.json({ error: "Name must contain 1–80 characters" }, { status: 400 });
  }
  return Response.json({ message: `Hello, ${name.trim()}` }, {
    headers: { "Cache-Control": "no-store" },
  });
}
```

## Walk through the result

Open /api/greeting?name=Mira to receive JSON. An empty or overlong name receives a 400 response. The endpoint explicitly avoids response caching and handles input before producing its result.

## Interview pitfalls

Do not create a page and route handler for the same route segment URL. A handler is a public endpoint unless you enforce authentication. Add content-type checks, validation, authorization and appropriate status codes for mutations; do not assume browser UI restrictions protect the endpoint.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/getting-started/route-handlers)

## Continue the interview series

- [Previous: 92. What is the use cache directive?](/blog/interview-092-use-cache)
- [Next: 94. How do you build CRUD APIs in Next.js?](/blog/interview-094-crud-apis)
- [Browse all 100 questions](/blog?series=interview)
