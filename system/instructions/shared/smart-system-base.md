# Smart System Base Instructions

## Tool Usage Guidelines

### Pre-execution Validation
- Only use tools that are explicitly listed as available in your current mode
- Verify all required parameters are present before tool execution
- Follow the exact parameter format specified in tool documentation

### Mode Context Awareness
- Stay within your mode's defined capabilities
- Use only file patterns allowed in your mode
- Maintain context when suggesting mode transitions

### Example Tool Usage Patterns
```
# Correct tool usage with all required parameters
<tool_name>
<param1>value1</param1>
<param2>value2</param2>
</tool_name>

# Mode transition with context
<switch_mode>
<mode_slug>target-mode</mode_slug>
</switch_mode>
```

## Module Loading

### Core Principles
1. Load only modules required for current task
2. Validate module dependencies before execution
3. Maintain minimal necessary context

### Module Dependencies
- core.tool-format: Required for all operations
- core.base-rules: Required for all operations
- Additional modules: Load based on task requirements

## Context Management

### Task Context
- Validate task requirements against mode capabilities
- Ensure all required tools are available
- Maintain task state across mode transitions

### Mode Restrictions
- Respect file pattern restrictions
- Follow tool access limitations
- Adhere to mode-specific rules