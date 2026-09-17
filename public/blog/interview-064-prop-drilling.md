---
slug: "interview-064-prop-drilling"
title: "64. What is prop drilling?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Prop drilling means passing data through intermediate components that do not use it themselves, solely to reach a descendant."
series: "interview"
questionNumber: "64"
---

## The answer

Prop drilling means passing data through intermediate components that do not use it themselves, solely to reach a descendant. A few explicit props are normal and easy to trace. It becomes awkward when many unrelated layers must forward the same information.

Before introducing global state, consider composition: a parent can construct the relevant child and pass that UI through a layout slot.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
function Avatar({ name }) {
  return <span aria-label={`Account: ${name}`}>{name.slice(0, 1)}</span>;
}
function Toolbar({ account }) {
  return <header><h1>Workspace</h1>{account}</header>;
}
function Layout({ toolbar, children }) {
  return <main>{toolbar}<section>{children}</section></main>;
}
export default function App() {
  const user = { name: "Mira" };
  return <Layout toolbar={<Toolbar account={<Avatar name={user.name} />} />}>
    <p>Your dashboard</p>
  </Layout>;
}
```

## Walk through the result

App supplies the Avatar where it knows the user. Layout and Toolbar handle placement rather than forwarding a user object through every layer. Their interfaces describe UI composition instead of unrelated domain data.

## Interview pitfalls

Composition does not replace every shared-data use case. Context can be appropriate for broadly needed values such as a theme or current account. Avoid introducing a global store merely because one component has to forward one prop.

## Sources and further reading

- [Official documentation](https://react.dev/learn/passing-data-deeply-with-context#before-you-use-context)

## Continue the interview series

- [Previous: 63. What is the difference between useMemo, useCallback, and React.memo?](/blog/interview-063-memoization-apis)
- [Next: 65. How does the Context API work?](/blog/interview-065-context-api)
- [Browse all 100 questions](/blog?series=interview)
