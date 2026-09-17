---
slug: "prototypal-inheritance-javascript"
title: "JavaScript Prototype & Prototypal Inheritance"
date: "March 28, 2026"
readTime: "6 min read"
category: "JavaScript"
excerpt: "Learn about proto, prototype properties, prototype chains, and how inheritance works in JavaScript."
---
Unlike classical class-based languages, JavaScript uses **Prototypal Inheritance**. Every object in JavaScript has an internal property linking it to another object, called its **prototype**.


### The Prototype Chain

When you access a property on an object, JavaScript looks for it locally. If not found, it traverses up the prototype chain link (`__proto__`) until it either finds the property or reaches `null`.
