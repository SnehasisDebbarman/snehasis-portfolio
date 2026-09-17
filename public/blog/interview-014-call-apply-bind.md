---
slug: "interview-014-call-apply-bind"
title: "14. Explain call, apply, and bind."
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "These methods control the receiver of an ordinary function."
series: "interview"
questionNumber: "14"
---

## The answer

These methods control the receiver of an ordinary function. `call` invokes immediately with separate arguments. `apply` invokes immediately with an array-like argument list. `bind` returns a new function that can be invoked later, optionally with some arguments already supplied.

Use them when adapting an existing function's calling convention. A plain wrapper is often clearer when the task does not need receiver manipulation.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function introduce(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}
const person = { name: "Mira" };
console.log(introduce.call(person, "Hello", "!"));
console.log(introduce.apply(person, ["Hi", "."]));
const welcome = introduce.bind(person, "Welcome");
console.log(welcome("!"));
// Hello, Mira!
// Hi, Mira.
// Welcome, Mira!
```

## Walk through the result

`welcome` stores both the receiver and the first argument. Its later argument completes the call. The original function remains unchanged.

This technique can preserve a receiver when passing a method into an event system. Keep the returned bound function if you will later need to remove the same callback.

## Interview pitfalls

Calling `bind` twice creates two different function objects, so adding one listener and removing another bound wrapper will not work. Arrow functions ignore receiver rebinding. Avoid educational polyfills that mutate the target object and present themselves as fully equivalent to native methods.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## Continue the interview series

- [Previous: 13. How is this different in arrow functions?](/blog/interview-013-arrow-this)
- [Next: 15. What are prototypes and prototype chains?](/blog/interview-015-prototypes-chain)
- [Browse all 100 questions](/blog?series=interview)
