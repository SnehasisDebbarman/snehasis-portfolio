---
slug: "interview-008-lexical-scope"
title: "8. What is lexical scope?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Lexical scope means the source location where a function is defined determines which surrounding bindings it can access."
series: "interview"
questionNumber: "8"
---

## The answer

Lexical scope means the source location where a function is defined determines which surrounding bindings it can access. Calling that function from another scope does not replace its lexical environment with the caller's environment.

This makes names predictable: inspect the nested source structure to understand lookup. Closures preserve access to those environments when a function is used later.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
const currency = "INR";
function formatPrice(amount) {
  return `${currency} ${amount}`;
}
function checkout() {
  const currency = "USD";
  console.log(currency); // USD
  console.log(formatPrice(50)); // INR 50
}
checkout();
```

## Walk through the result

`formatPrice` was defined beside the outer currency, so it resolves that binding. The local currency inside `checkout` is visible to code defined within checkout, not to an independently defined function merely invoked there.

To make currency configurable, pass it as an argument or create a formatter in a factory that closes over the desired currency.

## Interview pitfalls

Do not confuse lexical variable lookup with the `this` value of an ordinary function. Ordinary `this` depends on the call form, while arrow functions capture surrounding `this`. The two mechanisms answer different questions.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Glossary/Scope)

## Continue the interview series

- [Previous: 7. What is the Temporal Dead Zone?](/blog/interview-007-temporal-dead-zone)
- [Next: 9. What is scope chaining?](/blog/interview-009-scope-chain)
- [Browse all 100 questions](/blog?series=interview)
