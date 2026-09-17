---
slug: "interview-045-reconciliation"
title: "45. What is reconciliation?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Reconciliation is the process of matching new element output to existing UI identities so React can decide what to preserve, update or replace."
series: "interview"
questionNumber: "45"
---

## The answer

Reconciliation is the process of matching new element output to existing UI identities so React can decide what to preserve, update or replace. Element type, position and keys influence that identity.

State belongs to a component's identity in the tree. Changing a key can intentionally create a fresh instance rather than preserving the previous state.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState } from "react";
function Draft({ recipient }) {
  const [text, setText] = useState("");
  return <label>Message to {recipient}
    <input value={text} onChange={event => setText(event.target.value)} />
  </label>;
}
export default function App() {
  const [recipient, setRecipient] = useState("Mira");
  return <main>
    <button onClick={() => setRecipient(value => value === "Mira" ? "Ari" : "Mira")}>Switch recipient</button>
    <Draft key={recipient} recipient={recipient} />
  </main>;
}
```

## Walk through the result

Type a draft, then switch recipients. The key changes, so the old Draft is removed and a new one starts with empty state. Removing the key would preserve the same component position and therefore preserve its text across recipient changes.

## Interview pitfalls

Do not generate random keys during rendering. That tells React every item is new on every render and can discard focus, state and effects. Define component functions outside other component bodies so their type identity is stable.

## Sources and further reading

- [Official documentation](https://react.dev/learn/preserving-and-resetting-state)

## Continue the interview series

- [Previous: 44. What is the Virtual DOM?](/blog/interview-044-virtual-dom)
- [Next: 46. What is React Fiber?](/blog/interview-046-react-fiber)
- [Browse all 100 questions](/blog?series=interview)
