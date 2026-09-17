---
slug: "fetch-async-await-abort-controller"
title: "Fetch with async/await, try/catch, and AbortController"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Handle HTTP failures, JSON errors, timeouts, and cancellation without hiding useful error information."
---

Fetching data involves several independent failure points: the connection, the HTTP status, body decoding, and the shape of the decoded data. An `async` function makes this sequence easier to read, but it does not make all failures equivalent.

## A complete browser example

Paste this into the compiler or browser console. It calls a public demonstration API, so network access and that service's CORS policy must be available.

```js
async function loadTodo(id, { signal } = {}) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${encodeURIComponent(id)}`,
    { signal }
  );
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  if (typeof data.title !== "string") {
    throw new Error("Unexpected response: title is missing");
  }
  return data;
}

async function main() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const todo = await loadTodo(1, { signal: controller.signal });
    console.log(todo.title);
  } catch (error) {
    console.error(error.name === "AbortError" ? "Request cancelled or timed out" : error.message);
  } finally {
    clearTimeout(timeout);
  }
}
main();
```

On success, a title is printed. If the timer aborts first, the cancellation branch runs. An HTTP failure or invalid JSON follows the error branch. `finally` clears the timer regardless of which path completes.

## Why response.ok matters

Fetch generally rejects for network-level failures and cancellation. A server's 404 or 500 response is still a received response. Throw explicitly when your application's status policy treats it as failure. Also remember that a valid JSON document can have the wrong schema; parsing alone is not validation.

## Cancellation is not rollback

A signal can cancel response processing and a pending request from the caller's perspective. The server may already have processed a write. Do not promise that aborting a checkout request reverses a payment. Use server-side idempotency and application-specific recovery for writes.

## Prevent stale UI

For search, create one controller per request and abort the previous request when a new search begins. Ignore obsolete results as an additional guard when a library cannot be cancelled. Never reuse an already aborted controller for a new operation.

## Catch at the useful boundary

Catch where you can show a helpful message, retry safely, or attach context. Returning `undefined` for every error makes success and failure indistinguishable. Do not automatically retry non-idempotent writes, and do not try to fix CORS by using `no-cors`: the resulting opaque response cannot provide readable JSON.

## Sources and further reading

- [MDN Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [MDN try/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
