---
slug: "interview-037-bubbling-capturing"
title: "37. What is event bubbling and event capturing?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "DOM event propagation has a capture phase toward the target, a target phase, and, for bubbling events, a bubble phase through ancestors."
series: "interview"
questionNumber: "37"
---

## The answer

DOM event propagation has a capture phase toward the target, a target phase, and, for bubbling events, a bubble phase through ancestors. A listener defaults to the bubbling phase unless capture is requested.

`target` identifies where the event originated; `currentTarget` identifies the node whose listener is currently running.

## Code example

Save the complete snippet as `index.html`, open it in a browser and inspect the console.

```html
<!doctype html>
<html lang="en">
<body>
  <div id="panel"><button id="action">Click me</button></div>
  <script>
    const panel = document.querySelector("#panel");
    const action = document.querySelector("#action");
    panel.addEventListener("click", () => console.log("panel capture"), true);
    action.addEventListener("click", () => console.log("button target"));
    panel.addEventListener("click", event => {
      console.log("panel bubble", event.target.id, event.currentTarget.id);
    });
  </script>
</body>
</html>
```

## Walk through the result

Clicking the button logs panel capture, button target, then panel bubble with action and panel as the two IDs. The same click is observed at different positions along its propagation path.

## Interview pitfalls

Stopping propagation and cancelling a default action are separate operations. `stopPropagation()` does not automatically prevent navigation or form submission. Not every event bubbles; examine the event type before choosing delegation or capture. Shadow DOM also introduces retargeting considerations.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)

## Continue the interview series

- [Previous: 36. What are pure functions and immutability?](/blog/interview-036-pure-functions-immutability)
- [Next: 38. What is event delegation?](/blog/interview-038-event-delegation)
- [Browse all 100 questions](/blog?series=interview)
