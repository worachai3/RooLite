# MCP Server Registry Module

## Overview

The Server Registry Module manages installed MCP servers and their connection states. It provides a centralized registry for tracking available servers, their status, and managing server lifecycle events.

## Core Components

### Server Registration

```typescript
interface ServerRegistration {
  name: string;                 // Unique server identifier
  displayName: string;          // Human-readable name
  version: string;             // Server version
  status: ServerStatus;        // Current status (enabled/disabled)
  connectionState: ConnectionState;  // Connection state (connected/disconnected)
  capabilities: {
    tools: ToolDefinition[];    // Available tools
    resources: ResourceTemplate[]; // Available resources
  };
}

enum ServerStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled'
}

enum ConnectionState {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error'
}
```

### Server List Management

The registry maintains a list of all installed servers and their current state:

```json
{
  "servers": {
    "brave-search": {
      "name": "brave-search",
      "displayName": "Brave Search",
      "version": "1.0.0",
      "status": "enabled",
      "connectionState": "connected",
      "capabilities": {
        "tools": [
          {
            "name": "brave_web_search",
            "description": "Performs web search using Brave Search API",
            "inputSchema": {...}
          }
        ],
        "resources": []
      }
    }
  }
}
```

## Operations

### Server Registration
```typescript
function registerServer(registration: ServerRegistration): void {
  validateRegistration(registration);
  updateRegistry(registration);
  notifyRegistrationChange(registration);
}
```

### Status Management
```typescript
function updateServerStatus(name: string, status: ServerStatus): void {
  validateServerExists(name);
  updateServerState(name, { status });
  notifyStatusChange(name, status);
}
```

### Connection Management
```typescript
function updateConnectionState(name: string, state: ConnectionState): void {
  validateServerExists(name);
  updateServerState(name, { connectionState: state });
  notifyConnectionChange(name, state);
}
```

## Events

The registry emits events for server state changes:

- `server.registered`: New server added to registry
- `server.unregistered`: Server removed from registry  
- `server.status.changed`: Server enabled/disabled
- `server.connection.changed`: Connection state updated

## Integration

### Mode Integration
```typescript
interface ModeServerAccess {
  allowedServers: string[];      // Servers accessible in mode
  allowedCapabilities: string[]; // Allowed capability types
}
```

### Configuration Integration
```typescript
interface ServerConfig {
  name: string;
  command: string;
  args: string[];
  env: Record<string, string>;
  autostart: boolean;
}
```

## Usage

1. Server Registration
```typescript
registerServer({
  name: "example-server",
  displayName: "Example Server",
  version: "1.0.0",
  status: ServerStatus.ENABLED,
  connectionState: ConnectionState.DISCONNECTED,
  capabilities: {
    tools: [],
    resources: []
  }
});
```

2. Status Update
```typescript
updateServerStatus("example-server", ServerStatus.DISABLED);
```

3. Connection Update  
```typescript
updateConnectionState("example-server", ConnectionState.CONNECTED);
```

## Error Handling

The module implements comprehensive error handling:

```typescript
class ServerRegistryError extends Error {
  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

enum ErrorCode {
  INVALID_REGISTRATION = 'invalid_registration',
  SERVER_NOT_FOUND = 'server_not_found',
  DUPLICATE_SERVER = 'duplicate_server',
  INVALID_STATE = 'invalid_state'
}
```

Common error scenarios:
- Invalid registration data
- Server not found in registry
- Duplicate server registration 
- Invalid state transitions

## Best Practices

1. Always validate registration data before updates
2. Emit events for all state changes
3. Handle errors gracefully
4. Maintain consistent state
5. Log important operations
6. Clean up resources on server removal

## Security Considerations

1. Validate all inputs
2. Restrict server operations by mode
3. Sanitize environment variables
4. Implement proper access controls
5. Audit state changes