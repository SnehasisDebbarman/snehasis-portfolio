---
slug: "interview-028-promise-combinators"
title: "28. What is the difference between Promise.all, allSettled, race, and any?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Choose the combinator by the result contract."
series: "interview"
questionNumber: "28"
---

## The answer

Choose the combinator by the result contract. `all` requires every fulfillment; `allSettled` collects every outcome; `race` adopts the first settlement; `any` accepts the first fulfillment and rejects only when every input rejects.

`all` and `allSettled` preserve input order in their result arrays. None automatically cancels the remaining operations after an early result.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
async function demonstrate() {
  console.log(await Promise.all([Promise.resolve("A"), "B"]));
  const outcomes = await Promise.allSettled([
    Promise.resolve("saved"), Promise.reject(new Error("offline")),
  ]);
  console.log(outcomes.map(item => item.status));
  console.log(await Promise.race([Promise.resolve("first"), Promise.resolve("second")]));
  console.log(await Promise.any([Promise.reject("failed"), Promise.resolve("backup")]));
}
demonstrate().catch(console.error);
// ["A", "B"]
// ["fulfilled", "rejected"]
// first
// backup
```

## Walk through the result

Use all for a screen that needs several successful inputs, allSettled for independent cards, and any for redundant alternatives. Race can model “whichever result arrives first,” including an error. The immediately settled inputs make this example deterministic.

## Interview pitfalls

Empty inputs differ: all and allSettled fulfill with an empty array, any rejects with AggregateError, and race remains pending. A race-based timeout does not abort a losing fetch. Also, fetch normally fulfills for HTTP errors unless you check `response.ok`.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#promise_concurrency)

## Continue the interview series

- [Previous: 27. How does async/await work?](/blog/interview-027-async-await)
- [Next: 29. How do you handle errors in asynchronous JavaScript?](/blog/interview-029-async-error-handling)
- [Browse all 100 questions](/blog?series=interview)
