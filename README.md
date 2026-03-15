# epstein-search (Clawdbot skill)

This skill lets Clawdbot search and retrieve documents from the **Epstein corpus** via the companion service:
- **MCP/HTTP service:** https://github.com/Say-Apps/epstein-search-mcp

The skill itself is intentionally thin: it documents how to call the service and provides a small deterministic CLI client.

## Configuration

Set the service base URL:

```bash
export EPSTEIN_SEARCH_MCP_URL="http://127.0.0.1:3333"
# or a deployed endpoint
# export EPSTEIN_SEARCH_MCP_URL="https://…"
```

## HTTP API (expected)

- `GET /search?q=<query>` → `{ results: [{ id, title, snippet, ... }] }`
- `GET /doc?id=<id>` → `{ id, title, text, ... }`
- `GET /people?name=<name>` → `{ results: [...] }` (optional; depends on server)

## Local helper

```bash
node scripts/query.mjs search "bill clinton"
node scripts/query.mjs people "les wexner"
node scripts/query.mjs doc "<doc-id>"
```

## Publishing / distribution notes

This repository is meant to be published to **ClawdHub** as a skill directory.

Checklist:
- [ ] `SKILL.md` up to date (endpoints + workflow)
- [ ] `README.md` explains setup + config
- [ ] License included (MIT/Apache-2.0) if publishing publicly
