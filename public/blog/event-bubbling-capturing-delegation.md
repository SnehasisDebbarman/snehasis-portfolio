---
slug: "event-bubbling-capturing-delegation"
title: "Mastering Event Bubbling, Capturing, & Delegation"
date: "April 20, 2026"
readTime: "6 min read"
category: "Frontend"
excerpt: "Explore the DOM event propagation phases and how Event Delegation optimizes event listeners in large pages."
---
DOM event propagation happens in three phases: Capturing (trickling), Target, and Bubbling.


### Bubbling vs. Capturing

By default, event listeners listen during the **Bubbling Phase** (propagating from the child item up through parent nodes). You can capture events during the **Capturing Phase** by passing `{ capture: true }` as the third argument to `addEventListener`.


### Event Delegation

Instead of binding a separate click handler to 100 list items, you bind a single event listener to the parent element. This listener intercepts bubbling clicks and uses `e.target` to verify which child clicked, saving heavy memory allocations.
