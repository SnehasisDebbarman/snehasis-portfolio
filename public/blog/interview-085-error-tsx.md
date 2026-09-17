---
slug: "interview-085-error-tsx"
title: "85. How do error boundaries and error.tsx work?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "error.tsx supplies a Client Component fallback for an error boundary around a route segment's descendants."
series: "interview"
questionNumber: "85"
---

## The answer

error.tsx supplies a Client Component fallback for an error boundary around a route segment's descendants. It lets the surrounding application remain usable when rendering fails in that region.

Unexpected server errors are sanitized before reaching the client in production. A digest can help correlate the client failure with server logs without exposing sensitive details.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/reports/error.tsx
"use client";
export default function ErrorPage({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <section role="alert">
    <h2>The report could not be displayed.</h2>
    {error.digest && <p>Reference: {error.digest}</p>}
    <button onClick={() => reset()}>Try rendering again</button>
  </section>;
}
```

```tsx
// app/reports/page.tsx — separate file; intentional failure
export default function Reports() {
  throw new Error("Demonstration render failure");
}
```

## Walk through the result

The page intentionally fails so the fallback can be inspected. reset clears the boundary error state and tries rendering its children again; it cannot fix this permanently throwing example. Recent Next.js documentation also offers retry behavior that refetches content—check the API available in your installed version when designing server recovery.

## Interview pitfalls

An error file does not catch failures in the same segment's layout above its boundary. Root-layout failures need global-error.tsx, including its own html and body. Handle expected validation failures as ordinary results rather than using a crash boundary as form validation.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/file-conventions/error)

## Continue the interview series

- [Previous: 84. How do loading UI and loading.tsx work?](/blog/interview-084-loading-ui)
- [Next: 86. How does not-found.tsx work?](/blog/interview-086-not-found)
- [Browse all 100 questions](/blog?series=interview)
