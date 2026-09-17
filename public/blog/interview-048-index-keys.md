---
slug: "interview-048-index-keys"
title: "48. Why should array indexes usually not be used as keys?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "An index describes a position, not the identity of the data occupying it."
series: "interview"
questionNumber: "48"
---

## The answer

An index describes a position, not the identity of the data occupying it. When items move or are inserted, an index key can make React preserve state for the wrong item.

Index keys can be acceptable for a truly static list with no identity-dependent state or reordering. They are risky for editable or dynamic lists.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState } from "react";
function Row({ name }) {
  const [note, setNote] = useState("");
  return <li>{name} <input aria-label={`Note for ${name}`} value={note}
    onChange={event => setNote(event.target.value)} /></li>;
}
export default function App() {
  const [names, setNames] = useState(["Mira", "Ari"]);
  return <main>
    <button onClick={() => setNames(value => [...value].reverse())}>Reverse</button>
    {/* Intentionally incorrect: replace key={index} with key={name}. */}
    <ul>{names.map((name, index) => <Row key={index} name={name} />)}</ul>
  </main>;
}
```

## Walk through the result

This is an intentional bug demonstration. Type in the first input and reverse the list. The note stays at position zero while the person's name changes. Replace the index key with name for this small unique-name dataset and repeat: state follows the person.

## Interview pitfalls

Real names may not be unique, so production data should provide a stable ID. An index key is not repaired by memoizing Row; the identity supplied to reconciliation is still wrong. Test insertion and deletion as well as sorting.

## Sources and further reading

- [Official documentation](https://react.dev/learn/rendering-lists#why-does-react-need-keys)

## Continue the interview series

- [Previous: 47. Why are keys important when rendering lists?](/blog/interview-047-list-keys)
- [Next: 49. What is the difference between props and state?](/blog/interview-049-props-state)
- [Browse all 100 questions](/blog?series=interview)
