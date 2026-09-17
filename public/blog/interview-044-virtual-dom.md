---
slug: "interview-044-virtual-dom"
title: "44. What is the Virtual DOM?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Virtual DOM is a common name for the in-memory UI descriptions React uses to determine what the host UI should look like."
series: "interview"
questionNumber: "44"
---

## The answer

Virtual DOM is a common name for the in-memory UI descriptions React uses to determine what the host UI should look like. React evaluates components, compares the new output with the previous tree, then commits appropriate DOM changes.

It is not a complete cloned browser DOM, and it does not guarantee that every React application is faster than direct DOM code. Its value is a declarative programming model and coordinated updates.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState } from "react";
export default function App() {
  const [count, setCount] = useState(0);
  return <section>
    <h1>Count: {count}</h1>
    <input aria-label="Try typing here" defaultValue="Keep this text" />
    <button onClick={() => setCount(value => value + 1)}>Increment</button>
  </section>;
}
```

## Walk through the result

Type into the input, then increment. The component executes again to describe the next UI, but the existing input remains in place and retains its browser-managed value. A component rendering again does not imply replacing its entire DOM subtree.

## Interview pitfalls

The browser still performs style calculation, layout and painting after DOM changes. React's render phase and browser rendering are different activities. Avoid saying the virtual DOM always computes the mathematically smallest possible edit sequence.

## Sources and further reading

- [Official documentation](https://react.dev/learn/render-and-commit)

## Continue the interview series

- [Previous: 43. How does JSX get converted into JavaScript?](/blog/interview-043-jsx-compilation)
- [Next: 45. What is reconciliation?](/blog/interview-045-reconciliation)
- [Browse all 100 questions](/blog?series=interview)
