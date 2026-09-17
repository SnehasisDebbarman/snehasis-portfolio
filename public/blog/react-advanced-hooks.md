---
slug: "react-advanced-hooks"
title: "Advanced Hooks: Reducers, Memoization, and External Stores"
date: "September 17, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Use reducers for transitions, refs for imperative handles, and stable snapshots for subscriptions."
---

Advanced hooks are useful when a concrete requirement appears. This guide separates state transitions, external subscriptions, and rendering priority so that one hook is not asked to solve all three.

## Reducer and context together

Use this complete React 18+ `App.jsx`. Context distributes the value; the reducer defines valid state changes. Clicking Add updates the shared cart count.

```jsx
import { createContext, useContext, useReducer } from "react";
const Cart = createContext(null);
function reducer(state, action) {
  switch (action.type) {
    case "add": return { count: state.count + 1 };
    case "clear": return { count: 0 };
    default: return state;
  }
}
function Controls() {
  const { state, dispatch } = useContext(Cart);
  return <>
    <p>Items: {state.count}</p>
    <button onClick={() => dispatch({ type: "add" })}>Add</button>
    <button onClick={() => dispatch({ type: "clear" })}>Clear</button>
  </>;
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return <Cart.Provider value={{ state, dispatch }}><Controls /></Cart.Provider>;
}
```

The reducer returns a new object. It must not fetch data, mutate the previous state, or generate a random result. Context consumers subscribe to the provider value, so a broadly shared changing value can create unnecessary rendering.

## Subscribe to browser state

This separate example exports a component. Render `<Connection />` in a React 18+ application and toggle DevTools Offline mode. The server snapshot is deliberately fixed for hydration; it is a fallback, not proof of connectivity.

```jsx
import { useDebugValue, useSyncExternalStore } from "react";
function subscribe(notify) {
  window.addEventListener("online", notify);
  window.addEventListener("offline", notify);
  return () => {
    window.removeEventListener("online", notify);
    window.removeEventListener("offline", notify);
  };
}
const snapshot = () => navigator.onLine;
const serverSnapshot = () => true;
function useOnline() {
  const online = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  useDebugValue(online ? "online" : "offline");
  return online;
}
export default function Connection() {
  return <p>{useOnline() ? "Browser reports online" : "Browser reports offline"}</p>;
}
```

## Expose a narrow imperative handle

React 18 uses `forwardRef`; React 19 also supports receiving a ref as a prop. This version works in both. Render the exported App and click Focus.

```jsx
import { forwardRef, useImperativeHandle, useRef } from "react";
const Field = forwardRef(function Field(props, ref) {
  const input = useRef(null);
  useImperativeHandle(ref, () => ({ focus: () => input.current?.focus() }), []);
  return <input ref={input} aria-label="Name" />;
});
export default function App() {
  const field = useRef(null);
  return <><Field ref={field} /><button onClick={() => field.current?.focus()}>Focus</button></>;
}
```

## Memoization and scheduling

Use `useMemo(() => calculate(items), [items])` only when the calculation or identity matters. Use `useCallback` when a stable function helps an optimized child or subscription. Profile before applying either everywhere.

`useTransition` marks state updates as interruptible rendering work. `useDeferredValue` defers a consumed value. Keep a controlled input's own state urgent. Expensive synchronous calculation inside an event handler still blocks even if its result is later put in a transition.

`useLayoutEffect` is for work such as measuring a tooltip before paint. `useInsertionEffect` is primarily for style-library integration; neither is a general faster replacement for `useEffect`.

## Sources and further reading

- [useReducer](https://react.dev/reference/react/useReducer)
- [useContext](https://react.dev/reference/react/useContext)
- [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
- [useDebugValue](https://react.dev/reference/react/useDebugValue)
- [useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)
- [useMemo](https://react.dev/reference/react/useMemo)
- [useCallback](https://react.dev/reference/react/useCallback)
- [useTransition](https://react.dev/reference/react/useTransition)
- [useDeferredValue](https://react.dev/reference/react/useDeferredValue)
- [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)
- [useInsertionEffect](https://react.dev/reference/react/useInsertionEffect)
