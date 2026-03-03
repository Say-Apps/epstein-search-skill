import process from "node:process";

const base = process.env.EPSTEIN_SEARCH_MCP_URL || "http://127.0.0.1:3333";
const timeoutMs = Number(process.env.EPSTEIN_SEARCH_TIMEOUT_MS || "15000");

async function fetchText(url) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const r = await fetch(url, { signal: ac.signal });
    const body = await r.text();
    if (!r.ok) {
      throw new Error(`HTTP ${r.status} ${r.statusText}: ${body.slice(0, 2000)}`);
    }
    return body;
  } catch (e) {
    if (e?.name === "AbortError") {
      throw new Error(`Timeout after ${timeoutMs}ms calling ${url}`);
    }
    throw e;
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  if (!cmd) {
    console.error(
      "Usage: node scripts/query.mjs <search|doc|people|health> <arg>\n" +
        "Env: EPSTEIN_SEARCH_MCP_URL (default http://127.0.0.1:3333), EPSTEIN_SEARCH_TIMEOUT_MS"
    );
    process.exit(2);
  }

  if (cmd === "health") {
    const url = `${base}/search?q=${encodeURIComponent("test")}`;
    const body = await fetchText(url);
    console.log(body);
    return;
  }

  if (cmd === "search") {
    const q = rest.join(" ");
    const body = await fetchText(`${base}/search?q=${encodeURIComponent(q)}`);
    console.log(body);
    return;
  }

  if (cmd === "people") {
    const name = rest.join(" ");
    const body = await fetchText(`${base}/people?name=${encodeURIComponent(name)}`);
    console.log(body);
    return;
  }

  if (cmd === "doc") {
    const id = rest.join(" ");
    const body = await fetchText(`${base}/doc?id=${encodeURIComponent(id)}`);
    console.log(body);
    return;
  }

  console.error(`Unknown cmd: ${cmd}`);
  process.exit(2);
}

main().catch((e) => {
  console.error(String(e?.stack || e));
  process.exit(1);
});
