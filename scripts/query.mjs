import process from "node:process";

const base = process.env.EPSTEIN_SEARCH_MCP_URL || "http://127.0.0.1:3333";

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  if (!cmd) {
    console.error("Usage: node scripts/query.mjs <search|doc> <arg>");
    process.exit(2);
  }
  if (cmd === "search") {
    const q = rest.join(" ");
    const r = await fetch(`${base}/search?q=${encodeURIComponent(q)}`);
    console.log(await r.text());
    return;
  }
  if (cmd === "doc") {
    const id = rest.join(" ");
    const r = await fetch(`${base}/doc?id=${encodeURIComponent(id)}`);
    console.log(await r.text());
    return;
  }
  console.error(`Unknown cmd: ${cmd}`);
  process.exit(2);
}

main();
