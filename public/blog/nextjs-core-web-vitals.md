---
slug: "nextjs-core-web-vitals"
title: "Web Vitals and Lighthouse: Fix LCP, INP and CLS"
date: "September 17, 2026"
readTime: "3 min read"
category: "Performance"
excerpt: "Measure real loading, responsiveness and visual stability, then use repeatable experiments to locate the bottleneck."
---

Performance work starts with an observable user problem: the main content appears late, a click feels delayed, or the layout jumps. A score alone does not tell you which resource or task caused it.

## Know the metrics

| Metric | Measures | Good threshold |
| --- | --- | --- |
| LCP | When the largest eligible visible content is rendered | At most 2.5 seconds |
| INP | Interaction responsiveness across the visit | At most 200 milliseconds |
| CLS | Unexpected layout movement | At most 0.1 |

Evaluate these at the 75th percentile of real visits, separated by device class. INP replaced FID as a Core Web Vital. A fast laptop and empty browser cache are only one test condition.

## Collect browser measurements

In a bundled browser application, install `web-vitals` and call these functions once from the browser entry point. This sample logs locally; it does not send visitor data to a server.

```bash
npm install web-vitals
```

```js
import { onCLS, onINP, onLCP } from "web-vitals";

function report(metric) {
  console.table({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
  });
}

onCLS(report);
onINP(report);
onLCP(report);
```

Interact with the page and switch tabs to allow final lifecycle reports. Some metrics are reported when a visit ends or the document becomes hidden, rather than immediately at startup. For production telemetry, use a deliberate endpoint and avoid collecting sensitive page content.

## Diagnose LCP

Use a performance trace to identify the actual LCP element. If it is an image, investigate discovery time, transfer size and rendering delay. If it is text, inspect fonts and blocking styles. A slow initial server response cannot be repaired solely by compressing an image.

An experiment: record the LCP resource and request waterfall, reduce its transfer size, then repeat under the same throttling profile. Keep the change only when measurements improve and image quality remains acceptable.

## Diagnose INP and CLS

For delayed clicks, inspect main-thread tasks around the interaction. Expensive synchronous computation can block painting even when the handler itself appears short. Split work, reduce unnecessary renders, or move suitable pure computation into a worker.

For layout shifts, reserve media dimensions and stable placeholders. Avoid injecting banners above existing content. Verify the layout after fonts, images and asynchronous data arrive.

## Use Lighthouse correctly

Run Lighthouse against a production build in a clean browser profile. Repeat several runs under consistent conditions and compare the median. Its default navigation audit is a controlled lab test; it does not reproduce every interaction or replace real-user INP data. Total Blocking Time can help diagnose responsiveness in the lab, but it is not INP.

Keep a small record: URL, build revision, device profile, throttling, metric before, metric after and the change tested. Fix one likely bottleneck at a time instead of chasing a perfect score through unrelated tweaks.

## Sources and further reading

- [Core Web Vitals](https://web.dev/articles/vitals)
- [web-vitals library](https://github.com/GoogleChrome/web-vitals)
- [Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview)
- [Optimize INP](https://web.dev/articles/optimize-inp)
