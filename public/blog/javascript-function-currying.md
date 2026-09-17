---
slug: "javascript-function-currying"
title: "Currying and Partial Application with Practical Examples"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Turn multi-argument functions into reusable stages and understand where a generic curry helper stops being useful."
---

Currying transforms a function such as `add(a, b)` into stages such as `add(a)(b)`. Each stage remembers previous arguments through a closure. Partial application fixes some arguments now and leaves the rest for later; it does not necessarily convert every argument into a separate stage.

## Start with a concrete function

Run this example in the compiler or any modern JavaScript environment.

```js
const priceWithTax = (rate) => (price) => price * (1 + rate);
const withTenPercentTax = priceWithTax(0.10);
console.log(withTenPercentTax(100).toFixed(2)); // 110.00
console.log(withTenPercentTax(250).toFixed(2)); // 275.00

const between = (minimum) => (maximum) => (value) =>
  value >= minimum && value <= maximum;
const isAdultWorkingAge = between(18)(65);
console.log([12, 21, 70].filter(isAdultWorkingAge)); // [21]
```

The first example specializes a pricing rule once. The second arranges configuration before the final data argument, making the result easy to pass to `filter`. For money in production, choose explicit rounding rules and integer minor units or a decimal library; currying does not solve floating-point arithmetic.

## A fixed-arity curry helper

```js
function curry(fn, arity = fn.length) {
  function collect(args) {
    return (...next) => {
      const all = [...args, ...next];
      return all.length >= arity ? fn(...all) : collect(all);
    };
  }
  return collect([]);
}
const sum = curry((a, b, c) => a + b + c);
console.log(sum(1)(2)(3)); // 6
console.log(sum(1, 2)(3)); // 6
```

This helper accumulates arguments until it has enough to call `fn`. Earlier partial applications remain reusable because a new array is created at every stage. It is intended for plain functions, not methods depending on a dynamic `this`.

## Limitations and better choices

Default parameters and rest parameters make `fn.length` a poor proxy for intended arity. Pass an explicit arity, or write the stages directly. The helper has no placeholder support. Calling a stage with no arguments simply adds another stage, which can hide a mistake.

For a single callback, `items.map(item => transform(config, item))` can be clearer than introducing a generic abstraction. Currying is valuable when the partially configured function is reused, not as a requirement for functional code.

## Exercise

Implement `hasRole(role)(user)` and filter an array of users. Explain which variable remains alive after the outer call returns. That retained `role` is the connection between currying and [closures](/blog/js-closures-deep-dive).

## Sources and further reading

- [MDN closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)
- [Lodash curry and placeholders](https://lodash.com/docs/#curry)
