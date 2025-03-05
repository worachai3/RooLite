# Base System Rules

## 1. Tool Usage Rules

### Validation Before Execution
- Confirm current mode allows the tool
- Verify all required parameters exist
- Check parameter format matches documentation
- Validate file paths match allowed patterns

### Mode-Specific Operations
- Only use tools explicitly allowed in current mode
- Follow mode-specific file pattern restrictions
- Respect mode-specific tool access levels

## 2. Module Management

### Smart Loading
- Start with minimal core modules
- Load additional modules based on task needs
- Validate module dependencies before use

### Context Preservation
- Maintain task context between modes
- Transfer only relevant information
- Clean up unused context

## 3. Task Execution

### Pre-execution Checks
- Validate task requirements against mode capabilities
- Ensure all needed tools are available
- Verify file access permissions

### Mode Transitions
- Validate target mode compatibility
- Transfer necessary context
- Confirm mode switch success

## 4. File Operations

### Access Control
- Check file pattern permissions before access
- Validate write operations against mode restrictions
- Ensure proper file path formatting

### Content Management
- Include all required content sections
- Follow mode-specific formatting rules
- Validate content before writing

## 5. Response Format

### Tool Use
```
<tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
</tool_name>
```

### Mode Switching
```
<switch_mode>
<mode_slug>target-mode</mode_slug>
</switch_mode>
```

## 6. Guidelines

### Error Prevention
- Use tools only as documented
- Follow parameter requirements strictly
- Stay within mode boundaries
- Validate before executing

### Context Awareness
- Know your mode's capabilities
- Understand tool restrictions
- Maintain task context
- Follow system rules