---
slug: "interview-004-loose-strict-equality"
title: "4. What is the difference between == and ===?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Strict equality, ===, compares without converting operands to a shared type."
series: "interview"
questionNumber: "4"
---

## The answer

Strict equality, `===`, compares without converting operands to a shared type. Loose equality, `==`, applies coercion rules when operand types differ. Prefer strict equality when a value's type is part of the contract.

Neither operator performs structural object comparison. The occasional deliberate `value == null` check matches both null and undefined, but such a convention should be explicit in the codebase.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
console.log(0 == "0"); // true
console.log(0 === "0"); // false
console.log(null == undefined); // true
console.log(null === undefined); // false
const record = { id: 1 };
console.log(record === record); // true
console.log(record === { id: 1 }); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
console.log(0 === -0); // true
console.log(Object.is(0, -0)); // false
```

## Walk through the result

Trace the operand types before predicting the result. In the first pair, numeric zero and a string containing zero are treated differently by the two operators. The object comparison succeeds only when both sides identify the same object.

`Object.is` exposes two useful differences around NaN and signed zero; it is not a deep-equality utility.

## Interview pitfalls

Do not use loose equality as a substitute for input validation. Convert external input intentionally, validate it, then compare. A deep comparison needs an explicit policy for arrays, Dates, missing properties and cycles, not just a switch from `==` to `===`.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness)

## Continue the interview series

- [Previous: 3. What is type coercion in JavaScript?](/blog/interview-003-type-coercion)
- [Next: 5. What are truthy and falsy values?](/blog/interview-005-truthy-falsy)
- [Browse all 100 questions](/blog?series=interview)
