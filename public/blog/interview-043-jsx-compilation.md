---
slug: "interview-043-jsx-compilation"
title: "43. How does JSX get converted into JavaScript?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "A compiler such as Babel or the framework's compiler transforms JSX into calls that create React element descriptions."
series: "interview"
questionNumber: "43"
---

## The answer

A compiler such as Babel or the framework's compiler transforms JSX into calls that create React element descriptions. With the automatic JSX runtime, the build inserts imports from `react/jsx-runtime`. The classic transform uses `React.createElement`.

The result describes a UI tree; it does not immediately create browser DOM nodes. Rendering and committing are later steps.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { createElement } from "react";
// JSX form:
const withJSX = <h1 className="title">Hello, reader</h1>;
// Equivalent classic-runtime form for this simple element:
const withoutJSX = createElement(
  "h1",
  { className: "title" },
  "Hello, reader"
);
export default function App() {
  return <main>{withJSX}{withoutJSX}</main>;
}
```

## Walk through the result

Both headings render the same visible content. Inspecting compiled output may show jsx or jsxs helper calls instead of createElement because the exact transform depends on the configured runtime and development mode.

Understanding this helps explain why JSX expressions can be stored in variables and passed as props.

## Interview pitfalls

Do not manually depend on the private shape of a React element object or copy compiler output as an application API. A TypeScript type check and a JSX transform are separate responsibilities, even when the framework's build pipeline coordinates both.

## Sources and further reading

- [Official documentation](https://babeljs.io/docs/babel-plugin-transform-react-jsx)

## Continue the interview series

- [Previous: 42. What is JSX?](/blog/interview-042-jsx)
- [Next: 44. What is the Virtual DOM?](/blog/interview-044-virtual-dom)
- [Browse all 100 questions](/blog?series=interview)
