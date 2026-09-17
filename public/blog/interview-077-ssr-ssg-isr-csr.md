---
slug: "interview-077-ssr-ssg-isr-csr"
title: "77. What is the difference between SSR, SSG, ISR, and CSR?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "SSR generates output for a request."
series: "interview"
questionNumber: "77"
---

## The answer

SSR generates output for a request. SSG generates reusable output ahead of requests, typically during a build. ISR regenerates cached output according to a freshness policy. CSR fetches or renders relevant content in the browser.

A route can combine strategies: a static article can contain an interactive client widget. Server versus Client Components is a related but separate distinction from when data is generated.

## Code example

Use a Next.js Pages Router route for this comparison example. Run `npm run build` followed by `npm start` to inspect production regeneration.

```tsx
// pages/catalog.tsx — Pages Router example, not app/
import type { InferGetStaticPropsType } from "next";
export async function getStaticProps() {
  return {
    props: { generatedAt: new Date().toISOString() },
    revalidate: 60,
  };
}
export default function Catalog({ generatedAt }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <main><h1>Catalog</h1><p>Generated: {generatedAt}</p></main>;
}
```

## Walk through the result

This Pages Router example demonstrates ISR. Build and start production, visit /catalog, then revisit after the interval. A request can receive stale output while regeneration happens. Removing revalidate gives the basic SSG variant; getServerSideProps is the separate Pages Router SSR API.

## Interview pitfalls

The interval is not a scheduled job that regenerates every minute without traffic. Development mode does not reproduce production caching. Personalized data must not accidentally enter a public shared cache. In App Router code, use its own data and cache APIs instead of getStaticProps.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration)

## Continue the interview series

- [Previous: 76. What does the "use server" directive do?](/blog/interview-076-use-server)
- [Next: 78. How does rendering work in the Next.js App Router?](/blog/interview-078-app-router-rendering)
- [Browse all 100 questions](/blog?series=interview)
