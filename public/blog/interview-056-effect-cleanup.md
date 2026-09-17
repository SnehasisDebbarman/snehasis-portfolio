---
slug: "interview-056-effect-cleanup"
title: "56. How do you clean up an effect?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Return a cleanup function from the effect setup."
series: "interview"
questionNumber: "56"
---

## The answer

Return a cleanup function from the effect setup. It should undo the resource acquired by that setup: remove a listener, clear a timer, unsubscribe, or cancel work. React calls it before rerunning an effect with changed dependencies and during unmount.

Cleanup belongs to the specific setup invocation. Keeping the resource handle inside that invocation makes the ownership easy to follow.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useEffect, useState } from "react";
function Clock() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSeconds(value => value + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  return <p>Mounted for about {seconds} seconds</p>;
}
export default function App() {
  const [visible, setVisible] = useState(true);
  return <main>
    <button onClick={() => setVisible(value => !value)}>Toggle clock</button>
    {visible && <Clock />}
  </main>;
}
```

## Walk through the result

Hiding Clock removes its interval. Showing it creates a fresh component and timer. The updater reads pending state, so the effect does not need to recreate its interval every second.

## Interview pitfalls

Do not make the effect callback itself async: it would return a promise instead of a cleanup function. Define and invoke an async helper inside it. For requests, combine cancellation with an appropriate stale-result policy, and remember cancellation does not undo a server mutation.

## Sources and further reading

- [Official documentation](https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed)

## Continue the interview series

- [Previous: 55. How does the dependency array of useEffect work?](/blog/interview-055-effect-dependencies)
- [Next: 57. What is the difference between useEffect and useLayoutEffect?](/blog/interview-057-effect-layout-effect)
- [Browse all 100 questions](/blog?series=interview)
