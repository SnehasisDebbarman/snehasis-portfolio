---
slug: "interview-001-var-let-const"
title: "1. What is the difference between var, let, and const?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Choose a declaration by the lifetime of its binding and whether you intend to reassign it."
series: "interview"
questionNumber: "1"
---

## The answer

Choose a declaration by the lifetime of its binding and whether you intend to reassign it. `var` belongs to a function or script scope; `let` and `const` belong to a block. A `var` binding is initialized to `undefined` before its declaration executes. A lexical binding cannot be read before initialization.

Use `const` for a binding that should keep pointing at the same value, and `let` when reassignment expresses the algorithm. `const` does not make an object immutable.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function inspect() {
  if (true) {
    var visibleOutside = "function scope";
    let onlyInside = "block scope";
    console.log(onlyInside);
  }
  console.log(visibleOutside);
}
const settings = { theme: "dark" };
settings.theme = "light";
let attempts = 0;
attempts += 1;
inspect();
console.log(settings.theme, attempts); // light 1
```

## Walk through the result

The block's `let` exists only inside the `if`, while `visibleOutside` remains accessible within `inspect`. Changing `settings.theme` mutates the object; it does not reassign `settings`. Replacing `settings` itself would throw.

For an interview, compare scope, initialization and reassignment separately. That gives a more precise answer than “const is constant.”

## Interview pitfalls

Top-level behavior also depends on whether code runs as a classic script or a module. Do not assume every top-level declaration becomes a property of `window`. Prefer lexical declarations in new code and avoid relying on repeated `var` declarations.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)

## Continue the interview series

- [Next: 2. What are primitive and reference data types?](/blog/interview-002-primitive-reference-types)
- [Browse all 100 questions](/blog?series=interview)
