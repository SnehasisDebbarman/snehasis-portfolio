---
slug: "interview-049-props-state"
title: "49. What is the difference between props and state?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Props are inputs supplied by a parent."
series: "interview"
questionNumber: "49"
---

## The answer

Props are inputs supplied by a parent. State is memory managed by a component through React. Both are snapshots for a particular render and should be treated as read-only values during that render.

The component that owns a piece of state decides how it changes. Children can receive a callback that requests a change rather than mutating the parent's data.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState } from "react";
function Quantity({ value, onIncrement }) {
  return <button onClick={onIncrement}>Quantity: {value}</button>;
}
export default function App() {
  const [quantity, setQuantity] = useState(1);
  return <main>
    <Quantity value={quantity} onIncrement={() => setQuantity(value => value + 1)} />
    <p>Total items: {quantity}</p>
  </main>;
}
```

## Walk through the result

App owns quantity as state. Quantity receives value and onIncrement as props. Clicking the button asks the parent to update, after which both displayed values receive the new snapshot. There is one source of truth.

## Interview pitfalls

Copying a prop into state often creates two values that drift apart. Do so only when you intentionally need a local draft or initial value, and define how resets work. Mutating a prop object changes shared data without a proper state transition.

## Sources and further reading

- [Official documentation](https://react.dev/learn/passing-props-to-a-component)

## Continue the interview series

- [Previous: 48. Why should array indexes usually not be used as keys?](/blog/interview-048-index-keys)
- [Next: 50. What is the difference between controlled and uncontrolled components?](/blog/interview-050-controlled-uncontrolled)
- [Browse all 100 questions](/blog?series=interview)
