---
slug: "interview-010-closure"
title: "10. What is a closure?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "A closure is a function together with access to its surrounding lexical environment."
series: "interview"
questionNumber: "10"
---

## The answer

A closure is a function together with access to its surrounding lexical environment. It can keep using outer bindings after the outer function has returned. Closures capture bindings, not automatically frozen copies of values.

A counter is a useful example because it demonstrates both persistence and isolation: calls to one returned function share its state, while separate factory calls create separate environments.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
function makeCounter(start = 0) {
  let count = start;
  return function increment() {
    count += 1;
    return count;
  };
}
const first = makeCounter();
const second = makeCounter(10);
console.log(first()); // 1
console.log(first()); // 2
console.log(second()); // 11
```

## Walk through the result

`first` keeps access to the count created by its own `makeCounter` call. The second call creates another binding. Nothing needs to be copied into a global object for either counter to remember its value.

This is the same mechanism behind callbacks that remember configuration and React handlers that see values from a particular render.

## Interview pitfalls

A closure may retain objects longer than intended if the function remains reachable. In UI code, remove listeners and timers when their owner disappears. Also distinguish a changing binding from a string computed once from that binding: the string will not recompute itself.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)

## Continue the interview series

- [Previous: 9. What is scope chaining?](/blog/interview-009-scope-chain)
- [Next: 11. What are practical use cases of closures?](/blog/interview-011-closure-use-cases)
- [Browse all 100 questions](/blog?series=interview)
