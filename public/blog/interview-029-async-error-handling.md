---
slug: "interview-029-async-error-handling"
title: "29. How do you handle errors in asynchronous JavaScript?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Attach error handling to the asynchronous chain that can fail."
series: "interview"
questionNumber: "29"
---

## The answer

Attach error handling to the asynchronous chain that can fail. With await, use try/catch around the awaited operation. With promise chains, return the promise and handle rejection. A synchronous try/catch cannot catch an exception thrown later in an unrelated timer callback.

Decide which layer can recover, which should report failure, and which must release resources. Do not silently turn every failure into success.

## Code example

Run this standalone example in a modern browser console or Node.js.

```js
async function readJSON(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
async function main() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const todo = await readJSON("https://jsonplaceholder.typicode.com/todos/1", controller.signal);
    console.log(todo.title);
  } catch (error) {
    console.error(error.name === "AbortError" ? "Request cancelled" : error.message);
  } finally {
    clearTimeout(timer);
  }
}
main();
```

## Walk through the result

The code handles network rejection, unsuccessful HTTP status and JSON parsing failure through one chain. Cleanup clears the timeout whether the request succeeds or fails. The public demonstration API requires network access and can be unavailable.

## Interview pitfalls

Validate the returned JSON shape before trusting it in application logic. An abort is not a server-side transaction rollback. In UI code, distinguish cancellation from errors the user should act on, and avoid logging credentials or private response bodies.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Continue the interview series

- [Previous: 28. What is the difference between Promise.all, allSettled, race, and any?](/blog/interview-028-promise-combinators)
- [Next: 30. What is callback hell and how can you avoid it?](/blog/interview-030-callback-hell)
- [Browse all 100 questions](/blog?series=interview)
