---
slug: "interview-026-promise-states"
title: "26. What are the states of a Promise?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "A promise is pending, fulfilled or rejected."
series: "interview"
questionNumber: "26"
---

## The answer

A promise is pending, fulfilled or rejected. Fulfilled and rejected are collectively called settled. Once settled, its state and result cannot change.

“Resolved” is not always the same as fulfilled. Resolving a promise with another pending promise locks in adoption of that promise's eventual outcome, while the adopting promise may remain pending.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
let finishInner;
const inner = new Promise(resolve => { finishInner = resolve; });
const outer = new Promise((resolve, reject) => {
  resolve(inner);
  reject(new Error("Ignored after resolution"));
});
outer.then(value => console.log(value));
console.log("Waiting");
finishInner("Done");
// Waiting
// Done
```

## Walk through the result

`outer` adopts `inner` when resolve is called. The later reject attempt cannot override that decision. At the waiting log, the inner outcome has not yet been supplied. Once supplied, the reaction eventually prints Done.

This example is useful when an interviewer asks why “resolve was called” does not prove that a fulfillment handler has already run.

## Interview pitfalls

Promises do not expose a synchronous public `.state` field. Observe results through chaining or await. Calling resolve or reject does not stop the executor from executing later statements; use normal control flow if it should return early.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)

## Continue the interview series

- [Previous: 25. What is a Promise?](/blog/interview-025-promise)
- [Next: 27. How does async/await work?](/blog/interview-027-async-await)
- [Browse all 100 questions](/blog?series=interview)
