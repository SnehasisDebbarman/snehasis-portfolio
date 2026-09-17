---
slug: "scope-shadowing-illegal-shadowing"
title: "Block Scope, Shadowing, and the Temporal Dead Zone"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Explain let, const, var, loop closures, and redeclaration errors with runnable examples."
---

A block is a region enclosed by braces. `let` and `const` declarations are scoped to that block; `var` is scoped to the containing function or applicable top-level environment. Shadowing creates a new binding with the same name in a nested scope.

## Shadowing is separate storage

```js
let status = "outer";
{
  let status = "inner";
  console.log(status); // inner
}
console.log(status); // outer

const settings = { theme: "dark" };
settings.theme = "light"; // allowed: the binding was not reassigned
console.log(settings.theme); // light
```

Run this block in the compiler. `const` prevents reassignment of the binding. It does not recursively freeze an object.

## Why an apparently available variable can throw

```js
let name = "outside";
{
  try {
    console.log(name);
  } catch (error) {
    console.log(error.name); // ReferenceError
  }
  let name = "inside";
  console.log(name); // inside
}
```

The inner binding shadows the outer one throughout its block, even before initialization. Lookup does not skip the uninitialized inner binding and use the outer value. This is the temporal dead zone.

## The timer loop puzzle

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 0);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 0);
}
// var: 3, var: 3, var: 3
// let: 0, let: 1, let: 2
```

The first loop shares one binding, which has reached `3` by the time callbacks run. The second creates per-iteration bindings. This is lexical binding behavior, not a timing fix introduced by `let`.

## Illegal redeclaration

The following is intentionally invalid and must be tried separately. It fails while parsing, before any statement runs.

```js
let score = 1;
{ var score = 2; } // SyntaxError: conflicting declaration
```

The `var` attempts to declare in the surrounding scope, where `score` already exists as a lexical declaration. A nested function would provide a different scope and therefore a different result.

## Practice and pitfalls

Use distinct names when shadowing obscures intent. Remember that `switch` cases share a block unless you add braces around individual cases. Prefer `const` for stable bindings and `let` for reassignment, but learn `var` to read older code accurately.

## Sources and further reading

- [MDN let and redeclaration rules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [MDN const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
