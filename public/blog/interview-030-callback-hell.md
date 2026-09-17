---
slug: "interview-030-callback-hell"
title: "30. What is callback hell and how can you avoid it?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Callback hell describes control flow that becomes difficult to follow because each dependent operation is nested inside another callback."
series: "interview"
questionNumber: "30"
---

## The answer

Callback hell describes control flow that becomes difficult to follow because each dependent operation is nested inside another callback. The problem includes error propagation, repeated cleanup and mixed responsibilities, not indentation alone.

Give steps names and return promises so sequencing and failure handling become explicit. Keep dependencies sequential, while independent work can start together.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
// Legacy error-first API used only for this demonstration.
function readProfile(id, callback) {
  setTimeout(() => callback(null, { id, name: "Mira" }), 10);
}
function readProfileAsync(id) {
  return new Promise((resolve, reject) => {
    readProfile(id, (error, profile) => {
      if (error) { reject(error); return; }
      resolve(profile);
    });
  });
}
async function showProfile() {
  const profile = await readProfileAsync(1);
  return `Welcome, ${profile.name}`;
}
showProfile().then(console.log).catch(console.error);
```

## Walk through the result

The adapter translates an error-first callback into a single promise result. The caller can now await the operation and let rejection propagate to one visible handler. In Node.js, `util.promisify` already handles many conventional error-first APIs.

## Interview pitfalls

Do not assume every callback API invokes its callback only once or uses the error-first convention. Streams and subscriptions represent many values and need a different abstraction. Avoid rewriting simple event handlers into promises merely to remove the word callback.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

## Continue the interview series

- [Previous: 29. How do you handle errors in asynchronous JavaScript?](/blog/interview-029-async-error-handling)
- [Next: 31. What is debouncing?](/blog/interview-031-debouncing)
- [Browse all 100 questions](/blog?series=interview)
