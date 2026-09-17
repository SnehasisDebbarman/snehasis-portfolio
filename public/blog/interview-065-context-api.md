---
slug: "interview-065-context-api"
title: "65. How does the Context API work?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Context lets a provider make a value available to descendants without forwarding it through every intermediate component."
series: "interview"
questionNumber: "65"
---

## The answer

Context lets a provider make a value available to descendants without forwarding it through every intermediate component. useContext reads the nearest matching provider above the consuming component.

Context transports a value; it is not a state container by itself. A provider often uses state or a reducer to manage the value it exposes.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { createContext, useContext, useState } from "react";
const ThemeContext = createContext("light");
function Preview() {
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}
function Panel() { return <section><Preview /></section>; }
export default function App() {
  const [theme, setTheme] = useState("light");
  return <ThemeContext.Provider value={theme}>
    <button onClick={() => setTheme(value => value === "light" ? "dark" : "light")}>Toggle theme</button>
    <Panel />
  </ThemeContext.Provider>;
}
```

## Walk through the result

Preview reads the provider even though Panel never receives a theme prop. Updating the provider value updates consumers. The default value is used only when no matching provider exists above the consumer.

## Interview pitfalls

A provider returned by a component does not affect useContext calls earlier in that same component; the provider must be above the consumer. React 19 also supports the shorter provider syntax, but this example uses Provider for React 18 compatibility.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react/useContext)

## Continue the interview series

- [Previous: 64. What is prop drilling?](/blog/interview-064-prop-drilling)
- [Next: 66. When should Context be avoided?](/blog/interview-066-avoid-context)
- [Browse all 100 questions](/blog?series=interview)
