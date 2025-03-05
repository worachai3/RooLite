# MCP Core Module

## Overview

The Model Context Protocol (MCP) enables communication between the system and locally running MCP servers that provide additional tools and resources to extend your capabilities.

## Core Components

### Server Connection
When a server is connected, you can use the server's tools via the `use_mcp_tool` tool, and access the server's resources via the `access_mcp_resource` tool.

### Basic Operations

#### MCP Tool Usage
```xml
<use_mcp_tool>
<server_name>server name here</server_name>
<tool_name>tool name here</tool_name>
<arguments>
{
  "param1": "value1",
  "param2": "value2"
}
</arguments>
</use_mcp_tool>
```

#### MCP Resource Access
```xml
<access_mcp_resource>
<server_name>server name here</server_name>
<uri>resource URI here</uri>
</access_mcp_resource>
```

## Core Guidelines

1. MCP operations should be used one at a time, similar to other tool usage
2. Wait for confirmation of success before proceeding with additional operations
3. All credentials and authentication tokens must be provided upfront through environment variables
4. Servers operate in a non-interactive environment and cannot initiate OAuth flows or open browser windows