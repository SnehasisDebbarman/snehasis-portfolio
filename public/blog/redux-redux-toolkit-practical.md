---
slug: "redux-redux-toolkit-practical"
title: "Redux and Redux Toolkit: A Complete Small Store"
date: "September 17, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Understand actions, reducers, selectors, and Immer by building a small shared counter with Redux Toolkit."
---

Redux organizes shared state around dispatched actions and reducers. Redux Toolkit provides the standard utilities for creating a store and writing reducers with less ceremony. It is useful when several distant features need coordinated state and traceable transitions; local input state can still stay in React.

## Install and create the store

Use an existing React application. Run this command in its project folder, not the browser compiler.

```bash
npm install @reduxjs/toolkit react-redux
```

```js
// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";
const counter = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    added(state, action) { state.value += action.payload; },
    reset(state) { state.value = 0; }
  }
});
export const { added, reset } = counter.actions;
export const store = configureStore({ reducer: { counter: counter.reducer } });
```

The assignment-looking code is inside an Immer-backed slice reducer. Immer records changes to a draft and produces the next immutable state. This is not permission to mutate a state object retrieved elsewhere in the app.

## Connect React

```jsx
// App.jsx
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, added, reset } from "./store";
function Counter() {
  const value = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return <main>
    <p>Count: {value}</p>
    <button onClick={() => dispatch(added(2))}>Add two</button>
    <button onClick={() => dispatch(reset())}>Reset</button>
  </main>;
}
export default function App() {
  return <Provider store={store}><Counter /></Provider>;
}
```

Click Add two twice: the UI should show four. Reset returns it to zero. Inspect Redux DevTools to see the action payload and state transition.

## Trace the update

1. The click handler dispatches an action created by the slice.
2. The root reducer routes it to the counter reducer.
3. The reducer computes the next state.
4. React Redux checks subscribed selector results and updates relevant components.

Select the smallest useful value. A selector that creates a new object every time can cause avoidable re-renders; use memoized selectors when there is an actual derived-data need.

## Async work and server data

Reducers must be synchronous and free of side effects. Use a thunk for an asynchronous workflow, or RTK Query for fetching and caching server data. Avoid manually duplicating a query cache in slices unless the application requires it. Keep pending, failure, and cancellation behavior explicit.

## Pitfalls

Store serializable domain data, not DOM nodes, promises, or AbortControllers. In an SSR framework, do not share one mutable singleton store across unrelated requests. This small singleton is intended for a browser-only app. Decide which state belongs globally before adopting Redux for every component.

## Sources and further reading

- [Redux Toolkit quick start](https://redux-toolkit.js.org/tutorials/quick-start)
- [Redux fundamentals](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
- [RTK Query overview](https://redux-toolkit.js.org/rtk-query/overview)
