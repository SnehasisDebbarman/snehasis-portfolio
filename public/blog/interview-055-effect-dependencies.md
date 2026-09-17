---
slug: "interview-055-effect-dependencies"
title: "55. How does the dependency array of useEffect work?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Dependencies describe the reactive values read by an effect."
series: "interview"
questionNumber: "55"
---

## The answer

Dependencies describe the reactive values read by an effect. React compares each dependency with its previous value using Object.is. If a dependency changes, React cleans up the previous synchronization and starts the new one.

Omitting the array runs after every commit. An empty array means the effect has no reactive dependencies, not that it can never be set up again during the application's lifetime.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useEffect, useState } from "react";
function Room({ roomId }) {
  useEffect(() => {
    console.log("Connect:", roomId);
    return () => console.log("Disconnect:", roomId);
  }, [roomId]);
  return <p>Current room: {roomId}</p>;
}
export default function App() {
  const [room, setRoom] = useState("general");
  return <main>
    <button onClick={() => setRoom(value => value === "general" ? "support" : "general")}>Switch room</button>
    <Room roomId={room} />
  </main>;
}
```

## Walk through the result

Switching rooms logs cleanup for the old room before setup for the new one. Each cleanup closes over the room from its own effect setup. The dependency keeps synchronization aligned with the rendered selection.

## Interview pitfalls

Do not suppress dependency warnings merely to reduce executions. Objects and functions created during rendering have new identities and may trigger resynchronization. Move unnecessary construction inside the effect or restructure the code before adding memoization.

## Sources and further reading

- [Official documentation](https://react.dev/learn/removing-effect-dependencies)

## Continue the interview series

- [Previous: 54. How does useEffect work?](/blog/interview-054-use-effect)
- [Next: 56. How do you clean up an effect?](/blog/interview-056-effect-cleanup)
- [Browse all 100 questions](/blog?series=interview)
