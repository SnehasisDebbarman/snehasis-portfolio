---
slug: "interview-003-type-coercion"
title: "3. What is type coercion in JavaScript?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Coercion converts a value to another type."
series: "interview"
questionNumber: "3"
---

## The answer

Coercion converts a value to another type. It can be explicit, such as `Number(input)`, or implicit, such as string concatenation with `+`. The operator determines which conversion rules apply.

At a form or API boundary, explicit conversion followed by validation communicates intent. Converting successfully is not the same as validating a useful domain value: an empty string becomes zero, which may not be a valid quantity.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
console.log("8" + 2); // "82"
console.log("8" - 2); // 6
console.log(Boolean("false")); // true
console.log(Number("")); // 0
function parseQuantity(raw) {
  if (typeof raw !== "string" || raw.trim() === "") {
    throw new Error("Enter a quantity");
  }
  const quantity = Number(raw);
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Quantity must be a positive integer");
  }
  return quantity;
}
console.log(parseQuantity("12")); // 12
```

## Walk through the result

The first expression concatenates because one operand becomes a string; subtraction requires numeric conversion. A nonempty string is truthy regardless of whether its letters spell “false.” The parser separates missing input from invalid numeric input before returning a number.

## Interview pitfalls

Do not scatter unary `+` conversions throughout business logic and hope every input has the right shape. Parse once at the boundary. Objects can customize primitive conversion, so avoid using unknown objects in arithmetic without checking their contract.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)

## Continue the interview series

- [Previous: 2. What are primitive and reference data types?](/blog/interview-002-primitive-reference-types)
- [Next: 4. What is the difference between == and ===?](/blog/interview-004-loose-strict-equality)
- [Browse all 100 questions](/blog?series=interview)
