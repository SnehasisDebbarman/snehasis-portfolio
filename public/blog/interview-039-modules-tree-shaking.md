---
slug: "interview-039-modules-tree-shaking"
title: "39. What are ES modules, CommonJS, and tree shaking?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "ES modules use import and export with statically analyzable declarations and live bindings."
series: "interview"
questionNumber: "39"
---

## The answer

ES modules use import and export with statically analyzable declarations and live bindings. CommonJS uses require and module.exports and is historically associated with Node.js. Their loading and interoperation rules depend on the runtime and package configuration.

Tree shaking is a build optimization that removes unused module exports when the bundler can prove doing so preserves behavior. ESM syntax helps that analysis but does not guarantee a small bundle.

## Code example

Create the four files named in the comments. These are separate ESM and CommonJS demonstrations, not one combined script.

```js
// math.mjs
export const double = value => value * 2;
export const triple = value => value * 3;
```

```js
// main.mjs — save as a separate file
import { double } from "./math.mjs";
console.log(double(4)); // 8
```

```js
// legacy.cjs — separate CommonJS example
module.exports = { double: value => value * 2 };
```

```js
// main.cjs — save as a separate file
const { double: legacyDouble } = require("./legacy.cjs");
console.log(legacyDouble(4)); // 8
```

## Walk through the result

Run `node main.mjs` and `node main.cjs` separately after saving the four files. Node executes the examples; it does not perform tree shaking for you. To inspect removal of triple, build the ESM entry with a production bundler and inspect its output.

## Interview pitfalls

A package can contain top-level side effects that must remain even when exports are unused. Incorrect sideEffects metadata can break an application by removing necessary CSS or initialization. Dynamic property access and some CommonJS patterns make static analysis harder.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

## Continue the interview series

- [Previous: 38. What is event delegation?](/blog/interview-038-event-delegation)
- [Next: 40. How do memory leaks happen in JavaScript, and how can you prevent them?](/blog/interview-040-memory-leaks)
- [Browse all 100 questions](/blog?series=interview)
