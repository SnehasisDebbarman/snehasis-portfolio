---
slug: "nextjs-core-web-vitals"
title: "Optimizing Next.js Core Web Vitals"
date: "June 15, 2026"
readTime: "7 min read"
category: "React"
excerpt: "Pro tips for maximizing PageSpeed score and improving LCP, FID, and CLS scores in modern Next.js applications."
---
Google's Core Web Vitals heavily influence search engine optimization (SEO) and user conversion rates. Optimizing these metrics is critical for modern Next.js websites.


### 1. Largest Contentful Paint (LCP)

LCP measures loading performance. To improve LCP, ensure that your primary above-the-fold image loads instantly:

- Use the Next.js `` component with the `priority` prop.
- Preload crucial fonts and stylesheets.
- Utilize ISR (Incremental Static Regeneration) or SSR to pre-render the initial HTML.


### 2. Cumulative Layout Shift (CLS)

CLS measures visual stability. Layout shifts degrade user experience. Fix CLS by:

- Always specifying width and height dimensions on images and media containers.
- Reserving layout slots for dynamic content, ads, or charts using skeleton shells.
- Using CSS property transformations like `transform: scale()` instead of changing layout offsets (e.g., `top` or `left`).


### 3. Interaction to Next Paint (INP)

Replacing First Input Delay (FID), INP measures overall input responsiveness. Optimize INP by yielding execution blocks, minimizing long-running synchronous JavaScript tasks, and utilizing React's `useTransition` Hook to split state updates.
