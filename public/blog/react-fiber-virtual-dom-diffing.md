---
slug: "react-fiber-virtual-dom-diffing"
title: "React Fiber, Virtual DOM, and Reconciliation"
date: "September 17, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Understand render versus commit, stable keys, and why Fiber does not make all JavaScript concurrent."
---

The browser DOM is the live document tree. React elements describe desired UI; “virtual DOM” is an informal name for that in-memory description. Reconciliation matches a new description to previous work so React can decide what to preserve and what to change.

## Render and commit

Rendering calls components to calculate UI. Committing applies changes to the host environment, such as the DOM. A render can happen without changing DOM nodes. Render logic therefore must be pure: a render attempt may be restarted or discarded.

Fiber is React's internal unit-of-work architecture. It enables prioritizing and interrupting eligible rendering work. It is not a public API, a second DOM, or a mechanism that moves arbitrary event-handler code onto another thread. Internal structures can change between versions.

## See identity with your own input

Use this complete React 18+ component. Type a different note into each field, then reverse the list. Notes should stay with their named item.

```jsx
import { useState } from "react";
const initial = [{ id: "a", name: "Asha" }, { id: "b", name: "Bina" }];
function Row({ item }) {
  const [note, setNote] = useState("");
  return <li>
    <label>{item.name}<input value={note} onChange={e => setNote(e.target.value)} /></label>
  </li>;
}
export default function App() {
  const [items, setItems] = useState(initial);
  return <>
    <button onClick={() => setItems(current => [...current].reverse())}>Reverse</button>
    <ul>{items.map(item => <Row key={item.id} item={item} />)}</ul>
  </>;
}
```

## Why keys matter

Change `key={item.id}` to an array index, then repeat the experiment. State now follows positions rather than your intended data identity. A key identifies siblings across renders; it is not a globally unique database constraint and is not passed to the child as an ordinary prop.

Random keys force remounting, losing state and focus. Stable keys help preserve identity during insertion, deletion, and reordering. Changing a key intentionally can reset a form, but should be a deliberate behavior.

## Diffing is a heuristic, not magic

React uses element types, positions, and keys to determine correspondence. Different component types at the same position generally reset their subtree. Do not describe reconciliation as finding a globally minimal set of DOM edits or guarantee that every update is linear in every practical cost. Component computation, layout, and painting still contribute to latency.

## Better performance decisions

Measure a slow interaction with React Profiler and browser Performance tools. Move state closer to where it is used, avoid unnecessary effects, and virtualize very long lists. Transitions can keep urgent updates responsive, but cannot preempt one giant synchronous function call. Use Workers for suitable CPU-heavy algorithms.

## Practice

Add a new item at the beginning of the list. Verify that existing input state stays with the correct item and that keyboard focus remains understandable. This is a practical reconciliation test, not just an interview definition.

## Sources and further reading

- [React render and commit](https://react.dev/learn/render-and-commit)
- [Preserving and resetting state](https://react.dev/learn/preserving-and-resetting-state)
- [Fiber architecture by React core contributor Andrew Clark](https://github.com/acdlite/react-fiber-architecture)
