# Installing the ARC AI MCP server (for AI assistants such as Cline)

ARC AI is a **remote, hosted MCP server**. There is nothing to clone, build or install, and **no API key** is needed.

- Server URL: `https://arcai.io/mcp`
- Transport: Streamable HTTP
- Authentication: none

## Cline

Add this entry to `cline_mcp_settings.json` (Cline → MCP Servers → Configure → "Configure MCP Servers"), merging it into any existing `mcpServers` object:

```json
{
  "mcpServers": {
    "arcai": {
      "type": "streamableHttp",
      "url": "https://arcai.io/mcp",
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Save the file. Cline connects automatically; the server should show **9 tools** and a green status.

### Fallback (only if the remote connection fails)

Run it through the local bridge instead (requires Node.js 18+ and `npx`):

```json
{
  "mcpServers": {
    "arcai": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://arcai.io/mcp"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Verify

Call the `scan_token` tool with the BONK token address:

```json
{ "address": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" }
```

A working setup returns a JSON result with `"found": true`, `"symbol": "BONK"` and a `"verdict"` of `clean`, `caution` or `risky`.

## Tools

`scan_token`, `analyze_token`, `get_signals`, `get_whale_flows`, `get_launches`, `get_track_record`, `get_coin`, `search`, `get_news` — all read-only. See README.md for details.

## Notes

- Rate-limited per IP; please don't call tools in tight loops.
- Results are data, not financial advice.
