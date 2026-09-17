---
slug: "interview-005-truthy-falsy"
title: "5. What are truthy and falsy values?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "A condition converts its value to a boolean."
series: "interview"
questionNumber: "5"
---

## The answer

A condition converts its value to a boolean. The usual falsy values are false, zero and negative zero, `0n`, the empty string, null, undefined and NaN. Other ordinary values, including empty arrays and objects, are truthy. Browsers retain the exceptional legacy falsy object `document.all`.

A default based on `||` replaces every falsy value. A default based on `??` replaces only null and undefined, which matters when zero or an empty string is valid.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
const values = [false, 0, -0, 0n, "", null, undefined, NaN, [], {}, "0"];
console.log(values.map(value => Boolean(value)));
const quantity = 0;
console.log(quantity || 10); // 10
console.log(quantity ?? 10); // 0
const tags = [];
console.log(Boolean(tags)); // true
console.log(tags.length > 0); // false
```

## Walk through the result

The first eight entries convert to false and the remaining three convert to true. An array's existence does not tell you whether it has items; check its length. The quantity example demonstrates how a seemingly harmless default can overwrite a valid zero.

## Interview pitfalls

`filter(Boolean)` removes zero and empty strings as well as missing values. That is useful only when all those values should disappear. For a list of optional numbers, filter nullish entries explicitly so legitimate zeros survive.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

## Continue the interview series

- [Previous: 4. What is the difference between == and ===?](/blog/interview-004-loose-strict-equality)
- [Next: 6. What is hoisting?](/blog/interview-006-hoisting)
- [Browse all 100 questions](/blog?series=interview)
