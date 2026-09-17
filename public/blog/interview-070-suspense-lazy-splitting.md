---
slug: "interview-070-suspense-lazy-splitting"
title: "70. What are Suspense, lazy loading, and code splitting in React?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Code splitting divides a bundle into separately loadable chunks."
series: "interview"
questionNumber: "70"
---

## The answer

Code splitting divides a bundle into separately loadable chunks. lazy defers loading a component module until it is needed, and Suspense supplies fallback UI while supported work suspends.

Suspense is a coordination boundary, not a generic detector for every asynchronous operation. A fetch started inside useEffect does not automatically trigger its fallback.

## Code example

In a React 18+ browser project, save the two sections as `App.jsx` and `Report.jsx`. Do not paste both default exports into one file.

```jsx
// App.jsx
import { lazy, Suspense, useState } from "react";
const Report = lazy(() => import("./Report.jsx"));
export default function App() {
  const [visible, setVisible] = useState(false);
  return <main>
    <button onClick={() => setVisible(true)}>Open report</button>
    {visible && <Suspense fallback={<p>Loading report…</p>}><Report /></Suspense>}
  </main>;
}
```

```jsx
// Report.jsx — save as a separate file
export default function Report() {
  return <section><h2>Report</h2><p>42 completed lessons</p></section>;
}
```

## Walk through the result

Build and open the app, then inspect the Network panel while opening the report. With a compatible bundler, the dynamic import creates a separate chunk. The fallback may be too brief to notice on a fast connection, so use network throttling during inspection.

## Interview pitfalls

Declare lazy components outside rendering to preserve identity. The imported module must provide a suitable default component export. Place an error boundary around the feature to handle a rejected chunk load; Suspense handles waiting, not the error recovery policy.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react/lazy)

## Continue the interview series

- [Previous: 69. What are error boundaries?](/blog/interview-069-error-boundaries)
- [Next: 71. What is Next.js, and how is it different from React?](/blog/interview-071-nextjs-versus-react)
- [Browse all 100 questions](/blog?series=interview)
