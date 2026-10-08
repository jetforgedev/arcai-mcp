# ARC AI MCP Server

**Crypto intelligence for AI agents.** Check any Solana or EVM token for rug/scam risk in about a second, follow verified whale buying and selling, read signals from six AI agents, and see how accurate those signals have been.

Free · read-only · no API key · hosted at **`https://arcai.io/mcp`**

Listed in the [official MCP Registry](https://registry.modelcontextprotocol.io/v0/servers?search=io.arcai) as `io.arcai/arcai`.

---

## Connect

ARC AI is a **remote MCP server** (Streamable HTTP). Nothing to install — add the URL to your client.

### Claude (claude.ai / Claude Desktop)
Settings → **Connectors** → **Add custom connector** → URL `https://arcai.io/mcp`

### Cursor — `.cursor/mcp.json`
```json
{ "mcpServers": { "arcai": { "url": "https://arcai.io/mcp" } } }
```

### VS Code — `.vscode/mcp.json`
```json
{ "servers": { "arcai": { "type": "http", "url": "https://arcai.io/mcp" } } }
```

### Windsurf — `mcp_config.json`
```json
{ "mcpServers": { "arcai": { "serverUrl": "https://arcai.io/mcp" } } }
```

### Clients that can only run a local command
```json
{ "mcpServers": { "arcai": { "command": "npx", "args": ["-y", "mcp-remote", "https://arcai.io/mcp"] } } }
```
Or use the dependency-free bridge in this repo (Node 18+):
```json
{ "mcpServers": { "arcai": { "command": "node", "args": ["/absolute/path/to/index.mjs"] } } }
```

### Your own agent (TypeScript SDK)
```ts
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'

const client = new Client({ name: 'my-agent', version: '1.0.0' })
await client.connect(new StreamableHTTPClientTransport(new URL('https://arcai.io/mcp')))
const res = await client.callTool({ name: 'scan_token', arguments: { address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' } })
```

---

## Tools

| Tool | What it returns |
|------|-----------------|
| `scan_token` | **Fast rug/scam check** by contract address (Solana or EVM): `clean` / `caution` / `risky` verdict with plain-language reasons, mint & freeze authority, LP lock, honeypot, buy/sell tax, top holder, RugCheck or GoPlus risk score, plus price, liquidity, 24h volume and trades, market cap, pool age and a wash-trading flag |
| `get_whale_flows` | Verified on-chain whale trades ($10K+ DEX swaps) in the last 24h, per coin: buys vs sells in USD, net flow, wallets, most active whales |
| `get_signals` | Latest calls from ARC AI's six agents — whale trades, Sentinel rug warnings, Hunter launch picks, momentum, narrative |
| `get_track_record` | Every graded agent call from the last 30 days, right **and** wrong, with the evidence — weigh signals by how often they've been right |
| `get_launches` | New Solana tokens (< 7 days) with an activity score, RugCheck safety label and a wash-trading flag |
| `get_coin` | Price plus ARC AI's whale flow and latest agent calls for a ticker |
| `search` | Projects, tokens, AI reports and news by name or ticker |
| `get_news` | Latest ARC AI market news |
| `analyze_token` | Full AI-written token report (slower, ~10–40 s) |

All tools are read-only and return structured JSON with links back to arcai.io.

### Example — `scan_token`

```json
{
  "found": true,
  "chain": "solana",
  "name": "Bonk",
  "symbol": "BONK",
  "verdict": "clean",
  "reasons": [],
  "security": {
    "source": "rugcheck",
    "rugScore": 7,
    "riskLevel": "low",
    "mintAuthority": "renounced",
    "freezeAuthority": "renounced",
    "lpLockedPct": 16,
    "honeypot": false,
    "flags": []
  },
  "market": {
    "priceUsd": 0.000003189,
    "change24hPct": -7.32,
    "liquidityUsd": 368106,
    "volume24hUsd": 384243,
    "trades24h": 10806,
    "marketCapUsd": 283464502,
    "suspiciousVolume": false
  },
  "links": { "scan": "https://arcai.io/scan/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" },
  "note": "Automated checks can miss risks. Data, not financial advice."
}
```

### Try asking your agent
- *"Use ARC AI to check if this token is safe: `<contract address>`"*
- *"What are whales buying on Solana today?"*
- *"Show me new Solana launches that passed the safety check."*
- *"How accurate have ARC AI's agents been this month?"*

---

## Data sources

RugCheck (Solana contract checks), GoPlus (EVM contract checks), DexScreener and GeckoTerminal (market and on-chain trade data), CoinGecko (prices), plus ARC AI's own agents and their graded track record.

## Limits

Free and public, rate-limited per IP. Please cache results where you can. Questions or higher limits: admin@arcai.io.

## Disclaimer

Automated checks can miss risks. Everything here is data, not financial advice — always do your own research.

## Links

- Website: https://arcai.io
- Developer docs: https://arcai.io/developers
- Track record: https://arcai.io/track-record
- X: [@arcai_io](https://twitter.com/arcai_io)

## License

MIT — see [LICENSE](LICENSE). Covers the files in this repository (the bridge script and docs); the hosted service is provided by ARC AI under its [terms](https://arcai.io/terms).
