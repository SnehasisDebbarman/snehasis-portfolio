---
slug: "interview-015-prototypes-chain"
title: "15. What are prototypes and prototype chains?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "An object's prototype is another object used for inherited property lookup."
series: "interview"
questionNumber: "15"
---

## The answer

An object's prototype is another object used for inherited property lookup. If an own property is absent, lookup proceeds along the prototype chain until a match is found or the chain reaches null.

A constructor's `.prototype` property and an instance's internal prototype are related but different concepts. `Object.getPrototypeOf(instance)` reveals the latter.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
const shared = {
  describe() { return `Name: ${this.name}`; },
};
const user = Object.create(shared);
user.name = "Mira";
console.log(user.describe()); // Name: Mira
console.log(Object.hasOwn(user, "describe")); // false
console.log(Object.getPrototypeOf(user) === shared); // true
user.describe = () => "Own method";
console.log(user.describe()); // Own method
delete user.describe;
console.log(user.describe()); // Name: Mira
```

## Walk through the result

The inherited method executes with `user` as its receiver. Adding an own property shadows the inherited method; deleting that own property exposes inheritance again. No method was copied into the instance when it was created.

## Interview pitfalls

Use `Object.hasOwn` when you mean an own property; `in` includes inherited properties. Do not merge untrusted property names into arbitrary object prototypes. Prefer object creation with the intended prototype over repeatedly changing prototypes at runtime.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)

## Continue the interview series

- [Previous: 14. Explain call, apply, and bind.](/blog/interview-014-call-apply-bind)
- [Next: 16. How does inheritance work in JavaScript?](/blog/interview-016-javascript-inheritance)
- [Browse all 100 questions](/blog?series=interview)
