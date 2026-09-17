---
slug: "interview-034-infinite-currying"
title: "34. What is infinite currying?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "“Infinite currying” usually means an API that accepts an open-ended chain of calls until an explicit terminator returns the result."
series: "interview"
questionNumber: "34"
---

## The answer

“Infinite currying” usually means an API that accepts an open-ended chain of calls until an explicit terminator returns the result. It is not literally infinite execution. The function keeps returning another function while collecting enough state to continue.

An empty call is a simple, visible terminator. Checking argument count is safer than checking truthiness because zero may be valid input.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function sum(initial = 0) {
  if (!Number.isFinite(initial)) throw new TypeError("Initial value must be finite");
  function next(...args) {
    if (args.length === 0) return initial;
    if (args.length !== 1 || !Number.isFinite(args[0])) {
      throw new TypeError("Pass one finite number, or no argument to finish");
    }
    return sum(initial + args[0]);
  }
  return next;
}
console.log(sum(1)(2)(3)()); // 6
console.log(sum(1)(0)(-1)()); // 0
const base = sum(5);
console.log(base(2)(), base(3)()); // 7 8
```

## Walk through the result

Each call returns a fresh closure with the next total. Reusing base therefore creates independent branches rather than mutating a shared accumulator. Zero does not terminate the chain because termination checks the absence of arguments.

## Interview pitfalls

The function validates its initial value as well as each later argument. Floating-point arithmetic still has its usual precision limits. Avoid clever implicit coercion via valueOf merely to remove the final parentheses. In ordinary application code, an array with reduce is often easier to read.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

## Continue the interview series

- [Previous: 33. What is currying?](/blog/interview-033-currying)
- [Next: 35. What is memoization?](/blog/interview-035-memoization)
- [Browse all 100 questions](/blog?series=interview)
