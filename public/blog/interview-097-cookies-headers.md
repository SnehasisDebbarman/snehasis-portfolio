---
slug: "interview-097-cookies-headers"
title: "97. How do cookies and headers work in Server Components?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Current Next.js exposes cookies and headers as asynchronous request APIs."
series: "interview"
questionNumber: "97"
---

## The answer

Current Next.js exposes cookies and headers as asynchronous request APIs. Await them to read the incoming request. Their values depend on the request, so they influence rendering and caching decisions.

A Server Component can read cookies but cannot set response cookies while rendering. Mutations belong in a Server Function or Route Handler before the response has started streaming.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/preferences/page.tsx
import { cookies, headers } from "next/headers";
export default async function Preferences() {
  const cookieStore = await cookies();
  const requestHeaders = await headers();
  const rawTheme = cookieStore.get("theme")?.value;
  const theme = rawTheme === "dark" ? "dark" : "light";
  const language = requestHeaders.get("accept-language")?.split(",")[0]?.slice(0, 40) ?? "unspecified";
  return <main>
    <h1>Preferences</h1>
    <p>Theme: {theme}</p>
    <p>Requested language: {language}</p>
  </main>;
}
```

## Walk through the result

The page reads a theme cookie and a request language hint. It validates the theme against allowed values instead of using an arbitrary cookie string as configuration. React renders the language as text rather than interpreting it as HTML.

## Interview pitfalls

Request headers and cookies are not inherently trustworthy identity evidence. A signed session requires verification, and proxy-forwarded headers require a trusted deployment configuration. Do not place per-user request values inside a shared ordinary use cache scope; keep dynamic request reads outside that cache boundary.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/functions/cookies)
- [Additional official reference](https://nextjs.org/docs/app/api-reference/functions/headers)

## Continue the interview series

- [Previous: 96. How do you protect authenticated routes?](/blog/interview-096-authenticated-routes)
- [Next: 98. What is the difference between server-side and client-side environment variables?](/blog/interview-098-environment-variables)
- [Browse all 100 questions](/blog?series=interview)
