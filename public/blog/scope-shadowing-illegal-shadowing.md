---
slug: "scope-shadowing-illegal-shadowing"
title: "Block Scope, Shadowing, and Illegal Shadowing"
date: "February 28, 2026"
readTime: "6 min read"
category: "JavaScript"
excerpt: "Understand let/const lexical boundary rules and what constitutes illegal shadowing in JavaScript."
---
Variable shadowing occurs when an inner scope declares a variable with the same name as an outer scope variable.


### Illegal Shadowing

You cannot shadow a `let` variable with a `var` variable in a nested block. This raises a compilation syntax error because `var` attempts to escape the block scope, leaking context bindings.
