---
slug: "interview-053-state-batching"
title: "53. How does React batch state updates?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Batching lets React process multiple state updates together instead of committing a separate UI update for each setter."
series: "interview"
questionNumber: "53"
---

## The answer

Batching lets React process multiple state updates together instead of committing a separate UI update for each setter. With React 18's modern root, automatic batching also covers many updates in promises and timers.

Batching reduces unnecessary work and helps avoid intermediate UI states. It does not change the fact that each handler sees the state snapshot from its render.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState } from "react";
export default function App() {
  const [count, setCount] = useState(0);
  const [enabled, setEnabled] = useState(false);
  function updateLater() {
    setTimeout(() => {
      setCount(value => value + 1);
      setEnabled(value => !value);
    }, 20);
  }
  return <button onClick={updateLater}>
    Count: {count}; enabled: {String(enabled)}
  </button>;
}
```

## Walk through the result

In a React 18+ app mounted with createRoot, the two updates inside the timer can be processed together. Use the React Profiler to examine commits rather than treating console calls during render as a reliable commit counter.

## Interview pitfalls

React keeps separate intentional user events logically separate; batching is not an excuse to delay disabling a submit button indefinitely. flushSync exists for unusual integration requirements but can hurt performance and should not be a routine way to “fix” snapshot semantics.

## Sources and further reading

- [Official documentation](https://react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching)

## Continue the interview series

- [Previous: 52. Why should functional updates be used with state?](/blog/interview-052-functional-state-updates)
- [Next: 54. How does useEffect work?](/blog/interview-054-use-effect)
- [Browse all 100 questions](/blog?series=interview)
