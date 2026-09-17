---
slug: "interview-031-debouncing"
title: "31. What is debouncing?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Debouncing postpones work until calls have stopped for a chosen interval."
series: "interview"
questionNumber: "31"
---

## The answer

Debouncing postpones work until calls have stopped for a chosen interval. A trailing debounce replaces its pending timer whenever another call arrives. It is useful for search requests or validation after typing pauses.

Update visible input state immediately; debounce the expensive consequence. The delay is a scheduling threshold, not an exact execution deadline.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function debounce(fn, wait) {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  }
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}
const search = debounce(query => console.log("Search:", query), 30);
search("r");
search("re");
search("react");
// After the quiet period: Search: react
```

## Walk through the result

Only the final call survives because each call clears the preceding timer. The wrapper preserves the arguments and receiver of the last invocation. Its cancel method gives the owner a cleanup operation when a screen unmounts.

## Interview pitfalls

This teaching implementation is trailing-only and does not return the future callback result. It has no maxWait or flush option. For those requirements, consider a maintained utility. Debouncing fetch does not prevent stale responses from previously started requests; cancellation or request identity checks are still needed.

## Sources and further reading

- [Official documentation](https://lodash.com/docs/#debounce)

## Continue the interview series

- [Previous: 30. What is callback hell and how can you avoid it?](/blog/interview-030-callback-hell)
- [Next: 32. What is throttling?](/blog/interview-032-throttling)
- [Browse all 100 questions](/blog?series=interview)
