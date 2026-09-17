---
slug: "interview-007-temporal-dead-zone"
title: "7. What is the Temporal Dead Zone?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "The Temporal Dead Zone is the period after a lexical scope is entered but before a let, const or class binding is initialized."
series: "interview"
questionNumber: "7"
---

## The answer

The Temporal Dead Zone is the period after a lexical scope is entered but before a `let`, `const` or class binding is initialized. Access during that interval throws a ReferenceError. “Temporal” describes execution order, not just lines above a declaration.

A declaration in an inner scope shadows an outer name for the entire inner scope, including its TDZ. The engine does not fall back to the outer variable when the inner one is uninitialized.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
const label = "outer";
function inspect() {
  try {
    console.log(label);
  } catch (error) {
    console.log(error.name); // ReferenceError
  }
  const label = "inner";
  console.log(label); // inner
}
inspect();
console.log(label); // outer
```

## Walk through the result

The first log inside `inspect` resolves to the inner binding. Because initialization has not executed, it throws. After initialization, the same name reads `"inner"`. Outside the function, the original `label` remains unchanged.

Try moving the inner declaration before the try block to see how initialization changes the result without changing scope.

## Interview pitfalls

Even `typeof` throws for a lexical binding in its TDZ. Its special handling of an undeclared name does not apply here. Declare values before use, and use distinct names when shadowing obscures the flow.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

## Continue the interview series

- [Previous: 6. What is hoisting?](/blog/interview-006-hoisting)
- [Next: 8. What is lexical scope?](/blog/interview-008-lexical-scope)
- [Browse all 100 questions](/blog?series=interview)
