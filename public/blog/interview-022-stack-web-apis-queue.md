---
slug: "interview-022-stack-web-apis-queue"
title: "22. What are the call stack, Web APIs, and callback queue?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "The call stack tracks active JavaScript function calls."
series: "interview"
questionNumber: "22"
---

## The answer

The call stack tracks active JavaScript function calls. Web APIs are host-provided capabilities such as DOM events, timers and fetch. When eligible asynchronous work has a callback to run, the host queues work instead of inserting it into an already busy stack.

“Callback queue” is a teaching simplification. Distinguish task queues from the microtask queue, because they have different scheduling rules.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function inner() {
  console.log("inside inner");
}
function outer() {
  console.log("inside outer");
  setTimeout(() => console.log("timer callback"), 0);
  inner();
  console.log("leaving outer");
}
outer();
console.log("script finished");
// inside outer
// inside inner
// leaving outer
// script finished
// timer callback
```

## Walk through the result

Calling `inner` adds another frame above `outer`; returning removes that frame. Registering the timer asks the host to schedule later work. Its callback does not run until the script's synchronous work finishes.

This separation explains why a long-running event handler delays timers and input responses even though the browser has already noticed those events.

## Interview pitfalls

`setTimeout` is supplied by the host, not the ECMAScript language itself. It does not guarantee an exact execution time. Also, a recursive function that never returns can exhaust the stack without involving any queue at all.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)

## Continue the interview series

- [Previous: 21. What is the JavaScript event loop?](/blog/interview-021-event-loop)
- [Next: 23. What is the difference between microtasks and macrotasks?](/blog/interview-023-microtasks-macrotasks)
- [Browse all 100 questions](/blog?series=interview)
