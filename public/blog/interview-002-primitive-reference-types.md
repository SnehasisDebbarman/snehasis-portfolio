---
slug: "interview-002-primitive-reference-types"
title: "2. What are primitive and reference data types?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "JavaScript has seven primitive types: string, number, bigint, boolean, undefined, symbol and null."
series: "interview"
questionNumber: "2"
---

## The answer

JavaScript has seven primitive types: string, number, bigint, boolean, undefined, symbol and null. Primitive values are immutable. Everything else is an object, including arrays and functions.

“Reference type” is common interview shorthand for objects: two bindings can refer to the same object. JavaScript still passes arguments by value; for an object, the copied value identifies that same object.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
let first = 7;
let second = first;
second = 9;
const original = { score: 7 };
const alias = original;
alias.score = 9;
function replace(value) {
  value = { score: 100 };
  return value;
}
replace(original);
console.log(first, second); // 7 9
console.log(original.score); // 9
console.log(original === alias); // true
console.log({ score: 9 } === { score: 9 }); // false
```

## Walk through the result

Reassigning `second` does not change `first`. Mutating `alias.score` changes the object both names share. However, reassigning the function's local parameter does not replace the caller's binding.

Two separately created objects are unequal by identity even when their properties look identical. This distinction matters for state updates, caches and equality checks.

## Interview pitfalls

`typeof null` is the historical string `"object"`, although null is primitive. Strings expose methods through language behavior, but calling a string method does not mutate the original primitive. Use `Array.isArray` when identifying arrays.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

## Continue the interview series

- [Previous: 1. What is the difference between var, let, and const?](/blog/interview-001-var-let-const)
- [Next: 3. What is type coercion in JavaScript?](/blog/interview-003-type-coercion)
- [Browse all 100 questions](/blog?series=interview)
