---
slug: "lodash-debounce-throttle-react"
title: "Lodash Debounce and Throttle in React Without Stale Timers"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Use a maintained utility, preserve function identity and cancel delayed callbacks when a component unmounts."
---

A debounce waits for a quiet period. A throttle limits how often work begins during a stream of events. Lodash is useful when you need tested options such as leading and trailing calls, cancellation or flushing instead of maintaining a custom timing helper.

## Install and run

This example uses a React browser project with a bundler. Install Lodash, then replace `App.jsx`. The full search value is passed as an argument, so the delayed callback does not accidentally read an old state snapshot.

```bash
npm install lodash
```

```jsx
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

export default function App() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const submitLater = useMemo(() => debounce(value => {
    setSubmitted(value);
  }, 400, { maxWait: 1500 }), []);

  useEffect(() => () => submitLater.cancel(), [submitLater]);

  return <main>
    <label>Search
      <input value={query} onChange={event => {
        const value = event.target.value;
        setQuery(value);
        submitLater(value);
      }} />
    </label>
    <button onClick={() => submitLater.flush()}>Search now</button>
    <p>Submitted query: {submitted || "Nothing yet"}</p>
  </main>;
}
```

Type quickly: the input updates immediately, while the submitted label waits. Keep typing continuously: `maxWait` permits progress without waiting forever. The button executes a pending trailing call immediately. On unmount, cleanup cancels pending work.

## Why identity matters

Creating a new debounce wrapper on every render creates unrelated timers. Keeping one wrapper preserves its timer state. If the callback depends on changing props, either pass the needed values as arguments or intentionally recreate the wrapper and cancel its predecessor. Do not hide a stale closure by removing dependencies from an effect.

This demonstration does not perform a network request. A real search also needs cancellation or stale-response protection; debouncing alone does not prevent an older request from finishing after a newer request.

## A throttled browser listener

Use this in a bundled browser module. Call the returned cleanup function when leaving the screen.

```js
import throttle from "lodash/throttle";

function observeScroll() {
  const report = throttle(() => {
    console.log("Scroll position:", window.scrollY);
  }, 200, { leading: true, trailing: true });
  window.addEventListener("scroll", report, { passive: true });
  return () => {
    window.removeEventListener("scroll", report);
    report.cancel();
  };
}

const stopObserving = observeScroll();
// Later, when this feature is no longer needed:
// stopObserving();
```

## Choosing the policy

Use debounce for “after the user pauses,” throttle for “periodically while the user continues,” and requestAnimationFrame for work coordinated with painting. None guarantees an exact deadline under a busy or backgrounded browser. Avoid delaying accessibility-critical feedback or the controlled input's own state update.

## Sources and further reading

- [Lodash debounce](https://lodash.com/docs/#debounce)
- [Lodash throttle](https://lodash.com/docs/#throttle)
- [React useMemo](https://react.dev/reference/react/useMemo)
- [React useEffect](https://react.dev/reference/react/useEffect)
