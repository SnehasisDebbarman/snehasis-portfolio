---
slug: "react-effects-cleanup"
title: "React Effects: Cleanup, Dependencies, and Aborted Requests"
date: "September 17, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Build a data-loading component that survives unmounts, changing IDs, and Strict Mode."
---

An effect connects a committed component to something outside React. Treat each setup as owning a resource and its cleanup as releasing that resource. A request, event listener, timer, or subscription should have a clear lifetime.

## Complete example: switch between records

Use this as `App.jsx` in a React 18+ project. It uses a public demo API; HTTP and network failures are shown in the UI. The keyed child gives each selected record an independent component lifetime.

```jsx
import { useEffect, useState } from "react";

function Todo({ id }) {
  const [state, setState] = useState({ loading: true, data: null, error: "" });
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    async function load() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (active) setState({ loading: false, data, error: "" });
      } catch (error) {
        if (active && error.name !== "AbortError") {
          setState({ loading: false, data: null, error: error.message });
        }
      }
    }
    load();
    return () => { active = false; controller.abort(); };
  }, [id]);
  if (state.loading) return <p role="status">Loading…</p>;
  if (state.error) return <p role="alert">{state.error}</p>;
  return <h2>{state.data.title}</h2>;
}

export default function App() {
  const [id, setId] = useState(1);
  return <main>
    <button onClick={() => setId(value => value === 1 ? 2 : 1)}>Switch record</button>
    <Todo key={id} id={id} />
  </main>;
}
```

## Walk through the lifetime

On mount, the component starts one request. Switching the ID unmounts the keyed child, marks its result inactive, and aborts its request. A fresh child displays Loading. The ignore flag prevents obsolete completions from updating state even if an underlying operation cannot be stopped.

The effect callback itself is not `async`; React expects it to return a cleanup function, not a promise. The nested asynchronous function owns the try/catch.

## Dependencies and stale closures

The dependency list describes the reactive values read by the effect. Omitting `id` would keep a request associated with old data if the component were reused without the key. An object constructed on every render is a different dependency each time; move unnecessary construction inside the effect or depend on the primitive values it needs.

## Strict Mode is a useful test

Development Strict Mode can perform an extra setup/cleanup cycle. This exposes missing cleanup; it is not a reason to remove Strict Mode or add a global “already ran” flag. A correct request component tolerates starting, cancelling, and starting again.

## When a different solution is better

For production route data, prefer your framework's data-loading facilities or a query cache when you need deduplication, retries, prefetching, and cached navigation. Effects are useful for understanding lifetimes, but a hand-built fetch effect does not supply those features automatically.

## Sources and further reading

- [React useEffect](https://react.dev/reference/react/useEffect)
- [React synchronizing with effects](https://react.dev/learn/synchronizing-with-effects)
