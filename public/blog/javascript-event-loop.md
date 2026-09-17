---
slug: "javascript-event-loop"
title: "setTimeout, Microtasks, and the Browser Event Loop"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Predict callback order and understand why a zero-delay timer never means immediate execution."
---

A zero-delay timer schedules future work. It does not interrupt the currently running JavaScript. Promise reactions run as microtasks after synchronous work yields and before the browser moves on to a later task such as a timer callback.

## Predict before running

```js
console.log("A");
setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("promise"));
queueMicrotask(() => console.log("microtask"));
console.log("B");
// A
// B
// promise
// microtask
// timer
```

Run the block in a browser console or the compiler. The two synchronous logs happen first. The promise reaction and explicit microtask follow their enqueue order. The timer becomes eligible for a later task.

## Why long tasks delay timers

The requested delay is a minimum threshold, not a real-time guarantee. A timer cannot execute while another task occupies the same event loop. Background tabs and nesting rules can delay timers further. Measure actual elapsed time rather than using a timer as a precise clock.

```js
const start = performance.now();
const id = setTimeout(() => {
  console.log("Elapsed:", Math.round(performance.now() - start), "ms");
}, 100);
// To cancel before it runs: clearTimeout(id);
```

The observed value is usually at least approximately the requested delay and varies with load. Do not write tests that require an exact 100 ms wall-clock result.

## Await also yields

```js
async function work() {
  console.log("inside before");
  await Promise.resolve();
  console.log("inside after");
}
work();
console.log("outside");
// inside before
// outside
// inside after
```

Even an already fulfilled awaited promise resumes asynchronously. Moving CPU-heavy work into an `async` function does not move it off the main thread: synchronous code before or after `await` can still block rendering.

## Practical fixes

For smooth animation, use `requestAnimationFrame`. For substantial independent CPU work, use a Worker. For a long loop that must stay on the main thread, split work into bounded chunks and yield between them. Repeatedly awaiting resolved promises is not a reliable way to give rendering a turn because it keeps replenishing microtasks.

## Common mistake

Pass a function to `setTimeout`, not a string of code. `setTimeout(save(), 100)` calls `save` immediately; `setTimeout(save, 100)` schedules it. An outer `try/catch` also cannot catch an exception thrown by a timer after that try block has completed—catch inside the callback or represent its work as a promise.

## Sources and further reading

- [MDN setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)
- [MDN microtask guide](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)
