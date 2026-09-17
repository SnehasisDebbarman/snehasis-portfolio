---
slug: "interview-042-jsx"
title: "42. What is JSX?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "JSX is a syntax extension that lets JavaScript describe element trees with markup-like notation."
series: "interview"
questionNumber: "42"
---

## The answer

JSX is a syntax extension that lets JavaScript describe element trees with markup-like notation. It is not an HTML string and is not understood directly by ordinary browsers. Build tooling transforms it into JavaScript calls.

Curly braces embed JavaScript expressions. Component names start with a capital letter, while lowercase tags identify host elements such as div and button.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
const topics = ["Closures", "Hooks", "Routing"];
export default function App() {
  const name = "Mira";
  return <section className="lesson">
    <h1>Welcome, {name}</h1>
    <p>{topics.length > 0 ? "Choose a topic" : "Nothing scheduled"}</p>
    <ul>{topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
    <label htmlFor="note">Your note</label>
    <input id="note" />
  </section>;
}
```

## Walk through the result

The array map returns a list of elements, and the conditional expression chooses text. `className` and `htmlFor` use the React DOM property conventions. The input is self-closing because JSX requires explicit tag closure.

## Interview pitfalls

Statements such as if cannot be inserted directly inside JSX expression braces; use a conditional expression or prepare a value before return. React escapes ordinary text values, but deliberately injecting raw HTML bypasses that protection and requires careful sanitization.

## Sources and further reading

- [Official documentation](https://react.dev/learn/writing-markup-with-jsx)

## Continue the interview series

- [Previous: 41. What is React, and why is it used?](/blog/interview-041-what-is-react)
- [Next: 43. How does JSX get converted into JavaScript?](/blog/interview-043-jsx-compilation)
- [Browse all 100 questions](/blog?series=interview)
