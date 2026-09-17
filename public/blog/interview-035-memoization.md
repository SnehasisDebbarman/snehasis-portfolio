---
slug: "interview-035-memoization"
title: "35. What is memoization?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Memoization reuses a previous result when the same inputs are supplied again."
series: "interview"
questionNumber: "35"
---

## The answer

Memoization reuses a previous result when the same inputs are supplied again. It is useful for expensive deterministic calculations with repeated inputs. A cache key must represent every input that affects the result.

A cache trades memory and lookup overhead for avoided computation. Measure the repeated work before adding one.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function memoizeOne(fn) {
  let hasValue = false;
  let previous;
  let result;
  return function (input) {
    if (!hasValue || !Object.is(input, previous)) {
      result = fn(input);
      previous = input;
      hasValue = true;
    }
    return result;
  };
}
const square = memoizeOne(number => {
  console.log("computed");
  return number * number;
});
console.log(square(4)); // computed, 16
console.log(square(4)); // 16
console.log(square(5)); // computed, 25
```

## Walk through the result

This deliberately small cache retains only the most recent input and result. It avoids unbounded growth and makes its policy obvious. Calling 4 again after 5 would recompute because the previous entry was replaced.

## Interview pitfalls

This wrapper supports one argument and a receiver-independent pure function. Mutating an object while keeping its identity can make an identity cache stale. Caching promises also requires a decision about rejected results, expiry and cancellation; do not treat every asynchronous operation as an ordinary pure calculation.

## Sources and further reading

- [Official documentation](https://lodash.com/docs/#memoize)

## Continue the interview series

- [Previous: 34. What is infinite currying?](/blog/interview-034-infinite-currying)
- [Next: 36. What are pure functions and immutability?](/blog/interview-036-pure-functions-immutability)
- [Browse all 100 questions](/blog?series=interview)
