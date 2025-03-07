# MCP Resources Reference

## Overview

MCP Resources represent any kind of UTF-8 encoded data that an MCP server wants to make available to clients. This includes database records, API responses, log files, and more. Resources can be either static (direct resources) or dynamic (resource templates).

## Resource Types

### 1. Direct Resources
Static resources with fixed URIs that provide immediate access to specific data.

Example:
```json
{
  "uri": "weather://San Francisco/current",
  "name": "Current weather in San Francisco",
  "mimeType": "application/json",
  "description": "Real-time weather data for San Francisco"
}
```

### 2. Resource Templates
Dynamic resources with URI templates that allow parameterized access to data.

Example:
```json
{
  "uriTemplate": "weather://{city}/current",
  "name": "Current weather for a given city",
  "mimeType": "application/json",
  "description": "Real-time weather data for a specified city"
}
```

## Access Patterns

### access_mcp_resource Tool

Description: Request to access a resource provided by a connected MCP server.

Parameters:
- server_name: (required) The name of the MCP server providing the resource
- uri: (required) The URI identifying the specific resource to access

Usage:
```xml
<access_mcp_resource>
<server_name>server name here</server_name>
<uri>resource URI here</uri>
</access_mcp_resource>
```

Example:
```xml
<access_mcp_resource>
<server_name>weather-server</server_name>
<uri>weather://san-francisco/current</uri>
</access_mcp_resource>
```

## URI Formats

### Standard Format
```
[protocol]://[host]/[path]
```

Components:
1. protocol: Identifies the resource type or service
2. host: Specifies the resource location or context
3. path: Defines the specific resource to access

### Template Format
```
[protocol]://{parameter}/[path]
```

Example Templates:
- `weather://{city}/current`
- `docs://{project}/{section}`
- `data://{database}/{table}/{id}`

## Resource Templates

### Definition
Resource templates enable dynamic resource access by allowing parameters in the URI. They follow RFC 6570 URI Template syntax.

### Components
1. **URI Template**: Pattern for constructing resource URIs
2. **Parameters**: Variables that can be substituted
3. **Documentation**: Description of usage and parameters

Example Template Implementation:
```typescript
this.server.setRequestHandler(
  ListResourceTemplatesRequestSchema,
  async () => ({
    resourceTemplates: [
      {
        uriTemplate: 'data://{type}/{id}',
        name: 'Data Record Access',
        mimeType: 'application/json',
        description: 'Access specific data records by type and ID'
      }
    ]
  })
);
```

## Best Practices

### 1. URI Design
- Use clear, descriptive protocols
- Follow consistent naming patterns
- Keep URIs concise but meaningful
- Use appropriate parameter names

### 2. Resource Organization
- Group related resources logically
- Use consistent naming conventions
- Provide clear documentation
- Include appropriate metadata

### 3. Template Design
- Make templates reusable
- Document parameters clearly
- Validate parameter values
- Handle errors gracefully

### 4. Error Handling
- Provide clear error messages
- Handle missing resources appropriately
- Validate URIs before access
- Include error context

### 5. Performance
- Cache when appropriate
- Minimize template complexity
- Optimize resource loading
- Handle timeouts properly

## Security Considerations

1. **Access Control**
   - Implement proper authentication
   - Validate resource permissions
   - Control template usage
   - Log access attempts

2. **Data Protection**
   - Secure sensitive data
   - Validate input parameters
   - Sanitize output data
   - Use secure protocols

3. **Error Handling**
   - Don't expose internal details
   - Log security events
   - Handle failures gracefully
   - Implement rate limiting

## Testing

1. **Resource Validation**
   - Verify URI formats
   - Test template expansion
   - Check error handling
   - Validate responses

2. **Security Testing**
   - Test access controls
   - Verify authentication
   - Check input validation
   - Audit logging

3. **Performance Testing**
   - Measure response times
   - Test concurrent access
   - Verify caching
   - Check resource limits