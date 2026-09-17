---
slug: "prototypal-inheritance-javascript"
title: "Prototypes, Inheritance, and the Prototype Chain"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Trace own and inherited properties, understand constructor prototypes, and avoid shared mutable state."
---

JavaScript objects can delegate property lookup to another object, their prototype. If a property is not found on the object itself, lookup continues through that chain until a value is found or the chain ends at `null`.

## Inspect delegation directly

```js
const animal = {
  describe() { return `${this.name} is an animal`; }
};
const pet = Object.create(animal);
pet.name = "Milo";
console.log(pet.describe()); // Milo is an animal
console.log(Object.hasOwn(pet, "name")); // true
console.log(Object.hasOwn(pet, "describe")); // false
console.log(Object.getPrototypeOf(pet) === animal); // true
```

Run this in the compiler. The method is found on `animal`, but it is called through `pet`, so `this.name` reads the pet's own name. Delegation avoids copying the method to every instance.

## Constructor prototype versus object prototype

```js
function Person(name) { this.name = name; }
Person.prototype.greet = function () { return `Hello, ${this.name}`; };
const person = new Person("Asha");
console.log(person.greet()); // Hello, Asha
console.log(Object.getPrototypeOf(person) === Person.prototype); // true
console.log(Object.getPrototypeOf(Person) === Function.prototype); // true
```

The constructor's `.prototype` is used for instances created with `new`. The constructor itself is also an object with its own prototype. These are different relationships.

## Classes use the same delegation model

```js
class User {
  constructor(name) { this.name = name; }
  label() { return this.name; }
}
class Admin extends User {
  label() { return `${super.label()} (admin)`; }
}
console.log(new Admin("Riya").label()); // Riya (admin)
```

Classes add defined semantics and convenient syntax, including strict-mode bodies and constructor rules. They do not replace prototype-based method lookup with a separate inheritance engine.

## Common bugs

Putting a mutable array on a shared prototype makes every instance see that array until shadowed. Initialize per-instance collections in the constructor. `for...in` includes enumerable inherited properties; use `Object.keys` or an own-property check when you only want local fields.

Avoid modifying built-in prototypes in application code. It can collide with future platform APIs and other dependencies. Untrusted object merging also needs care around prototype-related keys; a prototype-chain lesson should not become a reason to recursively assign arbitrary data into configuration objects.

## Exercise

Give `pet` its own `describe` method, call it, delete that own method, and call again. Observe shadowing first, then delegation. Use `Object.getPrototypeOf`, rather than legacy `__proto__`, for inspection.

## Sources and further reading

- [MDN inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)
- [MDN Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
