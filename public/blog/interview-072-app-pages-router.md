---
slug: "interview-072-app-pages-router"
title: "72. What is the difference between the App Router and Pages Router?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "The Pages Router maps files in pages to routes and uses APIs such as getStaticProps and getServerSideProps."
series: "interview"
questionNumber: "72"
---

## The answer

The Pages Router maps files in pages to routes and uses APIs such as getStaticProps and getServerSideProps. The App Router uses app directories, nested layouts, Server Components and special files for loading and errors.

They are different routing models within Next.js. Existing Pages applications remain understandable on their own terms; do not mix their data-fetching APIs into App Router pages.

## Code example

Choose one of the two alternatives in an appropriately initialized Next.js project. Each snippet is a separate file and targets the same URL.

```tsx
// App Router alternative: app/help/page.tsx
export default function Help() {
  return <h1>Help center</h1>;
}
```

```tsx
// Pages Router alternative: pages/help.tsx
// Use this instead of the App Router route for the same URL.
export default function Help() {
  return <h1>Help center</h1>;
}
```

## Walk through the result

Either alternative creates /help. In app, a root layout supplies the document shell and nested layouts can wrap sections. In pages, _app is the conventional shared application wrapper, and _document customizes the document structure.

For navigation hooks, App Router code uses next/navigation while Pages Router code uses next/router.

## Interview pitfalls

These snippets are alternatives, not files to create simultaneously for the same URL. During gradual migration, both directories can coexist for different routes. Audit routing, metadata, caching and error behavior when moving a page rather than only renaming the file.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/guides/migrating/app-router-migration)

## Continue the interview series

- [Previous: 71. What is Next.js, and how is it different from React?](/blog/interview-071-nextjs-versus-react)
- [Next: 73. What are Server Components?](/blog/interview-073-server-components)
- [Browse all 100 questions](/blog?series=interview)
