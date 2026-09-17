---
slug: "interview-006-hoisting"
title: "6. What is hoisting?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Hoisting is a way to describe how declarations affect their scope before execution reaches their written position."
series: "interview"
questionNumber: "6"
---

## The answer

Hoisting is a way to describe how declarations affect their scope before execution reaches their written position. The engine does not physically move source lines. Function declarations can usually be called earlier in their scope; `var` is initialized to undefined; lexical declarations remain uninitialized until their declaration executes.

Separate declaration, initialization and assignment when explaining an output question. Those are different events.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function demonstrate() {
  console.log(greet()); // Hello
  console.log(score); // undefined
  var score = 10;
  function greet() { return "Hello"; }
  try {
    console.log(level);
  } catch (error) {
    console.log(error.name); // ReferenceError
  }
  let level = 2;
  console.log(score, level); // 10 2
}
demonstrate();
```

## Walk through the result

`greet` has a callable function value when the body begins. `score` exists but its assignment has not happened at the first log. `level` belongs to the scope too, yet reading it before initialization fails. The catch lets the demonstration continue to its final line.

## Interview pitfalls

A function expression assigned to `var` is not equivalent to a function declaration: its variable begins as undefined. Avoid relying on block-level function declarations in legacy sloppy scripts, where compatibility rules complicate the story.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)

## Continue the interview series

- [Previous: 5. What are truthy and falsy values?](/blog/interview-005-truthy-falsy)
- [Next: 7. What is the Temporal Dead Zone?](/blog/interview-007-temporal-dead-zone)
- [Browse all 100 questions](/blog?series=interview)
