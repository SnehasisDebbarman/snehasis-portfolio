---
slug: "interview-020-freeze-seal"
title: "20. What is the difference between Object.freeze() and Object.seal()?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Both prevent adding or deleting own properties."
series: "interview"
questionNumber: "20"
---

## The answer

Both prevent adding or deleting own properties. Sealing makes existing own properties non-configurable but can leave writable data properties writable. Freezing additionally makes those data properties non-writable.

Both operations are shallow. Freezing an object does not recursively freeze objects stored inside it, and it does not transform every built-in collection into an immutable value.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
"use strict";
const sealed = Object.seal({ count: 1 });
sealed.count = 2;
console.log(sealed.count); // 2
const frozen = Object.freeze({ nested: { count: 1 } });
frozen.nested.count = 3;
console.log(frozen.nested.count); // 3
try {
  frozen.nested = { count: 4 };
} catch (error) {
  console.log(error.name); // TypeError
}
console.log(Object.isFrozen(frozen)); // true
console.log(Object.isFrozen(frozen.nested)); // false
```

## Walk through the result

The nested binding cannot be replaced, but the nested object's own properties remain mutable. Strict mode makes the prohibited assignment throw instead of potentially failing silently.

Freezing can document a configuration object's intended shape, while sealing can allow updates to a fixed set of fields.

## Interview pitfalls

A recursive deep-freeze helper must handle cycles and special object types. Avoid claiming `Object.freeze(new Map())` prevents calls to `set`. For application state, immutable update discipline or a suitable library is often more practical than recursively freezing every value.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

## Continue the interview series

- [Previous: 19. How can you clone an object safely?](/blog/interview-019-safe-object-cloning)
- [Next: 21. What is the JavaScript event loop?](/blog/interview-021-event-loop)
- [Browse all 100 questions](/blog?series=interview)
