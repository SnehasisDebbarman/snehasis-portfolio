---
slug: "interview-074-client-components"
title: "74. What are Client Components?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Client Components provide browser interactivity such as state, event handlers and effects."
series: "interview"
questionNumber: "74"
---

## The answer

Client Components provide browser interactivity such as state, event handlers and effects. A use client boundary tells the framework which component code belongs in the client module graph.

On an initial page load, Next.js can still prerender their HTML on the server, then hydrate them in the browser. “Client” does not mean “never runs while preparing server HTML.”

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/like-button.tsx
"use client";
import { useState } from "react";
export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(value => value + 1)}>Likes: {likes}</button>;
}
```

```tsx
// app/page.tsx — separate file
import LikeButton from "./like-button";
export default function Page() {
  return <main><h1>My article</h1><LikeButton /></main>;
}
```

## Walk through the result

The page remains a Server Component while the small button owns interaction. This keeps the client boundary close to the feature that needs it instead of making the entire page a client module.

## Interview pitfalls

Access window, localStorage or document in an effect or browser event when necessary, not unconditionally during render. Do not import server-only data modules into a Client Component. Keep initial markup consistent so hydration can attach behavior correctly.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/getting-started/server-and-client-components#when-to-use-server-and-client-components)

## Continue the interview series

- [Previous: 73. What are Server Components?](/blog/interview-073-server-components)
- [Next: 75. What does the "use client" directive do?](/blog/interview-075-use-client)
- [Browse all 100 questions](/blog?series=interview)
