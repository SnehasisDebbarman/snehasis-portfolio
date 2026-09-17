---
slug: "implementing-debouncing-polyfill"
title: "Debounce from Scratch: Search, Cancellation, and Cleanup"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Build a trailing-edge debounce, understand its timeline, and avoid stale search results."
---

A search field should respond immediately to typing, but its expensive work can wait until the user pauses. Debouncing combines a burst of calls into one invocation. With a 300 ms delay, calls at 0, 100, and 200 ms produce one invocation around 500 ms using the final arguments.

## When to use it

Use trailing debounce for autocomplete, draft saving, or resize calculations that only need the final state. It is a poor fit for progress that must update continuously: use [throttle](/blog/implementing-throttling-polyfill) there. A debounce controls **when a function starts**; it does not cancel an HTTP request that already started.

## Copyable implementation

Run this complete example in the [JavaScript compiler](/compiler) or a browser console. This is a deliberately small trailing-only utility, not a complete Lodash replacement.

```js
function debounce(fn, wait = 300) {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn.apply(this, args);
    }, wait);
  }
  debounced.cancel = () => {
    clearTimeout(timer);
    timer = undefined;
  };
  return debounced;
}

const search = debounce((query) => console.log("Search:", query), 100);
search("r");
search("re");
search("react");
// After roughly 100 ms: Search: react
```

Every call closes over the same timer. Clearing it prevents the previous scheduled invocation. The normal function preserves its caller's `this`, and the arrow callback retains that receiver until the timer fires. The rest parameter remembers the latest arguments.

## Prove cancellation works

```js
// Run after the debounce definition above.
const save = debounce(() => console.log("Saved"), 100);
save();
save.cancel();
// No "Saved" message should appear.
```

The wrapper returns immediately, not with the future result of `fn`. If the callback returns a rejected promise, the callback itself must handle that rejection. Do not `await search()` and expect a network response.

## Apply it safely in a UI

Create the debounced function once for the lifetime of its event subscription. Recreating it for every keystroke creates independent timers and defeats the debounce. In React, cancel pending work on unmount and keep callback dependencies current. For search requests, also use [AbortController](/blog/fetch-async-await-abort-controller), or an ignore flag, so an older response cannot replace a newer one.

## Pitfalls and practice

- A continuous stream of calls can postpone trailing-only execution indefinitely. Lodash's `maxWait` addresses that requirement.
- Timers are minimum delays. Busy or background tabs can run them later.
- Keep input state updates immediate; debounce the expensive side effect.

Try changing the delay and calling the function twice with a pause longer than that delay. You should see two invocations, because those calls belong to separate bursts.

## Sources and further reading

- [Lodash debounce options](https://lodash.com/docs/#debounce)
- [MDN timer behavior](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)
