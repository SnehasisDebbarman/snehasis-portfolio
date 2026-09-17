---
slug: "nextjs-ssr-deep-dive"
title: "Next.js Rendering: SSR, CSR, SSG and ISR"
date: "September 17, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Choose when HTML and data are produced, with runnable Pages Router examples and explicit freshness tradeoffs."
---

Rendering strategies answer two questions: when is a page generated, and where does its data come from? Choose per route. A public tutorial and an authenticated account screen rarely need the same policy.

## Compare the strategies

| Strategy | Work happens | Useful for | Main tradeoff |
| --- | --- | --- | --- |
| SSG | At build time | Documentation and stable landing pages | Rebuild to refresh |
| ISR | Cached generation with later regeneration | Public catalogs and articles | Visitors may see stale content |
| SSR | For an incoming request | Personalized or request-dependent pages | Request-time server work |
| CSR | In the browser | Interactive client views | Loading and error states are essential |

These are not mutually exclusive. A generated page can contain a client widget that fetches fresh information. Server Components and Client Components are a different axis: they describe component execution boundaries, not simply the age of the page's data.

## Runnable SSG and ISR example

In a Next.js project using the Pages Router, create `pages/catalog.jsx`. Run `npm run build` and `npm start` to observe production caching. Development mode is unsuitable for evaluating ISR behavior.

```jsx
export async function getStaticProps() {
  return {
    props: {
      generatedAt: new Date().toISOString(),
      products: [{ id: 1, name: "Keyboard" }],
    },
    revalidate: 60,
  };
}

export default function Catalog({ products, generatedAt }) {
  return (
    <main>
      <h1>Catalog</h1>
      <p>Generated at: {generatedAt}</p>
      <ul>{products.map(product => <li key={product.id}>{product.name}</li>)}</ul>
    </main>
  );
}
```

Remove `revalidate` for the basic SSG variant. With ISR, 60 seconds is a freshness interval, not a scheduled timer that rebuilds the page every minute. A request after the interval can receive the stale page while regeneration occurs. Refresh after successful regeneration to see the new timestamp.

## Runnable SSR alternative

Create `pages/request-time.jsx`. Each request gets a new timestamp. Do not place both data functions in the same page.

```jsx
export async function getServerSideProps() {
  return { props: { generatedAt: new Date().toISOString() } };
}

export default function RequestTime({ generatedAt }) {
  return <p>Rendered for this request at {generatedAt}</p>;
}
```

For real account data, authenticate on the server before reading it. Serialized props are visible to the browser, so never return secrets merely because the data function runs on the server.

## Where CSR fits

A client component can load data after mounting, as shown in the [fetch and cleanup tutorial](/blog/react-effects-cleanup). Include a loading state, HTTP error handling, and cancellation. Browser requests cannot bypass another server's CORS policy.

## App Router differences

Do not copy `getStaticProps` or `getServerSideProps` into `app/`. Use Server Components and explicit data/cache policies there. Next.js caching behavior depends on version and whether Cache Components is enabled. Follow the guide matching your configuration; do not assume every server `fetch` is cached.

## A practical decision

Use SSG for an article that changes only with a Git commit. Consider ISR for shared public data that can tolerate delay. Use request-time rendering for request-specific output. Keep immediate interactions in client components. Verify freshness with production builds and repeated requests, not by guessing from development behavior.

## Sources and further reading

- [Next.js getStaticProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)
- [Next.js getServerSideProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props)
- [Next.js ISR](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
