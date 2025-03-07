# MCP Tools Reference

## Overview

MCP Tools enable servers to expose executable functionality to the system. Through these tools, you can interact with external systems, perform computations, and take actions in the real world.

## Tool Definitions

### use_mcp_tool

Description: Request to use a tool provided by a connected MCP server. Each MCP server can provide multiple tools with different capabilities. Tools have defined input schemas that specify required and optional parameters.

Parameters:
- server_name: (required) The name of the MCP server providing the tool
- tool_name: (required) The name of the tool to execute
- arguments: (required) A JSON object containing the tool's input parameters, following the tool's input schema

Usage:
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

Example:
```xml
<use_mcp_tool>
<server_name>weather-server</server_name>
<tool_name>get_forecast</tool_name>
<arguments>
{
  "city": "San Francisco",
  "days": 5
}
</arguments>
</use_mcp_tool>
```

## Usage Patterns

### 1. Single Operation Pattern
- Execute one tool operation at a time
- Wait for confirmation before proceeding
- Handle results appropriately
```xml
<use_mcp_tool>
<server_name>server1</server_name>
<tool_name>tool1</tool_name>
<arguments>{"param": "value"}</arguments>
</use_mcp_tool>
<!-- Wait for result before next operation -->
```

### 2. Error Handling Pattern
- Check for error responses
- Handle different error types appropriately
- Provide meaningful feedback
```xml
<!-- Tool use that might fail -->
<use_mcp_tool>
<server_name>server1</server_name>
<tool_name>risky_operation</tool_name>
<arguments>{"param": "value"}</arguments>
</use_mcp_tool>
<!-- Handle potential error response -->
```

### 3. Input Validation Pattern
- Validate all inputs before sending
- Follow schema requirements
- Use appropriate data types
```xml
<use_mcp_tool>
<server_name>validation-server</server_name>
<tool_name>process_data</tool_name>
<arguments>
{
  "number": 42,
  "text": "valid string",
  "array": [1, 2, 3]
}
</arguments>
</use_mcp_tool>
```

## Permission Management

Tools may have different permission requirements:
1. Default permissions based on server configuration
2. Additional permissions specified in tool definitions
3. Context-specific permissions based on the current mode

### Permission Levels

1. **Open Access**
   - No special permissions required
   - Available to all modes
   - Basic operations only

2. **Restricted Access**
   - Requires specific mode permissions
   - May need additional authentication
   - Sensitive operations

3. **Administrative Access**
   - Highest level of permission
   - System-critical operations
   - Configuration changes

## Error Handling

### Common Error Types

1. **Invalid Parameters**
   - Missing required parameters
   - Wrong parameter types
   - Invalid parameter values

2. **Permission Errors**
   - Insufficient permissions
   - Mode restrictions
   - Server access denied

3. **Server Errors**
   - Connection failures
   - Timeout issues
   - Internal server errors

### Error Response Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      "specific": "error details",
      "context": "additional context"
    }
  }
}
```

## Best Practices

1. **Input Validation**
   - Validate all parameters before sending
   - Follow schema specifications
   - Use appropriate data types

2. **Error Handling**
   - Implement proper error catching
   - Provide meaningful error messages
   - Handle different error types appropriately

3. **Performance**
   - Minimize number of tool calls
   - Batch operations when possible
   - Handle timeouts gracefully

4. **Security**
   - Never expose sensitive data
   - Validate all inputs
   - Follow principle of least privilege

5. **Documentation**
   - Document tool usage patterns
   - Provide clear examples
   - Keep documentation updated