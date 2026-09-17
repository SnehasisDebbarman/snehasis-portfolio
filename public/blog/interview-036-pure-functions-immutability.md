---
slug: "interview-036-pure-functions-immutability"
title: "36. What are pure functions and immutability?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "A pure function produces the same result for the same inputs and does not cause observable side effects."
series: "interview"
questionNumber: "36"
---

## The answer

A pure function produces the same result for the same inputs and does not cause observable side effects. Immutability means treating existing values as unchangeable and producing replacements for updates.

Together they make behavior easier to test and compose. A function that mutates only a newly created local object can still be pure; the important boundary is what callers can observe.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function renameUser(user, name) {
  return { ...user, name };
}
function addTag(user, tag) {
  return { ...user, tags: [...user.tags, tag] };
}
const original = { name: "Mira", tags: ["js"] };
const renamed = renameUser(original, "Ari");
const tagged = addTag(original, "react");
console.log(original); // { name: "Mira", tags: ["js"] }
console.log(renamed.name); // Ari
console.log(tagged.tags); // ["js", "react"]
console.log(original.tags === tagged.tags); // false
```

## Walk through the result

The update creates a new container for each changed path. Unchanged branches can retain identity. This supports predictable state transitions without deep-cloning everything on each update.

## Interview pitfalls

A function that reads Date.now, randomness or mutable global configuration is not deterministic from its explicit arguments alone. Pass such inputs in when deterministic tests matter. Immutability is not the same as declaring every variable with const; nested objects can still be mutated.

## Sources and further reading

- [Official documentation](https://react.dev/learn/keeping-components-pure)

## Continue the interview series

- [Previous: 35. What is memoization?](/blog/interview-035-memoization)
- [Next: 37. What is event bubbling and event capturing?](/blog/interview-037-bubbling-capturing)
- [Browse all 100 questions](/blog?series=interview)
