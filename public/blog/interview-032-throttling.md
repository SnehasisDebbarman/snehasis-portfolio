---
slug: "interview-032-throttling"
title: "32. What is throttling?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Throttling limits execution frequency while calls continue."
series: "interview"
questionNumber: "32"
---

## The answer

Throttling limits execution frequency while calls continue. A leading throttle runs the first eligible call and ignores calls until an interval has elapsed. A trailing option can additionally preserve the latest skipped call.

Use it for periodic reporting during a stream of events. For animation-related work, requestAnimationFrame may be a better scheduling tool.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function throttle(fn, wait) {
  let lastRun = -Infinity;
  return function (...args) {
    const now = performance.now();
    if (now - lastRun >= wait) {
      lastRun = now;
      return fn.apply(this, args);
    }
  };
}
const report = throttle(value => console.log(value), 50);
report("first");
report("skipped");
setTimeout(() => report("later"), 70);
// first, then later
```

## Walk through the result

The timestamp gate permits the first call immediately. The second call is too close to it, while the later timer call becomes eligible. `performance.now` provides an elapsed-time clock suitable for this comparison.

## Interview pitfalls

This is a leading-only example: the last skipped call is not replayed. If the final scroll position matters, use a trailing policy too. A throttle does not make expensive work cheap; profile the work itself and avoid using it to hide a long main-thread task.

## Sources and further reading

- [Official documentation](https://lodash.com/docs/#throttle)

## Continue the interview series

- [Previous: 31. What is debouncing?](/blog/interview-031-debouncing)
- [Next: 33. What is currying?](/blog/interview-033-currying)
- [Browse all 100 questions](/blog?series=interview)
