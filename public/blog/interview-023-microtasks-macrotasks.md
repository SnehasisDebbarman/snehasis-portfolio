---
slug: "interview-023-microtasks-macrotasks"
title: "23. What is the difference between microtasks and macrotasks?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "A task, often informally called a macrotask, includes work such as a timer callback or event dispatch."
series: "interview"
questionNumber: "23"
---

## The answer

A task, often informally called a macrotask, includes work such as a timer callback or event dispatch. Promise reactions and `queueMicrotask` use microtasks. At a microtask checkpoint, the queue is drained, including microtasks added while draining it.

This lets promise continuations run before the next task in many familiar examples, but it also means an endless stream of microtasks can starve other work.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
setTimeout(() => console.log("timer"), 0);
queueMicrotask(() => {
  console.log("microtask A");
  queueMicrotask(() => console.log("microtask C"));
});
Promise.resolve().then(() => console.log("microtask B"));
console.log("sync");
// sync
// microtask A
// microtask B
// microtask C
// timer
```

## Walk through the result

A is queued before B. While A runs, C is appended behind B. The checkpoint continues until C is processed, then a timer task can run.

The important question is when each continuation is enqueued, not whether its source line contains the word Promise. A promise that has not settled cannot yet run its fulfillment reaction.

## Interview pitfalls

Do not use recursive microtasks to simulate an infinite animation loop. They can prevent rendering and user input from progressing. Use scheduling appropriate to the work, such as requestAnimationFrame for visual updates or a worker for suitable CPU-heavy computation.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)

## Continue the interview series

- [Previous: 22. What are the call stack, Web APIs, and callback queue?](/blog/interview-022-stack-web-apis-queue)
- [Next: 24. In what order do promises, timers, and synchronous code execute?](/blog/interview-024-async-execution-order)
- [Browse all 100 questions](/blog?series=interview)
