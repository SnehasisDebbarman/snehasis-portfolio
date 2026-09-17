---
slug: "hoisting-temporal-dead-zone"
title: "Understanding Hoisting & Temporal Dead Zone"
date: "May 02, 2026"
readTime: "5 min read"
category: "JavaScript"
excerpt: "Discover the difference in hoisting behavior between var, let, and const, and why the Temporal Dead Zone exists."
---
In JavaScript, you can access functions and variables before they are declared in the code. This phenomenon is known as **Hoisting**.


### Var vs. Let/Const Hoisting

Variables declared with `var` are hoisted and initialized with `undefined`. Variables declared with `let` and `const` are also hoisted, but they are initialized inside a separate memory scope (Script scope) and are not initialized.


### The Temporal Dead Zone (TDZ)

The time window between a `let` or `const` variable's hoisting allocation and its actual inline initialization statement is called the **Temporal Dead Zone (TDZ)**. Accessing the variable in this zone triggers a `ReferenceError`.
