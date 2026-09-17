---
slug: "interview-025-promise"
title: "25. What is a Promise?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "A Promise represents an eventual result: either a fulfillment value or a rejection reason."
series: "interview"
questionNumber: "25"
---

## The answer

A Promise represents an eventual result: either a fulfillment value or a rejection reason. It gives asynchronous work a composable interface through `.then`, `.catch` and `.finally`.

A promise is not a background thread or a command that starts work when awaited. The Promise constructor runs its executor immediately, and an API such as fetch starts work when called.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function waitForMessage(delayMs) {
  return new Promise(resolve => {
    setTimeout(() => resolve("Ready"), delayMs);
  });
}
waitForMessage(20)
  .then(message => `${message}!`)
  .then(message => console.log(message)) // Ready!
  .catch(error => console.error("Failed:", error))
  .finally(() => console.log("Finished"));
```

## Walk through the result

The timer resolves the promise with a string. Each `then` returns a new promise: returning a value fulfills that next promise, while throwing would reject it. This allows a sequence of transformations without nesting another callback at each step.

The finalizer runs after settlement and is useful for cleanup that does not depend on the success value.

## Interview pitfalls

Return a nested promise from a `then` callback when the chain should wait for it. Forgetting that return creates detached work and breaks error propagation. Do not wrap an already promise-based API in `new Promise` without a specific adaptation need.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Continue the interview series

- [Previous: 24. In what order do promises, timers, and synchronous code execute?](/blog/interview-024-async-execution-order)
- [Next: 26. What are the states of a Promise?](/blog/interview-026-promise-states)
- [Browse all 100 questions](/blog?series=interview)
