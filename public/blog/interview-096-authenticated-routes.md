---
slug: "interview-096-authenticated-routes"
title: "96. How do you protect authenticated routes?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Verify the session on the server and check permission where protected data is read or changed."
series: "interview"
questionNumber: "96"
---

## The answer

Verify the session on the server and check permission where protected data is read or changed. A redirect improves navigation, but every Route Handler and Server Function must independently enforce the relevant authorization policy.

Prefer a maintained authentication integration for login and session lifecycle. The example below shows verification of an existing signed session, not a complete login system.

## Code example

This is an integration example for an existing signed-cookie login flow. Use Next.js 16 without Cache Components, install `jose` and `server-only`, and configure the required server secret. Missing configuration fails closed; no working login is implied.

```tsx
// lib/session.ts
import "server-only";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
export async function currentUserId(): Promise<string | null> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || new TextEncoder().encode(secret).length < 32) {
    throw new Error("Configure a strong SESSION_SECRET of at least 32 bytes");
  }
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"],
      issuer: "interview-demo",
      audience: "interview-demo-web",
      requiredClaims: ["sub", "exp"],
    });
    return typeof payload.sub === "string" && payload.sub.length > 0 ? payload.sub : null;
  } catch {
    return null;
  }
}
```

```tsx
// app/account/page.tsx — separate file
import { redirect } from "next/navigation";
import { currentUserId } from "../../lib/session";
export default async function Account() {
  const userId = await currentUserId();
  if (!userId) redirect("/login");
  return <h1>Account for {userId}</h1>;
}
```

```tsx
// app/login/page.tsx — separate file
export default function Login() {
  return <p>Sign in through your configured authentication provider.</p>;
}
```

## Walk through the result

Install jose with npm install jose server-only and configure the server-only secret. With no valid session cookie, /account redirects. To authenticate, your existing login integration must issue an expiring HS256 token with matching issuer and audience and set a Secure, HttpOnly cookie with an appropriate SameSite policy. This article does not implement token issuance.

## Interview pitfalls

JWT verification is only one part of session management. Define revocation, expiry, rotation and CSRF protections. Checking identity is not permission to access every record: scope database queries to the verified user and apply resource-level authorization. Never accept a userId supplied by the browser as proof of ownership.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/guides/authentication)
- [Additional official reference](https://github.com/panva/jose)

## Continue the interview series

- [Previous: 95. What is Next.js Middleware, and when should it be used?](/blog/interview-095-middleware-proxy)
- [Next: 97. How do cookies and headers work in Server Components?](/blog/interview-097-cookies-headers)
- [Browse all 100 questions](/blog?series=interview)
