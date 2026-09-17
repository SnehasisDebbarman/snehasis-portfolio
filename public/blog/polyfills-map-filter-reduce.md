---
slug: "polyfills-map-filter-reduce"
title: "Array Polyfills: map, filter, and reduce Edge Cases"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Implement teaching versions without modifying built-ins and test sparse arrays and empty reductions."
---

A polyfill recreates an API's behavior for an environment missing it. An interview-sized loop is usually only a teaching approximation: production compatibility includes coercion, property access, sparse arrays, subclasses, and specification details.

## Standalone implementations

These helpers intentionally accept ordinary arrays only. They do not patch `Array.prototype` and are not full specification-compliant polyfills. Run the whole block in the compiler.

```js
function mapArray(array, callback, thisArg) {
  if (!Array.isArray(array) || typeof callback !== "function") throw new TypeError("Invalid input");
  const length = array.length;
  const result = new Array(length);
  for (let i = 0; i < length; i++) {
    if (i in array) result[i] = callback.call(thisArg, array[i], i, array);
  }
  return result;
}
function filterArray(array, callback, thisArg) {
  if (!Array.isArray(array) || typeof callback !== "function") throw new TypeError("Invalid input");
  const result = [];
  const length = array.length;
  for (let i = 0; i < length; i++) {
    if (i in array) {
      const value = array[i];
      if (callback.call(thisArg, value, i, array)) result.push(value);
    }
  }
  return result;
}
function reduceArray(array, callback, ...initial) {
  if (!Array.isArray(array) || typeof callback !== "function") throw new TypeError("Invalid input");
  const length = array.length;
  let i = 0;
  let accumulator;
  if (initial.length) accumulator = initial[0];
  else {
    while (i < length && !(i in array)) i++;
    if (i === length) throw new TypeError("Empty reduction needs an initial value");
    accumulator = array[i++];
  }
  for (; i < length; i++) {
    if (i in array) accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
}
console.log(mapArray([2, 3], n => n * 2)); // [4, 6]
console.log(filterArray([2, 3], n => n > 2)); // [3]
console.log(reduceArray([2, 3], (sum, n) => sum + n, 0)); // 5
console.log(reduceArray([], (sum, n) => sum + n, undefined)); // undefined
```

## Why the checks exist

`i in array` skips empty slots while still observing inherited indexed properties, as native methods do. Mapping preserves holes; filtering produces a packed result. Capturing length prevents a callback that pushes new elements from extending the current traversal indefinitely.

The rest parameter distinguishes **no initial value** from an explicitly supplied `undefined`. Testing `if (initialValue)` would incorrectly treat `0`, `false`, and empty strings as absent.

## Verify behavior

```js
// Run after the helpers above.
const sparse = [1, , 3];
const mapped = mapArray(sparse, n => n * 2);
console.log(mapped.length, 1 in mapped); // 3 false
try { reduceArray([], (a, b) => a + b); }
catch (error) { console.log(error.name); } // TypeError
```

For production, prefer native APIs and a maintained compatibility toolchain where required. A complete replacement should be checked against conformance tests rather than a few happy-path examples.

## Sources and further reading

- [MDN map semantics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [MDN filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
