---
slug: "interview-050-controlled-uncontrolled"
title: "50. What is the difference between controlled and uncontrolled components?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "For a controlled input, React state supplies the current value and an event handler updates that state."
series: "interview"
questionNumber: "50"
---

## The answer

For a controlled input, React state supplies the current value and an event handler updates that state. For an uncontrolled input, the DOM owns the current value, and code reads it when needed, such as during form submission.

Controlled inputs help coordinate validation and dependent UI. Uncontrolled inputs can keep simple forms concise without storing every keystroke in component state.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useState } from "react";
export default function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");
  return <form onSubmit={event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(`${name}: ${data.get("note")}`);
  }}>
    <label>Name<input value={name} onChange={event => setName(event.target.value)} /></label>
    <label>Note<input name="note" defaultValue="Hello" /></label>
    <button type="submit">Submit</button>
    <p>{submitted}</p>
  </form>;
}
```

## Walk through the result

Name changes pass through React state; the note stays in the DOM until FormData reads it. Both approaches participate in the same form. defaultValue supplies an initial value rather than controlling later edits.

## Interview pitfalls

Do not switch one input between undefined and a string value across renders. Initialize controlled text inputs to an empty string, and use checked for controlled checkboxes. A file input is handled through its files rather than assigning an arbitrary controlled file path.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react-dom/components/input)

## Continue the interview series

- [Previous: 49. What is the difference between props and state?](/blog/interview-049-props-state)
- [Next: 51. How does useState work?](/blog/interview-051-use-state)
- [Browse all 100 questions](/blog?series=interview)
