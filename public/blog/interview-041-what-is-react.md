---
slug: "interview-041-what-is-react"
title: "41. What is React, and why is it used?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "React is a library for describing user interfaces with components."
series: "interview"
questionNumber: "41"
---

## The answer

React is a library for describing user interfaces with components. A component takes inputs and returns a description of what should appear. State changes trigger React to calculate the next UI and commit the necessary host updates.

It is useful when an interface has reusable pieces and changing state. React does not by itself provide every application concern, such as routing, data persistence or deployment.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState } from "react";
function Counter({ label }) {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(value => value + 1)}>
    {label}: {count}
  </button>;
}
export default function App() {
  return <main>
    <h1>Workshop attendance</h1>
    <Counter label="JavaScript" />
    <Counter label="React" />
  </main>;
}
```

## Walk through the result

The same Counter definition produces two independent stateful instances. Clicking one button changes only that instance's count. You describe the desired text from state instead of manually finding and editing a text node.

## Interview pitfalls

React is not automatically the best choice for a static document with little interaction. It also does not make expensive rendering free. Keep components pure during render and place side effects in appropriate handlers or effects.

## Sources and further reading

- [Official documentation](https://react.dev/learn)

## Continue the interview series

- [Previous: 40. How do memory leaks happen in JavaScript, and how can you prevent them?](/blog/interview-040-memory-leaks)
- [Next: 42. What is JSX?](/blog/interview-042-jsx)
- [Browse all 100 questions](/blog?series=interview)
