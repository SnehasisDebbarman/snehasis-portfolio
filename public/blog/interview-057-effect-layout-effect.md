---
slug: "interview-057-effect-layout-effect"
title: "57. What is the difference between useEffect and useLayoutEffect?"
date: "September 18, 2026"
readTime: "3 min read"
category: "React"
excerpt: "Both synchronize with committed UI, but useLayoutEffect runs before the browser repaints and can block that paint."
series: "interview"
questionNumber: "57"
---

## The answer

Both synchronize with committed UI, but useLayoutEffect runs before the browser repaints and can block that paint. It is useful when measuring layout and applying a correction must happen before the user sees the result.

Prefer useEffect for ordinary synchronization. Do not assume useEffect always occurs after paint in every interaction scenario, and do not use layout effects merely because they sound faster.

## Code example

In a React 18+ browser project, replace `App.jsx` with this example.

```jsx
import { useLayoutEffect, useRef, useState } from "react";
export default function App() {
  const box = useRef(null);
  const [width, setWidth] = useState(0);
  const [wide, setWide] = useState(false);
  useLayoutEffect(() => {
    setWidth(Math.round(box.current.getBoundingClientRect().width));
  }, [wide]);
  return <main>
    <button onClick={() => setWide(value => !value)}>Resize box</button>
    <div ref={box} style={{ width: wide ? 240 : 120, padding: 10, background: "#ddd" }}>
      Measured width: {width}px
    </div>
  </main>;
}
```

## Walk through the result

The layout effect reads the committed box and schedules the measurement display before repaint. The measured width includes padding under the default content-box model. The dependency tracks this demonstration's explicit width toggle.

## Interview pitfalls

For changes caused by container resizing, fonts or other external layout factors, a ResizeObserver may be needed. Layout effects do not run on the server, where there is no browser layout to measure. Keep synchronous measurement work small to avoid blocking interaction.

## Sources and further reading

- [Official documentation](https://react.dev/reference/react/useLayoutEffect)

## Continue the interview series

- [Previous: 56. How do you clean up an effect?](/blog/interview-056-effect-cleanup)
- [Next: 58. What is the purpose of useRef?](/blog/interview-058-use-ref-purpose)
- [Browse all 100 questions](/blog?series=interview)
