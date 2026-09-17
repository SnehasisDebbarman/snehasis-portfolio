---
slug: "interview-040-memory-leaks"
title: "40. How do memory leaks happen in JavaScript, and how can you prevent them?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "A leak occurs when objects that are no longer useful remain reachable from live roots."
series: "interview"
questionNumber: "40"
---

## The answer

A leak occurs when objects that are no longer useful remain reachable from live roots. Garbage collection cannot infer that an application no longer needs a listener, timer or cache entry that is still referenced.

Common causes include forgotten subscriptions, unbounded caches, detached DOM nodes retained in arrays, and callbacks capturing large objects. Fix ownership and cleanup rather than trying to manually free arbitrary variables.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function startPolling(onTick, interval = 1000) {
  const timer = setInterval(onTick, interval);
  let stopped = false;
  return function stop() {
    if (stopped) return;
    stopped = true;
    clearInterval(timer);
  };
}
const stop = startPolling(() => console.log("tick"), 20);
setTimeout(() => {
  stop();
  stop(); // Cleanup is safe to call again.
  console.log("stopped");
}, 75);
```

## Walk through the result

The owner receives a cleanup function at the moment it acquires the timer. Calling it stops future polling. The exact number of ticks depends on host scheduling, but no further interval callbacks should be scheduled after cleanup.

## Interview pitfalls

To investigate a UI leak, repeat mount/unmount or navigation cycles and compare heap snapshots and retained-object paths. A temporary increase is not proof of a leak. WeakMap can avoid retaining keys in some caches, but it does not fix a separate listener or array still retaining the same object.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management)

## Continue the interview series

- [Previous: 39. What are ES modules, CommonJS, and tree shaking?](/blog/interview-039-modules-tree-shaking)
- [Next: 41. What is React, and why is it used?](/blog/interview-041-what-is-react)
- [Browse all 100 questions](/blog?series=interview)
