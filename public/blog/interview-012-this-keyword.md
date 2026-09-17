---
slug: "interview-012-this-keyword"
title: "12. How does the this keyword work?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "For an ordinary function, this is usually determined by how it is called."
series: "interview"
questionNumber: "12"
---

## The answer

For an ordinary function, `this` is usually determined by how it is called. A method call supplies its receiver; `call` and `apply` provide one explicitly; `new` constructs a receiver. A plain function call in strict mode has undefined as its `this`.

The object where a function happened to be stored is not permanently attached to it. Extracting a method changes its call form.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
"use strict";
function describe() {
  return this ? this.name : "no receiver";
}
const person = { name: "Mira", describe };
console.log(person.describe()); // Mira
const detached = person.describe;
console.log(detached()); // no receiver
console.log(detached.call({ name: "Ari" })); // Ari
const fixed = detached.bind(person);
console.log(fixed()); // Mira
```

## Walk through the result

The same function reads three different receivers depending on invocation. `bind` creates a wrapper with a fixed receiver for ordinary calls, which is useful when passing a method as a callback.

When explaining a `this` puzzle, first identify whether the function is an arrow, then examine the call expression.

## Interview pitfalls

Top-level `this` differs between scripts, modules and runtimes. Avoid examples that assume it is always `window`. A bound function used as a constructor has special behavior: `new` supplies the new instance rather than the bound receiver.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

## Continue the interview series

- [Previous: 11. What are practical use cases of closures?](/blog/interview-011-closure-use-cases)
- [Next: 13. How is this different in arrow functions?](/blog/interview-013-arrow-this)
- [Browse all 100 questions](/blog?series=interview)
