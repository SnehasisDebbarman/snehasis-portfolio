---
slug: "react-error-boundary-suspense-lazy"
title: "Error Boundaries, Suspense, and Lazy Code Splitting"
date: "September 17, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Build separate loading and failure states for a lazily imported feature, with copyable multi-file examples."
---

Loading and failure are different states. Suspense handles supported work that is not ready, such as a lazy component import. An Error Boundary handles errors thrown while React renders its descendants. Use both when a feature can be slow to load and can fail.

## Set up two files

These files belong in a React 18+ app with a bundler. Dynamic import creates a split point; check the production Network panel to verify the separate chunk is fetched when the panel opens.

```jsx
// App.jsx
import { Component, lazy, Suspense, useState } from "react";
const Reports = lazy(() => import("./Reports"));

class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error, info) {
    console.error("Reports failed", error, info.componentStack);
  }
  render() {
    if (this.state.failed) return <p role="alert">Reports unavailable. Close and reopen the panel to reset its UI.</p>;
    return this.props.children;
  }
}
export default function App() {
  const [open, setOpen] = useState(false);
  return <main>
    <button onClick={() => setOpen(value => !value)}>{open ? "Close" : "Open"} reports</button>
    {open && <ErrorBoundary>
      <Suspense fallback={<p role="status">Loading reports…</p>}>
        <Reports />
      </Suspense>
    </ErrorBoundary>}
  </main>;
}
```

```jsx
// Reports.jsx
import { useState } from "react";
export default function Reports() {
  const [crash, setCrash] = useState(false);
  if (crash) throw new Error("Intentional render failure");
  return <section>
    <h2>Monthly report</h2>
    <p>Revenue: 120 units</p>
    <button onClick={() => setCrash(true)}>Test boundary</button>
  </section>;
}
```

## Expected behavior

Open the reports panel on a throttled connection to see loading feedback. After it appears, Test boundary requests a render that throws. The boundary displays its error message while the outer page remains usable. Development tooling may also show an error overlay for this intentional failure.

Closing and reopening resets the boundary and the panel state in this example. It does not guarantee recovery from a failed network import: React caches the lazy loader promise, so a broken or stale deployment chunk may require reloading the page after the underlying problem is fixed.

## Boundaries have limits

A boundary does not generally catch errors in click handlers, timer callbacks, server rendering, or the boundary itself. Catch event-handler request failures with `try/catch` and render their state. Suspense also does not automatically detect arbitrary fetching inside `useEffect`.

Declare `lazy` outside the component so it retains its identity. The imported module needs a default component export for this simple pattern. Add boundaries around meaningful areas rather than every tiny element.

## Choose useful split points

Route pages, rich editors, charts, and rarely opened dialogs are good candidates. Excessive splitting of tiny utilities adds request overhead. Measure initial JavaScript and subsequent navigation before and after the change; splitting does not automatically make every interaction faster.

## Sources and further reading

- [React lazy](https://react.dev/reference/react/lazy)
- [React Suspense](https://react.dev/reference/react/Suspense)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
