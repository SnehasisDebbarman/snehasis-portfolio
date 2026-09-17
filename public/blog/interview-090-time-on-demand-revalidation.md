---
slug: "interview-090-time-on-demand-revalidation"
title: "90. What is the difference between time-based and on-demand revalidation?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Time-based revalidation allows refresh after a configured freshness interval."
series: "interview"
questionNumber: "90"
---

## The answer

Time-based revalidation allows refresh after a configured freshness interval. On-demand revalidation is triggered by an event such as a successful edit or a CMS webhook.

Use time-based policies when bounded staleness is acceptable and update notifications are unavailable. Use on-demand policies when the application knows something changed. The triggering endpoint must be authenticated.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```ts
// app/api/revalidate/route.ts
import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
export async function POST(request: Request) {
  const secret = process.env.REVALIDATION_SECRET;
  if (!secret) return Response.json({ error: "Not configured" }, { status: 503 });
  const supplied = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidateTag("featured-post", "max");
  return Response.json({ revalidationRequested: true });
}
```

## Walk through the result

Configure a strong server-only REVALIDATION_SECRET and call this endpoint from a trusted publisher using a Bearer header. Pair it with a fetch tagged featured-post, as in question 88. The max profile marks data stale for stale-while-revalidate behavior; the response confirms the request, not completed regeneration.

## Interview pitfalls

Do not put the secret in a URL or NEXT_PUBLIC variable. For a provider webhook, prefer its signed-payload verification scheme. Limit which tags the endpoint can invalidate rather than accepting arbitrary user-supplied cache identifiers.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

## Continue the interview series

- [Previous: 89. What is revalidation?](/blog/interview-089-revalidation)
- [Next: 91. What are revalidatePath() and revalidateTag()?](/blog/interview-091-revalidate-path-tag)
- [Browse all 100 questions](/blog?series=interview)
