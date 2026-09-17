---
slug: "javascript-promises-combinators"
title: "Promise.all, allSettled, race, and any: Choose the Right Contract"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Compare success, failure, ordering, and empty inputs with complete asynchronous examples."
---

Use a promise combinator when several asynchronous operations have a shared decision to make. Choose based on the result your UI needs, rather than treating the methods as interchangeable shortcuts.

## Decision table

| Method | Successful result | Failure | Empty input |
| --- | --- | --- | --- |
| all | Every fulfillment value, in input order | First observed rejection | Fulfills with [] |
| allSettled | Every outcome, in input order | Individual failures become records | Fulfills with [] |
| race | First settlement, fulfilled or rejected | If the first settlement rejects | Remains pending |
| any | First fulfillment | AggregateError if all reject | Rejects with AggregateError |

The returned promises do not cancel their inputs. A “winner” does not stop the other requests. Use AbortController when cancelling the underlying operations is appropriate.

## Run all four methods

```js
const delay = (ms, value, fail = false) => new Promise((resolve, reject) => {
  setTimeout(() => fail ? reject(new Error(value)) : resolve(value), ms);
});

async function demo() {
  console.log(await Promise.all([delay(30, "A"), delay(10, "B")]));
  // ["A", "B"] — input order, not completion order

  const results = await Promise.allSettled([
    delay(10, "saved"), delay(20, "offline", true)
  ]);
  console.log(results.map(result => result.status));
  // ["fulfilled", "rejected"]

  try {
    await Promise.race([delay(10, "failed first", true), delay(30, "ok")]);
  } catch (error) {
    console.log(error.message); // failed first
  }

  console.log(await Promise.any([
    delay(10, "failed first", true), delay(30, "backup")
  ])); // backup
}
demo().catch(console.error);
```

## Apply the contract to a page

Use `all` for a page that requires both profile and permissions. Use `allSettled` for independent dashboard cards where partial results remain useful. Use `any` for alternative sources where the first successful answer is enough. Use `race` when the first settlement itself is meaningful, including rejection.

Passing `fetch(url)` calls starts requests while constructing the input array. The combinator coordinates their promises; it is not what starts network work. Neither a promise nor `Promise.all` makes synchronous CPU work parallel.

## Errors and resource limits

Check `response.ok` before considering a fetch successful: HTTP 404 normally fulfills the fetch promise. Limit concurrency for large batches rather than starting thousands of requests at once. A timeout implemented only with `race` leaves the losing request running; cancellation must be explicit.

## Exercise

Replace the successful promise passed to `any` with a rejection. Catch the AggregateError and inspect its `errors` array. Then try the empty-input cases separately, avoiding an unbounded wait on `race([])`.

## Sources and further reading

- [MDN Promise combinators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN Promise.any](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
