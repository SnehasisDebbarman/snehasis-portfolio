---
slug: "interview-100-optimize-test-deploy"
title: "100. How do you optimize, test, and deploy a Next.js application?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Treat release quality as a loop: measure a real user journey, make a targeted change, verify behavior, and deploy an artifact you can observe and roll back."
series: "interview"
questionNumber: "100"
---

## The answer

Treat release quality as a loop: measure a real user journey, make a targeted change, verify behavior, and deploy an artifact you can observe and roll back. Optimize bundle size, request waterfalls, caching and media based on evidence rather than a score alone.

Use unit tests for isolated logic, integration tests for data boundaries, and browser tests for critical flows. Production builds matter because development rendering and caching differ.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```ts
// playwright.config.ts
import { defineConfig } from "@playwright/test";
export default defineConfig({
  use: { baseURL: "http://127.0.0.1:3000" },
  webServer: {
    command: "npm run build && npm run start -- --hostname 127.0.0.1",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: false,
    timeout: 180000,
  },
});
```

```ts
// tests/home.spec.ts — separate file
import { test, expect } from "@playwright/test";
test("home page has a visible main heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
```

## Walk through the result

In a Next.js app whose home page has one h1, install @playwright/test as a dev dependency, install its browser binaries with npx playwright install chromium, then run npx playwright test. This minimal smoke test runs against a production server; add assertions for the actual navigation, authentication and mutation flows your product depends on.

Deploy through a connected Git provider or a documented hosting workflow, configure server secrets in that environment, verify the preview, then verify the production URL after promotion.

## Interview pitfalls

A passing heading test is not a full release gate. Check accessibility, error paths and authorization, monitor real-user LCP/INP/CLS, and inspect logs after release. Keep an identified previous deployment for rollback. Static export, Node hosting and managed platforms have different feature and caching capabilities.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/guides/testing/playwright)
- [Additional official reference](https://nextjs.org/docs/app/guides/production-checklist)

## Continue the interview series

- [Previous: 99. How do next/image, next/font, and next/script improve performance?](/blog/interview-099-image-font-script-performance)
- [Browse all 100 questions](/blog?series=interview)
