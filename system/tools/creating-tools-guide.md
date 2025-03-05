# Guide to Creating Tools in Tools Modules

This document explains how to create and document tools in the tools module system.

## Tool Structure

Each tool should be defined in its own markdown file within the appropriate module directory:
- File operations: system/tools/file-ops/
- Search operations: system/tools/search-ops/
- Task operations: system/tools/task-ops/
- MCP operations: system/tools/mcp/

## Documentation Format

### Basic Structure
```markdown
# Module Name

## Tool: tool_name
Description: A clear, concise description of what the tool does and when to use it.
Parameters:
- param1: (required/optional) Description of the parameter
- param2: (required/optional) Description of the parameter

Usage:
```xml
<tool_name>
<param1>value1</param1>
<param2>value2</param2>
</tool_name>
```

Example: Brief description of the example
```xml
<tool_name>
<param1>example value</param1>
<param2>example value</param2>
</tool_name>
```
```

### Key Components

1. **Module Header**
   - Start with `# Module Name` where name reflects the category (e.g., "File Operations Module")
   - Use proper categorization: file-ops, search-ops, task-ops, mcp

2. **Tool Section**
   - Tool name prefixed with `## Tool: `
   - Follows proper naming convention (lowercase with underscores)

3. **Description**
   - Clear explanation of the tool's purpose
   - Include when and why to use the tool
   - Any important notes or warnings about usage

4. **Parameters**
   - List each parameter with (required) or (optional) designation
   - Clear description of parameter purpose
   - Any constraints or format requirements
   - Current working directory path for file operations: ${ROOT_DIR}

5. **Usage Section**
   - Show basic XML structure
   - Include parameter placeholders
   - Use clear formatting with proper indentation

6. **Examples**
   - Provide practical, realistic examples
   - Include context or brief descriptions
   - Show proper parameter usage
   - Multiple examples for complex tools

## Best Practices

1. **Consistency**
   - Maintain consistent formatting across all tool documentation
   - Use standard markdown formatting
   - Follow established naming conventions
   - Keep similar tools in the same module

2. **Clarity**
   - Write clear, concise descriptions
   - Include all necessary information
   - Explain any assumptions or prerequisites
   - Document error cases and handling

3. **Examples**
   - Make examples practical and realistic
   - Show common use cases
   - Include edge cases where relevant
   - Use proper XML formatting

4. **Parameters**
   - Clearly mark required vs optional parameters
   - Document any default values
   - Explain parameter constraints
   - Include format requirements

## Module Categories

1. **File Operations (file-ops)**
   - Tools for reading, writing, and manipulating files
   - File system operations
   - Directory operations

2. **Search Operations (search-ops)**
   - Tools for searching content
   - Pattern matching
   - Find and replace operations

3. **Task Operations (task-ops)**
   - Tools for task management
   - User interaction
   - System commands
   - Mode switching

4. **MCP Operations (mcp)**
   - Tools for MCP server interaction
   - Resource access
   - Server communication

## Example Tool Creation

Here's an example of creating a new tool document:

```markdown
# File Operations Module

## Tool: read_config
Description: Request to read and parse a configuration file. Supports JSON, YAML, and INI formats. Use this tool when you need to access configuration settings from a file.
Parameters:
- path: (required) The path to the config file (relative to current working directory)
- format: (optional) The file format (json, yaml, ini). If not specified, determined from file extension.

Usage:
```xml
<read_config>
<path>path/to/config.json</path>
<format>json</format>
</read_config>
```

Example: Reading a JSON configuration file
```xml
<read_config>
<path>config/app-settings.json</path>
<format>json</format>
</read_config>
```
```

## Tool Implementation Checklist

1. [ ] Choose appropriate module category
2. [ ] Create markdown file in correct directory
3. [ ] Write clear description
4. [ ] Document all parameters
5. [ ] Include proper usage section
6. [ ] Provide relevant examples
7. [ ] Follow consistent formatting
8. [ ] Include necessary warnings/notes
9. [ ] Verify working directory path
10. [ ] Test documentation accuracy