---
slug: "interview-019-safe-object-cloning"
title: "19. How can you clone an object safely?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Start by defining what kinds of values the object contains and what the clone must preserve."
series: "interview"
questionNumber: "19"
---

## The answer

Start by defining what kinds of values the object contains and what the clone must preserve. For supported data such as plain objects, arrays, Maps, Sets, Dates and cycles, `structuredClone` is usually a better starting point than JSON serialization.

For class instances or resources, write an explicit reconstruction method. Copying data is different from duplicating behavior, ownership or a live connection.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
const original = {
  createdAt: new Date("2026-01-01T00:00:00Z"),
  tags: new Set(["react"]),
  nested: { count: 1 },
};
original.self = original;
const copy = structuredClone(original);
copy.nested.count = 2;
copy.tags.add("nextjs");
console.log(copy.createdAt instanceof Date); // true
console.log(copy.self === copy); // true
console.log(original.nested.count); // 1
console.log(original.tags.size, copy.tags.size); // 1 2
```

## Walk through the result

The cloned cycle points back to the clone, not the original. The Date and Set remain useful built-in values, and nested mutations are independent. This is data the JSON approach would not preserve faithfully without custom encoding and decoding.

## Interview pitfalls

Cloning is not sanitization or schema validation. Reject unsupported inputs deliberately rather than silently falling back to a lossy method. Transferable buffers can be moved rather than copied, which detaches them from the original owner; only request transfer when that ownership change is intended.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone)

## Continue the interview series

- [Previous: 18. What is the difference between shallow copy and deep copy?](/blog/interview-018-shallow-deep-copy)
- [Next: 20. What is the difference between Object.freeze() and Object.seal()?](/blog/interview-020-freeze-seal)
- [Browse all 100 questions](/blog?series=interview)
