# Tool Format Module

## Overview
This module defines the standard format for tool usage in the system.

## Format Specification

Tool uses are formatted using XML-style tags. The tool name is enclosed in opening and closing tags, and each parameter is similarly enclosed within its own set of tags.

### Basic Structure
```
<tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
...
</tool_name>
```

### Example
```
<read_file>
<path>src/main.js</path>
</read_file>
```

### Special Tool Requirements

#### write_to_file
The write_to_file tool requires three parameters:
1. path (required) - Target file path
2. content (required) - Complete file content
3. line_count (required) - Number of lines in the content

Example:
```
<write_to_file>
<path>src/config.js</path>
<content>const config = {
  port: 3000
};