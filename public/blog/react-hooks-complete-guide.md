---
slug: "react-hooks-complete-guide"
title: "React Hooks: A Practical Map of the Built-in APIs"
date: "September 17, 2026"
readTime: "4 min read"
category: "React"
excerpt: "Choose the right hook for state, effects, refs, performance, external stores, and React 19 actions."
---

Hooks are functions for using React capabilities from function components and custom hooks. Choose them by the problem they solve. Most components need only a few; using every hook is not a measure of component quality.

## Version and setup

The basic examples below run in a React 18+ application with JSX tooling. React code cannot run directly in this site's plain JavaScript Worker compiler. Later APIs are marked **React 19+** or **React 19.2+**. Check your installed React version before copying them. The portfolio itself does not need an upgrade to publish examples about newer releases.

## State, context, and refs

| Hook | Use it for | Watch out for |
| --- | --- | --- |
| useState | Local values that affect rendering | Use updater functions when deriving from previous state |
| useReducer | Related updates expressed as actions | Keep the reducer pure |
| useContext | Read the nearest provider's value | A changed value can re-render consumers |
| useRef | A DOM node or mutable non-rendering value | Ref writes do not request a render |
| useImperativeHandle | A small imperative API exposed to a parent | Prefer props when possible |
| useId | IDs connecting labels and descriptions | It is not a list-key generator |

## A complete state-and-ref component

Save this as `App.jsx` in an existing React project. Click Add twice: the count becomes two. Click Focus to move the keyboard cursor into the input.

```jsx
import { useId, useRef, useState } from "react";

export default function App() {
  const id = useId();
  const input = useRef(null);
  const [count, setCount] = useState(0);
  return <main>
    <label htmlFor={id}>Search</label>
    <input id={id} ref={input} />
    <button onClick={() => input.current?.focus()}>Focus</button>
    <button onClick={() => setCount(value => value + 1)}>Add: {count}</button>
  </main>;
}
```

## Effects and integration

| Hook | Purpose | Boundary |
| --- | --- | --- |
| useEffect | Synchronize with a subscription, timer, or request | Return cleanup; declare dependencies |
| useLayoutEffect | Measure or adjust layout before paint | It blocks painting |
| useInsertionEffect | CSS-in-JS library style insertion | Usually not application code |
| useSyncExternalStore | Subscribe to a store outside React | Snapshots must be stable when unchanged |
| useDebugValue | Label a custom hook in DevTools | No visible UI output |
| useEffectEvent (19.2+) | Read current values in effect-specific event logic | Not a shortcut for hiding dependencies |

Read the [effects and cancellation guide](/blog/react-effects-cleanup) for a complete request example and the [advanced hooks guide](/blog/react-advanced-hooks) for external-store and imperative examples.

## Performance hooks

`useMemo` caches a calculation result and `useCallback` caches a function identity. They are performance tools, not guarantees of semantic correctness. `useTransition` marks an update as non-urgent; `useDeferredValue` lets a value lag while more urgent rendering proceeds. Neither moves expensive JavaScript to a Worker or prevents network requests by itself.

## Actions and resource reading

React 19 adds `useActionState` for an action's result and pending state and `useOptimistic` for temporary optimistic UI. React DOM's `useFormStatus` observes a parent form's submission. `use` reads a promise or context resource; it is a React API with different conditional-call rules from ordinary hooks. See [actions and forms](/blog/react-actions-optimistic-forms) for working examples.

## Rules that prevent subtle bugs

Call ordinary hooks unconditionally at the top level of a component or custom hook. Do not put them after an early return or inside an event handler. Use the hooks linter. Custom hooks share logic, not a single shared state instance. Derive a filtered array during rendering instead of copying it into state with an effect unless there is an actual external system to synchronize.

## Sources and further reading

- [useState](https://react.dev/reference/react/useState)
- [useReducer](https://react.dev/reference/react/useReducer)
- [useContext](https://react.dev/reference/react/useContext)
- [useRef](https://react.dev/reference/react/useRef)
- [useId](https://react.dev/reference/react/useId)
- [Built-in hooks index](https://react.dev/reference/react/hooks)
