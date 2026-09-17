---
slug: "interview-046-react-fiber"
title: "46. What is React Fiber?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Fiber is React's internal architecture for representing component work and scheduling reconciliation."
series: "interview"
questionNumber: "46"
---

## The answer

Fiber is React's internal architecture for representing component work and scheduling reconciliation. It supports organizing rendering into units that React can prioritize, pause or abandon when appropriate. It is an implementation architecture, not a public hook or a separate library you install.

A useful interview answer connects it to responsiveness without claiming React can interrupt any arbitrary JavaScript loop.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState, useTransition } from "react";
const words = Array.from({ length: 1500 }, (_, index) => `Topic ${index}`);
export default function App() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();
  return <main>
    <label>Filter<input value={input} onChange={event => {
      const value = event.target.value;
      setInput(value);
      startTransition(() => setQuery(value));
    }} /></label>
    <p aria-live="polite">{pending ? "Updating results…" : "Results"}</p>
    <ul>{words.filter(word => word.includes(query)).map(word => <li key={word}>{word}</li>)}</ul>
  </main>;
}
```

## Walk through the result

The controlled input update stays urgent, while the result update is marked as a transition. Under sufficient work, React can prioritize newer urgent input over transition rendering. On a fast machine the pending indicator may be brief.

## Interview pitfalls

This demonstrates a public scheduling API, not Fiber internals directly. The filtering calculation itself is synchronous and cannot be preempted halfway through this callback. Large lists also need strategies such as virtualization. Internal Fiber fields and algorithms can change between React versions.

## Sources and further reading

- [Official documentation](https://github.com/acdlite/react-fiber-architecture)
- [Additional official reference](https://react.dev/reference/react/useTransition)

## Continue the interview series

- [Previous: 45. What is reconciliation?](/blog/interview-045-reconciliation)
- [Next: 47. Why are keys important when rendering lists?](/blog/interview-047-list-keys)
- [Browse all 100 questions](/blog?series=interview)
