# ARC AI MCP — stdio bridge to the hosted server at https://arcai.io/mcp
# No dependencies and no API key; Node 18+ provides fetch.
FROM node:20-alpine
WORKDIR /app
COPY package.json index.mjs ./
ENV ARCAI_MCP_URL=https://arcai.io/mcp
ENTRYPOINT ["node", "index.mjs"]
