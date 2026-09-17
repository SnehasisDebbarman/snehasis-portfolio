---
slug: "js-closures-deep-dive"
title: "Closures and Lexical Scope: What a Function Remembers"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Trace variable lookup, create private state, and recognize stale closures in callbacks."
---

Lexical scope means a function's variable lookup follows where it was defined. A closure lets that function continue accessing surrounding bindings after the outer function has returned. It retains access to bindings, not a frozen copy of every value.

## Trace two independent counters

```js
function createCounter(start = 0) {
  let count = start;
  return {
    next() { count += 1; return count; },
    current() { return count; }
  };
}
const a = createCounter(10);
const b = createCounter(100);
console.log(a.next());    // 11
console.log(a.next());    // 12
console.log(b.next());    // 101
console.log(a.current()); // 12
```

Run the block in the compiler. Each call to `createCounter` creates a separate binding for `count`. The two methods returned by one call share that binding. Calling `b.next()` cannot change `a` because its methods were created in a different environment.

## Definition location beats call location

```js
const label = "outside";
function readLabel() { return label; }
function caller() {
  const label = "inside";
  return readLabel();
}
console.log(caller()); // outside
```

Walk outward from the definition of `readLabel`, not from its caller. The caller's local `label` is irrelevant to that lookup. Avoid confusing this with `this`, whose value follows different rules for ordinary functions.

## Captured binding versus computed snapshot

```js
function createLabel() {
  let count = 0;
  const snapshot = `Count: ${count}`;
  return {
    increment() { count += 1; },
    stale() { return snapshot; },
    fresh() { return `Count: ${count}`; }
  };
}
const item = createLabel();
item.increment();
console.log(item.stale()); // Count: 0
console.log(item.fresh()); // Count: 1
```

`snapshot` was computed once. It does not update when `count` changes. This distinction helps explain React callbacks created during an earlier render: each render has its own values and functions. Use correct dependencies or state updater functions rather than assuming an old callback sees new state automatically.

## Cleanup and memory

Closures are normal, useful language behavior. A memory leak occurs when something retains a function longer than needed, such as an abandoned subscription retaining a large object. Remove listeners, clear timers, and release unnecessary references. Garbage collection can reclaim an environment once nothing reachable needs it.

## Practice

Add a `reset()` method to the first counter. Predict whether it affects both counters, then verify the result. Follow with the [block scope](/blog/scope-shadowing-illegal-shadowing) article to understand per-iteration bindings.

## Sources and further reading

- [MDN closure semantics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)
- [React state snapshots](https://react.dev/learn/state-as-a-snapshot)
