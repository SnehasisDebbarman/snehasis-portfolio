---
slug: "interview-024-async-execution-order"
title: "24. In what order do promises, timers, and synchronous code execute?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "For a basic browser script, synchronous code finishes first, already-queued promise continuations run at the microtask checkpoint, and eligible timer tasks run afterward."
series: "interview"
questionNumber: "24"
---

## The answer

For a basic browser script, synchronous code finishes first, already-queued promise continuations run at the microtask checkpoint, and eligible timer tasks run afterward. A promise executor is synchronous; its `.then` callbacks are asynchronous.

An `await` suspends the async function's continuation, not the entire program. Even awaiting a non-promise value resumes the continuation asynchronously.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
console.log("A");
new Promise(resolve => {
  console.log("B");
  resolve();
}).then(() => console.log("E"));
async function run() {
  console.log("C");
  await 0;
  console.log("F");
}
run();
setTimeout(() => console.log("G"), 0);
console.log("D");
// A B C D E F G
```

## Walk through the result

A, B, C and D execute before the script ends. The promise reaction E was enqueued before the await continuation F. The timer's G comes later. Reading the output in phases is more reliable than memorizing a slogan about promises being “faster.”

## Interview pitfalls

The same ordering cannot be assumed for promises waiting on unrelated network responses. Their settlement timing controls when reactions enter the queue. Nested timers, Node-specific APIs and rendering callbacks need a runtime-specific analysis.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

## Continue the interview series

- [Previous: 23. What is the difference between microtasks and macrotasks?](/blog/interview-023-microtasks-macrotasks)
- [Next: 25. What is a Promise?](/blog/interview-025-promise)
- [Browse all 100 questions](/blog?series=interview)
