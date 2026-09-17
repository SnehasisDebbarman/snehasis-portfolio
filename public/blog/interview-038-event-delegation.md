---
slug: "interview-038-event-delegation"
title: "38. What is event delegation?"
date: "September 18, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Event delegation handles events for multiple children through a listener on an ancestor."
series: "interview"
questionNumber: "38"
---

## The answer

Event delegation handles events for multiple children through a listener on an ancestor. It is especially useful for dynamic lists because newly added children participate without installing new listeners individually.

The handler identifies a relevant target and checks that it belongs to the intended container. This is a behavior-routing technique built on propagation.

## Code example

Save as `index.html` and open in a browser. Both Remove buttons should remove their own row.

```html
<!doctype html>
<html lang="en">
<body>
  <ul id="items">
    <li>Learn closures <button data-remove>Remove</button></li>
    <li>Practice React <button data-remove><span>Remove</span></button></li>
  </ul>
  <script>
    const list = document.querySelector("#items");
    list.addEventListener("click", event => {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest("button[data-remove]");
      if (!button || !list.contains(button)) return;
      const item = button.closest("li");
      if (item?.parentElement === list) item.remove();
    });
  </script>
</body>
</html>
```

## Walk through the result

Clicking the nested span still works because closest finds its button. The handler removes only a direct list item owned by this list. You can append more matching items and the same listener continues to work.

## Interview pitfalls

Do not delegate every event to document without considering ownership and cleanup. Some events do not bubble, and another handler may stop propagation. In React, update state to remove rendered items rather than directly deleting React-owned DOM nodes.

## Sources and further reading

- [Official documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)

## Continue the interview series

- [Previous: 37. What is event bubbling and event capturing?](/blog/interview-037-bubbling-capturing)
- [Next: 39. What are ES modules, CommonJS, and tree shaking?](/blog/interview-039-modules-tree-shaking)
- [Browse all 100 questions](/blog?series=interview)
