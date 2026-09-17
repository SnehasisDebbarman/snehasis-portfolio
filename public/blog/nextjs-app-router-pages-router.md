---
slug: "nextjs-app-router-pages-router"
title: "Next.js App Router vs Pages Router: Files and Boundaries"
date: "September 17, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Understand layouts, routes, loading UI and client boundaries with a small App Router example."
---

The router determines how files become URLs and how route UI is composed. Both routers can serve production applications. For a new Next.js project, learn the App Router conventions; for an existing Pages project, migrate deliberately instead of rewriting working routes without a reason.

## File conventions

| Need | App Router | Pages Router |
| --- | --- | --- |
| Home route | `app/page.jsx` | `pages/index.jsx` |
| Shared shell | `app/layout.jsx` | `pages/_app.jsx` |
| Dynamic article | `app/blog/[slug]/page.jsx` | `pages/blog/[slug].jsx` |
| Server endpoint | `app/api/example/route.js` | `pages/api/example.js` |
| Loading UI | `loading.jsx` and Suspense | Component-managed loading |
| Navigation hook | `next/navigation` | `next/router` |

## Build a small App Router page

Use a Next.js App Router project. Create these three files. The layout stays on the server; the counter declares the browser interaction boundary.

```jsx
// app/layout.jsx
export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
```

```jsx
// app/counter.jsx
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(value => value + 1)}>Count: {count}</button>;
}
```

```jsx
// app/page.jsx
import Link from "next/link";
import Counter from "./counter";

export default function Home() {
  return <main>
    <h1>Learning Next.js</h1>
    <Counter />
    <Link href="/blog/hello">Read an article</Link>
  </main>;
}
```

Clicking the button updates local state. The page can render server-side while its interactive child hydrates in the browser. `"use client"` does not mean that the initial HTML can only be produced in the browser.

## Add a dynamic route

In current Next.js, `params` is asynchronous. This example targets Next.js 15 and later.

```jsx
// app/blog/[slug]/page.jsx
export default async function Article({ params }) {
  const { slug } = await params;
  return <article><h1>Article: {slug}</h1></article>;
}
```

Open `/blog/hello`; the heading shows `hello`. In a real content loader, validate the slug and return a not-found response for unknown content instead of treating arbitrary route input as a filesystem path.

## Boundaries and common mistakes

Keep database credentials and privileged reads in server-only modules. Client props must use supported serializable values. Put state, handlers and browser APIs in Client Components, but access browser-only globals in an event or effect when necessary rather than during server prerendering.

The routers can coexist during migration, but do not define competing routes for the same URL. Move one route at a time, test navigation and error handling, and keep its metadata and redirects intact. See [rendering strategies](/blog/nextjs-ssr-deep-dive) before choosing a cache policy.

## Sources and further reading

- [Next.js layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [App Router migration](https://nextjs.org/docs/app/guides/migrating/app-router-migration)
