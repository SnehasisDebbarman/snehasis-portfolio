---
slug: "interview-091-revalidate-path-tag"
title: "91. What are revalidatePath() and revalidateTag()?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "revalidatePath targets cached output associated with a route path."
series: "interview"
questionNumber: "91"
---

## The answer

revalidatePath targets cached output associated with a route path. revalidateTag targets cached data bearing a tag, potentially used by multiple routes. They express different invalidation scopes and are not interchangeable names for the same operation.

For current APIs, revalidateTag with the max profile uses stale-while-revalidate behavior. updateTag is a separate Server Action API for immediate expiry and read-your-own-writes use cases.

## Code example

Install the server-only marker package with `npm install server-only` if it is not already present.

Save this server-only helper and call it from your existing authenticated mutation flow. Tag the underlying product fetches with `products`. It has no effect until invoked in a supported request context.

```ts
// lib/invalidate-catalog.ts
import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";
export function invalidateCatalog() {
  revalidatePath("/catalog");
  revalidateTag("products", "max");
}
```

## Walk through the result

Call this helper from an authenticated Route Handler or Server Action after a successful catalog mutation. The path call addresses /catalog, while the tag call also affects other consumers of products-tagged data, such as a homepage recommendation section.

The helper is intentionally not a public Server Action: it has no use server directive and does not create an unauthenticated mutation endpoint. It is a small integration example, not a standalone editor.

## Interview pitfalls

Invalidate only after persistence succeeds. Revalidation cannot repair a failed database write. A layout path invalidation and a page path invalidation have different scopes, and dynamic patterns require the documented type argument. Avoid invalidating the whole application for every small edit.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
- [Additional official reference](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- [Additional official reference](https://nextjs.org/docs/app/api-reference/functions/updateTag)

## Continue the interview series

- [Previous: 90. What is the difference between time-based and on-demand revalidation?](/blog/interview-090-time-on-demand-revalidation)
- [Next: 92. What is the use cache directive?](/blog/interview-092-use-cache)
- [Browse all 100 questions](/blog?series=interview)
