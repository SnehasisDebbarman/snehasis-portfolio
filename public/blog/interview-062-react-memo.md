---
slug: "interview-062-react-memo"
title: "62. What does React.memo do?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "memo wraps a component so React can skip rendering it when its props compare equal."
series: "interview"
questionNumber: "62"
---

## The answer

memo wraps a component so React can skip rendering it when its props compare equal. By default, React compares each prop with Object.is. The optimization concerns parent-driven renders; the component's own state or consumed context can still cause updates.

A small component may cost less to render than the complexity introduced by optimizing it. Measure before applying memo widely.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { memo, useState } from "react";
const Greeting = memo(function Greeting({ name }) {
  console.log("Greeting rendered");
  return <h2>Hello, {name}</h2>;
});
export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Mira");
  return <main>
    <button onClick={() => setCount(value => value + 1)}>Unrelated count: {count}</button>
    <label>Name<input value={name} onChange={event => setName(event.target.value)} /></label>
    <Greeting name={name} />
  </main>;
}
```

## Walk through the result

Changing count leaves Greeting's name prop unchanged, so its render can be skipped. Editing the name changes that prop and requires new output. Development tools may introduce additional renders, so inspect commits rather than depending on an exact log count.

## Interview pitfalls

New object, array or function props can defeat the default comparison. A custom comparator must account for every relevant prop, including callbacks whose closures affect behavior. An incorrect comparator can freeze stale UI and be worse than no optimization.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react/memo)

## Continue the interview series

- [Previous: 61. When should you use useCallback?](/blog/interview-061-use-callback)
- [Next: 63. What is the difference between useMemo, useCallback, and React.memo?](/blog/interview-063-memoization-apis)
- [Browse all 100 questions](/blog?series=interview)
