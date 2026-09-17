---
slug: "polyfills-map-filter-reduce"
title: "Polyfills: Writing Map, Filter, and Reduce"
date: "April 15, 2026"
readTime: "5 min read"
category: "JavaScript"
excerpt: "Learn how array prototype methods are implemented under the hood by building custom polyfills from scratch."
---
Writing polyfills is a classic method to understand JavaScript prototype behaviors. Let's write custom versions of `map`, `filter`, and `reduce`.


### Map Polyfill

```
Array.prototype.myMap = function(cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this));
  }
  return temp;
};
```


### Reduce Polyfill

```
Array.prototype.myReduce = function(cb, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator !== undefined 
      ? cb(accumulator, this[i], i, this) 
      : this[i];
  }
  return accumulator;
};
```
