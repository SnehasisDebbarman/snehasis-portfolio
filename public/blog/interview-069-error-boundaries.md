---
slug: "interview-069-error-boundaries"
title: "69. What are error boundaries?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "An error boundary displays fallback UI when a descendant fails during rendering or related React lifecycle work."
series: "interview"
questionNumber: "69"
---

## The answer

An error boundary displays fallback UI when a descendant fails during rendering or related React lifecycle work. It limits the affected part of the interface and can report the error.

In ordinary React, a class implements the boundary lifecycle methods, or an established boundary library provides a wrapper. try/catch around JSX creation is not equivalent.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { Component, useState } from "react";
class Boundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error, info) {
    console.error("Render failed", error, info.componentStack);
  }
  render() {
    return this.state.failed ? <p role="alert">This panel could not be displayed.</p> : this.props.children;
  }
}
function Panel() {
  const [crash, setCrash] = useState(false);
  if (crash) throw new Error("Demonstration failure");
  return <button onClick={() => setCrash(true)}>Trigger render error</button>;
}
export default function App() {
  return <main><h1>Dashboard</h1><Boundary><Panel /></Boundary></main>;
}
```

## Walk through the result

The button schedules state that makes the next render throw. The boundary replaces only the panel, leaving the heading available. A development error overlay may also appear; dismiss it to inspect the fallback.

## Interview pitfalls

Boundaries do not generally catch errors in event handlers, ordinary timer callbacks, server rendering or the boundary's own render. Handle asynchronous operations explicitly. Recovery must fix or reset the failing state; repeatedly remounting a permanently broken component is not a repair.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

## Continue the interview series

- [Previous: 68. How do you share logic between React components?](/blog/interview-068-sharing-react-logic)
- [Next: 70. What are Suspense, lazy loading, and code splitting in React?](/blog/interview-070-suspense-lazy-splitting)
- [Browse all 100 questions](/blog?series=interview)
