---
slug: "interview-033-currying"
title: "33. What is currying?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Currying transforms a function that accepts several arguments into a chain of functions that each accepts one argument."
series: "interview"
questionNumber: "33"
---

## The answer

Currying transforms a function that accepts several arguments into a chain of functions that each accepts one argument. It lets early arguments configure a reusable operation and later arguments supply the actual data.

Partial application is related but broader: it fixes some arguments without necessarily producing a one-argument-at-a-time interface.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
const multiply = left => right => left * right;
const double = multiply(2);
console.log(multiply(3)(4)); // 12
console.log([1, 2, 3].map(double)); // [2, 4, 6]
const between = minimum => maximum => value =>
  value >= minimum && value <= maximum;
const isTeen = between(13)(19);
console.log(isTeen(16), isTeen(25)); // true false
```

## Walk through the result

The first call to multiply remembers left in a closure and returns a function waiting for right. The range predicate fixes the bounds before receiving a value, which fits neatly into filtering and validation pipelines.

## Interview pitfalls

Curry only when the staged interface improves reuse or readability. A generic helper based on `fn.length` can behave unexpectedly with default parameters and rest arguments. Also, array callbacks pass extra arguments, so design adapters with the intended signature rather than blindly forwarding everything.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#closures)

## Continue the interview series

- [Previous: 32. What is throttling?](/blog/interview-032-throttling)
- [Next: 34. What is infinite currying?](/blog/interview-034-infinite-currying)
- [Browse all 100 questions](/blog?series=interview)
