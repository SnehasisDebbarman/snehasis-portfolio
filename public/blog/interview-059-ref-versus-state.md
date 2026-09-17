---
slug: "interview-059-ref-versus-state"
title: "59. What is the difference between useRef and useState?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "State changes request rendering; ref mutations do not."
series: "interview"
questionNumber: "59"
---

## The answer

State changes request rendering; ref mutations do not. Both persist across renders of the same component identity, but they serve different purposes. State represents information the UI should react to, while a ref holds mutable information used outside rendering.

A ref's current value can change immediately in a handler, whereas the state variable in that handler remains its render's snapshot.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useRef, useState } from "react";
export default function App() {
  const clicks = useRef(0);
  const [reported, setReported] = useState(0);
  return <main>
    <button onClick={() => {
      clicks.current += 1;
      console.log("Stored clicks:", clicks.current);
    }}>Record click</button>
    <button onClick={() => setReported(clicks.current)}>Show stored total</button>
    <p>Reported total: {reported}</p>
  </main>;
}
```

## Walk through the result

Recording clicks updates the ref and console but leaves the displayed total unchanged. The second button copies that value into state, intentionally requesting a UI update. The example keeps ref reads in handlers rather than treating the ref as reactive display data.

## Interview pitfalls

If every click should update the screen, store the count directly in state. Ref-based “state” can create stale displays that refresh only when some unrelated update happens. Refs are an escape hatch, not a general performance shortcut.

## Sources and further reading

- [Official documentation](https://react.dev/learn/referencing-values-with-refs)

## Continue the interview series

- [Previous: 58. What is the purpose of useRef?](/blog/interview-058-use-ref-purpose)
- [Next: 60. When should you use useMemo?](/blog/interview-060-use-memo)
- [Browse all 100 questions](/blog?series=interview)
