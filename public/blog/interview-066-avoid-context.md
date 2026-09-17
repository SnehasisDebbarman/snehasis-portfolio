---
slug: "interview-066-avoid-context"
title: "66. When should Context be avoided?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Avoid Context for state that belongs to one small subtree, or for a rapidly changing broad object consumed by many unrelated components."
series: "interview"
questionNumber: "66"
---

## The answer

Avoid Context for state that belongs to one small subtree, or for a rapidly changing broad object consumed by many unrelated components. Every consumer of a changed context value can update even if it reads only one field.

Start with local state and explicit props. If shared data has distinct update patterns, separate contexts or use a store with suitable subscriptions rather than exposing one enormous object.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { createContext, useContext, useState } from "react";
const ThemeContext = createContext("light");
function SearchBox() {
  const [query, setQuery] = useState("");
  return <label>Search<input value={query} onChange={event => setQuery(event.target.value)} /></label>;
}
function Heading() {
  const theme = useContext(ThemeContext);
  return <h1>Catalog ({theme})</h1>;
}
export default function App() {
  return <ThemeContext.Provider value="dark">
    <Heading /><SearchBox />
  </ThemeContext.Provider>;
}
```

## Walk through the result

The query stays local because no other component needs each keystroke. The stable theme remains shared. This avoids making unrelated context consumers participate in every input update.

## Interview pitfalls

Wrapping a context consumer in memo does not block context updates. Memoizing the provider object helps only when its constituent values are unchanged; it does not solve genuinely frequent updates. Do not treat these tradeoffs as a rule that Context is always slow.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions)

## Continue the interview series

- [Previous: 65. How does the Context API work?](/blog/interview-065-context-api)
- [Next: 67. What are custom hooks?](/blog/interview-067-custom-hooks)
- [Browse all 100 questions](/blog?series=interview)
