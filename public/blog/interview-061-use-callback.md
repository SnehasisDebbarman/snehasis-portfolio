---
slug: "interview-061-use-callback"
title: "61. When should you use useCallback?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "useCallback caches a function identity while dependencies remain unchanged."
series: "interview"
questionNumber: "61"
---

## The answer

useCallback caches a function identity while dependencies remain unchanged. It is useful when a memoized child receives a callback or when another hook needs a stable function dependency.

It does not cache the result of calling that function, and it does not automatically make the function's work faster.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { memo, useCallback, useState } from "react";
const AddButton = memo(function AddButton({ onAdd }) {
  return <button onClick={onAdd}>Add item</button>;
});
export default function App() {
  const [items, setItems] = useState([]);
  const [note, setNote] = useState("");
  const add = useCallback(() => {
    setItems(current => [...current, `Item ${current.length + 1}`]);
  }, []);
  return <main>
    <label>Note<input value={note} onChange={event => setNote(event.target.value)} /></label>
    <AddButton onAdd={add} />
    <p>{items.length} items</p>
  </main>;
}
```

## Walk through the result

The functional state update avoids reading items from the callback's closure, so add needs no reactive dependencies. Note edits can pass the same callback identity to the memoized child.

## Interview pitfalls

Do not omit real dependencies to force a stable identity; that preserves stale behavior. A stable callback rarely helps a child that rerenders normally anyway. Start with straightforward code and use the Profiler to identify a worthwhile optimization boundary.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react/useCallback)

## Continue the interview series

- [Previous: 60. When should you use useMemo?](/blog/interview-060-use-memo)
- [Next: 62. What does React.memo do?](/blog/interview-062-react-memo)
- [Browse all 100 questions](/blog?series=interview)
