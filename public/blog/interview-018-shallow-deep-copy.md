---
slug: "interview-018-shallow-deep-copy"
title: "18. What is the difference between shallow copy and deep copy?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "A shallow copy creates a new outer container while preserving references to nested objects."
series: "interview"
questionNumber: "18"
---

## The answer

A shallow copy creates a new outer container while preserving references to nested objects. A deep copy duplicates supported nested values as well. Object spread and `Object.assign` are shallow operations.

The right choice depends on ownership. For an immutable state update, copying only the changed path is often more useful than cloning the entire object graph.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
const original = { name: "Mira", address: { city: "Pune" } };
const shallow = { ...original };
shallow.name = "Ari";
shallow.address.city = "Delhi";
console.log(original.name); // Mira
console.log(original.address.city); // Delhi
const deep = structuredClone(original);
deep.address.city = "Kochi";
console.log(original.address.city); // Delhi
const updated = { ...original, address: { ...original.address, city: "Pune" } };
console.log(updated.address.city); // Pune
```

## Walk through the result

The first copy owns a different top-level object, but both objects share `address`. `structuredClone` creates an independent supported nested object. The final update changes one branch while keeping other unchanged values reusable.

## Interview pitfalls

“Deep” does not mean “copies every JavaScript thing.” Functions and DOM nodes are not structured-cloneable, and custom class behavior is not preserved as a general object-cloning contract. JSON round trips also lose or change many values and cannot handle cycles.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)

## Continue the interview series

- [Previous: 17. What is the difference between a class and a constructor function?](/blog/interview-017-class-constructor-function)
- [Next: 19. How can you clone an object safely?](/blog/interview-019-safe-object-cloning)
- [Browse all 100 questions](/blog?series=interview)
