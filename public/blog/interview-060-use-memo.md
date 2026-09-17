---
slug: "interview-060-use-memo"
title: "60. When should you use useMemo?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Use useMemo to cache a calculation between renders when its dependencies are unchanged and repeating the calculation has a measurable cost, or when stable result identity helps another optimization."
series: "interview"
questionNumber: "60"
---

## The answer

Use useMemo to cache a calculation between renders when its dependencies are unchanged and repeating the calculation has a measurable cost, or when stable result identity helps another optimization.

It is a performance hint, not a correctness mechanism. The component must still behave correctly if React recalculates the value.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useMemo, useState } from "react";
const records = Array.from({ length: 1000 }, (_, index) => `Lesson ${index}`);
export default function App() {
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  const matches = useMemo(() => {
    console.log("Filtering");
    return records.filter(record => record.toLowerCase().includes(query.toLowerCase()));
  }, [query]);
  return <main style={{ color: dark ? "white" : "black", background: dark ? "#222" : "white" }}>
    <label>Query<input value={query} onChange={event => setQuery(event.target.value)} /></label>
    <button onClick={() => setDark(value => !value)}>Toggle theme</button>
    <p>{matches.length} matches</p>
  </main>;
}
```

## Walk through the result

Query changes recompute matches. Theme changes can reuse the cached result because records is a stable module constant and query is unchanged. The console illustrates calculation reuse; use profiling to establish whether this optimization is worthwhile.

## Interview pitfalls

An object constructed on every render is a changed dependency even if its contents look the same. The calculation must be pure. React Compiler-enabled applications may need less manual memoization, but that depends on actual compiler configuration.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react/useMemo)

## Continue the interview series

- [Previous: 59. What is the difference between useRef and useState?](/blog/interview-059-ref-versus-state)
- [Next: 61. When should you use useCallback?](/blog/interview-061-use-callback)
- [Browse all 100 questions](/blog?series=interview)
