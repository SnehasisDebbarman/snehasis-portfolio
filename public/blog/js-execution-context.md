---
slug: "js-execution-context"
title: "Demystifying JavaScript Execution Context"
date: "May 05, 2026"
readTime: "6 min read"
category: "JavaScript"
excerpt: "How JavaScript runs code under the hood. Learn about the Call Stack, Creation Phase, and Execution Phase."
---
Everything in JavaScript happens inside an **Execution Context**. Think of it as a big box where JavaScript code is evaluated and executed.


### The Two Phases

An execution context is created in two distinct phases:

1. **Memory Creation Phase:** JS engine scans the code and allocates memory to variables (initialized as `undefined`) and functions (copied as entire declarations).
2. **Code Execution Phase:** Code is executed line-by-line, and values are assigned to memory slots.


### The Call Stack

JavaScript manages execution contexts using the **Call Stack**. When a script runs, the Global Execution Context is pushed to the bottom. Each function invocation creates a new context, which is pushed on top and popped off when execution completes.
