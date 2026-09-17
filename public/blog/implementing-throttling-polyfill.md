---
slug: "implementing-throttling-polyfill"
title: "Throttle from Scratch: Leading Calls and Scroll Work"
date: "September 17, 2026"
readTime: "3 min read"
category: "JavaScript"
excerpt: "Limit frequent events with a small throttle, then choose when trailing calls and animation frames are better."
---

Throttling limits execution frequency while events continue arriving. A drag gesture may emit dozens of events; you might need a progress update every 100 ms rather than waiting until dragging ends.

## A clear timing policy

This implementation is **leading-only**. It runs the first call immediately and drops calls inside the interval. It intentionally does not schedule a trailing call. That distinction matters: the final pointer position might be dropped, so save the final value separately on pointer-up or use a leading-and-trailing library implementation.

## Runnable example

Paste the whole block into a browser console or the compiler.

```js
function throttle(fn, interval = 100) {
  let lastRun = -Infinity;
  return function (...args) {
    const now = performance.now();
    if (now - lastRun < interval) return;
    lastRun = now;
    return fn.apply(this, args);
  };
}

const report = throttle((value) => console.log(value), 100);
report("first");
report("dropped");
setTimeout(() => report("later"), 150);
// first
// later (after at least 150 ms)
```

`performance.now()` measures elapsed time without depending on wall-clock corrections. Setting `lastRun` before invoking the callback also protects against a callback that recursively calls the wrapper.

## Browser integration

This example needs a browser page, because Workers do not have `window` or the DOM. Paste it into that page's DevTools after defining `throttle` above.

```js
const onScroll = throttle(() => {
  console.log("Scroll position:", window.scrollY);
}, 200);
window.addEventListener("scroll", onScroll, { passive: true });
// Later, when the widget is removed:
// window.removeEventListener("scroll", onScroll);
```

Keep the same function reference for registration and cleanup. A passive listener promises not to call `preventDefault`; it does not make expensive callback work cheap.

## Choosing the better solution

| Requirement | Technique |
| --- | --- |
| Search after typing stops | Trailing debounce |
| Regular progress while scrolling | Throttle |
| Visual updates coordinated with paint | requestAnimationFrame with a pending-frame guard |
| Detect an element entering the viewport | IntersectionObserver |

Avoid a timing wrapper if a native observer already expresses the requirement. If you need leading and trailing calls, cancellation, and consistent edge behavior, use Lodash rather than expanding this teaching implementation indefinitely.

## Practice

Change the scheduled call to 50 ms. It should be dropped under normal foreground scheduling; if the browser delays that timer beyond the interval, it can execute. Test policy with a fake clock when exact timing assertions matter.

## Sources and further reading

- [Lodash throttle](https://lodash.com/docs/#throttle)
- [MDN performance.now](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)
