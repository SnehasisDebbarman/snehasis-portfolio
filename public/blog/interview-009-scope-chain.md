---
slug: "interview-009-scope-chain"
title: "9. What is scope chaining?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "When JavaScript resolves an identifier, it checks the current lexical environment and then successive outer environments until it finds a matching binding."
series: "interview"
questionNumber: "9"
---

## The answer

When JavaScript resolves an identifier, it checks the current lexical environment and then successive outer environments until it finds a matching binding. This sequence is called the scope chain. An inner binding shadows an outer binding of the same name.

Scope lookup concerns variable names. Prototype lookup concerns properties on objects. They can happen in one expression, but they are not the same chain.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
const region = "India";
const name = "outer";
function createGreeting() {
  const city = "Bengaluru";
  return function greet(name) {
    return `${name} in ${city}, ${region}`;
  };
}
const greet = createGreeting();
console.log(greet("Mira")); // Mira in Bengaluru, India
console.log(name); // outer
```

## Walk through the result

The parameter supplies the nearest `name`. The next environment supplies `city`, and the outer environment supplies `region`. Returning `greet` does not disconnect those references.

For a debugging exercise, rename the parameter and inspect which `name` the function then resolves. A missing binding at every level produces ReferenceError when read.

## Interview pitfalls

An inner scope cannot be searched from its parent. Variables declared inside a function do not become visible to its caller. Avoid accidental globals caused by assignment without a declaration in non-strict legacy scripts.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_scope_and_closures)

## Continue the interview series

- [Previous: 8. What is lexical scope?](/blog/interview-008-lexical-scope)
- [Next: 10. What is a closure?](/blog/interview-010-closure)
- [Browse all 100 questions](/blog?series=interview)
