---
slug: "interview-095-middleware-proxy"
title: "95. What is Next.js Middleware, and when should it be used?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Middleware is the older name for request interception before route handling."
series: "interview"
questionNumber: "95"
---

## The answer

Middleware is the older name for request interception before route handling. In Next.js 16, the file convention is named Proxy: proxy.ts with an exported proxy function. It can redirect, rewrite and adjust headers for matching requests.

Use it for lightweight routing decisions. It is not the only place to enforce authorization and should not become a slow general-purpose application controller.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// proxy.ts — beside app/, or inside src/ when app is inside src/
import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const destination = request.nextUrl.clone();
  destination.pathname = "/guides";
  return NextResponse.redirect(destination);
}
export const config = {
  matcher: "/old-guides",
};
```

```tsx
// app/guides/page.tsx — separate file
export default function Guides() { return <h1>Guides</h1>; }
```

## Walk through the result

Visiting /old-guides redirects to /guides while preserving the URL's other components. The matcher keeps unrelated routes out of the interception path. For a simple fixed redirect like this, next.config redirects may be an even simpler production choice; the example exposes the Proxy API.

## Interview pitfalls

Older versions use middleware.ts and a middleware export, so follow the installed version's convention. A cookie's mere presence does not prove a valid session. Recheck authorization near protected data and in mutation endpoints even when Proxy performs an early redirect.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)

## Continue the interview series

- [Previous: 94. How do you build CRUD APIs in Next.js?](/blog/interview-094-crud-apis)
- [Next: 96. How do you protect authenticated routes?](/blog/interview-096-authenticated-routes)
- [Browse all 100 questions](/blog?series=interview)
