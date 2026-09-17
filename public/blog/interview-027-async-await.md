---
slug: "interview-027-async-await"
title: "27. How does async/await work?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "An async function always returns a promise."
series: "interview"
questionNumber: "27"
---

## The answer

An async function always returns a promise. Returning a value fulfills it; an uncaught exception rejects it. `await` pauses that function's continuation until the awaited value is available, allowing the caller and event loop to continue.

Await makes asynchronous control flow look sequential. It does not require independent operations to start one after another.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
const load = (value, ms) => new Promise(resolve => {
  setTimeout(() => resolve(value), ms);
});
async function showDashboard() {
  const profilePromise = load("Mira", 20);
  const countPromise = load(3, 10);
  const [name, count] = await Promise.all([profilePromise, countPromise]);
  return `${name} has ${count} messages`;
}
showDashboard().then(console.log).catch(console.error);
console.log("UI can continue");
// UI can continue
// Mira has 3 messages
```

## Walk through the result

Both loads start before the combined await. The result array preserves input order, so name receives the profile even though the count completes earlier. The caller receives a promise immediately and can keep working.

## Interview pitfalls

`forEach(async () => ...)` does not make forEach wait. Use a `for...of` loop for sequential work or a bounded concurrent strategy for batches. Awaiting thousands of requests with Promise.all can still overload an API; concurrency needs its own policy.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

## Continue the interview series

- [Previous: 26. What are the states of a Promise?](/blog/interview-026-promise-states)
- [Next: 28. What is the difference between Promise.all, allSettled, race, and any?](/blog/interview-028-promise-combinators)
- [Browse all 100 questions](/blog?series=interview)
