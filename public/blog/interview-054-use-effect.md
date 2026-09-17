---
slug: "interview-054-use-effect"
title: "54. How does useEffect work?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "useEffect synchronizes a committed component with an external system, such as a subscription, browser event or third-party widget."
series: "interview"
questionNumber: "54"
---

## The answer

useEffect synchronizes a committed component with an external system, such as a subscription, browser event or third-party widget. React runs setup after the component commits and runs cleanup before a changed setup or when the component unmounts.

If a value can be calculated from props and state during render, it usually does not need an effect. Keep user-triggered work in the corresponding event handler when that expresses the cause more clearly.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useEffect, useState } from "react";
export default function App() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return <p>Browser status: {online ? "online" : "offline"}</p>;
}
```

## Walk through the result

The effect connects to browser connectivity events after mounting and removes the same listeners on cleanup. The initial true value is a placeholder until the browser status is read. Try toggling network emulation in DevTools.

## Interview pitfalls

navigator.onLine is a connectivity hint, not proof that a particular server is reachable. Effects do not run during server rendering. Development Strict Mode may perform an extra setup/cleanup cycle, so subscriptions must tolerate reconnecting.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react/useEffect)

## Continue the interview series

- [Previous: 53. How does React batch state updates?](/blog/interview-053-state-batching)
- [Next: 55. How does the dependency array of useEffect work?](/blog/interview-055-effect-dependencies)
- [Browse all 100 questions](/blog?series=interview)
