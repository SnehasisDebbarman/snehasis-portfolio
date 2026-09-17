---
slug: "nextjs-image-optimization"
title: "Next.js Image Optimization: Dimensions, Sizes and Loading"
date: "September 17, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Ship appropriately sized images without layout shifts, and understand the hosting cost of image transforms."
---

A large source image should not become a large download for every visitor. Image delivery involves layout space, responsive candidates, encoding and loading priority. Fixing just the file extension does not solve all four.

## A complete local image example

In a Next.js project, save an actual 1600 by 900 image as `public/landscape.jpg`, then create this page. Adjust the dimensions to match your file. The component works in the App Router.

```jsx
// app/page.jsx
import Image from "next/image";

export default function Page() {
  return <main style={{ maxWidth: 960, margin: "auto", padding: 16 }}>
    <h1>A mountain walk</h1>
    <Image
      src="/landscape.jpg"
      alt="A walking trail crossing a green mountain valley"
      width={1600}
      height={900}
      sizes="(max-width: 992px) calc(100vw - 32px), 960px"
      style={{ width: "100%", height: "auto" }}
    />
  </main>;
}
```

The intrinsic dimensions reserve the correct aspect ratio. CSS controls the displayed width. `sizes` describes the intended display width so the browser can choose an appropriate candidate from `srcset`. Inspect the Network panel at different viewport widths rather than assuming the smallest file is always chosen; device pixel ratio also matters.

## Remote images need a narrow allowlist

If using remote sources, configure only the expected host and path. This example allows a fictional CDN; replace it with your real asset origin and restart the dev server.

```js
// next.config.mjs
export default {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "images.example.com",
      pathname: "/portfolio/**",
      search: "",
    }],
  },
};
```

Do not allow every hostname just to silence a configuration error. Keep image URLs under application control. Authenticated image endpoints may need a different delivery arrangement because the default optimizer does not forward arbitrary authentication headers.

## Loading priority and accessibility

Give informative images meaningful alt text and decorative images `alt=""`. Below-the-fold images should normally remain lazy. For an identified above-the-fold LCP image, evaluate eager loading or the relevant priority mechanism. In Next.js 16, `preload` replaces the deprecated `priority` prop; avoid applying it to every image or combining conflicting loading hints.

## Cost and verification

Default Next.js image optimization can perform server-side transformations and consume hosting resources. It is not a promise of zero server cost. For a static export, use preoptimized files with `unoptimized`, or an appropriate external image loader. Compare bytes, visual quality, LCP and layout stability before accepting a change.

Try deliberately supplying an inaccurate `sizes` value, record the selected resource in DevTools, then restore the correct value. This makes the relationship between CSS layout and download size visible.

## Sources and further reading

- [Next.js Image reference](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Optimize LCP](https://web.dev/articles/optimize-lcp)
