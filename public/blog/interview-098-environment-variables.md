---
slug: "interview-098-environment-variables"
title: "98. What is the difference between server-side and client-side environment variables?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Server-only environment variables are available to server code and should hold secrets such as database credentials."
series: "interview"
questionNumber: "98"
---

## The answer

Server-only environment variables are available to server code and should hold secrets such as database credentials. Variables prefixed NEXT_PUBLIC_ are eligible for inlining into browser JavaScript and must be treated as public.

Public values are generally fixed during the build. Promoting the same artifact to another environment does not automatically rewrite those embedded values.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```tsx
// app/page.tsx — Server Component
export default function Page() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Interview notebook";
  const serviceConfigured = Boolean(process.env.PRIVATE_SERVICE_TOKEN);
  return <main>
    <h1>{appName}</h1>
    <p>Server integration: {serviceConfigured ? "configured" : "not configured"}</p>
  </main>;
}
```

## Walk through the result

In a local .env.local file, set NEXT_PUBLIC_APP_NAME to a non-sensitive display name and PRIVATE_SERVICE_TOKEN to a development credential supplied by your service. Restart development after configuration changes. The page displays only whether the private value exists, never the value itself.

## Interview pitfalls

Keeping an environment variable server-side does not prevent leaks if you return it in props, JSON, logs or rendered output. Do not commit real .env secrets. Use deployment environment settings, limit access, and rotate a credential if it was exposed rather than merely deleting it from the latest commit.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/guides/environment-variables)

## Continue the interview series

- [Previous: 97. How do cookies and headers work in Server Components?](/blog/interview-097-cookies-headers)
- [Next: 99. How do next/image, next/font, and next/script improve performance?](/blog/interview-099-image-font-script-performance)
- [Browse all 100 questions](/blog?series=interview)
