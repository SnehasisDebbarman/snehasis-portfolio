---
slug: "interview-094-crud-apis"
title: "94. How do you build CRUD APIs in Next.js?"
date: "September 18, 2026"
readTime: "3 min read"
category: "Next.js"
excerpt: "Map create, read, update and delete operations to HTTP handlers, validate input at the boundary, and enforce authorization before touching persistent data."
series: "interview"
questionNumber: "94"
---

## The answer

Map create, read, update and delete operations to HTTP handlers, validate input at the boundary, and enforce authorization before touching persistent data. The storage layer must preserve data across requests and deployments.

The example below is a local-only learning API. It deliberately refuses production requests because its in-memory Map is not durable and has no user authorization. It demonstrates HTTP behavior without pretending to be a production database.

## Code example

Use a Next.js 16 App Router project with TypeScript. Paths above each snippet are relative to the project root. Unless stated otherwise, these examples use the default configuration without Cache Components enabled.

```ts
// app/api/notes/route.ts
const notes = new Map<string, string>();
function disabled() {
  return process.env.NODE_ENV !== "development";
}
function unavailable() {
  return Response.json({ error: "Local learning API only" }, { status: 503 });
}
async function readText(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !("text" in body) ||
      typeof body.text !== "string" || !body.text.trim() || body.text.length > 500) return null;
  return body.text.trim();
}
export async function GET() {
  if (disabled()) return unavailable();
  return Response.json([...notes].map(([id, text]) => ({ id, text })), {
    headers: { "Cache-Control": "no-store" },
  });
}
export async function POST(request: Request) {
  if (disabled()) return unavailable();
  const text = await readText(request);
  if (!text) return Response.json({ error: "Invalid text" }, { status: 400 });
  const id = crypto.randomUUID();
  notes.set(id, text);
  return Response.json({ id, text }, { status: 201 });
}
export async function PUT(request: Request) {
  if (disabled()) return unavailable();
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!notes.has(id)) return Response.json({ error: "Not found" }, { status: 404 });
  const text = await readText(request);
  if (!text) return Response.json({ error: "Invalid text" }, { status: 400 });
  notes.set(id, text);
  return Response.json({ id, text });
}
export async function DELETE(request: Request) {
  if (disabled()) return unavailable();
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!notes.delete(id)) return Response.json({ error: "Not found" }, { status: 404 });
  return new Response(null, { status: 204 });
}
```

## Walk through the result

With npm run dev, POST JSON such as {"text":"Practice closures"} to /api/notes. Copy the returned id, use GET to list notes, PUT /api/notes?id=ID with replacement JSON, then DELETE that URL. POST returns 201, deletion returns 204, and missing IDs return 404. Data can disappear on hot reload or process restart.

## Interview pitfalls

A production implementation needs durable storage, authenticated ownership checks, request-size limits and a concurrency policy. Cookie-authenticated mutations also need an appropriate CSRF defense. A module-level Map is neither shared reliably across server instances nor a safe persistent store; the development gate is intentional.

## Sources and further reading

- [Official documentation](https://nextjs.org/docs/app/guides/backend-for-frontend)

## Continue the interview series

- [Previous: 93. What are Route Handlers?](/blog/interview-093-route-handlers)
- [Next: 95. What is Next.js Middleware, and when should it be used?](/blog/interview-095-middleware-proxy)
- [Browse all 100 questions](/blog?series=interview)
