# MCP Server Capabilities Module

## Overview

The Server Capabilities Module manages tool definitions and resource templates for MCP servers. It provides functionality for dynamic capability loading, validation, and caching of server capabilities.

## Core Components

### Tool Definition

```typescript
interface ToolDefinition {
  name: string;                 // Unique tool identifier
  description: string;          // Human-readable description
  inputSchema: JSONSchema;      // JSON Schema for tool parameters
  metadata?: {
    category?: string;         // Tool category
    version?: string;          // Tool version
    tags?: string[];          // Tool tags
  };
}

interface JSONSchema {
  type: string;
  properties?: Record<string, any>;
  required?: string[];
  description?: string;
}
```

### Resource Template

```typescript
interface ResourceTemplate {
  uriTemplate: string;         // URI template (RFC 6570)
  name: string;               // Human-readable name
  mimeType?: string;         // Optional MIME type
  description?: string;      // Optional description
  metadata?: {
    category?: string;      // Resource category
    version?: string;      // Resource version
    tags?: string[];      // Resource tags
  };
}
```

### Capabilities Cache

```typescript
interface CapabilitiesCache {
  serverName: string;
  tools: Map<string, ToolDefinition>;
  resources: Map<string, ResourceTemplate>;
  lastUpdated: Date;
}
```

## Operations

### Tool Management

```typescript
class ToolRegistry {
  // Register a new tool definition
  registerTool(serverName: string, tool: ToolDefinition): void {
    validateToolDefinition(tool);
    updateToolRegistry(serverName, tool);
    notifyToolRegistration(serverName, tool);
  }

  // Get tool by name
  getTool(serverName: string, toolName: string): ToolDefinition {
    return lookupTool(serverName, toolName);
  }

  // List all tools for server
  listTools(serverName: string): ToolDefinition[] {
    return getServerTools(serverName);
  }
}
```

### Resource Management

```typescript
class ResourceRegistry {
  // Register a new resource template
  registerResource(serverName: string, resource: ResourceTemplate): void {
    validateResourceTemplate(resource);
    updateResourceRegistry(serverName, resource);
    notifyResourceRegistration(serverName, resource);
  }

  // Get resource by URI template
  getResource(serverName: string, uriTemplate: string): ResourceTemplate {
    return lookupResource(serverName, uriTemplate);
  }

  // List all resources for server
  listResources(serverName: string): ResourceTemplate[] {
    return getServerResources(serverName);
  }
}
```

### Capability Loading

```typescript
class CapabilityLoader {
  // Load capabilities from server
  async loadCapabilities(serverName: string): Promise<void> {
    const capabilities = await fetchServerCapabilities(serverName);
    validateCapabilities(capabilities);
    updateCache(serverName, capabilities);
    notifyCapabilitiesLoaded(serverName);
  }

  // Refresh cached capabilities
  async refreshCapabilities(serverName: string): Promise<void> {
    await invalidateCache(serverName);
    await loadCapabilities(serverName);
  }
}
```

## Validation

### Tool Validation

```typescript
function validateToolDefinition(tool: ToolDefinition): void {
  // Validate required fields
  if (!tool.name || !tool.description || !tool.inputSchema) {
    throw new ValidationError('Missing required tool fields');
  }

  // Validate input schema
  validateJSONSchema(tool.inputSchema);

  // Validate name format
  if (!/^[a-z][a-z0-9_]*$/.test(tool.name)) {
    throw new ValidationError('Invalid tool name format');
  }
}
```

### Resource Validation

```typescript
function validateResourceTemplate(resource: ResourceTemplate): void {
  // Validate required fields
  if (!resource.uriTemplate || !resource.name) {
    throw new ValidationError('Missing required resource fields');
  }

  // Validate URI template format
  validateURITemplate(resource.uriTemplate);

  // Validate MIME type if present
  if (resource.mimeType && !isValidMimeType(resource.mimeType)) {
    throw new ValidationError('Invalid MIME type');
  }
}
```

## Caching

### Cache Management

```typescript
class CapabilitiesCache {
  private cache: Map<string, CapabilitiesCache>;

  // Update cache entry
  update(serverName: string, capabilities: ServerCapabilities): void {
    this.cache.set(serverName, {
      serverName,
      tools: new Map(capabilities.tools.map(t => [t.name, t])),
      resources: new Map(capabilities.resources.map(r => [r.uriTemplate, r])),
      lastUpdated: new Date()
    });
  }

  // Invalidate cache entry
  invalidate(serverName: string): void {
    this.cache.delete(serverName);
  }

  // Get cached capabilities
  get(serverName: string): CapabilitiesCache | undefined {
    return this.cache.get(serverName);
  }
}
```

## Events

The module emits events for capability changes:

- `capability.tool.registered`: New tool registered
- `capability.tool.updated`: Tool definition updated
- `capability.resource.registered`: New resource registered
- `capability.resource.updated`: Resource template updated
- `capability.cache.updated`: Cache updated
- `capability.cache.invalidated`: Cache invalidated

## Integration

### Server Registry Integration

```typescript
interface ServerCapabilities {
  tools: ToolDefinition[];
  resources: ResourceTemplate[];
}

// Update server capabilities in registry
function updateServerCapabilities(
  serverName: string, 
  capabilities: ServerCapabilities
): void {
  const server = getServer(serverName);
  server.capabilities = capabilities;
  notifyCapabilitiesUpdate(serverName);
}
```

## Error Handling

```typescript
class CapabilityError extends Error {
  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

enum ErrorCode {
  INVALID_TOOL = 'invalid_tool',
  INVALID_RESOURCE = 'invalid_resource',
  CACHE_ERROR = 'cache_error',
  VALIDATION_ERROR = 'validation_error',
  LOAD_ERROR = 'load_error'
}
```

## Best Practices

1. Validate all capability definitions before registration
2. Cache capabilities to improve performance
3. Implement proper error handling
4. Keep cache fresh with periodic updates
5. Clean up invalid cache entries
6. Log capability changes
7. Emit events for state changes

## Security Considerations

1. Validate all capability definitions
2. Sanitize tool and resource names
3. Validate URI templates
4. Check MIME types
5. Implement proper access controls
6. Audit capability changes