---
slug: "interview-068-sharing-react-logic"
title: "68. How do you share logic between React components?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Choose the smallest mechanism that matches what is shared."
series: "interview"
questionNumber: "68"
---

## The answer

Choose the smallest mechanism that matches what is shared. Use a utility for pure computation, a custom hook for lifecycle or stateful behavior, and component composition for reusable UI. Lift state to a common owner when components must share the same changing value.

Sharing code and sharing state are different decisions.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState } from "react";
function useCounter() {
  const [count, setCount] = useState(0);
  return { count, increment: () => setCount(value => value + 1) };
}
function CounterButton({ counter, label }) {
  return <button onClick={counter.increment}>{label}: {counter.count}</button>;
}
export default function App() {
  const shared = useCounter();
  const independent = useCounter();
  return <main>
    <CounterButton counter={shared} label="Shared A" />
    <CounterButton counter={shared} label="Shared B" />
    <CounterButton counter={independent} label="Independent" />
  </main>;
}
```

## Walk through the result

The first two buttons receive one owner's counter and therefore change together. The third uses another hook call and stays independent. The custom hook removes repeated update logic while the parent decides state ownership.

## Interview pitfalls

Calling the same custom hook in distant components does not synchronize them. If they need shared state, use a common owner, Context or an appropriate external store. Avoid higher-order wrappers or render-prop layers when a small hook and explicit composition are sufficient.

## Sources and further reading

- [Official documentation](https://react.dev/learn/sharing-state-between-components)

## Continue the interview series

- [Previous: 67. What are custom hooks?](/blog/interview-067-custom-hooks)
- [Next: 69. What are error boundaries?](/blog/interview-069-error-boundaries)
- [Browse all 100 questions](/blog?series=interview)
