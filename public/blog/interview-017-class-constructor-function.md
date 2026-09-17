---
slug: "interview-017-class-constructor-function"
title: "17. What is the difference between a class and a constructor function?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Both can create objects whose shared methods live on a prototype."
series: "interview"
questionNumber: "17"
---

## The answer

Both can create objects whose shared methods live on a prototype. Classes add stricter semantics and dedicated syntax: class bodies run in strict mode, constructors require `new`, and class declarations cannot be used before initialization.

Classes also support private fields and `extends`. They do not replace JavaScript's prototype model with a separate class-based runtime.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function PersonFunction(name) {
  this.name = name;
}
PersonFunction.prototype.greet = function () {
  return `Hello ${this.name}`;
};
class PersonClass {
  constructor(name) { this.name = name; }
  greet() { return `Hello ${this.name}`; }
}
const a = new PersonFunction("Mira");
const b = new PersonClass("Ari");
console.log(a.greet(), b.greet()); // Hello Mira Hello Ari
console.log(Object.keys(PersonFunction.prototype)); // ["greet"]
console.log(Object.keys(PersonClass.prototype)); // []
```

## Walk through the result

Both instances find `greet` through their prototypes. The directly assigned function-prototype property is enumerable, while a class method is non-enumerable by default. This is one reason describing classes as “only syntax sugar” can hide meaningful differences.

## Interview pitfalls

A constructor function called without `new` may fail or affect the wrong receiver depending on strictness; a class constructor always rejects that call form. Do not convert an API between the two styles without considering callers and property descriptors.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## Continue the interview series

- [Previous: 16. How does inheritance work in JavaScript?](/blog/interview-016-javascript-inheritance)
- [Next: 18. What is the difference between shallow copy and deep copy?](/blog/interview-018-shallow-deep-copy)
- [Browse all 100 questions](/blog?series=interview)
