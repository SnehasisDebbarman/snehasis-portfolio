---
slug: "interview-011-closure-use-cases"
title: "11. What are practical use cases of closures?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Closures let a function carry a small amount of context without global state."
series: "interview"
questionNumber: "11"
---

## The answer

Closures let a function carry a small amount of context without global state. They are useful for configured validators, event handlers, private counters, memoization and timing utilities. A factory expresses the lifetime of that context explicitly.

Choose a closure when a behavior and its private configuration belong together. Use a plain function argument when retaining context adds no value.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function createLengthValidator(minimum) {
  if (!Number.isInteger(minimum) || minimum < 0) {
    throw new TypeError("minimum must be a nonnegative integer");
  }
  return function validate(value) {
    return typeof value === "string" && value.length >= minimum;
  };
}
const validUsername = createLengthValidator(3);
const validPassphrase = createLengthValidator(12);
console.log(validUsername("Al")); // false
console.log(validUsername("Mira")); // true
console.log(validPassphrase("short")); // false
```

## Walk through the result

Each returned validator remembers its own minimum. The configuration is checked once, while individual values are checked on every call. This is convenient when wiring different form fields to reusable validation behavior.

Another application is a subscription cleanup function that remembers the exact listener it must remove.

## Interview pitfalls

Hiding a value inside a closure is encapsulation, not a security boundary against code running with the same privileges. A passphrase length check alone is not a complete authentication policy. Avoid capturing a huge object when the callback only needs one small value.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

## Continue the interview series

- [Previous: 10. What is a closure?](/blog/interview-010-closure)
- [Next: 12. How does the this keyword work?](/blog/interview-012-this-keyword)
- [Browse all 100 questions](/blog?series=interview)
