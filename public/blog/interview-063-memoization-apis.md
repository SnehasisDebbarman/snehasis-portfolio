---
slug: "interview-063-memoization-apis"
title: "63. What is the difference between useMemo, useCallback, and React.memo?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "useMemo caches a calculated value, useCallback caches a function identity, and memo can skip a component render when props are unchanged."
series: "interview"
questionNumber: "63"
---

## The answer

useMemo caches a calculated value, useCallback caches a function identity, and memo can skip a component render when props are unchanged. They operate at different boundaries and are often useful together only when those boundaries line up.

None should be necessary for the application's correctness. Think about the specific repeated work or unstable identity before choosing an API.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { memo, useCallback, useMemo, useState } from "react";
const Summary = memo(function Summary({ data, onReset }) {
  return <button onClick={onReset}>Total: {data.total}; reset</button>;
});
export default function App() {
  const [count, setCount] = useState(1);
  const [note, setNote] = useState("");
  const data = useMemo(() => ({ total: count * 2 }), [count]);
  const reset = useCallback(() => setCount(0), []);
  return <main>
    <label>Note<input value={note} onChange={event => setNote(event.target.value)} /></label>
    <button onClick={() => setCount(value => value + 1)}>Increment</button>
    <Summary data={data} onReset={reset} />
  </main>;
}
```

## Walk through the result

Note edits preserve both Summary prop identities, allowing memo to skip its render. Count changes create new data. The example is deliberately small to show the boundaries, not evidence that memoizing multiplication is beneficial.

## Interview pitfalls

Often the simpler solution is to pass a primitive total prop and avoid useMemo entirely. Also consider moving state closer to where it is used. More memoization is not automatically better architecture, especially when a configured compiler already handles eligible cases.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react/useMemo#memoizing-a-function)

## Continue the interview series

- [Previous: 62. What does React.memo do?](/blog/interview-062-react-memo)
- [Next: 64. What is prop drilling?](/blog/interview-064-prop-drilling)
- [Browse all 100 questions](/blog?series=interview)
