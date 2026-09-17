---
slug: "interview-016-javascript-inheritance"
title: "16. How does inheritance work in JavaScript?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "JavaScript inheritance delegates property lookup through prototypes."
series: "interview"
questionNumber: "16"
---

## The answer

JavaScript inheritance delegates property lookup through prototypes. Classes provide syntax for constructing instances and connecting prototype chains. A subclass can reuse a parent method and override selected behavior.

Use inheritance for a meaningful “is a” relationship with stable shared behavior. Composition is often easier when features vary independently, such as adding logging or persistence to otherwise unrelated objects.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
class Message {
  constructor(text) { this.text = text; }
  format() { return this.text; }
}
class Warning extends Message {
  constructor(text, code) {
    super(text);
    this.code = code;
  }
  format() { return `[${this.code}] ${super.format()}`; }
}
const warning = new Warning("Low storage", "DISK");
console.log(warning.format()); // [DISK] Low storage
console.log(warning instanceof Message); // true
console.log(Object.getPrototypeOf(Warning.prototype) === Message.prototype); // true
```

## Walk through the result

`super(text)` initializes the base part of the instance before the derived constructor uses `this`. `super.format()` reuses the parent implementation while preserving the current receiver. The final check makes the prototype relationship visible.

## Interview pitfalls

A subclass should respect the expectations established by its parent. Deep hierarchies make changes harder to reason about, and private fields are not ordinary properties available to subclasses. Prefer a small chain with clear responsibilities.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)

## Continue the interview series

- [Previous: 15. What are prototypes and prototype chains?](/blog/interview-015-prototypes-chain)
- [Next: 17. What is the difference between a class and a constructor function?](/blog/interview-017-class-constructor-function)
- [Browse all 100 questions](/blog?series=interview)
