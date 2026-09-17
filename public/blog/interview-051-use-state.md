---
slug: "interview-051-use-state"
title: "51. How does useState work?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "useState associates a state value and an update queue with a component instance."
series: "interview"
questionNumber: "51"
---

## The answer

useState associates a state value and an update queue with a component instance. The setter requests an update; it does not mutate the variable captured by the currently running render.

The initial value is used when that state is created. Passing an initializer function delays its calculation until initialization, rather than recomputing an expensive expression on every render.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState } from "react";
export default function App() {
  const [count, setCount] = useState(() => 0);
  function increment() {
    setCount(count + 1);
    console.log("This handler's snapshot:", count);
  }
  return <button onClick={increment}>Count: {count}</button>;
}
```

## Walk through the result

The first click logs zero even though the next rendered button displays one. The handler closes over the previous render's value. React applies the queued update when producing the next render.

This is why immediately reading a state variable after calling its setter does not provide a synchronous “new state” read.

## Interview pitfalls

Call hooks unconditionally at the top level of a component or custom hook. Do not mutate an object stored in state and pass the same object back. Initializers and updater functions must be pure; development Strict Mode may call them extra times to expose accidental effects.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react/useState)

## Continue the interview series

- [Previous: 50. What is the difference between controlled and uncontrolled components?](/blog/interview-050-controlled-uncontrolled)
- [Next: 52. Why should functional updates be used with state?](/blog/interview-052-functional-state-updates)
- [Browse all 100 questions](/blog?series=interview)
