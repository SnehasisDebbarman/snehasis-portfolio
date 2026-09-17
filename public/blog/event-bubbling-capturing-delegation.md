---
slug: "event-bubbling-capturing-delegation"
title: "The DOM and Event Delegation: One Listener for Many Buttons"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Understand DOM nodes, capture and bubble phases, and safely handle dynamic content with one listener."
---

The DOM is the browser's object representation of a document. JavaScript can read or change those objects; the browser then performs the work needed to display the result. The DOM is not the same thing as your original HTML string, and it is not React's internal element tree.

## Run this complete browser example

Save this as `index.html` and open it in a browser. Click Add task, then remove either the original task or a newly created one.

```html
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>DOM delegation</title></head>
<body>
  <button id="add">Add task</button>
  <ul id="tasks">
    <li>Read about closures <button data-action="remove">Remove</button></li>
  </ul>
  <script>
    const tasks = document.querySelector("#tasks");
    const add = document.querySelector("#add");
    let count = 0;

    function addTask() {
      const item = document.createElement("li");
      item.append(document.createTextNode(`Task ${++count} `));
      const button = document.createElement("button");
      button.dataset.action = "remove";
      button.textContent = "Remove";
      item.append(button);
      tasks.append(item);
    }

    function removeTask(event) {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest('button[data-action="remove"]');
      if (!button || !tasks.contains(button)) return;
      const item = button.closest("li");
      if (item && item.parentElement === tasks) item.remove();
    }

    add.addEventListener("click", addTask);
    tasks.addEventListener("click", removeTask);
  </script>
</body>
</html>
```

The list has one click listener. Newly added buttons work because their click events bubble to the list. `closest` also handles a click on an icon nested inside a button. The containment checks make the intended ownership explicit.

## Capture, target and bubble

During capture, an event travels toward its target through ancestors. It reaches the target, then bubbles through ancestors when that event supports bubbling. Pass `{ capture: true }` to listen during capture. The default click listener runs in the bubbling flow.

`event.target` identifies the originating target, while `event.currentTarget` identifies the node whose listener is executing. In the list handler, the current target is always the list even when the target is a button.

## Default actions are separate

`preventDefault()` asks the browser not to perform a cancelable default action, such as form submission. `stopPropagation()` stops further propagation; it does not automatically cancel the default action. Avoid using either globally because that can break other controls or analytics listeners.

## Safe updates and cleanup

Use `textContent` or text nodes for untrusted text. Interpolating user input into `innerHTML` can create executable markup. Remove listeners when a long-lived container outlives the feature that installed them, using the same function reference and capture setting.

Not every event bubbles. For delegated focus handling, consider `focusin` or capture, depending on the behavior needed. In React, let React own the DOM subtree it renders; directly removing its managed nodes can make the rendered state and actual DOM disagree.

## Sources and further reading

- [MDN DOM introduction](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- [MDN addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
