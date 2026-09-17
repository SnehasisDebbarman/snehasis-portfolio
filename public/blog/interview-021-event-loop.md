---
slug: "interview-021-event-loop"
title: "21. What is the JavaScript event loop?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "The event loop coordinates queued work with JavaScript execution."
series: "interview"
questionNumber: "21"
---

## The answer

The event loop coordinates queued work with JavaScript execution. In a browser, a task runs, microtasks are processed at checkpoints, and the browser gets opportunities to render and select more work. A currently executing synchronous function is not interrupted by a timer callback.

JavaScript execution on one agent is sequential, while the host can handle activities such as networking separately. Asynchronous does not automatically mean CPU work runs in parallel.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
console.log("1: start");
setTimeout(() => console.log("4: timer"), 0);
Promise.resolve().then(() => console.log("3: promise"));
console.log("2: end");
```

## Walk through the result

The synchronous logs run first. The already-fulfilled promise schedules a reaction as a microtask. The timer callback becomes eligible for a later task, so it follows that reaction in this example.

Try replacing the final log with a slow synchronous calculation. Both asynchronous callbacks must wait until the current work yields. A timer cannot rescue a blocked main thread.

## Interview pitfalls

The browser has multiple task sources, not one universal FIFO queue for every possible event. Node.js has its own event-loop phases and APIs. State the runtime when discussing precise ordering, especially when `process.nextTick`, rendering or I/O are involved.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)

## Continue the interview series

- [Previous: 20. What is the difference between Object.freeze() and Object.seal()?](/blog/interview-020-freeze-seal)
- [Next: 22. What are the call stack, Web APIs, and callback queue?](/blog/interview-022-stack-web-apis-queue)
- [Browse all 100 questions](/blog?series=interview)
