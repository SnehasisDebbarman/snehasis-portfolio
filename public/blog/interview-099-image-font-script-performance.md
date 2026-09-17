---
slug: "interview-099-image-font-script-performance"
title: "99. How do next/image, next/font, and next/script improve performance?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "next/image helps deliver appropriately sized images and reserve layout space."
series: "interview"
questionNumber: "99"
---

## The answer

next/image helps deliver appropriately sized images and reserve layout space. next/font integrates font loading and self-hosting into the build. next/script provides loading strategies for third-party scripts so their timing can match their importance.

These tools provide controls, not automatic perfect performance. Verify the actual network requests, layout shifts and main-thread work.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
const inter = Inter({ subsets: ["latin"], display: "swap" });
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body className={inter.className}>{children}</body></html>;
}
```

```tsx
// app/page.tsx — separate file
import Image from "next/image";
import Script from "next/script";
export default function Page() {
  return <main style={{ maxWidth: 800 }}>
    <h1>Learning outdoors</h1>
    <Image src="/landscape.jpg" alt="A path through a green valley"
      width={1600} height={900} sizes="(max-width: 800px) 100vw, 800px"
      style={{ width: "100%", height: "auto" }} />
    <Script id="demo-helper" strategy="lazyOnload">
      {`console.log("Nonessential helper loaded");`}
    </Script>
  </main>;
}
```

## Walk through the result

Save a 1600 by 900 image at public/landscape.jpg. The dimensions establish aspect ratio, sizes describes display width, and the helper waits until an idle loading opportunity. Google font setup needs build-time network access; use next/font/local for locally supplied font files.

## Interview pitfalls

Do not lazy-load a critical LCP image without evaluating its priority. Next.js 16 provides preload in place of deprecated priority for relevant image cases. Image transforms can incur hosting cost. Third-party scripts can still hurt INP regardless of their loader, and strict CSP requires a compatible script policy.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/components/image)
- [Additional official reference](https://nextjs.org/docs/app/api-reference/components/font)
- [Additional official reference](https://nextjs.org/docs/app/api-reference/components/script)

## Continue the interview series

- [Previous: 98. What is the difference between server-side and client-side environment variables?](/blog/interview-098-environment-variables)
- [Next: 100. How do you optimize, test, and deploy a Next.js application?](/blog/interview-100-optimize-test-deploy)
- [Browse all 100 questions](/blog?series=interview)
