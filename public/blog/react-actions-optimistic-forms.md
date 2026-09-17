---
slug: "react-actions-optimistic-forms"
title: "React 19 Forms: Actions, Optimistic UI, and Form Status"
date: "September 17, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Use action state and pending feedback with working local examples, then understand optimistic rollback."
---

React 19 actions let forms coordinate asynchronous work with pending state. These examples need React 19 or newer and JSX tooling. They are browser-local simulations, not server persistence or authentication.

## Action state and form status

Save as `App.jsx`. The action validates a name, waits briefly to simulate a request, and returns a result. `Submit` must be inside the form whose status it reads.

```jsx
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
async function save(previous, formData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return { message: "Enter a name." };
  await new Promise(resolve => setTimeout(resolve, 500));
  return { message: `Saved locally: ${name}` };
}
function Submit() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Saving…" : "Save"}</button>;
}
export default function App() {
  const [state, action, pending] = useActionState(save, { message: "" });
  return <form action={action} aria-busy={pending}>
    <label>Name <input name="name" /></label>
    <Submit />
    <p role="status">{state.message}</p>
  </form>;
}
```

`useActionState` provides the previous result to the next action invocation. For a real request, handle failures inside the action and return a clear result. Server endpoints must independently authenticate, authorize, and validate; browser form validation is not a security boundary.

## Optimistic updates with reconciliation

This independent React 19 example lets you simulate a failed save. A temporary item appears while the action runs. On success, confirmed state replaces it; on failure, the optimistic item disappears and a message remains.

```jsx
import { useOptimistic, useState } from "react";
export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [optimistic, addOptimistic] = useOptimistic(notes, (items, item) => [...items, item]);
  async function add(formData) {
    const text = String(formData.get("text") || "").trim();
    if (!text) return;
    const item = { id: crypto.randomUUID(), text };
    setError("");
    addOptimistic({ ...item, pending: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      if (formData.has("fail")) throw new Error("Simulated failure; please retry.");
      setNotes(current => [...current, item]);
    } catch (failure) { setError(failure.message); }
  }
  return <>
    <form action={add}>
      <input name="text" aria-label="Note" required />
      <label><input type="checkbox" name="fail" />Simulate failure</label>
      <button>Add note</button>
    </form>
    <p role="alert">{error}</p>
    <ul>{optimistic.map(item => <li key={item.id}>{item.text}{item.pending ? " (saving…)" : ""}</li>)}</ul>
  </>;
}
```

## Effect events and resource reading

`useEffectEvent` requires React 19.2+. It is for logic called from effects that needs current props/state without re-subscribing for those values. Do not call effect events from ordinary click handlers or use them to hide genuinely reactive dependencies.

The `use` API can read a promise supplied by a compatible framework and suspend while it is pending. Unlike ordinary hooks, it can be called in conditions, but still only within a component or hook. Do not create a fresh uncached promise on every client render. Use the framework's resource-loading mechanism and a Suspense boundary.

## Check before shipping

Test success, failure, repeated submission, navigation during submission, and slow responses. Optimistic UI should use stable IDs so temporary entries reconcile with confirmed entries predictably. A friendly pending label improves feedback; it does not replace backend concurrency or duplicate-write protection.

## Sources and further reading

- [useActionState](https://react.dev/reference/react/useActionState)
- [useOptimistic](https://react.dev/reference/react/useOptimistic)
- [useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus)
- [useEffectEvent](https://react.dev/reference/react/useEffectEvent)
- [use resource API](https://react.dev/reference/react/use)
