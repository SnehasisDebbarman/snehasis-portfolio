---
slug: "interview-058-use-ref-purpose"
title: "58. What is the purpose of useRef?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "useRef returns a stable object whose current property persists between renders."
series: "interview"
questionNumber: "58"
---

## The answer

useRef returns a stable object whose current property persists between renders. It can hold a DOM node or another mutable value that should not itself trigger rendering.

Refs are useful for imperative integration: focusing an input, storing a timer handle or retaining a library instance. State remains the right place for values that determine visible UI.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useRef } from "react";
export default function App() {
  const input = useRef(null);
  return <main>
    <label>Search<input ref={input} type="search" /></label>
    <button onClick={() => {
      input.current?.focus();
      input.current?.select();
    }}>Focus search</button>
  </main>;
}
```

## Walk through the result

React assigns the input node to current when it commits the element and clears it when detached. The click handler uses the node without searching the whole document. Changing the ref does not request a render.

## Interview pitfalls

Avoid reading or writing refs during rendering except for predictable initialization patterns. Imperatively deleting React-managed DOM nodes can conflict with reconciliation. If several components need coordinated visible data, a shared ref is not a replacement for a state subscription.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react/useRef)

## Continue the interview series

- [Previous: 57. What is the difference between useEffect and useLayoutEffect?](/blog/interview-057-effect-layout-effect)
- [Next: 59. What is the difference between useRef and useState?](/blog/interview-059-ref-versus-state)
- [Browse all 100 questions](/blog?series=interview)
