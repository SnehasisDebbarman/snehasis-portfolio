---
slug: "interview-052-functional-state-updates"
title: "52. Why should functional updates be used with state?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Use an updater function when the next state depends on pending previous state."
series: "interview"
questionNumber: "52"
---

## The answer

Use an updater function when the next state depends on pending previous state. React applies queued updater functions in sequence, passing each one the result of the preceding update.

A direct replacement based on a render's snapshot can repeat the same calculation several times instead of composing changes. Functional updates also reduce unnecessary closure dependencies.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState } from "react";
export default function App() {
  const [count, setCount] = useState(0);
  return <main>
    <p>{count}</p>
    <button onClick={() => {
      setCount(count + 1);
      setCount(count + 1);
      setCount(count + 1);
    }}>Snapshot +1 three times</button>
    <button onClick={() => {
      setCount(value => value + 1);
      setCount(value => value + 1);
      setCount(value => value + 1);
    }}>Updater +1 three times</button>
  </main>;
}
```

## Walk through the result

The first button increases the visible count by one because each call requests the same replacement. The second increases it by three because each updater receives the preceding pending value.

## Interview pitfalls

Updater functions must not send requests, log analytics or mutate external objects. React can invoke them more than once during development checks. A direct value is perfectly suitable when replacing state with an independent input, such as the current text field value.

## Sources and further reading

- [Official documentation](https://react.dev/learn/queueing-a-series-of-state-updates)

## Continue the interview series

- [Previous: 51. How does useState work?](/blog/interview-051-use-state)
- [Next: 53. How does React batch state updates?](/blog/interview-053-state-batching)
- [Browse all 100 questions](/blog?series=interview)
