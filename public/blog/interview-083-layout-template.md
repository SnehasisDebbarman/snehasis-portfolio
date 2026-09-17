---
slug: "interview-083-layout-template"
title: "83. What is the difference between layout.tsx and template.tsx?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Layouts preserve shared UI identity across navigation where the layout remains active."
series: "interview"
questionNumber: "83"
---

## The answer

Layouts preserve shared UI identity across navigation where the layout remains active. Templates create a fresh instance when the relevant route identity changes, so descendant state can reset and effects can reconnect.

Use a layout for persistent UI. Use a template only when resetting a subtree on navigation is the desired behavior, not as a default wrapper.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/journal/template.tsx
import type { ReactNode } from "react";
import Draft from "./draft";
export default function Template({ children }: { children: ReactNode }) {
  return <section><Draft />{children}</section>;
}
```

```tsx
// app/journal/draft.tsx — separate file
"use client";
import { useState } from "react";
export default function Draft() {
  const [text, setText] = useState("");
  return <label>Temporary note<input value={text} onChange={event => setText(event.target.value)} /></label>;
}
```

```tsx
// app/journal/[entry]/page.tsx — separate file
import Link from "next/link";
export default function Page() {
  return <nav><Link href="/journal/one">One</Link> <Link href="/journal/two">Two</Link></nav>;
}
```

## Walk through the result

Open /journal/one, type a note and navigate to /journal/two using Link. The template's fresh subtree resets the draft. Moving the wrapper into layout.tsx instead demonstrates the persistence difference.

## Interview pitfalls

Template remounting follows route-segment identity, not every arbitrary UI update; search-parameter changes do not imply the same reset behavior. Resetting a subtree can discard unsaved input, so use this convention intentionally.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/api-reference/file-conventions/template)

## Continue the interview series

- [Previous: 82. What are layouts in Next.js?](/blog/interview-082-layouts)
- [Next: 84. How do loading UI and loading.tsx work?](/blog/interview-084-loading-ui)
- [Browse all 100 questions](/blog?series=interview)
