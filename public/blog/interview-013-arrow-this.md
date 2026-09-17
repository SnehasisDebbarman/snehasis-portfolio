---
slug: "interview-013-arrow-this"
title: "13. How is this different in arrow functions?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "An arrow function does not create its own this binding."
series: "interview"
questionNumber: "13"
---

## The answer

An arrow function does not create its own `this` binding. It uses `this` from the surrounding lexical context. That makes it useful for a callback inside a method that needs the method's receiver.

An arrow is not a drop-in replacement for every function. It cannot be called with `new`, has no own `arguments`, and cannot have its receiver replaced with `call`, `apply` or `bind`.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
const team = {
  name: "Frontend",
  members: ["Mira", "Ari"],
  labels() {
    return this.members.map(member => `${this.name}: ${member}`);
  },
};
console.log(team.labels());
// ["Frontend: Mira", "Frontend: Ari"]
function makeReader() {
  return () => this.name;
}
const reader = makeReader.call({ name: "Original" });
console.log(reader.call({ name: "Replacement" })); // Original
```

## Walk through the result

The map callback uses the `this` of `labels`. The second arrow captures the receiver of `makeReader`; calling it with a different receiver cannot override that capture.

This is why arrows often remove the need for `const self = this` in asynchronous callbacks.

## Interview pitfalls

An arrow used as an object-literal method captures the surrounding context, not the object literal. Class-field arrows create per-instance functions; prototype methods are shared. Choose based on binding needs rather than using arrows everywhere.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

## Continue the interview series

- [Previous: 12. How does the this keyword work?](/blog/interview-012-this-keyword)
- [Next: 14. Explain call, apply, and bind.](/blog/interview-014-call-apply-bind)
- [Browse all 100 questions](/blog?series=interview)
