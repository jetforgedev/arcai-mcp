#!/usr/bin/env node
/**
 * ARC AI MCP — stdio bridge
 * -------------------------
 * Most MCP clients can connect straight to the hosted server by URL:
 *     https://arcai.io/mcp
 * This file is only for clients that can launch a local (stdio) server. It forwards every
 * MCP message to the hosted server, so the tools are always the current ones.
 *
 * Run:   node index.mjs          (Node 18+, no dependencies, no API key)
 * Env:   ARCAI_MCP_URL           default https://arcai.io/mcp
 */
import { createInterface } from 'node:readline'

const URL_ = (process.env.ARCAI_MCP_URL || 'https://arcai.io/mcp').replace(/\/$/, '')
const out = (msg) => process.stdout.write(JSON.stringify(msg) + '\n')

async function forward(line) {
  let msg
  try { msg = JSON.parse(line) } catch { return out({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }) }
  const ids = (Array.isArray(msg) ? msg : [msg]).filter((m) => m && m.id !== undefined).map((m) => m.id)
  try {
    const res = await fetch(URL_, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'User-Agent': 'arcai-mcp-stdio/1.1' },
      body:    line,
    })
    if (res.status === 202) return                       // notification acknowledged
    const text = await res.text()
    if (text) out(JSON.parse(text))
  } catch (e) {
    for (const id of ids) out({ jsonrpc: '2.0', id, error: { code: -32603, message: `ARC AI unreachable: ${e.message}` } })
  }
}

const rl = createInterface({ input: process.stdin })
rl.on('line', (line) => { if (line.trim()) forward(line) })
console.error(`ARC AI MCP bridge → ${URL_}`)
