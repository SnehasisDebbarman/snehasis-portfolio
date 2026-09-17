---
slug: "interview-067-custom-hooks"
title: "67. What are custom hooks?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "A custom hook is a function that composes React hooks to expose reusable stateful behavior."
series: "interview"
questionNumber: "67"
---

## The answer

A custom hook is a function that composes React hooks to expose reusable stateful behavior. Its name begins with use so tooling and readers recognize the hook rules.

It shares an implementation, not automatically one state instance. Every call participates in the state and lifecycle of the component that calls it.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState } from "react";
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  function toggle() { setValue(current => !current); }
  return [value, toggle];
}
export default function App() {
  const [details, toggleDetails] = useToggle();
  const [help, toggleHelp] = useToggle();
  return <main>
    <button onClick={toggleDetails} aria-expanded={details}>Details</button>
    {details && <p>Order details</p>}
    <button onClick={toggleHelp} aria-expanded={help}>Help</button>
    {help && <p>Contact support</p>}
  </main>;
}
```

## Walk through the result

The two toggles use the same logic but hold independent state. The hook returns a small interface that reflects the behavior needed by callers rather than exposing unrelated implementation details.

## Interview pitfalls

A function should not be called a hook merely because it is a helper. Ordinary pure calculations can remain ordinary functions. Do not hide missing effect dependencies inside a generic “run once” hook; a reusable hook must preserve correct synchronization semantics.

## Sources and further reading

- [Official documentation](https://react.dev/learn/reusing-logic-with-custom-hooks)

## Continue the interview series

- [Previous: 66. When should Context be avoided?](/blog/interview-066-avoid-context)
- [Next: 68. How do you share logic between React components?](/blog/interview-068-sharing-react-logic)
- [Browse all 100 questions](/blog?series=interview)
