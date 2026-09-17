---
slug: "interview-047-list-keys"
title: "47. Why are keys important when rendering lists?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Keys give sibling elements stable identities across insertions, removals and reordering."
series: "interview"
questionNumber: "47"
---

## The answer

Keys give sibling elements stable identities across insertions, removals and reordering. They help React associate existing component state and DOM with the correct data item.

Choose a stable identifier from the data. A key must be unique among siblings, not across the entire application, and React does not pass it to the component as an ordinary prop.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState } from "react";
function Row({ item }) {
  const [note, setNote] = useState("");
  return <li>{item.name} <input aria-label={`Note for ${item.name}`} value={note}
    onChange={event => setNote(event.target.value)} /></li>;
}
export default function App() {
  const [items, setItems] = useState([{ id: "a", name: "Mira" }, { id: "b", name: "Ari" }]);
  return <main>
    <button onClick={() => setItems(value => [...value].reverse())}>Reverse</button>
    <ul>{items.map(item => <Row key={item.id} item={item} />)}</ul>
  </main>;
}
```

## Walk through the result

Write a note for Mira and reverse the list. The note moves with Mira because the key identifies the same Row even at a different array position. The new array also avoids mutating the current state array.

## Interview pitfalls

Put the key on the element directly returned from map, not only on a nested element inside Row. If the component needs its identifier, pass it explicitly. Random values and timestamps generated during render are unstable identities.

## Sources and further reading

- [Official documentation](https://react.dev/learn/rendering-lists)

## Continue the interview series

- [Previous: 46. What is React Fiber?](/blog/interview-046-react-fiber)
- [Next: 48. Why should array indexes usually not be used as keys?](/blog/interview-048-index-keys)
- [Browse all 100 questions](/blog?series=interview)
