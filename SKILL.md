---
name: epstein-search
description: "Search and retrieve documents via an external MCP/HTTP service (epstein-search-mcp). Use when the user asks to search the Epstein corpus, find a document by query, fetch a doc by id, or produce a cited summary based on results returned by the MCP server."
---

# epstein-search

Use this skill to query a locally-running (or remote) **epstein-search-mcp** service.

## Config

- `EPSTEIN_SEARCH_MCP_URL` (default: `http://127.0.0.1:3333`)

## Endpoints (current stub)

- `GET /search?q=<query>` → `{ results: [{ id, title, snippet }] }`
- `GET /doc?id=<id>` → `{ id, title, text }`

## Workflow

1) **Search** with a short query.
2) Pick top 3–10 hits.
3) **Fetch** each doc by `id`.
4) Answer using **citations**: quote short spans and reference `doc id`.

## Helper script

If you need a deterministic client call, use:

```bash
node scripts/query.mjs search "your query"
node scripts/query.mjs doc "demo.md"
```
