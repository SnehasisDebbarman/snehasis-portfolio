---
slug: "js-execution-context"
title: "GEC, FEC, and the Call Stack: Follow JavaScript Execution"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Understand global and function execution contexts without relying on misleading memory-box diagrams."
---

GEC and FEC are common teaching abbreviations for global execution context and function execution context. An execution context tracks the running code and the environments used to resolve its variables. A call stack tracks nested execution; its most recent frame runs first.

## Follow a complete trace

```js
const rate = 2;
function multiply(value) {
  const result = value * rate;
  return result;
}
function total() {
  return multiply(4) + multiply(6);
}
console.log(total()); // 20
```

Run it in the compiler. The surrounding script starts, `total` is called, and then the first `multiply` call is pushed. Returning `8` removes that frame. The second call gets its own `value` and `result`, returns `12`, and is removed. Finally `total` returns `20`.

```text
script
script → total
script → total → multiply(4)
script → total
script → total → multiply(6)
script → total
script
```

## Creation and execution are a teaching model

Declaration setup happens before statement evaluation, but saying every variable starts as `undefined` is incorrect. `var` bindings are initialized that way; lexical declarations remain uninitialized until their declaration executes. Access during that interval throws. Function declarations are generally available before their statement location in their containing scope.

```js
console.log(value); // undefined
var value = 10;
try {
  console.log(other);
} catch (error) {
  console.log(error.name); // ReferenceError
}
let other = 20;
```

The examples describe observable semantics, not a promise about physical engine memory layout. Engines optimize storage aggressively.

## Scripts, modules, and this

A browser classic script, an ES module, a Node module, and a Worker do not share identical global behavior. Top-level `this` in an ES module is `undefined`. A top-level `let` does not become a property on `window`. Avoid explaining every environment as “GEC equals window.”

## Asynchronous work

A timer callback does not wait as an active frame on the call stack. The host schedules it for later; when it runs, it gets its own execution context. Promises also schedule later reactions. See [the event loop](/blog/javascript-event-loop) for an output-order exercise.

## Debugging exercise

Place a breakpoint inside `multiply` in DevTools and inspect the Call Stack and Scope panels. Compare the two invocations: the same source code executes with different bindings. That is more useful than memorizing a diagram without tracing values.

## Sources and further reading

- [MDN execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
- [MDN var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
