# MCP Server Creation Guide

## Overview

This guide explains how to create and configure new MCP servers that provide additional tools and resources to extend system capabilities.

## Server Creation Steps

1. Create a new TypeScript server project:
```bash
cd ${process.env.HOME_PATH}/Documents/Cline/MCP
npx @modelcontextprotocol/create-server your-server-name
cd your-server-name
npm install required-dependencies
```

2. Implement the server code following the MCP SDK patterns:
```typescript
#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

class YourServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'your-server-name',
        version: '0.1.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );
    
    this.setupTools();
    this.setupResources();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Your MCP server running on stdio');
  }
}

const server = new YourServer();
server.run().catch(console.error);
```

3. Build and compile:
```bash
npm run build
```

4. Configure the MCP Server by adding it to one of these files:
   - VSCode: `${process.env.HOME_PATH}/Library/Application Support/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`
   - Claude Desktop: `~/Library/Application Support/Claude/claude_desktop_config.json`

Example configuration:
```json
{
  "mcpServers": {
    "your-server": {
      "command": "node",
      "args": ["/path/to/your-server/build/index.js"],
      "env": {
        "YOUR_API_KEY": "your-api-key-here"
      },
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

## Configuration Guidelines

1. Server must be non-interactive - cannot open browser windows or prompt for input
2. All credentials must be provided via environment variables
3. Always set `disabled: false` and `alwaysAllow: []` for new servers
4. Provide descriptive names and versions
5. Implement proper error handling and logging

## Best Practices

### 1. Resource Implementation
```typescript
private setupResources() {
  // Static resources
  this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: [
      {
        uri: `protocol://resource/path`,
        name: `Resource Name`,
        mimeType: 'application/json',
        description: 'Resource description'
      }
    ]
  }));

  // Resource templates
  this.server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({
    resourceTemplates: [
      {
        uriTemplate: 'protocol://{param}/path',
        name: 'Template Name',
        description: 'Template description'
      }
    ]
  }));
}
```

### 2. Tool Implementation
```typescript
private setupTools() {
  this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: 'tool_name',
        description: 'Tool description',
        inputSchema: {
          type: 'object',
          properties: {
            param1: {
              type: 'string',
              description: 'Parameter description'
            }
          },
          required: ['param1']
        }
      }
    ]
  }));

  this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
    // Tool implementation
    return {
      content: [
        {
          type: 'text',
          text: 'Tool result'
        }
      ]
    };
  });
}
```

## Security Considerations

1. Validate all inputs and parameters
2. Use secure communication channels
3. Follow principle of least privilege
4. Handle sensitive data securely
5. Implement proper error handling and logging
6. Never expose sensitive credentials in logs or responses

## Testing

1. Test tool functionality after adding to configuration
2. Verify resource access patterns
3. Test error handling and edge cases
4. Validate input schemas
5. Check authentication and authorization